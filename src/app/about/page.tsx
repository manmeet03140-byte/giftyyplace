import React from "react";
import { Sparkles, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-32 pb-24">
      <div className="container-premium max-w-4xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 text-[var(--color-gold-dark)] text-sm font-semibold tracking-wider uppercase mb-6">
          <Sparkles className="w-4 h-4" /> Our Story
        </span>
        <h1 className="text-[var(--color-charcoal)] mb-8 font-[family-name:var(--font-heading)] text-4xl md:text-6xl">
          Crafting <span className="gradient-text-gold">Memories</span>
        </h1>
        <div className="text-[var(--color-charcoal)]/80 text-lg md:text-xl leading-relaxed space-y-6 text-left max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-[var(--color-charcoal)]/5">
          <p>
            Welcome to <strong>GiftyyPlace</strong>, where every hamper tells a story. We started with a simple belief: that gifting should be an experience, not a chore.
          </p>
          <p>
            Our team scours the globe to curate the finest artisan chocolates, premium keepsakes, and beautiful packaging. Whether you are celebrating a birthday, an anniversary, or just saying "thank you", we ensure that every box delivered is a masterpiece of unboxing.
          </p>
          <p>
            Thank you for trusting us with your most precious moments.
          </p>
          <div className="pt-6 border-t border-[var(--color-charcoal)]/10 flex justify-center text-[var(--color-gold-dark)]">
            <Heart className="w-6 h-6 fill-current" />
          </div>
        </div>
      </div>
    </div>
  );
}
