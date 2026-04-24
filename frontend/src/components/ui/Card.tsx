import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  featured?: boolean;
}

export function Card({ className = "", featured = false, children, ...props }: CardProps) {
  return (
    <div
      className={`bg-white border border-[var(--color-border-subtle)] transition-shadow duration-200 hover:shadow-[var(--shadow-card-hover)] ${
        featured ? "rounded-[16px]" : "rounded-xl"
      } shadow-[var(--shadow-card)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
