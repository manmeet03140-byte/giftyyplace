"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PremadeHamper } from "@/types/database";

interface QuickAddToastProps {
  product: PremadeHamper;
  isVisible: boolean;
  onClose: () => void;
}

export function QuickAddToast({ product, isVisible, onClose }: QuickAddToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-24 right-4 sm:right-8 z-50 flex items-center gap-4 bg-white/90 backdrop-blur-md shadow-[var(--shadow-gold)] rounded-2xl p-4 pr-6 border border-[var(--color-gold)]/20"
        >
          <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0 bg-gray-100">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[var(--color-charcoal)]">
              Added to cart
            </span>
            <span className="text-xs text-[var(--color-charcoal-light)]/70 truncate max-w-[200px]">
              {product.name}
            </span>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 3, ease: "linear" }}
            className="absolute bottom-0 left-0 h-1 bg-[var(--color-gold)] origin-left rounded-bl-2xl"
            style={{ width: "100%" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
