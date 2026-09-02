'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  ShoppingBag, 
  Info, 
  PhoneCall, 
  ShieldCheck, 
  Menu, 
  X, 
  Crown,
  Phone,
  UserCheck,
  ChevronRight
} from "lucide-react";

interface NavbarProps {
  currentPath: string;
  onNavigateHome: () => void;
  onNavigateProducts: () => void;
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
  onNavigateAdmin: () => void;
}

export function Navbar({
  currentPath,
  onNavigateHome,
  onNavigateProducts,
  onNavigateAbout,
  onNavigateContact,
  onNavigateAdmin,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: Home, action: onNavigateHome },
    { name: "Products", path: "/all-products", icon: ShoppingBag, action: onNavigateProducts },
    { name: "About Us", path: "/about", icon: Info, action: onNavigateAbout },
    { name: "Contact Us", path: "/contact", icon: PhoneCall, action: onNavigateContact },
  ];

  const isActive = (path: string) => {
    if (path === "/" && (currentPath === "/" || currentPath === "")) return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-primary/30 shadow-[0_8px_40px_rgba(0,0,0,0.8)] py-3"
          : "bg-black/40 backdrop-blur-lg border-b border-primary/15 py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Top Left: Shop Logo & Prominent Title */}
        <button
          onClick={() => handleNavClick(onNavigateHome)}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-[#E1E0CC] to-primary opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src="/shop-logo.png"
              alt="Vape Street BD Logo"
              className="relative h-10 w-10 sm:h-12 sm:w-12 object-cover rounded-full border border-primary/40 shadow-md bg-black"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-lg sm:text-2xl lg:text-3xl tracking-wider text-gold-gradient leading-tight drop-shadow-[0_0_20px_rgba(197,168,128,0.35)] group-hover:scale-102 transition-transform">
              VAPE STREET <span className="text-white">BD</span>
            </span>
            <span className="text-[9px] sm:text-[11px] font-mono tracking-[0.25em] text-primary/80 uppercase">
              Luxury Vape Shop
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-primary/20 backdrop-blur-md shadow-inner">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.action)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  active
                    ? "text-black font-extrabold shadow-[0_0_20px_rgba(197,168,128,0.5)]"
                    : "text-accent/80 hover:text-primary hover:bg-primary/10"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFF0D4] via-[#C5A880] to-[#9A7B4F]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className={`relative z-10 h-3.5 w-3.5 ${active ? "text-black" : "text-primary"}`} />
                <span className="relative z-10">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section: Hotline & Admin Access */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Hotline Button */}
          <a
            href="tel:01721747998"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary hover:text-black text-primary text-xs font-mono font-bold tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(197,168,128,0.15)] group"
          >
            <Phone className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
            <span className="hidden lg:inline">Hotline:</span>
            <span>01721-747998</span>
          </a>

          {/* Admin Button */}
          <button
            onClick={() => handleNavClick(onNavigateAdmin)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-glass bg-black/60 hover:border-primary text-accent/70 hover:text-primary text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            title="Admin Portal"
          >
            <UserCheck className="h-3.5 w-3.5 text-primary" />
            <span className="hidden lg:inline">Admin</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="tel:01721747998"
            className="p-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs"
            title="Call Hotline"
          >
            <Phone className="h-4 w-4" />
          </a>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-primary/30 bg-black/80 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Animated Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-b border-primary/20 bg-black/95 backdrop-blur-2xl px-6 py-6 space-y-4 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.action)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      active
                        ? "bg-primary text-black shadow-lg"
                        : "text-accent/90 hover:bg-primary/10 hover:text-primary border border-glass"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${active ? "text-black" : "text-primary"}`} />
                      <span>{item.name}</span>
                    </div>
                    <ChevronRight className={`h-4 w-4 ${active ? "text-black" : "text-accent/50"}`} />
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-primary/20 flex flex-col gap-3">
              <a
                href="tel:01721747998"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/20 border border-primary/40 text-primary text-xs font-mono font-bold uppercase tracking-widest"
              >
                <Phone className="h-4 w-4" />
                Call Hotline: 01721-747998
              </a>

              <button
                onClick={() => handleNavClick(onNavigateAdmin)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-glass bg-black text-accent/80 text-xs font-semibold uppercase tracking-wider"
              >
                <UserCheck className="h-4 w-4 text-primary" />
                Admin Dashboard Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
