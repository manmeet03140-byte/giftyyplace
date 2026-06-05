"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { ShieldAlert, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();

    try {
      // In a real application, you would check if the user is an admin via Supabase Claims or a users table
      // Here, we just log them in and middleware handles the rest.
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      
      // Redirect to dashboard
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid admin credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
            <ShieldAlert className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <h1 className="text-3xl font-[family-name:var(--font-heading)] text-center text-white mb-2">
          Admin Portal
        </h1>
        <p className="text-white/60 text-center mb-8">
          Restricted Access. Authorized personnel only.
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        <form onSubmit={handleAdminAuth} className="space-y-5">
          <div>
            <label className="block text-white/70 text-sm mb-2 font-medium">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20"
                placeholder="manmeet03140@gmail.com"
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
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors border-none"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
            {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
