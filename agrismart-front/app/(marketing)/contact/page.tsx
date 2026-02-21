"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Loader2,
} from "lucide-react";
import {
  AnimateIn,
  StaggerContainer,
  StaggerItem,
  fadeUp,
} from "@/components/ui/motion";
import {
  Section,
  SectionHeading,
  FloatingShapes,
} from "@/components/marketing/shared";

/* ──────────────── Navbar background spacer ──────────────── */
function ContactHero() {
  return <div className="h-16 sm:h-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />;
}

/* ──────────────── Contact Form ──────────────── */
function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    farmSize: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate async submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setFormState("success");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
        {/* Form */}
        <div className="lg:col-span-3">
          <AnimateIn>
            <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold text-text-primary mb-1">
                Send Us a Message
              </h2>
              <p className="text-sm text-text-muted mb-6">
                Fill in the form below and we&apos;ll get back to you within 24
                hours.
              </p>

              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center"
                  >
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-500 mb-4">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-text-secondary max-w-sm mx-auto mb-6">
                      Thank you for reaching out. Our team will review your
                      message and respond within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setFormState("idle");
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          subject: "",
                          farmSize: "",
                          message: "",
                        });
                      }}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Jean-Pierre Mbarga"
                          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+237 6XX XXX XXX"
                          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1.5">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Select a topic</option>
                          <option value="scan-request">
                            Request a Scan
                          </option>
                          <option value="pricing">Pricing Inquiry</option>
                          <option value="partnership">
                            Partnership / Cooperative
                          </option>
                          <option value="support">Technical Support</option>
                          <option value="careers">Careers</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1.5">
                        Farm Size (hectares)
                      </label>
                      <input
                        type="text"
                        name="farmSize"
                        value={formData.farmSize}
                        onChange={handleChange}
                        placeholder="e.g. 25"
                        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1.5">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your plantation and what you need..."
                        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-primary-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 hover:bg-primary-600 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                    >
                      {formState === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </AnimateIn>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-2">
          <StaggerContainer className="space-y-5">
            {[
              {
                icon: Mail,
                title: "Email",
                value: "contact@AgriSmart.com",
                href: "mailto:contact@AgriSmart.com",
                description: "For general inquiries and support",
              },
              {
                icon: Phone,
                title: "Phone",
                value: "+237 6 00 00 00 00",
                href: "tel:+237600000000",
                description: "Mon – Fri, 8AM – 6PM (WAT)",
              },
              {
                icon: MapPin,
                title: "Office",
                value: "Douala, Cameroon",
                description: "Akwa Business District, Rue de la Joie",
              },
              {
                icon: Clock,
                title: "Response Time",
                value: "Within 24 hours",
                description: "We respond to all inquiries quickly",
              },
            ].map((info) => (
              <StaggerItem key={info.title}>
                <div className="rounded-2xl border border-border bg-white p-5 hover:shadow-md hover:border-primary-200 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 shrink-0">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">
                        {info.title}
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm text-primary-600 font-medium hover:text-primary-700 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-text-primary">
                          {info.value}
                        </p>
                      )}
                      <p className="text-xs text-text-muted mt-0.5">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </Section>
  );
}

/* ──────────────── FAQ ──────────────── */
function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left cursor-pointer group"
      >
        <span className="text-sm sm:text-base font-medium text-text-primary pr-4 group-hover:text-primary-600 transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-text-muted" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-text-secondary leading-relaxed pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Faq() {
  const faqs = [
    {
      question: "How much does a scan cost?",
      answer:
        "Our pricing starts at XAF 15,000 per hectare for a single scan. We offer discounted seasonal plans at XAF 10,000 per hectare per scan. Enterprise pricing is available for large operations and cooperatives. There are no hidden fees or equipment costs.",
    },
    {
      question: "Do I need to buy or own a drone?",
      answer:
        "No. AgriSmart owns and operates all drones. We deploy certified drone operators to your farm. You don't need any equipment or technical knowledge — just request a scan from your phone.",
    },
    {
      question: "How long does the process take?",
      answer:
        "From request to report delivery, the entire process takes under 48 hours. The actual drone scan takes 30–90 minutes depending on farm size. AI analysis is automated and takes about 4 hours. Expert validation adds 6–12 hours.",
    },
    {
      question: "What diseases can you detect?",
      answer:
        "Our AI models are specifically trained to detect common banana crop diseases including Black Sigatoka, Banana Bunchy Top Virus, Panama Disease, Banana Weevil damage, Banana Streak Virus, and nematode damage. We continuously train our models on new data.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We currently operate across 6 regions in Cameroon: Littoral, Sud-Ouest, Centre, Ouest, Sud, and Est. We're actively expanding to additional regions and plan to enter neighboring countries by 2027.",
    },
    {
      question: "How accurate is the AI detection?",
      answer:
        "Our AI models achieve over 97% accuracy in laboratory benchmarks. Additionally, every AI diagnosis is reviewed by a certified agronomist before delivery, ensuring zero false positives in your final report.",
    },
    {
      question: "Can I use AgriSmart for crops other than banana?",
      answer:
        "Currently, our AI models are optimized for banana crop diseases. We're developing models for cocoa, coffee, and plantain, which will be available in future updates. Contact us if you're interested in early access.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply fill out the contact form above, call us, or download the AgriSmart mobile app. Create an account, submit your first scan request, and we'll take care of the rest. Your first report will be in your hands within 48 hours.",
    },
  ];

  return (
    <Section className="bg-surface-secondary">
      <SectionHeading
        tag="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about our service."
      />

      <div className="max-w-3xl mx-auto">
        <AnimateIn>
          <div className="rounded-2xl bg-white border border-border p-6 sm:p-8">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} {...faq} />
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div className="mt-10 text-center">
            <p className="text-sm text-text-secondary mb-4">
              Still have questions? We&apos;re happy to help.
            </p>
            <a
              href="mailto:contact@AgriSmart.com"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Mail className="h-4 w-4" /> Email us directly{" "}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </AnimateIn>
      </div>
    </Section>
  );
}

/* ──────────────── Page ──────────────── */
export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <Faq />
    </>
  );
}
