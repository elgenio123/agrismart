"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Smartphone,
  ClipboardCheck,
  CalendarCheck,
  Plane,
  Brain,
  UserCheck,
  FileCheck,
  Bell,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  AnimateIn,
  fadeUp,
} from "@/components/ui/motion";
import {
  Section,
  SectionHeading,
  FloatingShapes,
} from "@/components/marketing/shared";

/* ──────────────── Navbar background spacer ──────────────── */
function HiwHero() {
  return <div className="h-16 sm:h-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />;
}

/* ──────────────── Timeline ──────────────── */
function Timeline() {
  const steps = [
    {
      icon: Smartphone,
      title: "Submit Your Scan Request",
      description:
        "Open the Agrsmart mobile app and tap 'Request Scan'. Enter your farm location, approximate hectarage, and any specific concerns. You can also mark areas on the map where you've noticed issues.",
      details: [
        "Available on iOS & Android",
        "GPS auto-detection for farm location",
        "Secure photo upload for reference",
        "Instant cost estimate shown",
      ],
      timeframe: "Takes 2 minutes",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: ClipboardCheck,
      title: "Request Review & Approval",
      description:
        "Our operations team reviews your request within 2 hours. We verify the location, assess drone flight conditions, and confirm pricing. You receive a notification once approved with a scheduled date.",
      details: [
        "2-hour review guarantee",
        "Weather & airspace check",
        "Clear pricing confirmation",
        "Flexible rescheduling available",
      ],
      timeframe: "Within 2 hours",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: CalendarCheck,
      title: "Scheduling & Preparation",
      description:
        "A certified drone operator is assigned to your scan. They plan the optimal flight path for full coverage of your plantation. You're notified of the exact scan date and time window.",
      details: [
        "Assigned certified operator",
        "Optimized flight planning",
        "Date & time notification",
        "No on-site prep needed from you",
      ],
      timeframe: "Scheduled within 48h",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Plane,
      title: "Drone Data Capture",
      description:
        "Our operator arrives on-site with professional drone equipment. Multiple passes are flown at precise altitudes to capture high-resolution multispectral imagery across your entire plantation.",
      details: [
        "Multispectral + RGB cameras",
        "Sub-centimeter resolution",
        "Complete area coverage",
        "Up to 100 hectares per session",
      ],
      timeframe: "30–90 minutes on-site",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: Brain,
      title: "AI Analysis & Detection",
      description:
        "Captured imagery is processed through our deep learning pipeline. The AI analyzes every frame, detecting signs of disease, pest damage, and nutrient deficiencies with pixel-level precision.",
      details: [
        "200K+ training images",
        "97%+ detection accuracy",
        "Disease classification & severity",
        "Geo-referenced outputs",
      ],
      timeframe: "Automated, ~4 hours",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: UserCheck,
      title: "Expert Validation",
      description:
        "A certified agronomist reviews every AI diagnosis. They confirm findings, add treatment recommendations, and ensure the report meets Agrsmart's quality standards before delivery.",
      details: [
        "Human-in-the-loop quality check",
        "Treatment plan formulation",
        "Severity risk assessment",
        "Zero false positive guarantee",
      ],
      timeframe: "6–12 hours review",
      color: "from-teal-500 to-cyan-500",
    },
    {
      icon: FileCheck,
      title: "Report Delivery",
      description:
        "Your comprehensive report is delivered through the app and email. It includes disease maps, severity charts, affected zone calculations, and detailed treatment protocols.",
      details: [
        "Interactive disease maps",
        "PDF + digital formats",
        "Treatment action plans",
        "Downloadable data exports",
      ],
      timeframe: "Within 48h total",
      color: "from-primary-500 to-emerald-500",
    },
  ];

  return (
    <Section>
      <SectionHeading
        tag="The Process"
        title="Seven Steps to Healthier Crops"
        description="Every scan follows a rigorous process designed for accuracy, speed, and actionable results."
      />

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical timeline line */}
        <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-200 via-primary-300 to-primary-200 hidden sm:block" />

        <div className="space-y-12 sm:space-y-16">
          {steps.map((step, i) => (
            <AnimateIn key={step.title} delay={i * 0.05}>
              <div className="flex gap-6 sm:gap-10">
                {/* Timeline node */}
                <div className="hidden sm:flex flex-col items-center shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    className={`relative z-10 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-lg`}
                  >
                    <step.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </motion.div>
                </div>

                {/* Content card */}
                <div className="flex-1 rounded-2xl border border-border bg-white p-6 sm:p-8 hover:shadow-lg hover:border-primary-200 transition-all group">
                  {/* Mobile icon */}
                  <div
                    className={`sm:hidden flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-lg mb-4`}
                  >
                    <step.icon className="h-6 w-6" />
                  </div>

                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-xs font-semibold text-primary-500 uppercase tracking-wider">
                        Step {i + 1}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-text-primary mt-1">
                        {step.title}
                      </h3>
                    </div>
                    <span className="shrink-0 text-xs font-medium text-text-muted bg-surface-secondary rounded-full px-3 py-1 whitespace-nowrap">
                      {step.timeframe}
                    </span>
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed mb-5">
                    {step.description}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ──────────────── After the Scan ──────────────── */
function AfterScan() {
  return (
    <Section className="bg-surface-secondary">
      <div className="max-w-3xl mx-auto text-center">
        <AnimateIn>
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 mb-6">
            <Bell className="h-7 w-7" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            What Happens After?
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed max-w-xl mx-auto">
            Your report is just the beginning. Here&apos;s how we continue supporting you:
          </p>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Track Progress",
                description:
                  "View all past scans in your dashboard. Compare results over time to measure treatment effectiveness.",
              },
              {
                title: "Get Alerts",
                description:
                  "Receive proactive notifications when it's time for a follow-up scan or when seasonal risk factors increase.",
              },
              {
                title: "Expert Support",
                description:
                  "Reach out to your assigned agronomist for questions about your report or treatment adjustments.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white border border-border p-6 text-left"
              >
                <h3 className="text-base font-semibold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </Section>
  );
}

/* ──────────────── CTA ──────────────── */
function HiwCta() {
  return (
    <Section>
      <AnimateIn>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-500 p-10 sm:p-16 text-center">
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Ready to See It in Action?
            </h2>
            <p className="mt-4 text-base text-primary-100 max-w-lg mx-auto">
              Your first scan request takes just 2 minutes. We handle
              everything else.
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
                View Services & Pricing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </AnimateIn>
    </Section>
  );
}

/* ──────────────── Page ──────────────── */
export default function HowItWorksPage() {
  return (
    <>
      <HiwHero />
      <Timeline />
      <AfterScan />
      <HiwCta />
    </>
  );
}
