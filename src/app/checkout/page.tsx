"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if cart is empty and not on success page
  useEffect(() => {
    if (mounted && items.length === 0 && !isSuccess) {
      router.push("/collections");
    }
  }, [mounted, items.length, isSuccess, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to create order
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  if (!mounted || (items.length === 0 && !isSuccess)) {
    return null; // Return null to prevent flash during redirect
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[var(--color-ivory)] pt-32 pb-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 md:p-16 rounded-3xl shadow-xl max-w-lg w-full mx-4 text-center border border-[var(--color-gold)]/10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 bg-[var(--color-gold)]/10 text-[var(--color-gold-dark)] rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 size={40} />
          </motion.div>
          <h1 className="font-playfair text-3xl text-[var(--color-charcoal)] mb-4">
            Order Confirmed!
          </h1>
          <p className="text-[var(--color-charcoal-light)]/80 mb-8">
            Thank you for your order. We've received it and will begin processing it shortly. A confirmation email has been sent to you.
          </p>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => router.push("/")}
          >
            Return to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-24 pb-24">
      <div className="container-premium max-w-6xl">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[var(--color-charcoal-light)]/60 hover:text-[var(--color-charcoal)] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>Back to shopping</span>
        </button>

        <h1 className="font-playfair text-3xl md:text-4xl text-[var(--color-charcoal)] mb-10">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Shipping Form */}
          <div className="w-full lg:w-2/3 order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-[var(--color-charcoal)]/5">
              <h2 className="font-playfair text-2xl text-[var(--color-charcoal)] mb-6">
                Shipping Information
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium text-[var(--color-charcoal)]">Full Name</label>
                    <input required type="text" id="fullName" className="w-full px-4 py-3 rounded-xl border border-[var(--color-charcoal)]/10 focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] transition-colors bg-transparent" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-[var(--color-charcoal)]">Email Address</label>
                    <input required type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-[var(--color-charcoal)]/10 focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] transition-colors bg-transparent" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium text-[var(--color-charcoal)]">Address Line 1</label>
                  <input required type="text" id="address" className="w-full px-4 py-3 rounded-xl border border-[var(--color-charcoal)]/10 focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] transition-colors bg-transparent" placeholder="123 Luxury Lane" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2 md:col-span-1">
                    <label htmlFor="city" className="text-sm font-medium text-[var(--color-charcoal)]">City</label>
                    <input required type="text" id="city" className="w-full px-4 py-3 rounded-xl border border-[var(--color-charcoal)]/10 focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] transition-colors bg-transparent" placeholder="Mumbai" />
                  </div>
                  <div className="space-y-2 md:col-span-1">
                    <label htmlFor="state" className="text-sm font-medium text-[var(--color-charcoal)]">State</label>
                    <input required type="text" id="state" className="w-full px-4 py-3 rounded-xl border border-[var(--color-charcoal)]/10 focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] transition-colors bg-transparent" placeholder="Maharashtra" />
                  </div>
                  <div className="space-y-2 md:col-span-1">
                    <label htmlFor="zip" className="text-sm font-medium text-[var(--color-charcoal)]">Postal Code</label>
                    <input required type="text" id="zip" className="w-full px-4 py-3 rounded-xl border border-[var(--color-charcoal)]/10 focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] transition-colors bg-transparent" placeholder="400001" />
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--color-charcoal)]/10 mt-8">
                  <h2 className="font-playfair text-2xl text-[var(--color-charcoal)] mb-6">
                    Payment Method
                  </h2>
                  <div className="p-4 bg-[var(--color-charcoal)]/5 rounded-xl border border-[var(--color-charcoal)]/10 text-[var(--color-charcoal-light)]/80 text-sm">
                    <p>For Phase 2 demo, payment processing is simulated. Clicking "Place Order" will confirm the order locally.</p>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="premium"
                  size="lg"
                  className="w-full mt-8"
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : `Place Order — ${formatPrice(totalPrice)}`}
                </Button>
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-1/3 order-1 lg:order-2">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[var(--color-charcoal)]/5 sticky top-28">
              <h2 className="font-playfair text-xl text-[var(--color-charcoal)] mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0 bg-[var(--color-charcoal)]/5">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-[var(--color-charcoal)] line-clamp-1">{item.name}</p>
                        <p className="text-xs text-[var(--color-charcoal-light)]/60">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-[var(--color-charcoal)]">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-[var(--color-charcoal)]/10">
                <div className="flex justify-between text-[var(--color-charcoal-light)]/80 text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-[var(--color-charcoal-light)]/80 text-sm">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-[var(--color-charcoal)] font-medium text-lg pt-3 border-t border-[var(--color-charcoal)]/10">
                  <span>Total</span>
                  <span className="text-[var(--color-gold-dark)]">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
