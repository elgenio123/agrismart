"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to password reset API
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary-50/30 to-white px-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-3">
          <Logo size="lg" />
        </div>
        <p className="text-sm text-text-secondary">
          Precision Agriculture Powered by AI
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-lg border border-border">
        {/* Green header */}
        <div className="flex items-center justify-center bg-gradient-to-r from-primary-50 to-primary-100 py-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
            <RotateCcw className="h-6 w-6 text-primary-500" />
          </div>
        </div>

        <div className="p-8">
          {!submitted ? (
            <>
              <h1 className="text-center text-2xl font-bold text-text-primary">
                Reset Your Password
              </h1>
              <p className="mt-2 text-center text-sm text-text-secondary">
                Enter the email address associated with your AgriScan AI
                account, and we&apos;ll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <Input
                  label="Email Address"
                  icon="mail"
                  type="email"
                  placeholder="e.g., farmer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" size="lg" className="w-full">
                  Send Reset Link →
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-50">
                <svg className="h-7 w-7 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-text-primary">Check your email</h2>
              <p className="mt-2 text-sm text-text-secondary">
                We&apos;ve sent a password reset link to <strong>{email}</strong>.
                Please check your inbox.
              </p>
            </div>
          )}

          <div className="mt-6 border-t border-border pt-4 text-center">
            <Link
              href="/login"
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors inline-flex items-center gap-1"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>

      {/* Footer help */}
      <p className="mt-8 text-xs text-text-muted">
        Need help?{" "}
        <a href="#" className="font-semibold text-primary-600 hover:underline uppercase tracking-wider">
          Contact Support
        </a>
      </p>
    </div>
  );
}
