import React from "react";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showText?: boolean;
  subtitle?: string;
  className?: string;
}

export function Logo({
  size = "md",
  variant = "dark",
  showText = true,
  subtitle,
  className,
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-primary-500",
          {
            "h-8 w-8": size === "sm",
            "h-10 w-10": size === "md",
            "h-12 w-12": size === "lg",
          }
        )}
      >
        <Leaf
          className={cn("text-white", {
            "h-4 w-4": size === "sm",
            "h-5 w-5": size === "md",
            "h-6 w-6": size === "lg",
          })}
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span
            className={cn("font-bold leading-tight", {
              "text-sm": size === "sm",
              "text-base": size === "md",
              "text-lg": size === "lg",
              "text-white": variant === "light",
              "text-text-primary": variant === "dark",
            })}
          >
            AgriSmart
          </span>
          {subtitle && (
            <span
              className={cn("text-[10px] font-medium uppercase tracking-wider", {
                "text-primary-200": variant === "light",
                "text-text-muted": variant === "dark",
              })}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
