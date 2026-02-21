"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left — brand panel */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] flex-col justify-between bg-sidebar text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}
          />
        </div>
        <div className="relative z-10 p-10">
          <Logo variant="light" size="md" subtitle="Operations" />
        </div>
        <div className="relative z-10 p-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
              <Shield className="h-3.5 w-3.5" /> Internal Operations Platform
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight leading-tight">
              Precision Agriculture<br />Operations Control
            </h1>
            <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-sm">
              Manage scan requests, schedule drone missions, process AI analysis, and deliver crop health reports — all from one dashboard.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex items-center gap-4 rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="flex -space-x-2">
              {["MN", "KT", "AM"].map((initials, i) => (
                <div key={i} className="h-8 w-8 rounded-full bg-primary-500/80 flex items-center justify-center ring-2 ring-sidebar text-[10px] font-bold">
                  {initials}
                </div>
              ))}
            </div>
            <div className="text-xs text-white/50">
              <span className="text-white font-semibold">6 operators</span> active today
            </div>
          </motion.div>
        </div>
        <div className="relative z-10 p-10 text-xs text-white/30">
          &copy; 2026 AgriSmart. All rights reserved.
        </div>
      </div>

      {/* Right — form */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="w-full max-w-sm space-y-8"
        >
          <div className="lg:hidden">
            <Logo size="md" subtitle="Operations" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-text-primary tracking-tight">Sign in</h2>
            <p className="mt-1 text-sm text-text-secondary">Access the operations dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <Input label="Email" icon="mail" type="email" placeholder="you@AgriSmart.com" defaultValue="marie@AgriSmart.com" />
            <Input label="Password" icon="lock" type="password" showPasswordToggle placeholder="••••••••" defaultValue="password" />
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-text-secondary cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-border text-primary-500 focus:ring-primary-500" />
                Remember me
              </label>
              <button type="button" className="text-primary-600 font-medium hover:text-primary-700 transition-colors cursor-pointer">Forgot password?</button>
            </div>
            <Button type="submit" loading={loading} className="w-full" size="lg">
              Sign in <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-center text-xs text-text-muted">
            Authorized personnel only. Contact admin for access.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
