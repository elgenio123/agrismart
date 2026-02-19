"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to auth API
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex min-h-screen">
      {/* ─── Left: Hero Panel ─── */}
      <div className="relative hidden w-1/2 lg:flex flex-col justify-between bg-gradient-to-b from-gray-800 to-gray-900 p-10">
        {/* Background image overlay */}
        <div className="absolute inset-0 bg-[url('/auth-bg.jpg')] bg-cover bg-center opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />

        {/* Content */}
        <div className="relative z-10">
          <Logo variant="light" size="md" />
        </div>
        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-bold text-white leading-snug">
            The future of farming, powered by intelligence.
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            Harness satellite and drone analytics to maximize your crop yields
            and minimize environmental impact.
          </p>
        </div>
        <div className="relative z-10" />
      </div>

      {/* ─── Right: Login Form ─── */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-text-primary">
            Login to AgriScan AI
          </h1>
          <p className="mt-2 text-text-secondary">
            Enter your credentials to access your farm analytics.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Input
              label="Email Address"
              icon="mail"
              type="email"
              placeholder="name@farm.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              icon="lock"
              type="password"
              placeholder="Enter your password"
              showPasswordToggle
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-border accent-primary-500"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-text-secondary">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary-600 hover:text-primary-700"
            >
              Sign up for free
            </Link>
          </p>

          <div className="mt-8 flex justify-center gap-6 text-xs text-text-muted">
            <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-text-primary transition-colors">Help Center</a>
          </div>
        </div>
      </div>
    </div>
  );
}
