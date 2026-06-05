"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { CartItem as CartItemType, useCart } from "@/stores/cart-store";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className="flex gap-4 py-4 border-b border-[var(--color-charcoal)]/5 last:border-0 group"
    >
      {/* Thumbnail */}
      <div className="relative h-24 w-20 shrink-0 rounded-lg overflow-hidden bg-[var(--color-charcoal)]/5">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-grow justify-between">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h4 className="font-medium text-[var(--color-charcoal)] text-sm line-clamp-2">
              {item.name}
            </h4>
            <p className="text-xs text-[var(--color-charcoal-light)]/60 mt-0.5 capitalize">
              {item.type.replace("_", " ")}
            </p>
          </div>
          <p className="font-medium text-[var(--color-charcoal)] text-sm whitespace-nowrap">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center border border-[var(--color-charcoal)]/10 rounded-md bg-white">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1.5 text-[var(--color-charcoal)]/60 hover:text-[var(--color-charcoal)] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center text-xs font-medium text-[var(--color-charcoal)]">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1.5 text-[var(--color-charcoal)]/60 hover:text-[var(--color-charcoal)] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-[var(--color-charcoal-light)]/40 hover:text-red-500 transition-colors p-2 md:opacity-0 md:group-hover:opacity-100"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
