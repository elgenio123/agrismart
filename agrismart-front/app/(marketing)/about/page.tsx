"use client";

import React from "react";
import Link from "next/link";
import {
  Target,
  Eye,
  Lightbulb,
  Users,
  Plane,
  Brain,
  ShieldCheck,
  Globe,
  Award,
  CheckCircle2,
  ArrowRight,
  Leaf,
  Sprout,
  HeartHandshake,
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
  Counter,
  Section,
  SectionHeading,
  FloatingShapes,
} from "@/components/marketing/shared";

/* ──────────────── Navbar background spacer ──────────────── */
function AboutHero() {
  return <div className="h-16 sm:h-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />;
}

/* ──────────────── Mission & Vision ──────────────── */
function MissionVision() {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <AnimateIn variants={slideInLeft}>
          <div className="rounded-2xl border border-border bg-white p-8 sm:p-10 h-full">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 mb-5">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Our Mission
            </h2>
            <p className="text-text-secondary leading-relaxed">
              To empower every farmer in Central Africa with affordable,
              AI-powered crop scanning technology — enabling early disease
              detection, reducing crop losses, and increasing agricultural
              productivity through precision technology.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Make precision agriculture accessible to all farm sizes",
                "Reduce crop losses through early disease detection",
                "Bridge the gap between technology and traditional farming",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle2 className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        <AnimateIn variants={slideInRight}>
          <div className="rounded-2xl border border-border bg-white p-8 sm:p-10 h-full">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-5">
              <Eye className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Our Vision
            </h2>
            <p className="text-text-secondary leading-relaxed">
              A future where no farmer loses their harvest to preventable
              crop diseases. We envision a continent where technology and
              agriculture work hand in hand, where every plantation — large
              or small — has access to the same precision tools.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Become the leading agritech platform in Africa",
                "Expand to 10 countries by 2030",
                "Support 100,000+ farmers with AI-powered insights",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </Section>
  );
}

/* ──────────────── The Problem ──────────────── */
function TheProblem() {
  return (
    <Section className="bg-surface-secondary">
      <div className="max-w-3xl mx-auto text-center">
        <AnimateIn>
          <SectionHeading
            tag="The Challenge"
            title="Agriculture in Central Africa Faces Real Threats"
            description="Banana is a critical crop in Cameroon and the wider Central African region — but farmers face devastating losses from diseases that are difficult to detect early with the naked eye."
          />
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
            {[
              {
                stat: "40%",
                label: "Crop Loss",
                description: "Average loss from late disease detection in banana plantations across Central Africa",
              },
              {
                stat: "72%",
                label: "Undetected Early",
                description: "Percentage of plant diseases that show no visible signs until damage is advanced",
              },
              {
                stat: "3M+",
                label: "Farmers Affected",
                description: "Smallholder banana farmers in Cameroon alone who lack access to modern diagnostics",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-white border border-border p-6"
              >
                <div className="text-3xl font-bold text-danger mb-1">
                  {item.stat}
                </div>
                <div className="text-sm font-semibold text-text-primary mb-2">
                  {item.label}
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={0.3}>
          <div className="mt-10 rounded-2xl bg-primary-50 border border-primary-100 p-8">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-white mb-4">
              <Lightbulb className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">
              Our Solution
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xl mx-auto">
              By combining drone aerial imaging with deep learning AI and expert
              agronomist validation, we detect diseases weeks before they become
              visible — giving farmers time to act and save their crops.
            </p>
          </div>
        </AnimateIn>
      </div>
    </Section>
  );
}

/* ──────────────── Team ──────────────── */
function Team() {
  const team = [
    {
      name: "Dr. Thierry Onana",
      role: "CEO & Co-Founder",
      bio: "Former agricultural research lead at IRAD Cameroon. 15 years in tropical crop pathology and precision farming technology.",
      initials: "TO",
    },
    {
      name: "Sandrine Fotso",
      role: "CTO & Co-Founder",
      bio: "Computer vision PhD from University of Yaoundé I. Led AI teams at two African startups before co-founding AgriSmart.",
      initials: "SF",
    },
    {
      name: "Jean-Marc Elong",
      role: "Head of Drone Operations",
      bio: "Licensed commercial drone pilot with 5,000+ flight hours. Previously ran aerial survey operations across West Africa.",
      initials: "JE",
    },
    {
      name: "Dr. Alice Mboui",
      role: "Chief Agronomist",
      bio: "Specialized in banana pathology with 12 years of field experience. Leads our team of expert validators.",
      initials: "AM",
    },
    {
      name: "Patrick Ndjock",
      role: "Head of Field Operations",
      bio: "Agricultural engineer managing our network of drone operators across 6 regions in Cameroon.",
      initials: "PN",
    },
    {
      name: "Marie Nguemo",
      role: "Operations Director",
      bio: "10 years in operations management for agritech startups. Ensures seamless service delivery from request to report.",
      initials: "MN",
    },
  ];

  return (
    <Section>
      <SectionHeading
        tag="Our Team"
        title="Experts in Agriculture & Technology"
        description="A multidisciplinary team combining deep agricultural expertise with cutting-edge technology skills."
      />

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <StaggerItem key={member.name}>
            <HoverCard className="rounded-2xl border border-border bg-white p-6 h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-500 text-white font-bold text-lg">
                  {member.initials}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-text-primary">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary-600 font-medium">
                    {member.role}
                  </p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {member.bio}
              </p>
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}

/* ──────────────── Values ──────────────── */
function Values() {
  const values = [
    {
      icon: ShieldCheck,
      title: "Accuracy First",
      description: "Every diagnosis is validated by both AI and human experts. No shortcuts.",
    },
    {
      icon: HeartHandshake,
      title: "Farmer-Centric",
      description: "We build for real farmers. Simple interfaces, affordable pricing, real results.",
    },
    {
      icon: Globe,
      title: "Local Expertise",
      description: "Our team and agronomists are from the regions we serve. We understand the land.",
    },
    {
      icon: Sprout,
      title: "Sustainable Impact",
      description: "Technology that reduces waste, preserves crops, and supports food security.",
    },
  ];

  return (
    <Section dark>
      <SectionHeading
        tag="Our Values"
        title="What Drives Us"
        description="The principles that guide every decision we make."
        dark
      />

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v) => (
          <StaggerItem key={v.title}>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/[0.08] transition-colors h-full text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/15 text-primary-400 mb-4 mx-auto">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                {v.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {v.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Stats */}
      <AnimateIn delay={0.3}>
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: 850, suffix: "+", label: "Farmers Served" },
            { value: 12500, suffix: "+", label: "Hectares Scanned" },
            { value: 6, label: "Regions Covered" },
            { value: 97, suffix: "%", label: "Detection Accuracy" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">
                <Counter to={stat.value} suffix={stat.suffix ?? ""} duration={2} />
              </div>
              <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </AnimateIn>
    </Section>
  );
}

/* ──────────────── CTA ──────────────── */
function AboutCta() {
  return (
    <Section>
      <AnimateIn>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Join the Movement
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Whether you&apos;re a farmer looking to protect your crops, an
            investor interested in agritech, or a talented person who wants to
            make an impact — we&apos;d love to hear from you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-primary-500/25 hover:bg-primary-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              Explore Our Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </AnimateIn>
    </Section>
  );
}

/* ──────────────── Page ──────────────── */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <TheProblem />
      <Team />
      <Values />
      <AboutCta />
    </>
  );
}
