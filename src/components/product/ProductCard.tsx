"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PremadeHamper } from "@/types/database";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/stores/cart-store";
import { ProductModal } from "./ProductModal";
import { QuickAddToast } from "./QuickAddToast";

interface ProductCardProps {
  product: PremadeHamper;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      type: "premade",
    });
    setShowToast(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex flex-col gap-4 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[var(--color-charcoal)]/5">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Featured Ribbon */}
          {product.is_featured && (
            <div className="absolute top-4 left-4 z-10 bg-[var(--color-gold)] text-[var(--color-charcoal)] text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-md">
              Featured
            </div>
          )}

          {/* Quick Actions Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[var(--color-charcoal)]/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 p-6 transition-all"
              >
                <Button
                  variant="primary"
                  className="w-full shadow-lg"
                  onClick={handleQuickAdd}
                >
                  Quick Add
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-white hover:bg-white/20 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                >
                  View Details
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-1 px-1">
          <h3 className="font-playfair text-lg font-medium text-[var(--color-charcoal)] truncate">
            {product.name}
          </h3>
          <p className="text-[var(--color-gold-dark)] font-medium">
            {formatPrice(product.price)}
          </p>
        </div>
      </motion.div>

      {/* Modal */}
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Toast */}
      <QuickAddToast
        product={product}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
