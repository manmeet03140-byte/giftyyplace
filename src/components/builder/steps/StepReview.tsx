"use client";

import { useBuilder } from "@/stores/builder-store";
import { useCart } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function StepReview() {
  const { state, totalPrice, dispatch: builderDispatch } = useBuilder();
  const { addItem, toggleDrawer } = useCart();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const { selectedBase, selectedItems, selectedFinishing, giftMessage } = state;

  const handleAddToCart = () => {
    if (!selectedBase) return;

    setIsAdding(true);

    // Create a unique ID for this custom hamper configuration
    const customId = `custom-${Date.now()}`;
    const allItemsDescription = selectedItems.map((i) => `${i.quantity}x ${i.item.name}`).join(", ");

    // Fake delay for realistic feeling
    setTimeout(() => {
      addItem({
        id: customId,
        name: "Custom Curated Hamper",
        price: totalPrice,
        image: selectedBase.image_url || "/hamper-classic.png", // Use base image as representation
        type: "custom_item",
      });
      
      builderDispatch({ type: "RESET" });
      toggleDrawer(true);
      router.push("/"); // Or we could keep them on the builder page
    }, 600);
  };

  if (!selectedBase) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--color-charcoal-light)]">Please go back and select a base first.</p>
        <Button className="mt-4" onClick={() => builderDispatch({ type: "SET_STEP", payload: 1 })}>
          Choose Base
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-playfair text-[var(--color-charcoal)] mb-3 flex items-center gap-3">
          <CheckCircle2 className="text-[var(--color-gold)] w-8 h-8" />
          Review Your Masterpiece
        </h2>
        <p className="text-[var(--color-charcoal-light)]/60">
          Everything looks perfect. Ready to add this custom hamper to your cart?
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[var(--color-charcoal)]/10 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Visual Representation */}
          <div className="w-full md:w-1/3 shrink-0 aspect-[4/3] md:aspect-square relative rounded-2xl overflow-hidden bg-[var(--color-ivory)] border border-[var(--color-charcoal)]/5">
            {selectedBase.image_url && (
              <Image src={selectedBase.image_url} alt={selectedBase.name} fill className="object-cover" />
            )}
            {/* We could theoretically composite images here, but using the base is elegant for now */}
          </div>

          {/* Details */}
          <div className="flex-grow w-full space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-charcoal-light)]/60 mb-2">Base</h3>
              <p className="text-lg font-medium text-[var(--color-charcoal)]">{selectedBase.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-charcoal-light)]/60 mb-2">Contents ({selectedItems.reduce((acc, i) => acc + i.quantity, 0)} items)</h3>
              <div className="flex flex-wrap gap-2">
                {selectedItems.map((si) => (
                  <span key={si.item.id} className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--color-charcoal)]/5 rounded-full text-sm text-[var(--color-charcoal)]">
                    <span className="font-medium">{si.quantity}x</span> {si.item.name}
                  </span>
                ))}
              </div>
            </div>

            {(selectedFinishing.length > 0 || giftMessage) && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-charcoal-light)]/60 mb-2">Finishing</h3>
                <ul className="list-disc list-inside text-sm text-[var(--color-charcoal)] space-y-1 mb-3">
                  {selectedFinishing.map((sf) => (
                    <li key={sf.item.id}>{sf.item.name}</li>
                  ))}
                </ul>
                {giftMessage && (
                  <div className="p-4 bg-[var(--color-ivory)] rounded-xl border border-[var(--color-gold)]/20 relative">
                    <span className="absolute -top-3 left-4 bg-[var(--color-ivory)] px-2 text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
                      Message
                    </span>
                    <p className="font-playfair italic text-[var(--color-charcoal)]">&quot;{giftMessage}&quot;</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-[var(--color-charcoal)]/10">
        <Button variant="secondary" onClick={() => builderDispatch({ type: "SET_STEP", payload: 3 })} disabled={isAdding}>
          Back
        </Button>
        <Button onClick={handleAddToCart} disabled={isAdding} className="min-w-[200px]">
          {isAdding ? "Adding..." : (
            <>
              <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart — {formatPrice(totalPrice)}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
