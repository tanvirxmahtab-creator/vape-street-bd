'use client';

import React from "react";
import { 
  Crown, 
  MapPin, 
  Phone, 
  Facebook, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight,
  ExternalLink,
  Flame,
  Droplets,
  Zap
} from "lucide-react";

interface FooterProps {
  onNavigateHome?: () => void;
  onNavigateProducts?: () => void;
  onNavigateAbout?: () => void;
  onNavigateContact?: () => void;
  onNavigateAdmin?: () => void;
}

export function Footer({
  onNavigateHome,
  onNavigateProducts,
  onNavigateAbout,
  onNavigateContact,
  onNavigateAdmin,
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050505] text-[#E1E0CC] border-t border-primary/20 overflow-hidden pt-16 pb-12">
      {/* Cyber Ambient Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand Info Column (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="/shop-logo.png"
                alt="Vape Street BD Logo"
                className="h-12 w-12 object-cover rounded-full border border-primary/40 shadow-[0_0_20px_rgba(197,168,128,0.3)] bg-black"
              />
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl tracking-wider text-gold-gradient leading-tight">
                  VAPE STREET <span className="text-white">BD</span>
                </span>
                <span className="text-[10px] font-mono tracking-[0.25em] text-primary/80 uppercase">
                  Dhaka's Luxury Vape Shop
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-accent/70 leading-relaxed font-light">
              Vape Street BD is Bangladesh’s premier luxury vape shop. Founded by Pallab, we import 100% authentic devices, pod systems, and e-liquids directly from certified manufacturers in the USA, UK, China, and Dubai.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/VapeStreetBD"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white text-xs font-bold transition-all group"
              >
                <Facebook className="h-4 w-4" />
                <span>Facebook Page</span>
                <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="tel:01721747998"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-black text-xs font-mono font-bold transition-all"
              >
                <Phone className="h-4 w-4" />
                <span>01721-747998</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button onClick={onNavigateHome} className="hover:text-primary transition-colors cursor-pointer">
                  Home Storefront
                </button>
              </li>
              <li>
                <button onClick={onNavigateProducts} className="hover:text-primary transition-colors cursor-pointer">
                  All Products & Hardware
                </button>
              </li>
              <li>
                <button onClick={onNavigateAbout} className="hover:text-primary transition-colors cursor-pointer">
                  About Us & Story
                </button>
              </li>
              <li>
                <button onClick={onNavigateContact} className="hover:text-primary transition-colors cursor-pointer">
                  Contact Us & Branches
                </button>
              </li>
              <li>
                <button onClick={onNavigateAdmin} className="text-accent/50 hover:text-primary transition-colors cursor-pointer">
                  Admin Dashboard Login
                </button>
              </li>
            </ul>
          </div>

          {/* Product Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Popular Collections
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-accent/80">
              <li className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <button onClick={onNavigateProducts} className="hover:text-primary transition-colors cursor-pointer">
                  Pod Systems & Devices
                </button>
              </li>
              <li className="flex items-center gap-2">
                <Droplets className="h-3.5 w-3.5 text-primary" />
                <button onClick={onNavigateProducts} className="hover:text-primary transition-colors cursor-pointer">
                  Salt Nic & Freebase E-Liquids
                </button>
              </li>
              <li className="flex items-center gap-2">
                <Flame className="h-3.5 w-3.5 text-primary" />
                <button onClick={onNavigateProducts} className="hover:text-primary transition-colors cursor-pointer">
                  High Performance Mods & Tanks
                </button>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <button onClick={onNavigateProducts} className="hover:text-primary transition-colors cursor-pointer">
                  Disposable Vapes & Flavors
                </button>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <button onClick={onNavigateProducts} className="hover:text-primary transition-colors cursor-pointer">
                  Coils, Pods & Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Store Outlets Column (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Physical Outlets (Dhaka)
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl border border-glass bg-black/60 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span>Vape Street BD – Main Branch</span>
                </div>
                <p className="text-accent/60 text-[11px] leading-relaxed">
                  Shop 101, 1st Floor, Desh Shomoy Super Market, Natun Bazar, Kallyanpur, Mirpur, Dhaka – 1216, Bangladesh
                </p>
              </div>

              <div className="p-3 rounded-xl border border-glass bg-black/60 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span>Vape Street BD 2.0 – Mirpur 1</span>
                </div>
                <p className="text-accent/60 text-[11px] leading-relaxed">
                  49/10 South Bishil, Mirpur-1, Dhaka – 1216, Bangladesh
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Authenticity & Age Notice Bar */}
        <div className="p-6 rounded-2xl border border-primary/25 bg-gradient-to-r from-black via-[#0d0d12] to-black flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h5 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                100% Verified Authentic Sourcing
              </h5>
              <p className="text-xs text-accent/70 mt-0.5">
                Directly imported from USA, UK, China & Dubai. Zero replicas or fake devices guaranteed.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
              21+ Age Requirement
            </span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl border border-glass bg-black hover:border-primary text-primary transition-all cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-glass flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-accent/50 font-mono">
          <div className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-primary" />
            <span>© {new Date().getFullYear()} Vape Street BD. All rights reserved.</span>
          </div>
          <div>
            <span>Crafted for Connoisseurs in Bangladesh</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
