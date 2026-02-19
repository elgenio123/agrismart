"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Mail, Lock, User, Search } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: "mail" | "lock" | "user" | "search";
  error?: string;
  showPasswordToggle?: boolean;
}

const iconMap = {
  mail: Mail,
  lock: Lock,
  user: User,
  search: Search,
};

export function Input({
  label,
  icon,
  error,
  showPasswordToggle,
  className,
  type,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const Icon = icon ? iconMap[icon] : null;
  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-semibold text-text-primary">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
        )}
        <input
          type={inputType}
          className={cn(
            "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors",
            "focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none",
            Icon && "pl-10",
            showPasswordToggle && "pr-10",
            error && "border-danger focus:border-danger focus:ring-danger",
            className
          )}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}
