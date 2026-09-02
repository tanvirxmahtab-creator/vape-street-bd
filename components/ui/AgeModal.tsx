'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, AlertTriangle, CheckCircle2, XCircle, Lock, ShieldCheck } from "lucide-react";

interface AgeModalProps {
  onVerify: () => void;
}

export function AgeModal({ onVerify }: AgeModalProps) {
  const [denied, setDenied] = useState(false);

  const handleUnderAge = () => {
    setDenied(true);
  };

  const handleExitSite = () => {
    if (typeof window !== "undefined") {
      window.location.href = "https://www.google.com";
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/95 backdrop-blur-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-[#0a0a0d] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(217,119,6,0.2)] overflow-hidden text-center space-y-6"
      >
        {/* Subtle top ambient bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-amber-400" />

        {!denied ? (
          <>
            {/* Header section with Logo and 18+ Badge */}
            <div className="flex flex-col items-center justify-center space-y-3 pt-2">
              <div className="relative">
                <img
                  src="/shop-logo.png"
                  alt="Vape Street BD Logo"
                  className="h-16 w-16 object-cover rounded-full border-2 border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.3)] bg-black"
                />
                <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[10px] font-mono font-black px-2 py-0.5 rounded-full border border-black shadow-md">
                  18+
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-wide">
                  AGE VERIFICATION
                </h2>
                <p className="text-amber-400/90 text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" /> Adult Access Restricted
                </p>
              </div>
            </div>

            {/* Health & Nicotine Warning Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-left space-y-3.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Nicotine & Health Warning</span>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                Products available on <strong className="text-amber-300 font-semibold">Vape Street BD</strong> contain <strong className="text-white">nicotine</strong>, which is a highly addictive chemical substance.
              </p>

              <div className="p-3 rounded-xl bg-black/60 border border-red-500/20 text-[11px] text-gray-400 leading-normal space-y-1">
                <p className="text-red-400 font-semibold flex items-center gap-1">
                  <ShieldAlert className="h-3.5 w-3.5 shrink-0" /> Health Risk Advisory:
                </p>
                <p>
                  Vapor products are strictly intended for existing adult smokers and vapers of legal age (18+). Nicotine may increase heart rate & blood pressure. Not intended for minors under 18, non-smokers, pregnant or nursing mothers, or persons with cardiovascular conditions.
                </p>
              </div>
            </div>

            {/* Verification Prompt */}
            <div className="space-y-4 pt-1">
              <p className="text-sm text-white font-medium">
                Are you at least <span className="text-amber-400 font-bold underline decoration-amber-500/50 underline-offset-4">18 years of age or older</span> to enter this store?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={onVerify}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>I AM 18+ (ENTER)</span>
                </button>

                <button
                  onClick={handleUnderAge}
                  className="w-full py-3.5 px-4 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-red-500/50 text-neutral-300 hover:text-red-400 font-semibold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <XCircle className="h-4 w-4" />
                  <span>I AM UNDER 18</span>
                </button>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-neutral-500 font-mono flex items-center justify-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-500/70" />
              <span>By entering, you confirm compliance with local legal vaping regulations.</span>
            </div>
          </>
        ) : (
          /* Under 18 Denied Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 py-4"
          >
            <div className="h-16 w-16 mx-auto rounded-full bg-red-950/50 border border-red-500/40 flex items-center justify-center text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <ShieldAlert className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-red-500 font-heading tracking-wide">
                ACCESS DENIED
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm mx-auto">
                We are sorry. You must be at least 18 years old to access <strong className="text-white">Vape Street BD</strong> and view nicotine products.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleExitSite}
                className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>LEAVE WEBSITE</span>
              </button>

              <button
                onClick={() => setDenied(false)}
                className="text-xs text-neutral-500 hover:text-neutral-300 underline font-mono cursor-pointer transition-colors"
              >
                Made a mistake? Re-verify age
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
