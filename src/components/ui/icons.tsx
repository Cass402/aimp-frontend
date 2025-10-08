import React from "react";
import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
  size?: number;
}

// Base icon wrapper with consistent styling
const IconBase: React.FC<{
  children: React.ReactNode;
  className?: string;
  size?: number;
}> = ({ children, className, size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={cn("text-current", className)}
    aria-hidden="true"
  >
    {children}
  </svg>
);

// Lightning/Energy icon (replaces ⚡)
export const Lightning: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
  </IconBase>
);

// Lock/Security icon (replaces 🔒)
export const Lock: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <rect
      x="3"
      y="11"
      width="18"
      height="11"
      rx="2"
      ry="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle
      cx="12"
      cy="7"
      r="4"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </IconBase>
);

// Balance/Scale icon (replaces ⚖️)
export const Balance: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <line
      x1="12"
      y1="2"
      x2="12"
      y2="22"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M8 6h8" stroke="currentColor" strokeWidth="2" />
    <path d="M6 10l6-6 6 6" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M3 18h18" stroke="currentColor" strokeWidth="2" />
  </IconBase>
);

// Chart/Analytics icon (replaces 📊)
export const Chart: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <line
      x1="18"
      y1="20"
      x2="18"
      y2="10"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="12"
      y1="20"
      x2="12"
      y2="4"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2" />
  </IconBase>
);

// Shield/Protection icon (replaces 🛡️)
export const Shield: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M12 2l8 3v7c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l8-3z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </IconBase>
);

// Users/People icon (replaces 👥)
export const Users: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle
      cx="9"
      cy="7"
      r="4"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M23 21v-2a4 4 0 0 0-3-3.87"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M16 3.13a4 4 0 0 1 0 7.75"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </IconBase>
);

// Search/Magnifier icon (replaces 🔍)
export const Search: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <circle
      cx="11"
      cy="11"
      r="8"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
  </IconBase>
);

// Clipboard/Copy icon (replaces 📋)
export const Clipboard: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <rect
      x="8"
      y="2"
      width="8"
      height="4"
      rx="1"
      ry="1"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </IconBase>
);

// Check/Checkmark icon (replaces ✓)
export const Check: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <polyline
      points="20,6 9,17 4,12"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </IconBase>
);

// Plug/Connection icon (replaces 🔌)
export const Plug: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M12 1v6" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 7a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1a4 4 0 0 1 4-4z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path d="M8 21v-5" stroke="currentColor" strokeWidth="2" />
    <path d="M16 21v-5" stroke="currentColor" strokeWidth="2" />
  </IconBase>
);

// Home icon (replaces 🏠)
export const Home: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <polyline
      points="9,22 9,12 15,12 15,22"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </IconBase>
);

// Alert/Warning icon (replaces ⚠️)
export const Alert: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <line
      x1="12"
      y1="9"
      x2="12"
      y2="13"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="12"
      y1="17"
      x2="12.01"
      y2="17"
      stroke="currentColor"
      strokeWidth="2"
    />
  </IconBase>
);

// Question/Help icon (replaces ❓)
export const Question: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <line
      x1="12"
      y1="17"
      x2="12.01"
      y2="17"
      stroke="currentColor"
      strokeWidth="2"
    />
  </IconBase>
);

// Menu/Hamburger icon (replaces ☰)
export const Menu: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M4 6h16M4 12h16M4 18h16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </IconBase>
);

// Info/Information icon (replaces ℹ️)
export const Info: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M12 16v-4M12 8h.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </IconBase>
);

// Bell/Notification icon (replaces 🔔)
export const Bell: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M13.73 21a2 2 0 0 1-3.46 0"
      stroke="currentColor"
      strokeWidth="2"
    />
  </IconBase>
);
