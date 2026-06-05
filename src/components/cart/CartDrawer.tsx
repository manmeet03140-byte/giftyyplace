"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/stores/cart-store";
import { CartItem } from "./CartItem";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { X, ShoppingBag } from "lucide-react";

export function CartDrawer() {
  const { isDrawerOpen, toggleDrawer, items, totalPrice, totalItems } = useCart();
  const router = useRouter();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  const handleCheckout = () => {
    toggleDrawer(false);
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleDrawer(false)}
            className="fixed inset-0 z-[60] bg-[var(--color-charcoal)]/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-[var(--color-ivory)] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-charcoal)]/5">
              <h2 className="font-playfair text-2xl text-[var(--color-charcoal)] flex items-center gap-2">
                Your Cart
                <span className="text-sm font-sans font-normal text-[var(--color-charcoal-light)]/60 bg-[var(--color-charcoal)]/5 px-2 py-0.5 rounded-full">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              </h2>
              <button
                onClick={() => toggleDrawer(false)}
                className="p-2 hover:bg-[var(--color-charcoal)]/5 rounded-full transition-colors text-[var(--color-charcoal)]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-[var(--color-charcoal-light)]/60">
                  <ShoppingBag size={48} className="opacity-20 mb-4" />
                  <p className="text-lg font-medium text-[var(--color-charcoal)]">
                    Your cart is empty
                  </p>
                  <p className="text-sm max-w-[250px]">
                    Looks like you haven't added any premium hampers to your cart yet.
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-4"
                    onClick={() => {
                      toggleDrawer(false);
                      router.push("/collections");
                    }}
                  >
                    Explore Collections
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[var(--color-charcoal)]/5 bg-white/50 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[var(--color-charcoal-light)]">Subtotal</span>
                  <span className="font-playfair text-2xl font-medium text-[var(--color-charcoal)]">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-charcoal-light)]/60 mb-4 text-center">
                  Shipping and taxes calculated at checkout.
                </p>
                <Button
                  variant="premium"
                  className="w-full shadow-xl"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
