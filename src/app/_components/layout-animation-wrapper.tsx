"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

export function LayoutAnimationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1], // Trust easing
            staggerChildren: 0.1,
          },
        }}
        exit={{
          opacity: 0,
          y: -8,
          filter: "blur(2px)",
          transition: { duration: 0.3 },
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
