"use client";

import React, { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

// ===========================================
// LAYOUT SYSTEM: Structured containers for AIMP glassmorphic design
// Following PRD specifications for trust-first layouts and calm precision
// ===========================================

// Main container with max-width and responsive padding
interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  as?: React.ElementType;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, size = "xl", as = "div", ...props }, ref) => {
    const sizeClasses = {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-none",
    };

    if (as === "div") {
      return (
        <div
          ref={ref}
          className={cn(
            "mx-auto w-full px-4 sm:px-6 lg:px-8",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    // For other elements, create without ref
    const Element = as as keyof React.JSX.IntrinsicElements;
    return React.createElement(
      Element,
      {
        className: cn(
          "mx-auto w-full px-4 sm:px-6 lg:px-8",
          sizeClasses[size],
          className
        ),
        ...props,
      },
      children
    );
  }
);

Container.displayName = "Container";

// Grid system with trust-building layout patterns
interface GridProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  responsive?: boolean;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    { children, className, cols = 1, gap = "md", responsive = true, ...props },
    ref
  ) => {
    const gapClasses = {
      xs: "gap-2",
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
      xl: "gap-12",
    };

    const colClasses = responsive
      ? {
          1: "grid-cols-1",
          2: "grid-cols-1 md:grid-cols-2",
          3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
          6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
          12: "grid-cols-4 md:grid-cols-6 lg:grid-cols-12",
        }
      : {
          1: "grid-cols-1",
          2: "grid-cols-2",
          3: "grid-cols-3",
          4: "grid-cols-4",
          6: "grid-cols-6",
          12: "grid-cols-12",
        };

    return (
      <div
        ref={ref}
        className={cn("grid", colClasses[cols], gapClasses[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

// Flex utilities for neural layout patterns
interface FlexProps {
  children: ReactNode;
  className?: string;
  direction?: "row" | "col";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      children,
      className,
      direction = "row",
      align = "start",
      justify = "start",
      wrap = false,
      gap = "md",
      ...props
    },
    ref
  ) => {
    const gapClasses = {
      xs: "gap-2",
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
      xl: "gap-12",
    };

    const directionClasses = {
      row: "flex-row",
      col: "flex-col",
    };

    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    };

    const justifyClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          directionClasses[direction],
          alignClasses[align],
          justifyClasses[justify],
          gapClasses[gap],
          wrap && "flex-wrap",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";

// Section wrapper with semantic structure
interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  itemProp?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, spacing = "lg", ...props }, ref) => {
    const spacingClasses = {
      none: "",
      sm: "py-8",
      md: "py-12",
      lg: "py-16",
      xl: "py-24",
    };

    return (
      <section
        ref={ref}
        className={cn(spacingClasses[spacing], className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

// Stack for consistent vertical rhythm
interface StackProps {
  children: ReactNode;
  className?: string;
  space?: "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ children, className, space = "md", align = "stretch", ...props }, ref) => {
    const spaceClasses = {
      xs: "space-y-2",
      sm: "space-y-4",
      md: "space-y-6",
      lg: "space-y-8",
      xl: "space-y-12",
    };

    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          spaceClasses[space],
          alignClasses[align],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Stack.displayName = "Stack";

// Inline layout for horizontal groupings
interface InlineProps {
  children: ReactNode;
  className?: string;
  space?: "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "baseline";
  wrap?: boolean;
}

export const Inline = forwardRef<HTMLDivElement, InlineProps>(
  (
    {
      children,
      className,
      space = "md",
      align = "center",
      wrap = false,
      ...props
    },
    ref
  ) => {
    const spaceClasses = {
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
      xl: "gap-6",
    };

    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      baseline: "items-baseline",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          spaceClasses[space],
          alignClasses[align],
          wrap && "flex-wrap",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Inline.displayName = "Inline";
