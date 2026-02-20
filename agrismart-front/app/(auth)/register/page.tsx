"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Github, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function getPasswordStrength(password: string) {
  let score = 0;
  const checks = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  if (checks.minLength) score++;
  if (checks.uppercase) score++;
  if (checks.number) score++;
  if (checks.special) score++;

  let label = "Weak";
  let color = "bg-danger";
  if (score >= 4) {
    label = "Strong";
    color = "bg-primary-500";
  } else if (score >= 3) {
    label = "Medium strength";
    color = "bg-warning";
  }

  return { score, label, color, checks };
}

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to auth API
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex min-h-screen">
      {/* ─── Left: Hero Panel ─── */}
      <div className="relative hidden w-1/2 lg:flex flex-col justify-between bg-gradient-to-b from-gray-800 to-gray-900 p-10 overflow-hidden">
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

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10">
          <Logo variant="light" size="md" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative z-10 max-w-md">
          <h2 className="text-3xl font-extrabold italic text-white leading-snug">
            Cultivating the Future of Farming
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed text-lg">
            Harness the power of artificial intelligence to maximize your
            harvest and minimize environmental impact.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="relative z-10">
          <div className="inline-flex items-center gap-3 rounded-full bg-black/40 px-4 py-2 backdrop-blur">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-white/20 bg-primary-600"
                />
              ))}
            </div>
            <span className="text-sm text-white font-medium">
              Trusted by 2,000+ modern farmers
            </span>
          </div>
        </motion.div>
      </div>

      {/* ─── Right: Register Form ─── */}
      <div className="flex flex-1 flex-col bg-white">
        {/* Top right link */}
        <div className="flex justify-end px-8 py-4">
          <p className="text-sm text-text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-text-primary hover:text-primary-600">
              Log in
            </Link>
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-md"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600 mb-5 ring-1 ring-primary-100">
              <Sparkles className="h-3 w-3" />
              Create Account
            </div>
            <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
              Join AgriScan AI
            </h1>
            <p className="mt-2 text-text-secondary">
              Start optimizing your crop yields with AI-driven insights.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <Input
                label="Full Name"
                icon="user"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <Input
                label="Email Address"
                icon="mail"
                type="email"
                placeholder="name@farm.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div>
                <Input
                  label="Password"
                  icon="lock"
                  type="password"
                  showPasswordToggle
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-text-muted font-medium">
                        Security: {strength.label}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            i <= strength.score ? strength.color : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Input
                label="Confirm Password"
                icon="lock"
                type="password"
                showPasswordToggle
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <label className="flex items-start gap-2 text-sm text-text-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border accent-primary-500"
                />
                <span>
                  I agree to the{" "}
                  <a href="#" className="text-primary-600 hover:underline">Terms of Service</a>{" "}
                  and{" "}
                  <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>.
                </span>
              </label>

              <Button type="submit" size="lg" className="w-full">
                Create Account →
              </Button>
            </form>

            {/* Social register */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Or register with
                  </span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="secondary" className="w-full">
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </Button>
                <Button variant="secondary" className="w-full">
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              </div>
            </div>

            <p className="mt-8 text-center text-xs text-text-muted">
              © 2026 AgriScan AI Inc. Precision farming for a sustainable
              planet.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
