"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Gift, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setError("Check your email for the confirmation link!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-charcoal)] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-96 h-96 bg-[var(--color-gold)]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[var(--color-gold)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md glass-dark p-8 md:p-10 rounded-3xl border border-[var(--color-gold)]/20 shadow-2xl relative z-10">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-gold)]/10 flex items-center justify-center border border-[var(--color-gold)]/20">
            <Gift className="w-8 h-8 text-[var(--color-gold)]" />
          </div>
        </div>

        <h1 className="text-3xl font-[family-name:var(--font-heading)] text-center text-white mb-2">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-white/60 text-center mb-8">
          {isSignUp
            ? "Join GiftyyPlace for exclusive hampers"
            : "Sign in to access your curated hampers"}
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-white/70 text-sm mb-2 font-medium">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors placeholder:text-white/20"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors placeholder:text-white/20"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="premium"
            className="w-full h-12 text-lg mt-2"
            disabled={loading}
          >
            {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
            {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            {isSignUp ? "Already have an account?" : "New to GiftyyPlace?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[var(--color-gold)] hover:text-[var(--color-gold-light)] font-medium transition-colors"
            >
              {isSignUp ? "Sign In" : "Create Account"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
