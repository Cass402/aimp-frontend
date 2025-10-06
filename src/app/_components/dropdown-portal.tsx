"use client";

import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface DropdownPortalProps {
  children: ReactNode;
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLElement | HTMLButtonElement | null>;
  align?: "left" | "right";
  offsetY?: number;
}

export function DropdownPortal({
  children,
  isOpen,
  triggerRef,
  align = "right",
  offsetY = 8,
}: DropdownPortalProps) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, right: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      setPosition({
        top: rect.bottom + scrollY + offsetY,
        left: rect.left + scrollX,
        right: window.innerWidth - (rect.right + scrollX),
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, triggerRef, offsetY]);

  if (!mounted || !isOpen) return null;

  const portalContent = (
    <div
      className="absolute z-[9999]"
      style={{
        top: `${position.top}px`,
        [align === "right" ? "right" : "left"]:
          align === "right" ? `${position.right}px` : `${position.left}px`,
      }}
    >
      {children}
    </div>
  );

  return createPortal(portalContent, document.body);
}
