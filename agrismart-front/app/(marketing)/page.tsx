"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Plane,
  Brain,
  ShieldCheck,
  BarChart3,
  Leaf,
  Clock,
  Users,
  CheckCircle2,
  Star,
  ArrowRight,
  Scan,
  FileCheck,
  TrendingUp,
  Zap,
  Globe,
  HeartHandshake,
} from "lucide-react";
import {
  AnimateIn,
  StaggerContainer,
  StaggerItem,
  HoverCard,
  fadeUp,
  fadeIn,
  slideInLeft,
  slideInRight,
} from "@/components/ui/motion";
import {
  Counter,
  Section,
  SectionHeading,
  FloatingShapes,
} from "@/components/marketing/shared";

/* ──────────────── Hero ──────────────── */
function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <FloatingShapes />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <AnimateIn variants={fadeUp} delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 border border-primary-500/20 px-4 py-1.5 text-xs font-semibold text-primary-400 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400 animate-pulse-soft" />
              Now operating across Cameroon
            </span>
          </AnimateIn>

          {/* Headline */}
          <AnimateIn variants={fadeUp} delay={0.2}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1]">
             See problems early
              <br />
              <span className="bg-gradient-to-r from-primary-400 via-emerald-400 to-primary-300 bg-clip-text text-transparent">
                harvest with confidence
              </span>
            </h1>
          </AnimateIn>

          {/* Subtitle */}
          <AnimateIn variants={fadeUp} delay={0.35}>
            <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              AgriSmart deploys professional drones with advanced AI to scan your
              banana plantations, detect diseases early, and deliver expert-validated
              reports all at a per-hectare cost you can afford.
            </p>
          </AnimateIn>

          {/* CTAs */}
          <AnimateIn variants={fadeUp} delay={0.5}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-primary-500/25 hover:bg-primary-600 transition-all hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                Request a Scan <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 px-7 py-3.5 text-sm font-medium text-slate-300 hover:border-slate-500 hover:text-white transition-all hover:bg-white/5"
              >
                See How It Works <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateIn>
        </div>

        {/* Floating stats cards */}
        <AnimateIn variants={fadeUp} delay={0.7}>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Flexible Service Size", value: 1, suffix: "ha+" },
              { label: "Diseases Detected", value: 12, suffix: "+" },
              { label: "Insight Delivery", value: 24, suffix: "-48h" },
              { label: "Accuracy Rate", value: 97, suffix: "%" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-4 sm:p-5"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  <Counter to={stat.value} suffix={stat.suffix} duration={2.5} />
                </div>
                <p className="mt-1 text-xs sm:text-sm text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

/* ──────────────── How It Works (Preview) ──────────────── */
function HowItWorksPreview() {
  const steps = [
    {
      icon: Scan,
      title: "Request a Scan",
      description:
        "Submit a scan request through our mobile app. Specify your farm location and crop details.",
    },
    {
      icon: Plane,
      title: "Drone Captures Data",
      description:
        "Our certified operators fly professional drones over your plantation to capture high-resolution imagery.",
    },
    {
      icon: Brain,
      title: "AI Analyzes & Experts Validate",
      description:
        "Our AI detects diseases instantly. Agronomists review and validate every diagnosis before delivery.",
    },
    {
      icon: FileCheck,
      title: "Get Your Report",
      description:
        "Receive a detailed report with disease maps, severity levels, and treatment recommendations.",
    },
  ];

  return (
    <Section>
      <SectionHeading
        tag="How It Works"
        title="From Request to Report in 48 Hours"
        description="A simple four-step process designed to give you actionable insights with minimal disruption."
      />

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {steps.map((step, i) => (
          <StaggerItem key={step.title}>
            <HoverCard className="relative rounded-2xl border border-border p-6 h-full bg-white group hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5 transition-all">
              {/* Step number */}
              <span className="absolute -top-3 left-6 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white shadow-md shadow-primary-500/30">
                {i + 1}
              </span>
              <div className="mt-2 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimateIn className="mt-12 text-center">
        <Link
          href="/how-it-works"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
        >
          Learn more about the process <ArrowRight className="h-4 w-4" />
        </Link>
      </AnimateIn>
    </Section>
  );
}

/* ──────────────── Services Overview ──────────────── */
function ServicesOverview() {
  const services = [
    {
      icon: Plane,
      title: "Professional Drone Scanning",
      description:
        "Our fleet of high-resolution multispectral drones covers large plantation areas efficiently, capturing data invisible to the human eye.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Brain,
      title: "AI Disease Detection",
      description:
        "Deep-learning models trained on thousands of banana crop images identify diseases with over 97% accuracy in real time.",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: ShieldCheck,
      title: "Expert Validation",
      description:
        "Every AI diagnosis is reviewed by certified agronomists before being delivered, ensuring precision and trust.",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: BarChart3,
      title: "Actionable Reports",
      description:
        "Comprehensive reports with disease maps, severity analysis, affected zones, and treatment plans you can act on immediately.",
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <Section className="bg-surface-secondary">
      <SectionHeading
        tag="Our Services"
        title="End-to-End Crop Protection"
        description="From aerial scanning to expert-validated reports — everything your plantation needs in one integrated service."
      />

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <StaggerItem key={service.title}>
            <HoverCard className="rounded-2xl bg-white border border-border p-8 h-full group hover:shadow-lg hover:border-primary-200 transition-all">
              <div
                className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${service.color} mb-5`}
              >
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {service.description}
              </p>
              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}

/* ──────────────── Why AgriSmart ──────────────── */
function WhyAgriSmart() {
  const benefits = [
    {
      icon: Zap,
      title: "Early Detection",
      description: "Catch diseases before they spread, saving up to 40% of potential crop loss.",
    },
    {
      icon: TrendingUp,
      title: "Higher Yields",
      description: "Farmers using our service see 25-35% higher yields through proactive management.",
    },
    {
      icon: Clock,
      title: "Fast Turnaround",
      description: "From scan request to full report in under 48 hours — time matters in agriculture.",
    },
    {
      icon: Globe,
      title: "No Tech Needed",
      description: "We handle all the technology. Farmers just request a scan from their phone.",
    },
    {
      icon: HeartHandshake,
      title: "Expert-Backed",
      description: "Every report is validated by certified agronomists, not just algorithms.",
    },
    {
      icon: Leaf,
      title: "Affordable Pricing",
      description: "Per-hectare pricing model makes professional scanning accessible to all farm sizes.",
    },
  ];

  return (
    <Section dark>
      <SectionHeading
        tag="Why Choose Us"
        title="Technology That Farmers Trust"
        description="We combine cutting-edge AI with local agricultural expertise to deliver results you can rely on."
        dark
      />

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((b) => (
          <StaggerItem key={b.title}>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/[0.08] transition-colors h-full">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/15 text-primary-400 mb-4">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1.5">
                {b.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {b.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}

/* ──────────────── Testimonials ──────────────── */
function Testimonials() {
  const testimonials = [
    {
      name: "Jean-Pierre Mbarga",
      role: "Banana Farmer, Moungo",
      quote:
        "AgriSmart detected Black Sigatoka on my plantation two weeks before it became visible. The early treatment saved over 3 hectares of crop.",
      rating: 5,
    },
    {
      name: "Claudine Eyinga",
      role: "Plantation Manager, Fako",
      quote:
        "The reports are incredibly detailed. We now make treatment decisions based on data, not guesswork. Our yield increased by 30% this season.",
      rating: 5,
    },
    {
      name: "Emmanuel Ngoua",
      role: "Cooperative Leader, Littoral",
      quote:
        "We enrolled 12 farms in our cooperative. AgriSmart scans all of them in a single week. The cost per hectare is very reasonable.",
      rating: 5,
    },
  ];

  return (
    <Section>
      <SectionHeading
        tag="Testimonials"
        title="What Farmers Are Saying"
        description="Real results from real farmers across Cameroon."
      />

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <StaggerItem key={t.name}>
            <HoverCard className="rounded-2xl border border-border bg-white p-6 sm:p-8 h-full flex flex-col">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <blockquote className="text-sm text-text-secondary leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-border-light">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-600 text-sm font-bold">
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {t.name}
                  </p>
                  <p className="text-xs text-text-muted">{t.role}</p>
                </div>
              </div>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}

/* ──────────────── CTA Banner ──────────────── */
function CtaBanner() {
  return (
    <Section className="bg-surface-secondary">
      <AnimateIn>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-500 p-10 sm:p-16 text-center">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Ready to Protect Your Plantation?
            </h2>
            <p className="mt-4 text-base text-primary-100 max-w-lg mx-auto">
              Join hundreds of farmers already using AgriSmart for early disease
              detection and higher yields.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary-700 shadow-xl hover:bg-primary-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <CheckCircle2 className="h-4 w-4" />
                Request Your First Scan
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </AnimateIn>
    </Section>
  );
}

/* ──────────────── Trusted Partners Bar ──────────────── */
function TrustBar() {
  return (
    <Section className="!py-14 bg-surface-secondary border-y border-border-light">
      <AnimateIn>
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-text-muted mb-8">
          Supporting agriculture across Cameroon
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-50">
          {[
            "Ministry of Agriculture",
            "IRAD Cameroon",
            "World Bank AgriTech",
            "FAO Central Africa",
            "AfDB Innovation",
          ].map((name) => (
            <span
              key={name}
              className="text-sm font-semibold text-text-secondary whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </AnimateIn>
    </Section>
  );
}

/* ──────────────── Page ──────────────── */
export default function LandingPage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorksPreview />
      <ServicesOverview />
      <WhyAgriSmart />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
