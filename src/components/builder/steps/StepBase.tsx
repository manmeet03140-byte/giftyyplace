"use client";

import { useBuilder } from "@/stores/builder-store";
import { MOCK_CUSTOM_ITEMS } from "@/data/mock-products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { Check } from "lucide-react";
import { clsx } from "clsx";

export function StepBase() {
  const { state, dispatch } = useBuilder();
  const bases = MOCK_CUSTOM_ITEMS.filter((item) => item.category === "base");

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-playfair text-[var(--color-charcoal)] mb-3">Choose Your Base</h2>
        <p className="text-[var(--color-charcoal-light)]/60">
          Select the perfect foundation for your curated gift. Our premium baskets and boxes set the tone.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {bases.map((base) => {
          const isSelected = state.selectedBase?.id === base.id;

          return (
            <button
              key={base.id}
              onClick={() => dispatch({ type: "SET_BASE", payload: base })}
              className={clsx(
                "group relative flex flex-col text-left rounded-3xl border-2 transition-all duration-300 overflow-hidden bg-white",
                isSelected
                  ? "border-[var(--color-gold)] ring-4 ring-[var(--color-gold)]/10"
                  : "border-[var(--color-charcoal)]/10 hover:border-[var(--color-charcoal)]/30 hover:shadow-md"
              )}
            >
              {/* Image Area */}
              <div className="aspect-[4/3] relative bg-[var(--color-ivory)] overflow-hidden">
                {base.image_url && (
                  <Image
                    src={base.image_url}
                    alt={base.name}
                    fill
                    className={clsx(
                      "object-cover transition-transform duration-700",
                      isSelected ? "scale-105" : "group-hover:scale-105"
                    )}
                  />
                )}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--color-gold)] text-white flex items-center justify-center shadow-sm">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h3 className="font-playfair text-xl text-[var(--color-charcoal)] font-semibold">{base.name}</h3>
                  <span className="text-[var(--color-gold)] font-medium shrink-0">
                    {formatPrice(base.price)}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-charcoal-light)]/70 line-clamp-2 mb-4">
                  {base.description}
                </p>
                <div className="mt-auto">
                  <span
                    className={clsx(
                      "text-sm font-medium uppercase tracking-wider transition-colors",
                      isSelected ? "text-[var(--color-gold)]" : "text-[var(--color-charcoal)] group-hover:text-[var(--color-gold)]"
                    )}
                  >
                    {isSelected ? "Selected" : "Select Base"}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
