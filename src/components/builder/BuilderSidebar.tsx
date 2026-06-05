"use client";

import { useBuilder } from "@/stores/builder-store";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, PackageOpen, Gift, HeartHandshake } from "lucide-react";
import { clsx } from "clsx";
import Image from "next/image";

export function BuilderSidebar() {
  const { state, totalPrice } = useBuilder();
  const { selectedBase, selectedItems, selectedFinishing } = state;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-[var(--color-charcoal)]/5 p-6 md:p-8 sticky top-24 flex flex-col h-[calc(100vh-8rem)]">
      <h2 className="font-playfair text-2xl text-[var(--color-charcoal)] mb-6 flex items-center gap-3">
        <ShoppingBag className="w-6 h-6 text-[var(--color-gold)]" />
        Your Hamper
      </h2>

      <div className="flex-grow overflow-y-auto pr-2 space-y-6">
        {/* Base Section */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-charcoal-light)]/60 mb-3 flex items-center gap-2">
            <PackageOpen className="w-4 h-4" /> Base
          </h3>
          {selectedBase ? (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--color-ivory)]">
              {selectedBase.image_url ? (
                <div className="w-12 h-12 relative rounded-xl overflow-hidden shrink-0 bg-white border border-[var(--color-charcoal)]/5">
                  <Image src={selectedBase.image_url} alt={selectedBase.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-white rounded-xl shrink-0 border border-[var(--color-charcoal)]/5" />
              )}
              <div className="flex-grow">
                <p className="text-sm font-medium text-[var(--color-charcoal)] line-clamp-1">{selectedBase.name}</p>
                <p className="text-sm text-[var(--color-gold)] font-medium">{formatPrice(selectedBase.price)}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-[var(--color-charcoal-light)]/60 italic px-2">No base selected</p>
          )}
        </div>

        {/* Items Section */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-charcoal-light)]/60 mb-3 flex items-center gap-2">
            <Gift className="w-4 h-4" /> Contents
          </h3>
          {selectedItems.length > 0 ? (
            <ul className="space-y-2">
              {selectedItems.map((si) => (
                <li key={si.item.id} className="flex justify-between items-start gap-4 p-2">
                  <div className="flex gap-2 text-sm text-[var(--color-charcoal)]">
                    <span className="text-[var(--color-charcoal-light)]/60 font-medium">{si.quantity}x</span>
                    <span className="line-clamp-2">{si.item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-charcoal)] shrink-0">
                    {formatPrice(si.item.price * si.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--color-charcoal-light)]/60 italic px-2">No items added</p>
          )}
        </div>

        {/* Finishing Touches Section */}
        {(selectedFinishing.length > 0 || state.giftMessage) && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-charcoal-light)]/60 mb-3 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4" /> Finishing Touches
            </h3>
            <ul className="space-y-2">
              {selectedFinishing.map((sf) => (
                <li key={sf.item.id} className="flex justify-between text-sm p-2">
                  <span className="text-[var(--color-charcoal)]">{sf.item.name}</span>
                  <span className="font-medium text-[var(--color-charcoal)]">{formatPrice(sf.item.price)}</span>
                </li>
              ))}
              {state.giftMessage && (
                <li className="p-3 bg-[var(--color-ivory)] rounded-xl mt-2">
                  <p className="text-xs text-[var(--color-charcoal-light)]/60 uppercase tracking-wider mb-1">Gift Message:</p>
                  <p className="text-sm text-[var(--color-charcoal)] italic font-playfair">&quot;{state.giftMessage}&quot;</p>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Footer Total */}
      <div className="mt-6 pt-6 border-t border-[var(--color-charcoal)]/10 shrink-0">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[var(--color-charcoal-light)]">Total Estimate</span>
          <span className="text-2xl font-playfair font-semibold text-[var(--color-charcoal)]">
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
