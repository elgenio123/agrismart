"use client";

import React from "react";
import Link from "next/link";
import {
  Plane,
  Brain,
  ShieldCheck,
  BarChart3,
  Camera,
  Cpu,
  Microscope,
  FileText,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Layers,
  Zap,
  MapPin,
} from "lucide-react";
import {
  AnimateIn,
  StaggerContainer,
  StaggerItem,
  HoverCard,
  fadeUp,
  slideInLeft,
  slideInRight,
} from "@/components/ui/motion";
import {
  Section,
  SectionHeading,
  FloatingShapes,
} from "@/components/marketing/shared";

/* ──────────────── Navbar background spacer ──────────────── */
function ServicesHero() {
  return <div className="h-16 sm:h-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />;
}

/* ──────────────── Core Services ──────────────── */
function CoreServices() {
  const services = [
    {
      icon: Camera,
      gradient: "from-blue-500 to-cyan-500",
      title: "Drone Scanning",
      subtitle: "High-Resolution Aerial Imaging",
      description:
        "Our fleet of professional drones equipped with multispectral and RGB cameras capture detailed crop imagery across your entire plantation. We deploy certified operators who handle all flight planning, execution, and data collection.",
      features: [
        "Multispectral & RGB imaging",
        "Up to 100 hectares per day",
        "Sub-centimeter resolution",
        "NDVI & vegetation indices",
        "No equipment needed from you",
      ],
    },
    {
      icon: Cpu,
      gradient: "from-purple-500 to-violet-500",
      title: "AI Analysis",
      subtitle: "Deep Learning Disease Detection",
      description:
        "Our proprietary AI models, trained on over 200,000 labelled banana crop images, analyze drone data in real time. The system detects and classifies diseases, pest damage, and nutrient deficiencies with over 97% accuracy.",
      features: [
        "97%+ detection accuracy",
        "Black Sigatoka detection",
        "Bunchy Top Virus identification",
        "Weevil damage assessment",
        "Panama Disease monitoring",
      ],
    },
    {
      icon: Microscope,
      gradient: "from-emerald-500 to-green-500",
      title: "Expert Validation",
      subtitle: "Agronomist-Reviewed Diagnostics",
      description:
        "Every AI diagnosis is reviewed and validated by certified agronomists with deep expertise in tropical crop pathology. This human-in-the-loop approach ensures zero false positives reach your reports.",
      features: [
        "Certified agronomist review",
        "Zero false positive policy",
        "Treatment recommendations",
        "Severity classification",
        "Local expertise integration",
      ],
    },
    {
      icon: FileText,
      gradient: "from-amber-500 to-orange-500",
      title: "Detailed Reporting",
      subtitle: "Actionable Intelligence Delivered",
      description:
        "Receive comprehensive reports with geo-referenced disease maps, severity charts, affected area calculations, and personalized treatment protocols. Reports are delivered digitally within 48 hours of scanning.",
      features: [
        "Geo-referenced disease maps",
        "Severity & progression charts",
        "Treatment action plans",
        "PDF & digital formats",
        "Historical trend tracking",
      ],
    },
  ];

  return (
    <Section>
      <SectionHeading
        tag="What We Offer"
        title="Four Pillars of Crop Intelligence"
        description="Each service is designed to work seamlessly together, giving you a complete picture of your plantation's health."
      />

      <div className="space-y-16 lg:space-y-24">
        {services.map((service, i) => {
          const isReversed = i % 2 === 1;
          return (
            <div
              key={service.title}
              className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 lg:gap-16 items-center`}
            >
              {/* Visual */}
              <AnimateIn
                variants={isReversed ? slideInRight : slideInLeft}
                className="flex-1 w-full"
              >
                <div
                  className={`relative rounded-3xl bg-gradient-to-br ${service.gradient} p-px`}
                >
                  <div className="rounded-3xl bg-slate-950 p-8 sm:p-12">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                        <service.icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {service.title}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-sm text-slate-300"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary-400 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimateIn>

              {/* Text */}
              <AnimateIn
                variants={isReversed ? slideInLeft : slideInRight}
                className="flex-1"
              >
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${service.gradient} text-white text-sm font-bold mb-4`}
                >
                  {i + 1}
                </span>
                <h3 className="text-2xl font-bold text-text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {service.description}
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Get started <ArrowRight className="h-4 w-4" />
                </Link>
              </AnimateIn>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ──────────────── Pricing Model ──────────────── */
function PricingModel() {
  const tiers = [
    {
      name: "Single Scan",
      price: "15,000",
      unit: "per hectare",
      description: "Perfect for first-time users or one-time assessments.",
      features: [
        "Full drone scan",
        "AI disease detection",
        "Expert validation",
        "Digital report (PDF)",
        "48-hour delivery",
      ],
      cta: "Request a Scan",
      highlighted: false,
    },
    {
      name: "Seasonal Plan",
      price: "10,000",
      unit: "per hectare / scan",
      description: "Monthly scans throughout the growing season. Best value.",
      features: [
        "Everything in Single Scan",
        "4 scans per season",
        "Trend analysis & tracking",
        "Priority scheduling",
        "Dedicated agronomist",
        "Phone support",
      ],
      cta: "Start Seasonal Plan",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      unit: "for large operations",
      description: "For cooperatives and large plantation operators.",
      features: [
        "Everything in Seasonal",
        "Unlimited hectares",
        "Weekly scanning available",
        "API data access",
        "Custom reporting",
        "On-site support",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <Section className="bg-surface-secondary">
      <SectionHeading
        tag="Pricing"
        title="Simple, Transparent Pricing"
        description="Pay per hectare. No hidden fees. No equipment to buy. Cancel anytime."
      />

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {tiers.map((tier) => (
          <StaggerItem key={tier.name}>
            <HoverCard
              className={`relative rounded-2xl p-8 h-full flex flex-col ${
                tier.highlighted
                  ? "bg-gradient-to-b from-primary-500 to-primary-600 text-white shadow-xl shadow-primary-500/20 ring-2 ring-primary-400"
                  : "bg-white border border-border"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-primary-600 text-xs font-bold px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}
              <h3
                className={`text-lg font-bold ${tier.highlighted ? "text-white" : "text-text-primary"}`}
              >
                {tier.name}
              </h3>
              <div className="mt-4 mb-2">
                <span
                  className={`text-4xl font-bold ${tier.highlighted ? "text-white" : "text-text-primary"}`}
                >
                  {tier.price === "Custom" ? "" : "XAF "}
                  {tier.price}
                </span>
              </div>
              <p
                className={`text-sm mb-6 ${tier.highlighted ? "text-primary-100" : "text-text-muted"}`}
              >
                {tier.unit}
              </p>
              <p
                className={`text-sm mb-6 leading-relaxed ${tier.highlighted ? "text-primary-100" : "text-text-secondary"}`}
              >
                {tier.description}
              </p>
              <ul className="space-y-3 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2
                      className={`h-4 w-4 mt-0.5 shrink-0 ${tier.highlighted ? "text-primary-200" : "text-primary-500"}`}
                    />
                    <span
                      className={
                        tier.highlighted ? "text-white/90" : "text-text-secondary"
                      }
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  tier.highlighted
                    ? "bg-white text-primary-700 shadow-lg hover:bg-primary-50"
                    : "bg-primary-500 text-white shadow-lg shadow-primary-500/20 hover:bg-primary-600"
                }`}
              >
                {tier.cta} <ChevronRight className="h-4 w-4" />
              </Link>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}

/* ──────────────── Technology Stack ──────────────── */
function TechStack() {
  const techs = [
    {
      icon: Plane,
      title: "Professional Drones",
      description:
        "DJI Matrice series with multispectral sensors for agriculture-grade data capture.",
    },
    {
      icon: Layers,
      title: "Multispectral Imaging",
      description:
        "5-band sensors capturing visible + near-infrared for comprehensive vegetation analysis.",
    },
    {
      icon: Brain,
      title: "Deep Learning Models",
      description:
        "Custom CNNs trained on 200K+ annotated banana crop images for real-time inference.",
    },
    {
      icon: Zap,
      title: "Edge Processing",
      description:
        "On-device AI processing for instant field-level detection before cloud validation.",
    },
    {
      icon: MapPin,
      title: "GIS Integration",
      description:
        "Geo-referenced outputs compatible with major mapping and farm management platforms.",
    },
    {
      icon: ShieldCheck,
      title: "Data Security",
      description:
        "End-to-end encryption and GDPR-compliant data handling for full farmer privacy.",
    },
  ];

  return (
    <Section dark>
      <SectionHeading
        tag="Technology"
        title="Built on Proven Technology"
        description="Our tech stack combines the best in drone hardware, AI research, and agricultural science."
        dark
      />

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {techs.map((t) => (
          <StaggerItem key={t.title}>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/[0.08] transition-colors h-full">
              <t.icon className="h-6 w-6 text-primary-400 mb-4" />
              <h3 className="text-base font-semibold text-white mb-2">
                {t.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}

/* ──────────────── CTA ──────────────── */
function ServicesCta() {
  return (
    <Section>
      <AnimateIn>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Let&apos;s get started
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Whether you manage 2 hectares or 2,000 — we have a plan for you.
            Request your first scan today and see the difference precision
            agriculture makes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-primary-500/25 hover:bg-primary-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <CheckCircle2 className="h-4 w-4" />
              Request a Scan
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              See How It Works <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </AnimateIn>
    </Section>
  );
}

/* ──────────────── Page ──────────────── */
export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <CoreServices />
      <TechStack />
      <PricingModel />
      <ServicesCta />
    </>
  );
}
