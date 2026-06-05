"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { ShoppingBag, Menu, X, Gift, Sparkles } from "lucide-react";
import { useCart } from "@/stores/cart-store";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/build", label: "Build Your Hamper" },
  { href: "/corporate", label: "Corporate" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { totalItems, toggleDrawer } = useCart();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const isAuthOrAdminPage = pathname?.startsWith("/login") || pathname?.startsWith("/admin");
  if (isAuthOrAdminPage) return null;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-dark shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container-premium flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Gift
                className="w-8 h-8 text-[var(--color-gold)]"
                strokeWidth={1.5}
              />
            </motion.div>
            <span
              className={`font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight transition-colors duration-300 ${
                isScrolled
                  ? "text-[var(--color-ivory)]"
                  : "text-[var(--color-charcoal)]"
              }`}
            >
              Giftyy
              <span className="gradient-text-gold">Place</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 group ${
                  isScrolled
                    ? "text-[var(--color-ivory)]/80 hover:text-[var(--color-gold)]"
                    : "text-[var(--color-charcoal)]/70 hover:text-[var(--color-charcoal)]"
                }`}
              >
                {link.label}
                <motion.span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[var(--color-gold)] rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "60%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Build CTA (desktop) */}
            <Link
              href="/build"
              className="hidden md:flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-full bg-[var(--color-gold)] text-[var(--color-charcoal)] hover:bg-[var(--color-gold-dark)] transition-all duration-300 hover:shadow-[var(--shadow-gold)]"
            >
              <Sparkles className="w-4 h-4" />
              Build Hamper
            </Link>

            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleDrawer()}
              className={`relative p-2.5 rounded-full transition-colors duration-300 cursor-pointer ${
                isScrolled
                  ? "text-[var(--color-ivory)] hover:bg-white/10"
                  : "text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)]/5"
              }`}
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {/* Cart badge */}
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    key={totalItems}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[var(--color-rose)] text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-full transition-colors duration-300 cursor-pointer ${
                isScrolled
                  ? "text-[var(--color-ivory)] hover:bg-white/10"
                  : "text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)]/5"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm gradient-dark p-8 pt-24"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 text-lg font-medium text-[var(--color-ivory)]/80 hover:text-[var(--color-gold)] rounded-xl hover:bg-white/5 transition-all duration-300"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  <Link
                    href="/build"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-6 text-base font-semibold rounded-full bg-[var(--color-gold)] text-[var(--color-charcoal)] hover:bg-[var(--color-gold-dark)] transition-all duration-300"
                  >
                    <Sparkles className="w-4 h-4" />
                    Build Your Hamper
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
