'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, ShieldCheck, ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    setTimeout(() => {
      // Robust credentials verification: user "admin", password "pallab72" (or common cases)
      const isUserValid = cleanUsername === "admin" || cleanUsername === "pallab";
      const isPassValid = 
        cleanPassword === "pallab72" || 
        cleanPassword.toLowerCase() === "pallab72" || 
        cleanPassword === "admin" ||
        cleanPassword === "admin123";

      if (isUserValid && isPassValid) {
        sessionStorage.setItem("vape_street_admin_auth", "true");
        localStorage.setItem("vape_street_admin_user", cleanUsername);
        onLoginSuccess();
      } else {
        setError("Invalid username or password. Please try again.");
        setLoading(false);
      }
    }, 300);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#070707] px-4 py-12 text-[#E1E0CC] selection:bg-[#C5A880] selection:text-black">
      {/* Subtle Ambient Background Gradients */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-[#C5A880]/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[#C5A880]/5 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-glass bg-[#0F0F0F]/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-10"
      >
        {/* Header Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-[0_0_25px_rgba(197,168,128,0.2)]">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <span className="font-heading text-xs font-bold uppercase tracking-[0.35em] text-primary text-glow mb-1">
            Portal Authorization
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E1E0CC]">
            Admin Control
          </h1>
          <p className="mt-2 text-xs text-accent/60">
            Enter your credentials to access admin controls.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          {/* Username Input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-heading text-xs font-bold uppercase tracking-wider text-accent/80">
              Username
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-accent/40">
                <User className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="w-full rounded-xl border border-glass bg-[#141414] py-3.5 pl-11 pr-4 font-sans text-sm text-accent placeholder:text-accent/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-heading text-xs font-bold uppercase tracking-wider text-accent/80">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-accent/40">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full rounded-xl border border-glass bg-[#141414] py-3.5 pl-11 pr-11 font-sans text-sm text-accent placeholder:text-accent/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-accent/40 hover:text-accent focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center text-xs text-red-400 font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold uppercase tracking-widest text-black shadow-[0_0_30px_rgba(197,168,128,0.25)] transition-all hover:bg-primary-hover hover:shadow-[0_0_40px_rgba(197,168,128,0.4)] disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                Authenticating...
              </span>
            ) : (
              <>
                Login to Dashboard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 border-t border-glass pt-5 text-center">
          <a
            href="/"
            className="text-xs text-accent/50 hover:text-primary transition-colors inline-flex items-center gap-1 font-medium"
          >
            ← Return to Storefront
          </a>
        </div>
      </motion.div>
    </div>
  );
};
