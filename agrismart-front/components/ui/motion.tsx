"use client";

import React from "react";
import { motion, type Variants, type HTMLMotionProps } from "framer-motion";

/* ── Shared easing presets ── */
const ease = [0.25, 0.1, 0.25, 1] as const;
const easeOut = [0, 0, 0.2, 1] as const;

/* ── Reusable variant sets ── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

/* ── Container for staggering children ── */
export const stagger = (staggerAmount = 0.08, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: staggerAmount, delayChildren },
  },
});

/* ── Animate In View wrapper ── */
interface AnimateInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
}

export function AnimateIn({
  children,
  variants = fadeUp,
  delay = 0,
  className,
  ...props
}: AnimateInProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ── Page transition wrapper ── */
export function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: easeOut as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger container ── */
export function StaggerContainer({
  children,
  className,
  staggerAmount = 0.08,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  staggerAmount?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={stagger(staggerAmount, delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger child item ── */
export function StaggerItem({
  children,
  className,
  variants = fadeUp,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Hover lift card ── */
export function HoverCard({
  children,
  className,
  lift = -4,
}: {
  children: React.ReactNode;
  className?: string;
  lift?: number;
}) {
  return (
    <motion.div
      whileHover={{ y: lift, transition: { duration: 0.2 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Number counter ── */
export function AnimatedCounter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease }}
    >
      {value}{suffix}
    </motion.span>
  );
}
