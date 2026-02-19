"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
        {
          "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm":
            variant === "primary",
          "bg-white text-text-primary border border-border hover:bg-surface-secondary":
            variant === "secondary",
          "border border-primary-500 text-primary-600 hover:bg-primary-50 bg-transparent":
            variant === "outline",
          "bg-transparent text-text-secondary hover:bg-surface-secondary hover:text-text-primary":
            variant === "ghost",
          "bg-danger text-white hover:bg-red-600": variant === "danger",
        },
        {
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-2.5 text-sm": size === "md",
          "px-6 py-3 text-base": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
