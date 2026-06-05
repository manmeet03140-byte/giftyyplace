"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Gift, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

/* ── Animation Variants ──────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

/* ── Floating Decorative Element ─────────────────────────── */

function FloatingElement({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 0.8, duration: 0.6, ease: "backOut" }}
      className={className}
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 5 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ── Stats Badge ─────────────────────────────────────────── */

function StatsBadge({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={scaleInVariants}
      className="flex flex-col items-center px-5 py-3"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 1.2 }}
        className="text-2xl md:text-3xl font-bold gradient-text-gold font-[family-name:var(--font-heading)]"
      >
        {value}
      </motion.span>
      <span className="text-xs md:text-sm text-[var(--color-ivory)]/60 mt-0.5">
        {label}
      </span>
    </motion.div>
  );
}

/* ── Hero Section Component ──────────────────────────────── */

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Background Image with Parallax ──────────────── */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 -top-[10%] -bottom-[10%]"
      >
        <Image
          src="/hero-bg.png"
          alt="Luxury gift hamper arrangement"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* ── Gradient Overlay ────────────────────────────── */}
      <div className="absolute inset-0 gradient-hero-overlay" />

      {/* ── Grain Texture ───────────────────────────────── */}
      <div className="absolute inset-0 grain" />

      {/* ── Floating Decorative Elements ────────────────── */}
      <FloatingElement
        className="absolute top-[15%] left-[8%] hidden lg:block"
        delay={0}
      >
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-gold)]/10 backdrop-blur-sm border border-[var(--color-gold)]/20 flex items-center justify-center">
          <Gift className="w-7 h-7 text-[var(--color-gold)]" />
        </div>
      </FloatingElement>

      <FloatingElement
        className="absolute top-[25%] right-[10%] hidden lg:block"
        delay={1}
      >
        <div className="w-14 h-14 rounded-full bg-[var(--color-rose)]/10 backdrop-blur-sm border border-[var(--color-rose)]/20 flex items-center justify-center">
          <Star className="w-6 h-6 text-[var(--color-rose)]" />
        </div>
      </FloatingElement>

      <FloatingElement
        className="absolute bottom-[25%] left-[12%] hidden lg:block"
        delay={1.5}
      >
        <div className="w-12 h-12 rounded-xl bg-[var(--color-gold)]/10 backdrop-blur-sm border border-[var(--color-gold)]/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-[var(--color-gold-light)]" />
        </div>
      </FloatingElement>

      <FloatingElement
        className="absolute bottom-[30%] right-[6%] hidden lg:block"
        delay={2}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-gold)]/20 to-[var(--color-rose)]/20 backdrop-blur-sm border border-white/10" />
      </FloatingElement>

      {/* ── Ambient Light Orbs ──────────────────────────── */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--color-gold)]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[var(--color-rose)]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Content ─────────────────────────────────────── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 container-premium text-center py-32 md:py-40"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Tagline */}
          <motion.div variants={fadeUpVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-dark text-[var(--color-gold)] text-sm font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Handcrafted with Love
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUpVariants}
            className="text-[var(--color-ivory)] mb-6 leading-[1.1]"
          >
            Gift Moments That{" "}
            <span className="relative inline-block">
              <span className="gradient-text-gold">Sparkle</span>
              <motion.span
                className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-rose)] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              />
            </span>
            <br />
            <span className="text-[var(--color-ivory)]/90">Forever</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariants}
            className="text-lg md:text-xl text-[var(--color-ivory)]/65 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Discover exquisitely curated gift hampers or build your own custom
            creation. From artisan chocolates to personalized keepsakes — make
            every occasion unforgettable.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/collections">
              <Button variant="premium" size="lg">
                Explore Collections
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <Link href="/build">
              <Button
                variant="secondary"
                size="lg"
                className="border-[var(--color-ivory)]/30 text-[var(--color-ivory)] hover:bg-[var(--color-ivory)]/10 hover:text-[var(--color-ivory)]"
              >
                <Sparkles className="w-5 h-5 mr-1" />
                Build Your Hamper
              </Button>
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={fadeUpVariants}
            className="inline-flex items-center rounded-2xl glass-dark px-2 py-1 divide-x divide-white/10"
          >
            <StatsBadge value="5K+" label="Happy Customers" delay={0} />
            <StatsBadge value="200+" label="Curated Hampers" delay={0.1} />
            <StatsBadge value="4.9★" label="Customer Rating" delay={0.2} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[var(--color-ivory)]/40 tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-[var(--color-ivory)]/20 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-1.5 bg-[var(--color-gold)] rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
