import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Wand2,
  BookOpen,
  ArrowRight,
  Facebook,
  Phone,
  Radio,
  MapPin,
  ShieldCheck,
  Zap,
  ExternalLink,
  Clock,
  Navigation
} from "lucide-react";

export function GlobeLiquidHero({
  onExploreClick,
  onCallClick,
}: {
  onExploreClick?: () => void;
  onCallClick?: () => void;
}) {
  const [activeSpotlight, setActiveSpotlight] = useState<"branch1" | "branch2" | null>(null);

  return (
    <div className="relative w-full min-h-[85vh] lg:min-h-[88vh] overflow-hidden rounded-[2.5rem] border border-primary/30 shadow-2xl my-4 bg-black">
      {/* Autoplay Looping Globe Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 pointer-events-none transition-opacity duration-700"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"
      />

      {/* Cyber Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/20 z-0 pointer-events-none" />

      {/* Main Two-Panel Split Layout */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-[85vh] lg:min-h-[88vh] p-4 sm:p-6 lg:p-8 gap-6">

        {/* Left Panel: Content & Information */}
        <div className="relative flex-1 lg:w-[50%] flex flex-col justify-between p-6 sm:p-10 rounded-3xl liquid-glass-strong border border-primary/30 shadow-2xl">

          {/* Top Brand Tag */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 border border-primary/40 text-primary shadow-[0_0_15px_rgba(197,168,128,0.3)]">
                <Sparkles className="h-5 w-5 text-primary" />
              </span>
              <span className="font-heading text-xl font-black uppercase tracking-tight text-white">
                VAPE STREET <span className="text-primary font-serif italic">BD</span>
              </span>
            </div>

            <span className="liquid-glass rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
              <Radio className="h-3 w-3 animate-pulse text-emerald-400" />
              Live Cyber Hub
            </span>
          </div>

          {/* Hero Typography */}
          <div className="my-auto py-6 flex flex-col gap-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-white leading-[1.08]"
            >
              Connecting the <br />
              <span className="font-serif italic text-primary/90 font-normal">world of artisanal vaping</span> <br />
              to Bangladesh.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xs sm:text-sm text-white/75 max-w-lg leading-relaxed font-sans"
            >
              We source directly from premium global manufacturers in the USA, UK, and Malaysia to deliver 100% verified, authentic hardware & salt nic e-liquids straight to Dhaka.
            </motion.p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="liquid-glass rounded-full px-4 py-2 text-xs font-semibold text-white/90 hover:scale-105 transition-transform cursor-pointer flex items-center gap-1.5 border border-primary/20">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> QR Serial Verification
              </span>
              <span className="liquid-glass rounded-full px-4 py-2 text-xs font-semibold text-white/90 hover:scale-105 transition-transform cursor-pointer flex items-center gap-1.5 border border-primary/20">
                <Zap className="h-3.5 w-3.5 text-primary" /> Same-Day Dhaka Express
              </span>
              <span className="liquid-glass rounded-full px-4 py-2 text-xs font-semibold text-white/90 hover:scale-105 transition-transform cursor-pointer flex items-center gap-1.5 border border-primary/20">
                <MapPin className="h-3.5 w-3.5 text-primary" /> 2 Outlets in Mirpur
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="liquid-glass-strong group rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer shadow-[0_0_25px_rgba(197,168,128,0.25)] border border-primary/40"
              >
                <span>Explore Catalog</span>
                <span className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>

              <button
                onClick={onCallClick}
                className="liquid-glass rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white/90 hover:text-white hover:scale-105 transition-all cursor-pointer flex items-center gap-2 border border-primary/20"
              >
                <Phone className="h-4 w-4 text-primary" /> Hotline: 01721-747998
              </button>
            </div>
          </div>

          {/* Bottom Visionary Quote */}
          <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
            <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-bold">
              AUTHENTICITY DIRECTIVE
            </span>
            <div className="text-xs sm:text-sm text-white/80 italic font-serif leading-relaxed">
              "We imagined a realm with no ending — where genuine quality, safety, and taste come first."
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] tracking-widest font-mono text-primary uppercase">
                VAPE STREET BD HQ
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>
          </div>
        </div>

        {/* Right Panel: Open Floating Globe View with Interactive Liquid Hotspots */}
        <div className="flex-1 lg:w-[50%] flex flex-col justify-between relative min-h-[380px]">

          {/* Top Bar: Social Links & Status */}
          <div className="flex items-center justify-between gap-3 relative z-20">
            <div className="liquid-glass rounded-full px-4 py-2 flex items-center gap-3 border border-primary/20">
              <a
                href="https://www.facebook.com/VapeStreetBD"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-primary transition-colors hover:scale-105"
                title="Facebook Page"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="tel:01721747998"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-primary transition-colors hover:scale-105"
                title="Call Hotline"
              >
                <Phone className="h-4 w-4" />
              </a>
              <span className="text-xs font-mono text-white/80">@VapeStreetBD</span>
            </div>

            <div className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">Outlets Open Now</span>
            </div>
          </div>

          {/* Floating Interactive Location Hotspots directly over the 3D Globe */}
          <div className="relative flex-1 flex flex-col justify-center items-center py-8 z-20">

            {/* Center Floating Globe Label Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="liquid-glass-strong rounded-full px-6 py-2.5 border border-primary/40 shadow-2xl flex items-center gap-3 backdrop-blur-xl mb-6"
            >
              <Navigation className="h-4 w-4 text-primary animate-pulse" />
              <span className="font-heading text-xs font-black uppercase tracking-widest text-white">
                Dhaka Outlets Radar
              </span>
            </motion.div>

            {/* Interactive Outlet Floating Cards over Globe */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 px-2 sm:px-6">

              {/* Hotspot 1: Paikpara Branch */}
              <motion.div
                whileHover={{ scale: 1.04, y: -4 }}
                onMouseEnter={() => setActiveSpotlight("branch1")}
                onMouseLeave={() => setActiveSpotlight(null)}
                className="liquid-glass-strong rounded-2xl p-5 border border-primary/30 hover:border-primary transition-all shadow-xl cursor-pointer flex flex-col gap-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-primary uppercase tracking-wider">
                    <MapPin className="h-3.5 w-3.5" /> Outlet 01
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-extrabold uppercase text-white tracking-tight group-hover:text-primary transition-colors">
                    Mirpur Main Outlet
                  </h3>
                  <p className="text-[11px] text-white/70 mt-0.5">Paikpara, Mirpur, Dhaka</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] text-white/60">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-primary" /> 10:00 AM - 11:30 PM
                  </span>
                  <ExternalLink className="h-3 w-3 text-primary group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.div>

              {/* Hotspot 2: Stadium Branch */}
              <motion.div
                whileHover={{ scale: 1.04, y: -4 }}
                onMouseEnter={() => setActiveSpotlight("branch2")}
                onMouseLeave={() => setActiveSpotlight(null)}
                className="liquid-glass-strong rounded-2xl p-5 border border-primary/30 hover:border-primary transition-all shadow-xl cursor-pointer flex flex-col gap-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-primary uppercase tracking-wider">
                    <MapPin className="h-3.5 w-3.5" /> Outlet 02
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-extrabold uppercase text-white tracking-tight group-hover:text-primary transition-colors">
                    Vape Street 2.0
                  </h3>
                  <p className="text-[11px] text-white/70 mt-0.5">Stadium Area, Mirpur 1, Dhaka</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] text-white/60">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-primary" /> 11:00 AM - 11:00 PM
                  </span>
                  <ExternalLink className="h-3 w-3 text-primary group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.div>

            </div>

          </div>

          {/* Bottom Floating Feature Bar */}
          <div className="liquid-glass rounded-[2rem] p-4 flex flex-col sm:flex-row gap-4 border border-primary/30 z-20">
            <div className="liquid-glass flex-1 rounded-2xl p-4 flex items-center gap-3 hover:scale-102 transition-transform cursor-pointer border border-primary/20">
              <span className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center border border-primary/30">
                <Wand2 className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs font-bold text-white uppercase font-heading">Flavor Consultations</div>
                <div className="text-[11px] text-white/70">Tailored Nicotine Selection</div>
              </div>
            </div>

            <div className="liquid-glass flex-1 rounded-2xl p-4 flex items-center gap-3 hover:scale-102 transition-transform cursor-pointer border border-primary/20">
              <span className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center border border-primary/30">
                <BookOpen className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs font-bold text-white uppercase font-heading">Authenticity Archive</div>
                <div className="text-[11px] text-white/70">Official Brand Warranty</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
