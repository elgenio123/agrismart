"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import {
  AnimateIn,
  StaggerContainer,
  StaggerItem,
  fadeUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/components/ui/motion";
import { motion } from "framer-motion";
import {
  Upload,
  LayoutDashboard,
  Cloud,
  Cpu,
  CheckSquare,
  Eye,
  TrendingUp,
  Wallet,
  Github,
  Mail,
  Share2,
  Plane,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  ChevronRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* ─── Navbar ─── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
        className="sticky top-0 z-50 border-b border-border/60 bg-white/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Logo size="sm" />
          <nav className="hidden md:flex items-center gap-8">
            <a href="#process" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200">Process</a>
            <a href="#benefits" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200">Benefits</a>
            <a href="#features" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200">Features</a>
            <Link href="/login" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200">Log In</Link>
            <Link href="/register">
              <Button size="sm">
                Get Started
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden min-h-[calc(100vh-64px)]">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-primary-50/20 to-white" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary-200/30 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary-100/40 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28 lg:min-h-[calc(100vh-64px)]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-100/80 px-4 py-1.5 text-xs font-semibold text-primary-700 uppercase tracking-wider ring-1 ring-primary-200/50"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Next-Gen Agriculture
            </motion.div>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-[3.5rem]">
              Precision Protection: From{" "}
              <span className="relative">
                <span className="gradient-text italic">Drone Flight</span>
              </span>{" "}
              to AI Insight.
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 max-w-lg text-lg text-text-secondary leading-relaxed"
            >
              Our &quot;Drone to AI&quot; workflow converts autonomous field imagery into
              actionable health maps to protect your yield and optimize your
              operations.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link href="/dashboard">
                <Button size="lg">
                  <LayoutDashboard className="h-4 w-4" />
                  View Dashboard
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg">
                  <Upload className="h-4 w-4" />
                  Upload Images
                </Button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[
                  "bg-primary-500",
                  "bg-amber-500",
                  "bg-blue-500",
                  "bg-violet-500",
                ].map((bg, i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-full ${bg} border-2 border-white shadow-sm flex items-center justify-center`}
                  >
                    <span className="text-[10px] font-bold text-white">
                      {["JM", "SA", "RK", "LP"][i]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold text-text-primary">2,500+</span>{" "}
                <span className="text-text-secondary">farmers trust AgriScan AI</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 overflow-hidden shadow-2xl shadow-primary-500/20 ring-1 ring-white/10">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=75&auto=format&fit=crop"
                alt="Aerial view of green agricultural fields"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-70"
                loading="eager"
              />
              {/* Floating grid overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), 
                                  linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                backgroundSize: "40px 40px"
              }} />

              {/* Status card floating */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/95 backdrop-blur-md px-5 py-4 flex items-center gap-4 shadow-lg"
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-sm">
                  <Cpu className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-text-muted font-bold">Real-Time Analysis</p>
                  <p className="text-sm font-semibold text-text-primary">Scan active in Sector 7-G</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary-500" />
                  </span>
                  <span className="text-xs font-semibold text-primary-600">Live</span>
                </div>
              </motion.div>

              {/* Top-right stat chip */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.4 }}
                className="absolute top-5 right-5 rounded-lg bg-white/90 backdrop-blur-md px-3 py-2 shadow-md"
              >
                <p className="text-[10px] text-text-muted font-semibold">Health Score</p>
                <p className="text-lg font-bold text-primary-600">94.8%</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Trusted By ─── */}
      <AnimateIn variants={fadeIn}>
        <section className="border-y border-border/60 bg-white py-10">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-8">
              Trusted by leading ag-tech firms worldwide
            </p>
            <div className="flex items-center justify-center gap-10 flex-wrap opacity-40">
              {["AgriCorp", "FarmOS", "CropAI", "FieldNet", "GreenTech"].map((name) => (
                <div key={name} className="text-lg font-bold text-gray-400 tracking-wider">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimateIn>

      {/* ─── Pipeline ─── */}
      <section id="process" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimateIn className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600 mb-3">How It Works</p>
            <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl tracking-tight">
              The Drone-to-AI Pipeline
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              Four seamless steps from field capture to actionable intelligence, fully automated and GPS-precise.
            </p>
          </AnimateIn>

          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" staggerAmount={0.12}>
            {[
              { icon: Plane, title: "Drone Capture", desc: "Autonomous drones scan fields using multispectral cameras.", step: "01" },
              { icon: Cloud, title: "Cloud Sync", desc: "Encrypted data is instantly uploaded to our secure AI core.", step: "02" },
              { icon: Cpu, title: "AI Analysis", desc: "Neural networks identify anomalies, pests, and nutrient deficits.", step: "03" },
              { icon: CheckSquare, title: "Action Map", desc: "Receive precise GPS coordinates for targeted treatment.", step: "04" },
            ].map((step) => (
              <StaggerItem key={step.title}>
                <div className="group relative flex flex-col items-center text-center p-6 rounded-2xl border border-transparent hover:border-border hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="absolute top-4 right-4 text-[40px] font-black text-primary-50 group-hover:text-primary-100 transition-colors select-none">
                    {step.step}
                  </div>
                  <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-text-primary">{step.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary max-w-xs leading-relaxed">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── Benefits ─── */}
      <section id="benefits" className="relative bg-surface-secondary py-24 overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100/40 rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-6">
          <AnimateIn className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600 mb-3">Why AgriScan</p>
            <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl tracking-tight">
              Protect Your Investment
            </h2>
          </AnimateIn>

          <StaggerContainer className="grid gap-6 sm:grid-cols-3" staggerAmount={0.1}>
            {[
              {
                icon: Eye,
                title: "Early Detection",
                desc: "Catch blight, rust, and pest infestations up to 10 days before they are visible to the human eye. Prevent widespread crop failure before it starts.",
                stat: "10 days",
                statLabel: "earlier detection",
              },
              {
                icon: TrendingUp,
                title: "Reduced Losses",
                desc: "Save up to 30% of your total seasonal yield through targeted intervention strategies and real-time health monitoring across your entire acreage.",
                stat: "30%",
                statLabel: "yield saved",
              },
              {
                icon: Wallet,
                title: "Cost Savings",
                desc: "Minimize chemical usage and labor costs by spraying only exactly where needed. Reduce your environmental footprint while increasing ROI.",
                stat: "45%",
                statLabel: "cost reduction",
              },
            ].map((benefit) => (
              <StaggerItem key={benefit.title}>
                <div className="group h-full rounded-2xl border border-border bg-white p-7 hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">{benefit.desc}</p>
                  <div className="mt-5 pt-5 border-t border-border-light">
                    <span className="text-2xl font-extrabold gradient-text">{benefit.stat}</span>
                    <span className="ml-2 text-xs text-text-muted font-medium">{benefit.statLabel}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── Smart Vision Feature ─── */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimateIn>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sidebar via-[#142640] to-[#0c1a2e] text-white shadow-2xl">
              <div className="grid lg:grid-cols-2">
                <div className="p-10 lg:p-16">
                  <AnimateIn variants={slideInLeft}>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-6 ring-1 ring-white/10">
                      <Zap className="h-3 w-3 text-primary-400" />
                      Core Technology
                    </div>
                    <h2 className="text-3xl font-extrabold lg:text-4xl leading-tight">Smart Vision in the Field</h2>
                    <p className="mt-5 text-gray-300 leading-relaxed text-lg">
                      Our computer vision models are trained on over 10 million images
                      of crop variations. We don&apos;t just see a plant; we see its
                      health, history, and future potential.
                    </p>
                    <ul className="mt-8 space-y-4">
                      {[
                        { text: "Sub-millimeter pixel resolution", icon: Shield },
                        { text: "99.4% detection accuracy for common pests", icon: CheckSquare },
                        { text: "Works in low-light and high-wind conditions", icon: Zap },
                      ].map((item) => (
                        <li key={item.text} className="flex items-center gap-3 text-sm">
                          <div className="h-8 w-8 rounded-lg bg-primary-500/20 flex items-center justify-center shrink-0 ring-1 ring-primary-500/30">
                            <item.icon className="h-4 w-4 text-primary-400" />
                          </div>
                          <span className="text-gray-200">{item.text}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Link href="/register">
                        <Button size="lg" className="bg-white text-sidebar hover:bg-gray-100">
                          Try It Now
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </AnimateIn>
                </div>

                <AnimateIn variants={slideInRight} className="relative min-h-[350px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-800/80 to-primary-900">
                    <img
                      src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=75&auto=format&fit=crop"
                      alt="Aerial view of agricultural fields"
                      className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                      loading="lazy"
                    />
                  </div>
                  {/* Scan animation overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="rounded-xl border-2 border-dashed border-primary-400/60 px-8 py-4 backdrop-blur-sm bg-white/5"
                      >
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-300">
                          Scanning...
                        </p>
                        <p className="text-lg font-bold text-white mt-1">Wheat Rust Detected</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                          <span className="text-xs text-red-300 font-medium">Confidence: 97.3%</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </AnimateIn>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ─── Stats band ─── */}
      <AnimateIn>
        <section className="bg-primary-500 py-14">
          <StaggerContainer className="mx-auto max-w-5xl px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center" staggerAmount={0.08}>
            {[
              { value: "2,500+", label: "Active Farmers" },
              { value: "1.2M", label: "Scans Processed" },
              { value: "99.4%", label: "Detection Accuracy" },
              { value: "45 sec", label: "Avg. Analysis Time" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div>
                  <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-primary-100 font-medium">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </AnimateIn>

      {/* ─── CTA ─── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimateIn variants={scaleIn}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-50 via-primary-100/50 to-white p-14 text-center shadow-lg ring-1 ring-primary-200/30">
              {/* Decorative circles */}
              <div className="absolute -top-16 -left-16 h-48 w-48 bg-primary-200/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-16 -right-16 h-48 w-48 bg-primary-200/30 rounded-full blur-2xl" />

              <div className="relative">
                <h2 className="text-3xl font-extrabold text-text-primary sm:text-4xl tracking-tight">
                  Ready to secure your yield?
                </h2>
                <p className="mx-auto mt-4 max-w-md text-text-secondary text-lg">
                  Join over 2,500 farmers and agronomists using AgriScan AI to
                  revolutionize their harvest.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link href="/register">
                    <Button size="lg">
                      Get Started Now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="secondary" size="lg">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border bg-white py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo size="sm" />
              <p className="mt-4 text-sm text-text-muted leading-relaxed">
                Pioneering the future of precision agriculture through advanced
                computer vision and autonomous flight technology.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-text-primary mb-4">Product</h4>
              <ul className="space-y-2.5">
                {["AI Analysis", "Drone Integration", "Custom Reporting", "API Access"].map((l) => (
                  <li key={l}><a href="#" className="text-sm text-text-secondary hover:text-primary-600 transition-colors duration-200">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-text-primary mb-4">Company</h4>
              <ul className="space-y-2.5">
                {["About Us", "Sustainability", "Careers", "Press Kit"].map((l) => (
                  <li key={l}><a href="#" className="text-sm text-text-secondary hover:text-primary-600 transition-colors duration-200">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-text-primary mb-4">Connect</h4>
              <div className="flex gap-3">
                {[Github, Mail, Share2].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-secondary text-text-secondary hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 hover:shadow-sm"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-8">
            <p className="text-xs text-text-muted">
              © 2026 AgriScan AI Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors duration-200">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
