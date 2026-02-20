import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
  size?: "sm" | "md";
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "neutral",
  size = "sm",
  dot = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide transition-colors",
        {
          "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50": variant === "success",
          "bg-amber-50 text-amber-700 ring-1 ring-amber-200/50": variant === "warning",
          "bg-red-50 text-red-700 ring-1 ring-red-200/50": variant === "danger",
          "bg-blue-50 text-blue-700 ring-1 ring-blue-200/50": variant === "info",
          "bg-gray-100 text-gray-600 ring-1 ring-gray-200/50": variant === "neutral",
        },
        {
          "px-2.5 py-0.5 text-[11px]": size === "sm",
          "px-3 py-1 text-xs": size === "md",
        },
        className
      )}
    >
      {dot && (
        <span className={cn("h-1.5 w-1.5 rounded-full", {
          "bg-emerald-500": variant === "success",
          "bg-amber-500": variant === "warning",
          "bg-red-500": variant === "danger",
          "bg-blue-500": variant === "info",
          "bg-gray-400": variant === "neutral",
        })} />
      )}
      {children}
    </span>
  );
}
