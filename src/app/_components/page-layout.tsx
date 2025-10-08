"use client";

import { ReactNode } from "react";
import { Breadcrumb } from "./breadcrumb";
import { Container } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-structure";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  showBreadcrumb?: boolean;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  header?: {
    title?: string;
    subtitle?: string;
    description?: string;
    category?: string;
    actions?: ReactNode;
    variant?: "default" | "hero" | "minimal";
  };
}

export function PageLayout({
  children,
  showBreadcrumb = true,
  containerSize = "xl",
  className,
  header,
}: PageLayoutProps) {
  return (
    <div className={cn("w-full", className)}>
      <Container size={containerSize} className="py-6 lg:py-8">
        {header ? (
          <PageHeader
            title={header.title}
            subtitle={header.subtitle}
            description={header.description}
            category={header.category}
            actions={header.actions}
            variant={header.variant}
            breadcrumb={showBreadcrumb ? <Breadcrumb /> : undefined}
          />
        ) : (
          showBreadcrumb && (
            <div className="mb-4 sm:mb-6">
              <Breadcrumb />
            </div>
          )
        )}
        {children}
      </Container>
    </div>
  );
}
