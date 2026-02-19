import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: "success" | "warning" | "danger" | "primary";
  size?: "sm" | "md";
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  variant = "primary",
  size = "sm",
  className,
}: ProgressBarProps) {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      className={cn(
        "w-full rounded-full bg-gray-200 overflow-hidden",
        { "h-2": size === "sm", "h-3": size === "md" },
        className
      )}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500", {
          "bg-primary-500": variant === "primary",
          "bg-success": variant === "success",
          "bg-warning": variant === "warning",
          "bg-danger": variant === "danger",
        })}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
