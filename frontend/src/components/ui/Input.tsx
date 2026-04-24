import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && <label className="text-ui-text text-[var(--color-text-primary)]">{label}</label>}
        <input
          ref={ref}
          className={`bg-white border border-[#dddddd] rounded px-3 py-1.5 text-body-regular text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[#097fe8] focus:ring-1 focus:ring-[#097fe8] transition-all disabled:opacity-50 disabled:bg-gray-50 ${
            error ? "border-[var(--color-warning)]" : ""
          } ${className}`}
          {...props}
        />
        {error && <span className="text-caption text-[var(--color-warning)]">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";
