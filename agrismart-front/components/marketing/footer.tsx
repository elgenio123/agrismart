import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/contact" },
  ],
  services: [
    { label: "Drone Scanning", href: "/services" },
    { label: "AI Analysis", href: "/services" },
    { label: "Disease Detection", href: "/services" },
    { label: "Expert Reports", href: "/services" },
  ],
  resources: [
    { label: "Farmer Guide", href: "/how-it-works" },
    { label: "Pricing", href: "/services" },
    { label: "FAQ", href: "/contact" },
    { label: "Dashboard Login", href: "/login" },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="bg-slate-950 text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo size="md" variant="light" subtitle="Precision Agriculture" />
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-sm">
              AI-powered drone crop scanning and disease detection, helping
              farmers protect their crops with precision technology across
              Central Africa.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-slate-400">
              <a
                href="mailto:contact@agrsmart.com"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-primary-500" />
                contact@agrsmart.com
              </a>
              <a
                href="tel:+237600000000"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-primary-500" />
                +237 6 00 00 00 00
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary-500" />
                Douala, Cameroon
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Agrsmart. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
