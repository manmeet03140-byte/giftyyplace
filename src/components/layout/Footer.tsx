"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Gift,
  Globe,
  MessageCircle,
  AtSign,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
} from "lucide-react";

const footerLinks = {
  shop: [
    { label: "All Hampers", href: "/collections" },
    { label: "Build Your Own", href: "/build" },
    { label: "Best Sellers", href: "/collections?filter=best-sellers" },
    { label: "New Arrivals", href: "/collections?filter=new" },
    { label: "Gift Cards", href: "/gift-cards" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Corporate Gifting", href: "/corporate" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: MessageCircle, href: "#", label: "Chat" },
  { icon: AtSign, href: "#", label: "Email" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export function Footer() {
  const pathname = usePathname();
  const isAuthOrAdminPage = pathname?.startsWith("/login") || pathname?.startsWith("/admin");
  if (isAuthOrAdminPage) return null;

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="relative bg-[var(--color-charcoal)] text-[var(--color-ivory)] overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-gold)]/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[var(--color-rose)]/3 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Newsletter Section ──────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="container-premium py-16 border-b border-white/10"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="relative z-10 text-white drop-shadow-md text-2xl md:text-3xl font-[family-name:var(--font-heading)] mb-3">
            Stay in the <span className="gradient-text-gold">Loop</span>
          </h3>
          <p className="text-[var(--color-ivory)]/50 mb-8 text-sm md:text-base">
            Be the first to know about new collections, exclusive deals, and
            gifting inspiration.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-[var(--color-ivory)] placeholder:text-white/30 text-sm focus:outline-none focus:border-[var(--color-gold)]/50 focus:ring-1 focus:ring-[var(--color-gold)]/30 transition-all duration-300"
              aria-label="Email for newsletter"
            />
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="px-7 py-3 rounded-full bg-[var(--color-gold)] text-[var(--color-charcoal)] text-sm font-semibold hover:bg-[var(--color-gold-dark)] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* ── Main Footer Grid ────────────────────────────── */}
      <div className="container-premium py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5 group">
              <Gift
                className="w-7 h-7 text-[var(--color-gold)]"
                strokeWidth={1.5}
              />
              <span className="font-[family-name:var(--font-heading)] text-xl font-bold">
                Giftyy<span className="gradient-text-gold">Place</span>
              </span>
            </Link>
            <p className="text-[var(--color-ivory)]/45 text-sm leading-relaxed max-w-sm mb-6">
              Handcrafting premium gift hampers that turn moments into memories.
              Each hamper is thoughtfully curated with love, care, and a touch of
              luxury.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-ivory)]/50 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)]/30 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Shop Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-[var(--color-gold)] mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-ivory)]/45 hover:text-[var(--color-ivory)] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-[var(--color-gold)] mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-ivory)]/45 hover:text-[var(--color-ivory)] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-[var(--color-gold)] mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-[var(--color-ivory)]/45">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-gold)]/50" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
              <li>
                <a
                  href="mailto:hello@giftyyplace.com"
                  className="flex items-center gap-3 text-sm text-[var(--color-ivory)]/45 hover:text-[var(--color-ivory)] transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 shrink-0 text-[var(--color-gold)]/50" />
                  hello@giftyyplace.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-sm text-[var(--color-ivory)]/45 hover:text-[var(--color-ivory)] transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 shrink-0 text-[var(--color-gold)]/50" />
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom Bar ──────────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="container-premium py-6 border-t border-white/10"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-ivory)]/30">
          <p>© {new Date().getFullYear()} GiftyyPlace. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-[var(--color-rose)] fill-[var(--color-rose)]" /> in India
          </p>
        </div>
      </motion.div>
    </motion.footer>
  );
}
