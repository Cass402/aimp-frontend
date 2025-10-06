"use client";

import { motion } from "motion/react";

export function NeuralBackground() {
  return (
    <>
      {/* Fixed background gradients with breathing animation */}
      <motion.div
        className="fixed inset-0 z-[-10] pointer-events-none"
        initial={{ opacity: 0.4, scale: 1 }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.02, 1],
          rotate: [0, 0.5, 0],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{
          background: `
            radial-gradient(circle 800px at 25% 30%, rgba(var(--color-teal-500-rgb), 0.08) 0%, transparent 70%),
            radial-gradient(circle 600px at 75% 20%, rgba(var(--color-slate-900-rgb), 0.1) 0%, transparent 65%),
            radial-gradient(circle 900px at 60% 80%, rgba(var(--color-brown-600-rgb), 0.06) 0%, transparent 75%)
          `,
        }}
      />

      {/* Drift layer for subtle motion */}
      <motion.div
        className="fixed inset-0 z-[-5] pointer-events-none"
        animate={{
          x: [0, 20, -16, 0],
          y: [0, -10, 16, 0],
          rotate: [0, 1, -0.5, 0],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          background: `
            linear-gradient(135deg, rgba(var(--color-gray-200-rgb), 0.02) 0%, transparent 40%),
            radial-gradient(ellipse 1200px 400px at 70% 15%, rgba(var(--color-teal-500-rgb), 0.12) 0%, transparent 80%)
          `,
        }}
      />
    </>
  );
}
