"use client";

import { useBuilder } from "@/stores/builder-store";
import { MOCK_CUSTOM_ITEMS } from "@/data/mock-products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { clsx } from "clsx";

export function StepFinishing() {
  const { state, dispatch } = useBuilder();
  const personalizations = MOCK_CUSTOM_ITEMS.filter((item) => item.category === "personalization");

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-playfair text-[var(--color-charcoal)] mb-3">Finishing Touches</h2>
        <p className="text-[var(--color-charcoal-light)]/60">
          Add that personal touch with a handwritten note or elegant ribbon.
        </p>
      </div>

      <div className="space-y-8">
        {/* Personalization Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {personalizations.map((item) => {
            const isSelected = state.selectedFinishing.some((i) => i.item.id === item.id);

            return (
              <button
                key={item.id}
                onClick={() => dispatch({ type: "TOGGLE_FINISHING", payload: item })}
                className={clsx(
                  "flex items-start gap-4 p-5 text-left rounded-2xl border-2 transition-all duration-300",
                  isSelected
                    ? "border-[var(--color-gold)] bg-[var(--color-gold)]/5"
                    : "border-[var(--color-charcoal)]/10 hover:border-[var(--color-charcoal)]/30 bg-white"
                )}
              >
                <div
                  className={clsx(
                    "w-6 h-6 rounded-full shrink-0 flex items-center justify-center border mt-1 transition-colors",
                    isSelected
                      ? "bg-[var(--color-gold)] border-[var(--color-gold)] text-white"
                      : "border-[var(--color-charcoal)]/20"
                  )}
                >
                  {isSelected && <Check className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium text-[var(--color-charcoal)]">{item.name}</h3>
                    <span className="text-[var(--color-gold)] font-medium ml-4">{formatPrice(item.price)}</span>
                  </div>
                  <p className="text-sm text-[var(--color-charcoal-light)]/70">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Gift Message */}
        <div className="bg-white p-6 rounded-3xl border border-[var(--color-charcoal)]/10 shadow-sm">
          <label htmlFor="message" className="block font-playfair text-xl text-[var(--color-charcoal)] mb-2">
            Gift Message
          </label>
          <p className="text-sm text-[var(--color-charcoal-light)]/60 mb-4">
            We will beautifully handwrite your message on a premium card.
          </p>
          <textarea
            id="message"
            rows={4}
            value={state.giftMessage}
            onChange={(e) => dispatch({ type: "SET_GIFT_MESSAGE", payload: e.target.value })}
            placeholder="Dear [Name], wishing you..."
            className="w-full p-4 rounded-xl border border-[var(--color-charcoal)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)] resize-none"
          />
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center pt-6 border-t border-[var(--color-charcoal)]/10">
        <Button variant="secondary" onClick={() => dispatch({ type: "SET_STEP", payload: 2 })}>
          Back
        </Button>
        <Button onClick={() => dispatch({ type: "SET_STEP", payload: 4 })}>
          Review Hamper
        </Button>
      </div>
    </div>
  );
}
