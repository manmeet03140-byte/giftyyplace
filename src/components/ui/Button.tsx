"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "premium";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  className,
  disabled,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden cursor-pointer";

  const variants = {
    primary:
      "bg-[var(--color-gold)] text-[var(--color-charcoal)] hover:bg-[var(--color-gold-dark)] focus-visible:outline-[var(--color-gold)] shadow-md hover:shadow-lg",
    secondary:
      "border-2 border-[var(--color-gold)] text-[var(--color-gold)] bg-transparent hover:bg-[var(--color-gold)] hover:text-[var(--color-charcoal)] focus-visible:outline-[var(--color-gold)]",
    ghost:
      "text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)]/5 focus-visible:outline-[var(--color-charcoal)]",
    premium:
      "bg-gradient-to-r from-[var(--color-gold-dark)] via-[var(--color-gold)] to-[var(--color-gold-light)] text-[var(--color-charcoal)] shadow-[var(--shadow-gold)] hover:shadow-[var(--shadow-glow)] focus-visible:outline-[var(--color-gold)]",
  };

  const sizes = {
    sm: "px-5 py-2 text-sm gap-1.5",
    md: "px-7 py-3 text-base gap-2",
    lg: "px-10 py-4 text-lg gap-2.5",
  };

  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { scale: 1.04, y: -1 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.97 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {/* Shimmer overlay for premium variant */}
      {variant === "premium" && (
        <span className="absolute inset-0 shimmer pointer-events-none" />
      )}

      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Loading…
        </span>
      ) : (
        <span className="relative z-10">{children}</span>
      )}
    </motion.button>
  );
}
