"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

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
      <div className="relative hidden w-1/2 lg:flex flex-col justify-between bg-gradient-to-b from-gray-800 to-gray-900 p-10 overflow-hidden">
        {/* Background image overlay */}
        <img
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=70&auto=format&fit=crop"
          alt="Golden wheat field at sunset"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }} />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <Logo variant="light" size="md" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 max-w-md"
        >
          <h2 className="text-3xl font-extrabold text-white leading-snug">
            The future of farming, powered by intelligence.
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed text-lg">
            Harness satellite and drone analytics to maximize your crop yields
            and minimize environmental impact.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 flex items-center gap-3"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full border-2 border-white/20 bg-primary-600 shadow-sm"
              />
            ))}
          </div>
          <span className="text-sm text-gray-300">
            <strong className="text-white">2,500+</strong> farmers trust us
          </span>
        </motion.div>
      </div>

      {/* ─── Right: Login Form ─── */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600 mb-6 ring-1 ring-primary-100">
            <Sparkles className="h-3 w-3" />
            Welcome Back
          </div>
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
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
              <label className="flex items-center gap-2.5 text-sm text-text-secondary cursor-pointer group">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-border accent-primary-500"
                />
                <span className="group-hover:text-text-primary transition-colors">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
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
              className="font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              Sign up for free
            </Link>
          </p>

          <div className="mt-8 flex justify-center gap-6 text-xs text-text-muted">
            <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-text-primary transition-colors">Help Center</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
