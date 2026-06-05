import React from "react";
import { Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CorporatePage() {
  return (
    <div className="min-h-screen bg-[var(--color-charcoal)] pt-32 pb-24 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 grain opacity-50 pointer-events-none" />
      <div className="absolute -left-40 -top-40 w-96 h-96 bg-[var(--color-gold)]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container-premium relative z-10 max-w-4xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-dark text-[var(--color-gold)] text-sm font-semibold tracking-wider uppercase mb-6 border border-[var(--color-gold)]/30">
          <Building2 className="w-4 h-4" /> B2B Gifting
        </span>
        <h1 className="text-white mb-6 font-[family-name:var(--font-heading)] text-4xl md:text-6xl">
          Corporate <span className="gradient-text-gold">Gifting</span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
          Elevate your corporate relationships with premium, customized gift hampers. Perfect for client appreciation, employee milestones, and holiday gifting at scale.
        </p>

        <div className="glass-dark p-8 md:p-12 rounded-3xl border border-[var(--color-gold)]/20 shadow-2xl text-left max-w-3xl mx-auto">
          <h2 className="text-2xl font-[family-name:var(--font-heading)] text-white mb-6">
            Request a Bulk Quote
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/70 text-sm mb-2">Company Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors" placeholder="Acme Corp" />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Contact Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors" placeholder="you@company.com" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/70 text-sm mb-2">Estimated Quantity</label>
                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors" placeholder="50" />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Budget per Hamper (₹)</label>
                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors" placeholder="2500" />
              </div>
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Specific Requirements</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors" placeholder="Brand colors, specific items, delivery dates..."></textarea>
            </div>

            <Button variant="premium" className="w-full h-12 text-lg">
              Submit Inquiry
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
