'use client';

import React, { useState } from "react";
import { LocationMap } from "@/components/ui/expand-map";
import { GlobeLiquidHero } from "@/components/ui/GlobeLiquidHero";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Phone,
  Facebook,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Copy,
  MessageSquare,
  Sparkles,
  Zap,
  ShieldCheck,
  Radio,
  ExternalLink
} from "lucide-react";

export default function ContactUsPage({
  onBack,
  onNavigateProducts,
}: {
  onBack?: () => void;
  onNavigateProducts?: () => void;
}) {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    branch: "Branch 1 (Paikpara/Mirpur)",
    inquiryType: "Product Availability",
    message: "",
  });

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.hash = "/";
    }
  };

  const handleProductsClick = () => {
    if (onNavigateProducts) {
      onNavigateProducts();
    } else {
      window.location.hash = "/all-products";
    }
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("01721747998");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCallHotline = () => {
    window.location.href = "tel:01721747998";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contactInfo || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: "",
        contactInfo: "",
        branch: "Branch 1 (Paikpara/Mirpur)",
        inquiryType: "Product Availability",
        message: "",
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-black text-[#E1E0CC] selection:bg-primary selection:text-black">
      {/* Background Cyber Ambient Lights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[140px]" />
        {/* Subtle Cyber Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f15_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Liquid Glass Cyberpunk Globe Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 pt-24 sm:pt-28">
        <GlobeLiquidHero
          onExploreClick={handleProductsClick}
          onCallClick={handleCallHotline}
        />
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-8 sm:py-12 flex flex-col gap-16 relative z-10">
        
        {/* Quick Contact & Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone Hotline Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative flex flex-col justify-between rounded-2xl border border-glass bg-[#111111]/90 p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(197,168,128,0.15)] group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                  <Phone className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  Live Hotline
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-accent uppercase tracking-tight">Direct Phone Hotline</h3>
              <p className="text-xs text-accent/60 mt-1">Available 10:00 AM - 11:30 PM for instant order placement & assistance.</p>
              <div className="mt-4 font-mono text-xl font-extrabold text-primary tracking-wider">
                01721-747998
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <a
                href="tel:01721747998"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold uppercase text-black transition-transform hover:scale-102 cursor-pointer"
              >
                <Phone className="h-3.5 w-3.5" /> Call Now
              </a>
              <button
                onClick={handleCopyPhone}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-glass bg-black px-3.5 py-2.5 text-xs font-semibold text-accent/80 hover:border-primary hover:text-primary transition-all cursor-pointer"
                title="Copy Phone Number"
              >
                {copiedPhone ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                {copiedPhone ? "Copied!" : "Copy"}
              </button>
            </div>
          </motion.div>

          {/* Facebook Official Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative flex flex-col justify-between rounded-2xl border border-glass bg-[#111111]/90 p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(197,168,128,0.15)] group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
                  <Facebook className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                  Official Community
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-accent uppercase tracking-tight">Facebook Page</h3>
              <p className="text-xs text-accent/60 mt-1">Join our active community for stock drops, flash sales & giveaways.</p>
              <div className="mt-4 font-mono text-base font-bold text-accent">
                facebook.com/VapeStreetBD
              </div>
            </div>

            <div className="mt-6">
              <a
                href="https://www.facebook.com/VapeStreetBD"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-2.5 text-xs font-bold uppercase text-blue-400 transition-all hover:bg-blue-500 hover:text-white cursor-pointer"
              >
                Visit Facebook Page <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Guaranteed Originality Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative flex flex-col justify-between rounded-2xl border border-glass bg-[#111111]/90 p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(197,168,128,0.15)] group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-[10px] font-bold text-primary uppercase tracking-widest">
                  100% Authentic
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-accent uppercase tracking-tight">Authenticity Assurance</h3>
              <p className="text-xs text-accent/60 mt-1">Every device & e-liquid bottle is imported from official manufacturers with scratch-off QR verification.</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-primary">
                <Sparkles className="h-4 w-4" /> Official Brand Warranty Included
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleProductsClick}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-2.5 text-xs font-bold uppercase text-primary transition-all hover:bg-primary hover:text-black cursor-pointer"
              >
                Browse Authentic Products
              </button>
            </div>
          </motion.div>
        </div>

        {/* Physical Branch Location Reveal Section */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center">
            <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary text-glow">
              Physical Stores
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-black uppercase tracking-tight text-accent mt-1 text-glow">
              Our 2 Outlets in Dhaka
            </h2>
            <p className="text-xs sm:text-sm text-accent/70 mt-2 max-w-lg">
              Interactive 3D location reveal cards. Hover & click to expand full coordinates and direct Google Maps navigation!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 items-center justify-items-center">
            {/* Branch 1 Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center gap-6 rounded-3xl border border-glass bg-[#111111] p-6 sm:p-8 w-full max-w-md shadow-2xl relative overflow-hidden group"
            >
              <div className="flex items-center justify-between w-full border-b border-glass pb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs">
                    01
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-extrabold uppercase tracking-tight text-accent">
                      Vape Street BD (Main)
                    </h3>
                    <span className="text-[11px] text-primary font-medium">Paikpara / Mirpur Outlet</span>
                  </div>
                </div>
                <MapPin className="h-5 w-5 text-primary" />
              </div>

              <div className="py-2 flex justify-center w-full">
                <LocationMap
                  location="Vape Street BD - Main Branch"
                  coordinates="23.7852° N, 90.3585° E"
                  mapUrl="https://www.google.com/maps/place/Vape+Street+BD/@23.7852119,90.3559802,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c1c465215ced:0xbb1014d74dd537d4!8m2!3d23.785207!4d90.3585605!16s%2Fg%2F11vcfrbnmn?entry=ttu"
                />
              </div>

              <div className="flex flex-col gap-2 w-full pt-4 border-t border-glass text-xs">
                <div className="flex items-center justify-between text-accent/80">
                  <span className="flex items-center gap-1.5 text-accent/60">
                    <Clock className="h-3.5 w-3.5 text-primary" /> Store Hours:
                  </span>
                  <span className="font-bold text-accent">10:00 AM - 11:30 PM Daily</span>
                </div>
                <div className="flex items-center justify-between text-accent/80">
                  <span className="flex items-center gap-1.5 text-accent/60">
                    <Phone className="h-3.5 w-3.5 text-primary" /> Branch Contact:
                  </span>
                  <span className="font-mono font-bold text-primary">01721-747998</span>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/place/Vape+Street+BD/@23.7852119,90.3559802,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c1c465215ced:0xbb1014d74dd537d4!8m2!3d23.785207!4d90.3585605!16s%2Fg%2F11vcfrbnmn?entry=ttu"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary/10 border border-primary/30 px-4 py-2.5 text-xs font-bold uppercase text-primary transition-all hover:bg-primary hover:text-black cursor-pointer"
              >
                Navigate to Main Outlet <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </motion.div>

            {/* Branch 2 Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center gap-6 rounded-3xl border border-glass bg-[#111111] p-6 sm:p-8 w-full max-w-md shadow-2xl relative overflow-hidden group"
            >
              <div className="flex items-center justify-between w-full border-b border-glass pb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs">
                    02
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-extrabold uppercase tracking-tight text-accent">
                      Vape Street BD 2.0
                    </h3>
                    <span className="text-[11px] text-primary font-medium">Mirpur 1 / Stadium Outlet</span>
                  </div>
                </div>
                <MapPin className="h-5 w-5 text-primary" />
              </div>

              <div className="py-2 flex justify-center w-full">
                <LocationMap
                  location="Vape Street BD 2.0 - Stadium Branch"
                  coordinates="23.7943° N, 90.3526° E"
                  mapUrl="https://www.google.com/maps/place/Vape+Street+BD+2.0/@23.7943136,90.350072,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c10008aad1c3:0x492336a954688838!8m2!3d23.7943087!4d90.3526523!16s%2Fg%2F11mstyf09q?entry=ttu"
                />
              </div>

              <div className="flex flex-col gap-2 w-full pt-4 border-t border-glass text-xs">
                <div className="flex items-center justify-between text-accent/80">
                  <span className="flex items-center gap-1.5 text-accent/60">
                    <Clock className="h-3.5 w-3.5 text-primary" /> Store Hours:
                  </span>
                  <span className="font-bold text-accent">11:00 AM - 11:00 PM Daily</span>
                </div>
                <div className="flex items-center justify-between text-accent/80">
                  <span className="flex items-center gap-1.5 text-accent/60">
                    <Phone className="h-3.5 w-3.5 text-primary" /> Branch Contact:
                  </span>
                  <span className="font-mono font-bold text-primary">01721-747998</span>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/place/Vape+Street+BD+2.0/@23.7943136,90.350072,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c10008aad1c3:0x492336a954688838!8m2!3d23.7943087!4d90.3526523!16s%2Fg%2F11mstyf09q?entry=ttu"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary/10 border border-primary/30 px-4 py-2.5 text-xs font-bold uppercase text-primary transition-all hover:bg-primary hover:text-black cursor-pointer"
              >
                Navigate to Branch 2.0 <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Interactive Cyberpunk Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border border-glass bg-[#111111]/90 p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-md"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
            {/* Left Info Column */}
            <div className="flex flex-col gap-6 md:w-5/12">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                  <MessageSquare className="h-3.5 w-3.5" /> Interactive Inquiry
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-accent mt-3 text-glow">
                  Send A Message
                </h3>
                <p className="text-xs sm:text-sm text-accent/70 mt-2 leading-relaxed">
                  Have questions regarding specific salt nic flavors, pod compatibility, or wholesale inquiries? Fill out the encrypted terminal form.
                </p>
              </div>

              <div className="flex flex-col gap-4 border-t border-glass pt-6 text-xs text-accent/80">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Zap className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-bold text-accent">Average Response Time</div>
                    <div className="text-primary font-mono text-[11px]">Under 15 Minutes (During Business Hours)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-bold text-accent">Order Assistance</div>
                    <div className="text-accent/60 text-[11px]">Delivery support available all across Bangladesh</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-primary/40 bg-primary/10 my-auto h-full min-h-[300px]"
                  >
                    <CheckCircle2 className="h-14 w-14 text-primary animate-bounce mb-3" />
                    <h4 className="font-heading text-xl font-black uppercase tracking-tight text-accent">
                      Transmission Received!
                    </h4>
                    <p className="text-xs text-accent/80 mt-2 max-w-sm">
                      Thank you for contacting Vape Street BD. Our team will get back to you shortly via phone/email.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-accent/80">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Tanvir Ahmed"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="rounded-xl border border-glass bg-black/60 px-4 py-3 text-xs text-accent placeholder:text-accent/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        />
                      </div>

                      {/* Phone / Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-accent/80">
                          Phone Number or Email *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 01700-000000"
                          value={formData.contactInfo}
                          onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                          className="rounded-xl border border-glass bg-black/60 px-4 py-3 text-xs text-accent placeholder:text-accent/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Target Outlet */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-accent/80">
                          Target Branch
                        </label>
                        <select
                          value={formData.branch}
                          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                          className="rounded-xl border border-glass bg-black px-4 py-3 text-xs font-semibold text-accent focus:border-primary focus:outline-none transition-all cursor-pointer"
                        >
                          <option value="Branch 1 (Paikpara/Mirpur)">Branch 1 (Paikpara/Mirpur)</option>
                          <option value="Branch 2.0 (Stadium/Mirpur 1)">Branch 2.0 (Mirpur 1)</option>
                          <option value="Online Order Hotline">Online Order Hotline</option>
                        </select>
                      </div>

                      {/* Inquiry Type */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-accent/80">
                          Inquiry Type
                        </label>
                        <select
                          value={formData.inquiryType}
                          onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                          className="rounded-xl border border-glass bg-black px-4 py-3 text-xs font-semibold text-accent focus:border-primary focus:outline-none transition-all cursor-pointer"
                        >
                          <option value="Product Availability">Product Availability</option>
                          <option value="E-Liquid Flavor Consultation">E-Liquid Flavor Consultation</option>
                          <option value="Hardware & Warranty">Hardware & Warranty</option>
                          <option value="Wholesale & Bulk Order">Wholesale & Bulk Order</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-accent/80">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Write your message or product query here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="rounded-xl border border-glass bg-black/60 px-4 py-3 text-xs text-accent placeholder:text-accent/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="group flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(197,168,128,0.3)] cursor-pointer mt-2"
                    >
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      Send Cyber Transmission
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
