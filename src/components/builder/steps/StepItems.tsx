"use client";

import { useState } from "react";
import { useBuilder } from "@/stores/builder-store";
import { MOCK_CUSTOM_ITEMS } from "@/data/mock-products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { clsx } from "clsx";

type TabType = "food" | "keepsake";

export function StepItems() {
  const { state, dispatch } = useBuilder();
  const [activeTab, setActiveTab] = useState<TabType>("food");

  const items = MOCK_CUSTOM_ITEMS.filter((item) => item.category === activeTab);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-playfair text-[var(--color-charcoal)] mb-3">Fill Your Hamper</h2>
          <p className="text-[var(--color-charcoal-light)]/60">
            Mix and match premium treats and beautiful keepsakes.
          </p>
        </div>
        <div className="flex gap-2 p-1 bg-[var(--color-charcoal)]/5 rounded-full shrink-0">
          <button
            onClick={() => setActiveTab("food")}
            className={clsx(
              "px-6 py-2 rounded-full text-sm font-medium transition-colors",
              activeTab === "food" ? "bg-white text-[var(--color-charcoal)] shadow-sm" : "text-[var(--color-charcoal-light)]/60 hover:text-[var(--color-charcoal)]"
            )}
          >
            Gourmet Food
          </button>
          <button
            onClick={() => setActiveTab("keepsake")}
            className={clsx(
              "px-6 py-2 rounded-full text-sm font-medium transition-colors",
              activeTab === "keepsake" ? "bg-white text-[var(--color-charcoal)] shadow-sm" : "text-[var(--color-charcoal-light)]/60 hover:text-[var(--color-charcoal)]"
            )}
          >
            Keepsakes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item) => {
          const selectedItem = state.selectedItems.find((i) => i.item.id === item.id);
          const quantity = selectedItem?.quantity || 0;

          return (
            <div
              key={item.id}
              className="group relative flex flex-col rounded-3xl border border-[var(--color-charcoal)]/10 bg-white overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square relative bg-[var(--color-ivory)]">
                {item.image_url && (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start gap-3 mb-2">
                  <h3 className="font-playfair text-lg text-[var(--color-charcoal)] leading-tight">{item.name}</h3>
                  <span className="text-[var(--color-gold)] font-medium shrink-0">{formatPrice(item.price)}</span>
                </div>
                <p className="text-sm text-[var(--color-charcoal-light)]/70 line-clamp-2 mb-4">
                  {item.description}
                </p>
                <div className="mt-auto pt-4 border-t border-[var(--color-charcoal)]/5 flex items-center justify-between">
                  {quantity > 0 ? (
                    <div className="flex items-center gap-3 bg-[var(--color-charcoal)]/5 rounded-full p-1">
                      <button
                        onClick={() => dispatch({ type: "UPDATE_ITEM_QUANTITY", payload: { id: item.id, quantity: quantity - 1 } })}
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[var(--color-charcoal)] hover:text-[var(--color-gold)] shadow-sm transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-4 text-center text-sm font-medium">{quantity}</span>
                      <button
                        onClick={() => dispatch({ type: "ADD_ITEM", payload: item })}
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[var(--color-charcoal)] hover:text-[var(--color-gold)] shadow-sm transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      onClick={() => dispatch({ type: "ADD_ITEM", payload: item })}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Item
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex justify-between items-center pt-6 border-t border-[var(--color-charcoal)]/10">
        <Button variant="secondary" onClick={() => dispatch({ type: "SET_STEP", payload: 1 })}>
          Back
        </Button>
        <Button onClick={() => dispatch({ type: "SET_STEP", payload: 3 })}>
          Next: Finishing Touches
        </Button>
      </div>
    </div>
  );
}
