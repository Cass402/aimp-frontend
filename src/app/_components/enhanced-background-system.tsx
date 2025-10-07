"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";

interface BackgroundSystemProps {
  intensity?: "low" | "medium" | "high";
  systemState?: "normal" | "active" | "alert";
  userActivity?: boolean;
}

// Particle system for neural field visualization
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  alpha: number;
}

export function EnhancedBackgroundSystem({
  intensity = "medium",
  systemState = "normal",
  userActivity = false,
}: BackgroundSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Neural field parameters
  const particleCount =
    intensity === "high" ? 150 : intensity === "medium" ? 100 : 50;
  const noiseScale = 0.005;
  const timeScale = 0.0008;

  // Perlin noise implementation for organic motion
  const noise = useCallback((x: number, y: number, z: number) => {
    // Simplified 3D Perlin noise for performance
    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a: number, b: number, t: number) => a + t * (b - a);

    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;

    const u = fade(x - Math.floor(x));
    const v = fade(y - Math.floor(y));
    const w = fade(z - Math.floor(z));

    // Hash coordinates for gradient vectors
    const hash = (x: number, y: number, z: number) => {
      return ((x * 73856093) ^ (y * 19349663) ^ (z * 83492791)) % 12;
    };

    const gradients = [
      [1, 1, 0],
      [-1, 1, 0],
      [1, -1, 0],
      [-1, -1, 0],
      [1, 0, 1],
      [-1, 0, 1],
      [1, 0, -1],
      [-1, 0, -1],
      [0, 1, 1],
      [0, -1, 1],
      [0, 1, -1],
      [0, -1, -1],
    ];

    const grad = (hash: number, x: number, y: number, z: number) => {
      const g = gradients[hash];
      return g[0] * x + g[1] * y + g[2] * z;
    };

    const a = grad(hash(X, Y, Z), x - X, y - Y, z - Z);
    const b = grad(hash(X + 1, Y, Z), x - X - 1, y - Y, z - Z);
    const c = grad(hash(X, Y + 1, Z), x - X, y - Y - 1, z - Z);
    const d = grad(hash(X + 1, Y + 1, Z), x - X - 1, y - Y - 1, z - Z);
    const e = grad(hash(X, Y, Z + 1), x - X, y - Y, z - Z - 1);
    const f = grad(hash(X + 1, Y, Z + 1), x - X - 1, y - Y, z - Z - 1);
    const g = grad(hash(X, Y + 1, Z + 1), x - X, y - Y - 1, z - Z - 1);
    const h = grad(hash(X + 1, Y + 1, Z + 1), x - X - 1, y - Y - 1, z - Z - 1);

    return lerp(
      lerp(lerp(a, b, u), lerp(c, d, u), v),
      lerp(lerp(e, f, u), lerp(g, h, u), v),
      w
    );
  }, []);

  const createParticle = useCallback(
    (width: number, height: number): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      life: Math.random() * 300 + 200,
      maxLife: Math.random() * 300 + 200,
      size: Math.random() * 2 + 0.5,
      alpha: 0,
    }),
    []
  );

  const updateParticle = useCallback(
    (particle: Particle, time: number, width: number, height: number) => {
      // Apply Perlin noise for organic movement
      const noiseX = noise(
        particle.x * noiseScale,
        particle.y * noiseScale,
        time * timeScale
      );
      const noiseY = noise(
        particle.x * noiseScale + 100,
        particle.y * noiseScale + 100,
        time * timeScale
      );

      particle.vx += noiseX * 0.01;
      particle.vy += noiseY * 0.01;

      // Apply velocity damping for smooth motion
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around screen edges
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Update life and alpha
      particle.life--;
      particle.alpha =
        Math.sin((particle.life / particle.maxLife) * Math.PI) * 0.6;

      return particle.life > 0;
    },
    [noise, noiseScale, timeScale]
  );

  // Main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    const time = Date.now();

    // Clear canvas with subtle fade for trail effect - using theme-aware colors
    ctx.fillStyle =
      theme === "dark"
        ? "rgba(31, 33, 33, 0.03)" // --color-charcoal-700
        : "rgba(252, 252, 249, 0.03)"; // --color-cream-50
    ctx.fillRect(0, 0, width, height);

    // Get particles from ref or create new ones
    let particles = particlesRef.current;
    if (particles.length === 0) {
      particles = Array.from({ length: particleCount }, () =>
        createParticle(width, height)
      );
      particlesRef.current = particles;
    }

    // Update and render particles
    particles = particles.filter((particle) => {
      const alive = updateParticle(particle, time, width, height);

      if (alive) {
        // Render particle with system state color using design tokens
        const baseColor =
          systemState === "alert"
            ? "255, 84, 89" // --color-red-400-rgb (critical-secondary)
            : systemState === "active"
              ? "50, 184, 198" // --color-teal-300-rgb (trust-tertiary)
              : "33, 128, 141"; // --color-teal-500-rgb (trust-primary)

        const alpha = particle.alpha * (userActivity ? 1.2 : 0.8);

        ctx.fillStyle = `rgba(${baseColor}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add subtle glow for presence
        if (particle.alpha > 0.3) {
          ctx.shadowColor = `rgba(${baseColor}, ${alpha * 0.3})`;
          ctx.shadowBlur = particle.size * 3;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      return alive;
    });

    // Add new particles to maintain count
    while (particles.length < particleCount) {
      particles.push(createParticle(width, height));
    }

    // Store particles for next frame
    particlesRef.current = particles;

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [
    theme,
    systemState,
    userActivity,
    particleCount,
    createParticle,
    updateParticle,
    prefersReducedMotion,
  ]);

  // Setup canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    // Start animation with delay for progressive enhancement
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (!prefersReducedMotion) {
        animate();
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", resizeCanvas);
      mediaQuery.removeEventListener("change", handleMotionChange);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, prefersReducedMotion]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Get base color RGB values for inline styles (necessary for dynamic gradients)
  const getGradientColors = () => {
    if (theme === "dark") {
      return {
        primary: "rgba(33, 128, 141, 0.08)", // teal-500
        secondary: "rgba(41, 150, 161, 0.12)", // teal-800
        tertiary: "rgba(50, 184, 198, 0.06)", // teal-300
      };
    }
    return {
      primary: "rgba(33, 128, 141, 0.04)", // teal-500
      secondary: "rgba(19, 52, 59, 0.06)", // slate-900
      tertiary: "rgba(94, 82, 64, 0.03)", // brown-600
    };
  };

  const colors = getGradientColors();

  return (
    <>
      {/* Base gradient foundation - using design token colors */}
      <div
        className={`fixed inset-0 z-[-10] pointer-events-none transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(ellipse 180% 120% at 15% 25%, ${colors.primary} 0%, transparent 65%),
               radial-gradient(ellipse 150% 100% at 85% 15%, ${colors.secondary} 0%, transparent 70%),
               radial-gradient(ellipse 120% 80% at 50% 85%, ${colors.tertiary} 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Neural particle field canvas */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 z-[-9] pointer-events-none transition-opacity duration-1000 ${
          isVisible && !prefersReducedMotion ? "opacity-100" : "opacity-0"
        }`}
        style={{
          mixBlendMode: theme === "dark" ? "screen" : "multiply",
        }}
        aria-hidden="true"
      />

      {/* Subtle grain texture for tactile depth - using globals.css pattern */}
      <div
        className={`fixed inset-0 z-[-8] pointer-events-none transition-opacity duration-1000 ${
          isVisible ? "opacity-[0.015]" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
        aria-hidden="true"
      />

      {/* AI presence pulse indicator - using design token colors */}
      <div
        className={`fixed bottom-8 right-8 z-[-7] pointer-events-none transition-opacity duration-300 ${
          isVisible && systemState !== "normal" ? "opacity-60" : "opacity-30"
        }`}
        aria-hidden="true"
      >
        <div
          className={`w-3 h-3 rounded-full ${
            systemState === "alert"
              ? "bg-critical-secondary"
              : systemState === "active"
                ? "bg-trust-tertiary"
                : "bg-trust-primary"
          } ${
            systemState === "alert"
              ? "shadow-[0_0_20px_rgba(255,84,89,0.4)]"
              : systemState === "active"
                ? "shadow-[0_0_20px_rgba(50,184,198,0.4)]"
                : "shadow-[0_0_20px_rgba(33,128,141,0.4)]"
          } ${
            systemState === "alert"
              ? "animate-pulse [animation-duration:1s]"
              : systemState === "active"
                ? "animate-pulse [animation-duration:2s]"
                : "animate-pulse [animation-duration:3s]"
          }`}
        />
      </div>
    </>
  );
}
