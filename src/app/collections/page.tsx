import React from "react";
import { Metadata } from "next";
import { ProductGrid } from "@/components/product/ProductGrid";
import { MOCK_PREMADE_HAMPERS } from "@/data/mock-products";

export const metadata: Metadata = {
  title: "Curated Collections | GiftyyPlace",
  description: "Explore our handpicked gift hampers for every occasion. Luxury gifting made easy.",
};

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-32 pb-24">
      <div className="container-premium">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h1 className="text-[var(--color-charcoal)] mb-4">
            Our Curated <span className="gradient-text-gold">Collections</span>
          </h1>
          <p className="text-[var(--color-charcoal-light)]/80 text-lg">
            Discover exquisitely curated gift hampers designed to make every moment memorable. From artisanal chocolates to bespoke keepsakes, find the perfect gift.
          </p>
        </div>

        {/* Product Grid */}
        <ProductGrid products={MOCK_PREMADE_HAMPERS} />
      </div>
    </div>
  );
}
