"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MarketingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            <Link href="/" aria-label="Agrsmart Home">
              <Logo size="md" variant={scrolled ? "dark" : "light"} />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative text-sm font-medium transition-colors",
                      scrolled
                        ? isActive
                          ? "text-primary-600"
                          : "text-text-secondary hover:text-text-primary"
                        : isActive
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary-500"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              {/* <Link
                href="/login"
                className={cn(
                  "text-sm font-medium transition-colors px-4 py-2 rounded-lg",
                  scrolled
                    ? "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                Log in
              </Link> */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 hover:bg-primary-600 transition-all hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className={cn(
                "md:hidden p-2 rounded-lg transition-colors cursor-pointer",
                scrolled ? "text-text-primary" : "text-white"
              )}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium py-3.5 border-b border-border-light transition-colors",
                    pathname === link.href
                      ? "text-primary-600"
                      : "text-text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="text-center py-3 text-sm font-medium text-text-secondary border border-border rounded-xl hover:bg-surface-secondary transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/contact"
                  className="text-center py-3 text-sm font-semibold text-white bg-primary-500 rounded-xl shadow-lg shadow-primary-500/25"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
