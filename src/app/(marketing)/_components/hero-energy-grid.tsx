"use client";

import { useEffect, useRef } from "react";

// ============================================================================
// TYPES
// ============================================================================

interface HexNode {
  x: number;
  y: number;
  opacity: number;
  phase: number;
}

interface HeroEnergyGridProps {
  /**
   * Canvas opacity (0-1)
   */
  opacity?: number;

  /**
   * Hex grid spacing in pixels
   */
  spacing?: number;

  /**
   * Enable connection lines between nodes
   */
  showConnections?: boolean;
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Generate Fibonacci sequence for organic phase distribution
 */
const fibonacci = (n: number): number => {
  if (n <= 1) return n;
  let a = 0,
    b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
};

/**
 * Generate hexagonal grid nodes
 */
const generateHexGrid = (
  width: number,
  height: number,
  spacing: number
): HexNode[] => {
  const nodes: HexNode[] = [];
  const hexWidth = spacing;
  const hexHeight = spacing * 0.866; // sqrt(3)/2 for hex geometry

  // Add margin to extend grid beyond viewport edges
  const margin = spacing * 2;

  for (let row = -1; row < height / hexHeight + 2; row++) {
    const yOffset = row % 2 === 0 ? 0 : hexWidth / 2;
    for (let col = -1; col < width / hexWidth + 2; col++) {
      const x = col * hexWidth + yOffset - margin;
      const y = row * hexHeight - margin;

      nodes.push({
        x,
        y,
        opacity: 0.4,
        phase: Math.random() * Math.PI * 2, // Random initial phase
      });
    }
  }

  return nodes;
};

/**
 * Draw hexagon node
 */
const drawHexNode = (
  ctx: CanvasRenderingContext2D,
  node: HexNode,
  color: string
) => {
  const size = 8; // Hex radius in pixels - MUCH LARGER

  ctx.save();
  ctx.translate(node.x, node.y);

  // Hex path
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = size * Math.cos(angle);
    const y = size * Math.sin(angle);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();

  // Style
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.globalAlpha = node.opacity;

  // Stronger glow
  ctx.shadowBlur = 6;
  ctx.shadowColor = color;

  ctx.stroke();

  ctx.restore();
};

/**
 * Draw connection lines between nearby nodes
 */
const drawConnections = (
  ctx: CanvasRenderingContext2D,
  nodes: HexNode[],
  color: string,
  maxDistance: number = 150
) => {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;

  // Only check subset of nodes for performance
  const step = 3;
  for (let i = 0; i < nodes.length; i += step) {
    const nodeA = nodes[i];
    let connections = 0;

    for (let j = i + 1; j < nodes.length && connections < 3; j += step) {
      const nodeB = nodes[j];
      const dx = nodeB.x - nodeA.x;
      const dy = nodeB.y - nodeA.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const opacity = (1 - distance / maxDistance) * 0.2;
        ctx.globalAlpha = opacity * Math.min(nodeA.opacity, nodeB.opacity);

        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        ctx.stroke();

        connections++;
      }
    }
  }

  ctx.restore();
};

// ============================================================================
// COMPONENT
// ============================================================================

export function HeroEnergyGrid({
  opacity = 1,
  spacing = 170,
  showConnections = true,
}: HeroEnergyGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<HexNode[]>([]);
  const animationIdRef = useRef<number | undefined>(undefined);

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Setup canvas with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);

    // Generate grid nodes
    nodesRef.current = generateHexGrid(rect.width, rect.height, spacing);

    // Color from design system - intelligence primary (blue-teal)
    const gridColor = "rgba(41, 150, 161, 1)"; // --intelligence-primary

    // Static render for reduced motion
    if (prefersReducedMotion) {
      ctx.globalAlpha = 0.4 * opacity;
      nodesRef.current.forEach((node) => {
        drawHexNode(ctx, node, gridColor);
      });
      return;
    }

    // Animation loop
    let lastTime = 0;
    const frameInterval = 16; // 60fps

    const animate = (time: number) => {
      const deltaTime = time - lastTime;

      // Throttle to 60fps (16ms per frame)
      if (deltaTime < frameInterval) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      lastTime = time;

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Update and draw nodes
      nodesRef.current.forEach((node, i) => {
        // Fibonacci phase offset for organic rhythm
        const fibOffset = fibonacci(i % 8) * 100;
        const phase = (time + fibOffset) / 4000; // 4 second breath

        // Breathing opacity - MUCH more visible
        node.opacity = 0.4 + Math.sin(phase) * 0.2;

        drawHexNode(ctx, node, gridColor);
      });

      // Draw connections
      if (showConnections) {
        drawConnections(ctx, nodesRef.current, gridColor);
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [opacity, spacing, showConnections, prefersReducedMotion]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        nodesRef.current = generateHexGrid(rect.width, rect.height, spacing);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [spacing]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
