import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/hero/HeroSection";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { MOCK_PREMADE_HAMPERS } from "@/data/mock-products";
import { Sparkles, ArrowRight, Wand2, Package, Heart } from "lucide-react";

export default function HomePage() {
  const featuredHampers = MOCK_PREMADE_HAMPERS.filter(h => h.is_featured).slice(0, 4);

  return (
    <>
      <HeroSection />

      {/* ── Featured Collections (Premade) ──────── */}
      <section className="py-24 bg-[var(--color-ivory)] relative">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-[var(--color-gold-dark)] text-sm font-semibold tracking-wider uppercase mb-3">
                <Sparkles className="w-4 h-4" /> Quick & Effortless
              </span>
              <h2 className="text-[var(--color-charcoal)] mb-4 font-[family-name:var(--font-heading)] text-3xl md:text-5xl">
                Curated <span className="gradient-text-gold">Collections</span>
              </h2>
              <p className="text-[var(--color-charcoal)]/90 text-lg font-medium">
                Explore our handpicked gift hampers for every occasion. Ready to ship, beautifully packaged, and guaranteed to delight.
              </p>
            </div>
            <Link href="/collections" className="shrink-0">
              <Button variant="secondary" className="group">
                View All Collections
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredHampers.map((hamper, index) => (
              <ProductCard key={hamper.id} product={hamper} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Build Your Own (Custom) ──────── */}
      <section className="py-24 bg-[var(--color-charcoal)] relative overflow-hidden border-y border-[var(--color-gold)]/20">
        {/* Background Accents */}
        <div className="absolute inset-0 grain opacity-50" />
        <div className="absolute -left-40 -top-40 w-96 h-96 bg-[var(--color-gold)]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -right-40 -bottom-40 w-96 h-96 bg-[var(--color-rose)]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container-premium relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image / Visual Side */}
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-square rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop"
                  alt="Custom Hamper Builder"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/80 via-transparent to-transparent" />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -right-6 top-1/4 glass-dark p-4 rounded-xl shadow-xl border border-[var(--color-gold)]/30 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center">
                    <Package className="w-5 h-5 text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Choose a Base</p>
                    <p className="text-white/60 text-xs">Premium Boxes & Baskets</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -left-6 bottom-1/4 glass-dark p-4 rounded-xl shadow-xl border border-[var(--color-gold)]/30 animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-rose)]/20 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-[var(--color-rose-light)]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Add Keepsakes</p>
                    <p className="text-white/60 text-xs">Chocolates, Cards & More</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-dark text-[var(--color-gold)] text-sm font-semibold tracking-wider uppercase mb-6 border border-[var(--color-gold)]/30">
                <Wand2 className="w-4 h-4" /> Create Your Own
              </span>
              <h2 className="text-white mb-6 font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
                Build a Masterpiece <br/>
                <span className="gradient-text-gold">From Scratch</span>
              </h2>
              <p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Want to create something truly unique? Use our interactive hamper builder to hand-select every item—from the perfect wicker basket to artisan chocolates and personalized handwritten notes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/build">
                  <Button variant="premium" size="lg" className="w-full sm:w-auto">
                    Start Building Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ──────── */}
      <section className="py-24 bg-[var(--color-ivory)] text-[var(--color-charcoal)]">
        <div className="container-premium text-center">
          <h2 className="mb-4 font-[family-name:var(--font-heading)] text-3xl md:text-4xl">
            The GiftyyPlace <span className="gradient-text-gold">Difference</span>
          </h2>
          <p className="text-[var(--color-charcoal)]/80 max-w-xl mx-auto mb-16 text-lg font-medium">
            Every hamper is meticulously crafted to deliver an unforgettable unboxing experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Premium Sourcing", desc: "We partner with artisan brands globally to bring you the finest products." },
              { title: "Bespoke Packaging", desc: "Luxury boxes, silk ribbons, and handwritten notes for that personal touch." },
              { title: "White Glove Delivery", desc: "Ensuring your gift arrives in pristine condition, exactly when you need it." }
            ].map((feature, i) => (
              <div key={i} className="p-8 border border-[var(--color-charcoal)]/10 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-[family-name:var(--font-heading)] text-xl mb-4 text-[var(--color-gold-dark)]">{feature.title}</h3>
                <p className="text-[var(--color-charcoal-light)]/70 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
