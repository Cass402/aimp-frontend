"use client";

import React, { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

// ===========================================
// SPACING SYSTEM: Consistent spacing utilities for AIMP design system
// Based on PRD requirements for calm precision and trust-building layouts
// ===========================================

// Spacer component for explicit spacing control
interface SpacerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  direction?: "vertical" | "horizontal";
  className?: string;
}

export const Spacer = forwardRef<HTMLDivElement, SpacerProps>(
  ({ size = "md", direction = "vertical", className, ...props }, ref) => {
    const sizeClasses = {
      xs: direction === "vertical" ? "h-2" : "w-2",
      sm: direction === "vertical" ? "h-4" : "w-4",
      md: direction === "vertical" ? "h-6" : "w-6",
      lg: direction === "vertical" ? "h-8" : "w-8",
      xl: direction === "vertical" ? "h-12" : "w-12",
      "2xl": direction === "vertical" ? "h-16" : "w-16",
      "3xl": direction === "vertical" ? "h-24" : "w-24",
    };

    return (
      <div
        ref={ref}
        className={cn(sizeClasses[size], className)}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Spacer.displayName = "Spacer";

// Box for padding and margin control
interface BoxProps {
  children: ReactNode;
  className?: string;
  p?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  px?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  py?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  pt?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  pb?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  pl?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  pr?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  m?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  mx?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "auto";
  my?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  mt?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  mb?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  ml?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  mr?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  as?: keyof React.JSX.IntrinsicElements;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      children,
      className,
      p,
      px,
      py,
      pt,
      pb,
      pl,
      pr,
      m,
      mx,
      my,
      mt,
      mb,
      ml,
      mr,
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    const spacingMap = {
      none: "0",
      xs: "2",
      sm: "4",
      md: "6",
      lg: "8",
      xl: "12",
      auto: "auto",
    };

    const paddingClasses = [
      p && `p-${spacingMap[p]}`,
      px && `px-${spacingMap[px]}`,
      py && `py-${spacingMap[py]}`,
      pt && `pt-${spacingMap[pt]}`,
      pb && `pb-${spacingMap[pb]}`,
      pl && `pl-${spacingMap[pl]}`,
      pr && `pr-${spacingMap[pr]}`,
    ].filter(Boolean);

    const marginClasses = [
      m && `m-${spacingMap[m]}`,
      mx && `mx-${spacingMap[mx]}`,
      my && `my-${spacingMap[my]}`,
      mt && `mt-${spacingMap[mt]}`,
      mb && `mb-${spacingMap[mb]}`,
      ml && `ml-${spacingMap[ml]}`,
      mr && `mr-${spacingMap[mr]}`,
    ].filter(Boolean);

    if (Component === "div") {
      return (
        <div
          ref={ref}
          className={cn(...paddingClasses, ...marginClasses, className)}
          {...props}
        >
          {children}
        </div>
      );
    }

    // For non-div elements, we create the element but can't use the ref
    const ElementComponent = Component as keyof React.JSX.IntrinsicElements;
    return React.createElement(
      ElementComponent,
      {
        className: cn(...paddingClasses, ...marginClasses, className),
        ...props,
      },
      children
    );
  }
);

Box.displayName = "Box";

// Center component for centering content
interface CenterProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "none";
  axis?: "horizontal" | "vertical" | "both";
}

export const Center = forwardRef<HTMLDivElement, CenterProps>(
  (
    { children, className, maxWidth = "none", axis = "both", ...props },
    ref
  ) => {
    const maxWidthClasses = {
      xs: "max-w-xs",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      none: "",
    };

    const axisClasses = {
      horizontal: "justify-center",
      vertical: "items-center",
      both: "justify-center items-center",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          axisClasses[axis],
          maxWidth !== "none" && maxWidthClasses[maxWidth],
          maxWidth !== "none" && "mx-auto",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Center.displayName = "Center";

// Divider for visual separation
interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted" | "glass";
  spacing?: "none" | "sm" | "md" | "lg";
  label?: string;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      orientation = "horizontal",
      variant = "glass",
      spacing = "md",
      label,
      ...props
    },
    ref
  ) => {
    const spacingClasses = {
      none: "",
      sm: orientation === "horizontal" ? "my-4" : "mx-4",
      md: orientation === "horizontal" ? "my-6" : "mx-6",
      lg: orientation === "horizontal" ? "my-8" : "mx-8",
    };

    const variantClasses = {
      solid: "border-solid border-(--border)",
      dashed: "border-dashed border-(--border)",
      dotted: "border-dotted border-(--border)",
      glass: "border-solid border-(--glass-border-soft)",
    };

    const orientationClasses = {
      horizontal: "w-full border-t",
      vertical: "h-full border-l",
    };

    if (label && orientation === "horizontal") {
      return (
        <div
          ref={ref}
          className={cn(
            "relative flex items-center",
            spacingClasses[spacing],
            className
          )}
          {...props}
        >
          <div
            className={cn(
              "flex-1",
              orientationClasses[orientation],
              variantClasses[variant]
            )}
          />
          <span className="px-4 text-xs font-medium text-(--text-tertiary) uppercase tracking-[0.35em]">
            {label}
          </span>
          <div
            className={cn(
              "flex-1",
              orientationClasses[orientation],
              variantClasses[variant]
            )}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          orientationClasses[orientation],
          variantClasses[variant],
          spacingClasses[spacing],
          className
        )}
        role="separator"
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

// Aspect ratio container for media
interface AspectRatioProps {
  children: ReactNode;
  className?: string;
  ratio?: "1:1" | "4:3" | "16:9" | "21:9" | "3:2" | "2:3";
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ children, className, ratio = "16:9", ...props }, ref) => {
    const ratioClasses = {
      "1:1": "aspect-square",
      "4:3": "aspect-[4/3]",
      "16:9": "aspect-video",
      "21:9": "aspect-[21/9]",
      "3:2": "aspect-[3/2]",
      "2:3": "aspect-[2/3]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          ratioClasses[ratio],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AspectRatio.displayName = "AspectRatio";

// Visually hidden component for accessibility
interface VisuallyHiddenProps {
  children: ReactNode;
  className?: string;
}

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <span ref={ref} className={cn("sr-only", className)} {...props}>
        {children}
      </span>
    );
  }
);

VisuallyHidden.displayName = "VisuallyHidden";
