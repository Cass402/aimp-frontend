"use client";

import { ReactNode } from "react";
import { Breadcrumb } from "./breadcrumb";

interface PageLayoutProps {
  children: ReactNode;
  showBreadcrumb?: boolean;
}

export function PageLayout({
  children,
  showBreadcrumb = true,
}: PageLayoutProps) {
  return (
    <div className="w-full">
      {showBreadcrumb && (
        <div className="mb-4 sm:mb-6">
          <Breadcrumb />
        </div>
      )}
      {children}
    </div>
  );
}
