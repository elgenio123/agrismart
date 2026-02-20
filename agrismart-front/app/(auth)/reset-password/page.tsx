"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw, Check } from "lucide-react";
import { motion } from "framer-motion";

function getPasswordStrength(password: string) {
  const checks = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  const score = Object.values(checks).filter(Boolean).length;
  let label = "Weak";
  let color = "bg-danger";
  if (score >= 4) { label = "Strong"; color = "bg-primary-500"; }
  else if (score >= 3) { label = "Medium"; color = "bg-warning"; }
  return { score, label, color, checks };
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to password update API
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border bg-white px-6 py-3">
        <Logo size="sm" />
        <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
          Support
        </a>
      </header>

      {/* Form */}
      <div className="flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-lg rounded-2xl border border-border bg-white p-8 shadow-xl shadow-gray-200/50 ring-1 ring-black/[0.03]"
        >
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">
            Create New Password
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Set a strong password to protect your agricultural data and
            analytics.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <Input
              label="New Password"
              type="password"
              showPasswordToggle
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Strength indicator */}
            {password && (
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Security Strength
                  </span>
                  <span
                    className={`text-xs font-bold uppercase ${
                      strength.score >= 4
                        ? "text-primary-600"
                        : strength.score >= 3
                        ? "text-warning"
                        : "text-danger"
                    }`}
                  >
                    {strength.label}
                  </span>
                </div>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        i <= strength.score ? strength.color : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "minLength", label: "Min. 8 characters" },
                    { key: "uppercase", label: "Uppercase letter" },
                    { key: "number", label: "Include number" },
                    { key: "special", label: "Special character" },
                  ].map((rule) => (
                    <div
                      key={rule.key}
                      className="flex items-center gap-1.5 text-xs"
                    >
                      <div
                        className={`h-4 w-4 rounded-full flex items-center justify-center ${
                          strength.checks[rule.key as keyof typeof strength.checks]
                            ? "bg-primary-500 text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        <Check className="h-2.5 w-2.5" />
                      </div>
                      <span
                        className={
                          strength.checks[rule.key as keyof typeof strength.checks]
                            ? "text-primary-600 font-medium"
                            : "text-text-muted"
                        }
                      >
                        {rule.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Input
              label="Confirm New Password"
              type="password"
              showPasswordToggle
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button type="submit" size="lg" className="w-full">
              <RotateCcw className="h-4 w-4" />
              Update Password
            </Button>
          </form>

          <div className="mt-5 text-center">
            <Link
              href="/login"
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors inline-flex items-center gap-1"
            >
              ← Back to Sign In
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="pb-8 text-center">
        <div className="flex items-center justify-center gap-4 text-xs text-text-muted">
          <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:text-text-primary transition-colors">Security</a>
        </div>
        <p className="mt-2 text-xs text-text-muted">© 2026 AgriScan AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
