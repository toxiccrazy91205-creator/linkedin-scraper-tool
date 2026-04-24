import React from "react";

export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] text-badge whitespace-nowrap ${className}`}>
      {children}
    </span>
  );
}
