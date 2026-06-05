"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PremadeHamper } from "@/types/database";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: PremadeHamper[];
}

type FilterType = "all" | "featured" | "under-3000" | "over-3000";

export function ProductGrid({ products }: ProductGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredProducts = products.filter((product) => {
    switch (activeFilter) {
      case "featured":
        return product.is_featured;
      case "under-3000":
        return product.price < 3000;
      case "over-3000":
        return product.price >= 3000;
      case "all":
      default:
        return true;
    }
  });

  const filters: { id: FilterType; label: string }[] = [
    { id: "all", label: "All Hampers" },
    { id: "featured", label: "Featured" },
    { id: "under-3000", label: "Under ₹3,000" },
    { id: "over-3000", label: "Luxury (₹3,000+)" },
  ];

  return (
    <div className="w-full">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? "text-[var(--color-charcoal)]"
                : "text-[var(--color-charcoal-light)]/60 hover:text-[var(--color-charcoal)]"
            }`}
          >
            {activeFilter === filter.id && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-white shadow-sm border border-[var(--color-charcoal)]/5 rounded-full z-0"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{filter.label}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-24 text-center text-[var(--color-charcoal-light)]/60"
        >
          <p>No hampers found for this category.</p>
        </motion.div>
      )}
    </div>
  );
}
