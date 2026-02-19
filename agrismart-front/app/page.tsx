import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── Navbar ─── */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Logo size="sm" />
          <nav className="hidden md:flex items-center gap-8">
            <a href="#process" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Process</a>
            <a href="#benefits" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Benefits</a>
            <a href="#pricing" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Pricing</a>
            <Link href="/login" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Log In</Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/40 to-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700 uppercase tracking-wide">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-500" />
              Next-Gen Agriculture
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              Precision Protection: From{" "}
              <span className="italic text-primary-500">Drone Flight</span> to AI
              Insight.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-text-secondary leading-relaxed">
              Our &quot;Drone to AI&quot; workflow converts autonomous field imagery into
              actionable health maps to protect your yield and optimize your
              operations.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
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
            </div>
          </div>

          {/* Hero image placeholder */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-200 to-primary-400 overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-[url('/hero-drone.jpg')] bg-cover bg-center" />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/90 backdrop-blur px-4 py-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                  <Cpu className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-text-muted font-semibold">Real-Time Analysis</p>
                  <p className="text-sm font-medium text-text-primary">Scan active in Sector 7-G</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trusted By ─── */}
      <section className="border-y border-border bg-surface-secondary py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted mb-6">
            Trusted by leading ag-tech firms worldwide
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-20 rounded bg-gray-200" />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pipeline ─── */}
      <section id="process" className="py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
            The Drone-to-AI Pipeline
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Plane, title: "Drone Capture", desc: "Autonomous drones scan fields using multispectral cameras." },
              { icon: Cloud, title: "Cloud Sync", desc: "Encrypted data is instantly uploaded to our secure AI core." },
              { icon: Cpu, title: "AI Analysis", desc: "Neural networks identify anomalies, pests, and nutrient deficits." },
              { icon: CheckSquare, title: "Action Map", desc: "Receive precise GPS coordinates for targeted treatment." },
            ].map((step) => (
              <div key={step.title} className="flex flex-col items-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-text-primary">{step.title}</h3>
                <p className="mt-2 text-sm text-text-secondary max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Benefits ─── */}
      <section id="benefits" className="bg-surface-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: Eye,
                title: "Early Detection",
                desc: "Catch blight, rust, and pest infestations up to 10 days before they are visible to the human eye. Prevent widespread crop failure before it starts.",
              },
              {
                icon: TrendingUp,
                title: "Reduced Losses",
                desc: "Save up to 30% of your total seasonal yield through targeted intervention strategies and real-time health monitoring across your entire acreage.",
              },
              {
                icon: Wallet,
                title: "Cost Savings",
                desc: "Minimize chemical usage and labor costs by spraying only exactly where needed. Reduce your environmental footprint while increasing ROI.",
              },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border border-border bg-white p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-text-primary">{benefit.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Smart Vision Feature ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-2xl bg-sidebar text-white">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 lg:p-14">
                <h2 className="text-3xl font-bold">Smart Vision in the Field</h2>
                <p className="mt-4 text-gray-300 leading-relaxed">
                  Our computer vision models are trained on over 10 million images
                  of crop variations. We don&apos;t just see a plant; we see its
                  health, history, and future potential.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Sub-millimeter pixel resolution",
                    "99.4% detection accuracy for common pests",
                    "Works in low-light and high-wind conditions",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <div className="h-5 w-5 rounded-full bg-primary-500 flex items-center justify-center shrink-0">
                        <CheckSquare className="h-3 w-3" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative min-h-[300px] bg-gradient-to-br from-primary-800 to-primary-900">
                <div className="absolute inset-0 bg-[url('/field-analysis.jpg')] bg-cover bg-center opacity-60" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-dashed border-white/50 px-4 py-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                    Identify: Wheat Rust
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl bg-gradient-to-r from-primary-50 to-primary-100 p-12 text-center">
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              Ready to secure your yield?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-text-secondary">
              Join over 2,500 farmers and agronomists using AgriScan AI to
              revolutionize their harvest.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg">Get Started Now</Button>
              </Link>
              <Button variant="secondary" size="lg">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo size="sm" />
              <p className="mt-3 text-xs text-text-muted leading-relaxed">
                Pioneering the future of precision agriculture through advanced
                computer vision and autonomous flight technology.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-3">Product</h4>
              <ul className="space-y-2">
                {["AI Analysis", "Drone Integration", "Custom Reporting", "API Access"].map((l) => (
                  <li key={l}><a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-3">Company</h4>
              <ul className="space-y-2">
                {["About Us", "Sustainability", "Careers", "Press Kit"].map((l) => (
                  <li key={l}><a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-3">Connect</h4>
              <div className="flex gap-3">
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-secondary text-text-secondary hover:bg-primary-50 hover:text-primary-600 transition-colors">
                  <Github className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-secondary text-text-secondary hover:bg-primary-50 hover:text-primary-600 transition-colors">
                  <Mail className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-secondary text-text-secondary hover:bg-primary-50 hover:text-primary-600 transition-colors">
                  <Share2 className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-6">
            <p className="text-xs text-text-muted">
              © 2024 AgriScan AI Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-xs text-text-muted hover:text-text-primary transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
