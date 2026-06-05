"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PremadeHamper } from "@/types/database";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/stores/cart-store";
import { X, Minus, Plus } from "lucide-react";

interface ProductModalProps {
  product: PremadeHamper;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Reset quantity when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setIsAdding(false);
    }
  }, [isOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        type: "premade",
        quantity,
      });
      setIsAdding(false);
      onClose();
    }, 600); // Fake delay for the button animation
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[var(--color-charcoal)]/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[var(--color-ivory)] w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-colors text-[var(--color-charcoal)]"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Image Section */}
              <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto bg-gray-100">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
                <div className="mb-2">
                  {product.is_featured && (
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold-dark)] mb-2 inline-block">
                      Featured Collection
                    </span>
                  )}
                  <h2 className="font-playfair text-3xl md:text-4xl text-[var(--color-charcoal)] mb-2">
                    {product.name}
                  </h2>
                  <p className="text-2xl text-[var(--color-charcoal)]/80 font-medium">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <div className="w-12 h-px bg-[var(--color-gold)]/30 my-6" />

                <p className="text-[var(--color-charcoal-light)]/80 leading-relaxed mb-8 flex-grow">
                  {product.description ||
                    "A beautifully curated selection of premium items, perfect for making any occasion memorable."}
                </p>

                {/* Controls */}
                <div className="flex flex-col gap-6 mt-auto">
                  {/* Quantity */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium uppercase tracking-wider text-[var(--color-charcoal)]/60">
                      Quantity
                    </span>
                    <div className="flex items-center border border-[var(--color-charcoal)]/10 rounded-full bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 text-[var(--color-charcoal)]/60 hover:text-[var(--color-charcoal)] transition-colors disabled:opacity-30"
                        disabled={quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-medium text-[var(--color-charcoal)]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 text-[var(--color-charcoal)]/60 hover:text-[var(--color-charcoal)] transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    variant="premium"
                    size="lg"
                    className="w-full"
                    onClick={handleAddToCart}
                    isLoading={isAdding}
                  >
                    {isAdding ? "Adding to Cart..." : `Add to Cart — ${formatPrice(product.price * quantity)}`}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
