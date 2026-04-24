import React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  isLoading?: boolean;
}

export function Button({
  className = "",
  variant = "primary",
  isLoading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded transition-all duration-200 text-ui-text focus:outline-none focus:ring-2 focus:ring-[#097fe8] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:scale-95 px-4 py-2 hover:scale-[1.02]",
    secondary: "bg-[rgba(0,0,0,0.05)] text-[var(--color-text-primary)] hover:scale-[1.02] px-4 py-2",
    ghost: "bg-transparent text-[var(--color-text-primary)] hover:underline px-4 py-2"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
