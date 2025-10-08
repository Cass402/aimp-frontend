"use client";

import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

// ===========================================
// PAGE STRUCTURE: Semantic page building blocks for AIMP
// Follows PRD requirements for trust-first layouts and calm precision
// ===========================================

// Page header with consistent typography and spacing
interface PageHeaderProps {
  children?: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  category?: string;
  actions?: ReactNode;
  breadcrumb?: ReactNode;
  variant?: "default" | "hero" | "minimal";
}

export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(
  (
    {
      children,
      className,
      title,
      subtitle,
      description,
      category,
      actions,
      breadcrumb,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: "pb-6 border-b border-(--glass-border-soft)/50",
      hero: "pb-12 text-center",
      minimal: "pb-4",
    };

    return (
      <header
        ref={ref}
        className={cn("relative", variantClasses[variant], className)}
        {...props}
      >
        {breadcrumb && <div className="mb-4">{breadcrumb}</div>}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1 space-y-3">
            {category && (
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-(--text-tertiary)">
                {category}
              </p>
            )}

            {title && (
              <h1
                className={cn(
                  "font-semibold text-(--text-primary)",
                  variant === "hero"
                    ? "text-4xl lg:text-5xl"
                    : "text-2xl lg:text-3xl"
                )}
              >
                {title}
              </h1>
            )}

            {subtitle && (
              <h2 className="text-lg font-medium text-(--text-secondary)">
                {subtitle}
              </h2>
            )}

            {description && (
              <p className="text-sm text-(--text-secondary) max-w-3xl">
                {description}
              </p>
            )}
          </div>

          {actions && <div className="flex-shrink-0">{actions}</div>}
        </div>

        {children}
      </header>
    );
  }
);

PageHeader.displayName = "PageHeader";

// Content section with semantic structure
interface ContentSectionProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  variant?: "default" | "featured" | "compact";
  spacing?: "none" | "sm" | "md" | "lg";
}

export const ContentSection = forwardRef<HTMLElement, ContentSectionProps>(
  (
    {
      children,
      className,
      title,
      description,
      variant = "default",
      spacing = "md",
      ...props
    },
    ref
  ) => {
    const spacingClasses = {
      none: "",
      sm: "space-y-4",
      md: "space-y-6",
      lg: "space-y-8",
    };

    return (
      <section
        ref={ref}
        className={cn(spacingClasses[spacing], className)}
        {...props}
      >
        {(title || description) && (
          <header className="space-y-2">
            {title && (
              <h2
                className={cn(
                  "font-semibold text-(--text-primary)",
                  variant === "featured" ? "text-xl" : "text-lg"
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-(--text-secondary)">{description}</p>
            )}
          </header>
        )}
        {children}
      </section>
    );
  }
);

ContentSection.displayName = "ContentSection";

// Card grid for consistent card layouts
interface CardGridProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  variant?: "default" | "masonry";
}

export const CardGrid = forwardRef<HTMLDivElement, CardGridProps>(
  (
    {
      children,
      className,
      cols = 3,
      gap = "md",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const gapClasses = {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    };

    const colClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          colClasses[cols],
          gapClasses[gap],
          variant === "masonry" && "auto-rows-max",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardGrid.displayName = "CardGrid";

// Sidebar layout for complex interfaces
interface SidebarLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  className?: string;
  sidebarPosition?: "left" | "right";
  sidebarWidth?: "narrow" | "default" | "wide";
}

export const SidebarLayout = forwardRef<HTMLDivElement, SidebarLayoutProps>(
  (
    {
      children,
      sidebar,
      className,
      sidebarPosition = "left",
      sidebarWidth = "default",
      ...props
    },
    ref
  ) => {
    const widthClasses = {
      narrow: "w-64",
      default: "w-80",
      wide: "w-96",
    };

    const sidebarContent = (
      <aside
        className={cn(
          "flex-shrink-0 border-(--glass-border-soft)",
          widthClasses[sidebarWidth],
          sidebarPosition === "left" ? "border-r" : "border-l"
        )}
      >
        {sidebar}
      </aside>
    );

    return (
      <div ref={ref} className={cn("flex gap-8", className)} {...props}>
        {sidebarPosition === "left" && sidebarContent}
        <main className="min-w-0 flex-1">{children}</main>
        {sidebarPosition === "right" && sidebarContent}
      </div>
    );
  }
);

SidebarLayout.displayName = "SidebarLayout";

// Metric display for dashboard layouts
interface MetricGroupProps {
  children: ReactNode;
  className?: string;
  title?: string;
  cols?: 2 | 3 | 4 | 5;
  variant?: "cards" | "inline" | "compact";
}

export const MetricGroup = forwardRef<HTMLDivElement, MetricGroupProps>(
  (
    { children, className, title, cols = 3, variant = "cards", ...props },
    ref
  ) => {
    const colClasses = {
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    };

    const variantClasses = {
      cards: "gap-6",
      inline: "gap-4 auto-rows-min",
      compact: "gap-3",
    };

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {title && (
          <h3 className="text-sm font-medium text-(--text-secondary) uppercase tracking-[0.35em]">
            {title}
          </h3>
        )}
        <div className={cn("grid", colClasses[cols], variantClasses[variant])}>
          {children}
        </div>
      </div>
    );
  }
);

MetricGroup.displayName = "MetricGroup";

// Split layout for hero sections
interface SplitLayoutProps {
  children: ReactNode;
  className?: string;
  split?: "50/50" | "60/40" | "40/60" | "70/30" | "30/70";
  align?: "start" | "center" | "end";
  reverse?: boolean;
  gap?: "sm" | "md" | "lg" | "xl";
}

export const SplitLayout = forwardRef<HTMLDivElement, SplitLayoutProps>(
  (
    {
      children,
      className,
      split = "50/50",
      align = "center",
      reverse = false,
      gap = "lg",
      ...props
    },
    ref
  ) => {
    const splitClasses = {
      "50/50": "lg:grid-cols-2",
      "60/40": "lg:grid-cols-[3fr_2fr]",
      "40/60": "lg:grid-cols-[2fr_3fr]",
      "70/30": "lg:grid-cols-[7fr_3fr]",
      "30/70": "lg:grid-cols-[3fr_7fr]",
    };

    const gapClasses = {
      sm: "gap-6",
      md: "gap-8",
      lg: "gap-12",
      xl: "gap-16",
    };

    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1",
          splitClasses[split],
          gapClasses[gap],
          alignClasses[align],
          reverse && "lg:flex lg:flex-row-reverse",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SplitLayout.displayName = "SplitLayout";
