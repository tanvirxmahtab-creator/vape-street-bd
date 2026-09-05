'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit3,
  Save,
  RotateCcw,
  X,
  CheckCircle2,
  ShieldAlert,
  ListTree,
  ChevronDown,
  ChevronUp,
  Search,
  Home,
  Scroll,
  Info,
  Phone,
  Layers,
  Sparkles,
} from "lucide-react";
import { useSiteContent, defaultSiteContent, SiteContentMap } from "@/src/lib/siteContent";

interface VisualEditorBarProps {
  onOpenDashboard?: () => void;
  onTriggerAgeGate?: () => void;
}

export function VisualEditorBar({ onOpenDashboard, onTriggerAgeGate }: VisualEditorBarProps) {
  const {
    isVisualEditMode,
    setIsVisualEditMode,
    content,
    updateContent,
    updateSingleField,
    resetToDefaults,
    modifiedCount,
    activeEditField,
    setActiveEditField,
  } = useSiteContent();

  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [searchQuery, setSearchQuery] = useState("");

  const isAdminAuth = typeof window !== "undefined" && sessionStorage.getItem("vape_street_admin_auth") === "true";

  // Auto-open drawer when a text element is clicked on the live page
  useEffect(() => {
    if (activeEditField) {
      setIsDrawerOpen(true);
      setActiveSection(activeEditField.section);
    }
  }, [activeEditField]);

  if (!isVisualEditMode || !isAdminAuth) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    await updateContent(content);
    setSaving(false);
    showToast("All visual text changes saved successfully!");
  };

  const handleResetAll = async () => {
    setSaving(true);
    await resetToDefaults();
    setSaving(false);
    showToast("All text content reset to defaults!");
  };

  const handleExit = () => {
    setIsVisualEditMode(false);
    setActiveEditField(null);
    if (onOpenDashboard) {
      onOpenDashboard();
    }
  };

  const sectionsConfig = [
    { id: "hero", title: "Home Hero & Navbar", icon: Home },
    { id: "scrollReveals", title: "3D Scroll Reveals (1-6)", icon: Scroll },
    { id: "productsSection", title: "Catalog Section", icon: Layers },
    { id: "aboutUs", title: "About Us Story", icon: Info },
    { id: "contactUs", title: "Contact Us & Outlets", icon: Phone },
    { id: "footer", title: "Footer & Legal Notices", icon: Sparkles },
    { id: "ageGate", title: "18+ Age Gate & Loader", icon: ShieldAlert },
  ];

  /* Render single field item inside inspector drawer */
  const renderDrawerItem = (
    secKey: keyof SiteContentMap,
    fieldKey: string,
    fieldLabel: string,
    isMultiline: boolean = false
  ) => {
    // @ts-ignore
    const currentVal = content[secKey]?.[fieldKey] || "";
    // @ts-ignore
    const defaultVal = defaultSiteContent[secKey]?.[fieldKey] || "";
    const isModified = currentVal !== defaultVal;
    const isFocused = activeEditField?.section === secKey && activeEditField?.field === fieldKey;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = fieldLabel.toLowerCase().includes(q) || currentVal.toLowerCase().includes(q);
      if (!match) return null;
    }

    return (
      <div
        key={`${secKey}-${fieldKey}`}
        className={`flex flex-col gap-1.5 rounded-2xl border p-3.5 transition-all ${
          isFocused
            ? "border-[#C5A880] bg-[#C5A880]/15 shadow-[0_0_20px_rgba(197,168,128,0.25)]"
            : "border-glass bg-[#141414] hover:border-[#C5A880]/40"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A880]">
              {fieldLabel}
            </span>
            {isModified && (
              <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[9px] font-bold uppercase text-amber-400">
                Modified
              </span>
            )}
          </div>

          {isModified && (
            <button
              onClick={() => updateSingleField(secKey, fieldKey, defaultVal)}
              className="inline-flex items-center gap-1 text-[10px] text-accent/50 hover:text-[#C5A880] transition-colors cursor-pointer"
              title="Reset field to default"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
          )}
        </div>

        {isMultiline ? (
          <textarea
            rows={3}
            value={currentVal}
            onChange={(e) => updateSingleField(secKey, fieldKey, e.target.value)}
            onFocus={() => setActiveEditField({ section: secKey, field: fieldKey, label: fieldLabel, isMultiline })}
            className="w-full rounded-xl border border-glass bg-[#0F0F0F] p-2.5 text-xs font-sans text-accent focus:border-[#C5A880] focus:outline-none transition-colors"
          />
        ) : (
          <input
            type="text"
            value={currentVal}
            onChange={(e) => updateSingleField(secKey, fieldKey, e.target.value)}
            onFocus={() => setActiveEditField({ section: secKey, field: fieldKey, label: fieldLabel, isMultiline })}
            className="w-full rounded-xl border border-glass bg-[#0F0F0F] px-3 py-2 text-xs font-sans text-accent focus:border-[#C5A880] focus:outline-none transition-colors"
          />
        )}
      </div>
    );
  };

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 right-6 z-[10080] flex items-center gap-3 rounded-2xl border border-[#C5A880]/50 bg-[#141414] px-5 py-3 shadow-2xl text-xs font-bold text-[#E1E0CC]"
          >
            <CheckCircle2 className="h-5 w-5 text-[#C5A880]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Fixed Elementor Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-[10040] flex items-center justify-between border-b border-[#C5A880]/40 bg-[#0C0C0C]/95 px-4 py-2.5 sm:px-8 backdrop-blur-xl shadow-2xl text-[#E1E0CC] selection:bg-[#C5A880] selection:text-black">
        {/* Left Branding & Mode Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-[#C5A880]/40 bg-[#C5A880]/15 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#C5A880]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <Edit3 className="h-3.5 w-3.5" />
            <span>Elementor Visual Mode</span>
          </div>

          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              isDrawerOpen
                ? "border-[#C5A880] bg-[#C5A880] text-black shadow-[0_0_15px_rgba(197,168,128,0.4)]"
                : "border-glass bg-[#181818] text-accent/80 hover:border-[#C5A880] hover:text-[#C5A880]"
            }`}
          >
            <ListTree className="h-3.5 w-3.5" />
            <span>Content Drawer</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {modifiedCount > 0 && (
            <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-[11px] font-bold text-amber-400">
              {modifiedCount} edited
            </span>
          )}

          {onTriggerAgeGate && (
            <button
              onClick={onTriggerAgeGate}
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 hover:bg-amber-500/20 transition-colors cursor-pointer"
            >
              <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
              <span>Preview 18+ Gate</span>
            </button>
          )}

          <button
            onClick={handleResetAll}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>

          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#C5A880] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-black shadow-[0_0_20px_rgba(197,168,128,0.4)] hover:bg-amber-300 transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" /> Save All
          </button>

          <button
            onClick={handleExit}
            className="inline-flex items-center gap-1.5 rounded-xl border border-glass bg-[#1A1A1A] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:border-[#C5A880] hover:text-[#C5A880] transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" /> Exit Visual Mode
          </button>
        </div>
      </div>

      {/* Right Side Inspector Drawer Panel */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-12 right-0 bottom-0 z-[10050] w-full max-w-md border-l border-[#C5A880]/30 bg-[#0A0A0A]/95 p-5 shadow-2xl backdrop-blur-2xl overflow-y-auto flex flex-col text-[#E1E0CC] selection:bg-[#C5A880] selection:text-black"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-glass pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-[#C5A880]" />
                <h3 className="font-heading text-sm font-black uppercase tracking-tight text-[#E1E0CC]">
                  Live Visual Inspector
                </h3>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#181818] text-accent/60 hover:text-accent cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Selected Field Alert Pill */}
            {activeEditField ? (
              <div className="mb-4 flex items-center justify-between rounded-xl border border-[#C5A880]/50 bg-[#C5A880]/15 p-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880]">Active Selection:</span>
                  <p className="font-bold text-white line-clamp-1">{activeEditField.label}</p>
                </div>
                <button
                  onClick={() => setActiveEditField(null)}
                  className="text-[10px] text-accent/60 hover:text-accent underline cursor-pointer"
                >
                  Clear
                </button>
              </div>
            ) : (
              <p className="text-[11px] text-accent/50 mb-4">
                Click any text on the website to auto-select, or edit fields below live!
              </p>
            )}

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-accent/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any text property..."
                className="w-full rounded-xl border border-glass bg-[#141414] py-2 pl-9 pr-3 text-xs font-sans text-accent placeholder:text-accent/30 focus:border-[#C5A880] focus:outline-none"
              />
            </div>

            {/* Accordion Sections */}
            <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
              
              {/* Hero & Navbar */}
              <div className="flex flex-col gap-2 rounded-2xl border border-glass bg-[#111111] p-4">
                <div
                  onClick={() => setActiveSection(activeSection === "hero" ? "" : "hero")}
                  className="flex items-center justify-between cursor-pointer font-heading text-xs font-bold uppercase tracking-wider text-[#C5A880]"
                >
                  <span className="flex items-center gap-2">
                    <Home className="h-4 w-4" /> Home Hero & Navbar
                  </span>
                  {activeSection === "hero" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
                {(activeSection === "hero" || searchQuery) && (
                  <div className="mt-2 flex flex-col gap-3">
                    {renderDrawerItem("navbar", "brandTitle", "Navbar Brand Title")}
                    {renderDrawerItem("navbar", "brandSubtitle", "Navbar Tagline")}
                    {renderDrawerItem("navbar", "phone", "Hotline Phone Number")}
                    {renderDrawerItem("hero", "badge", "Hero Badge Tag")}
                    {renderDrawerItem("hero", "title", "Hero Main Title")}
                    {renderDrawerItem("hero", "subtitle", "Hero Subtitle Description", true)}
                    {renderDrawerItem("hero", "ctaText", "Hero CTA Button")}
                  </div>
                )}
              </div>

              {/* 3D Scroll Story Reveals */}
              <div className="flex flex-col gap-2 rounded-2xl border border-glass bg-[#111111] p-4">
                <div
                  onClick={() => setActiveSection(activeSection === "scrollReveals" ? "" : "scrollReveals")}
                  className="flex items-center justify-between cursor-pointer font-heading text-xs font-bold uppercase tracking-wider text-[#C5A880]"
                >
                  <span className="flex items-center gap-2">
                    <Scroll className="h-4 w-4" /> 3D Scroll Reveals (1-6)
                  </span>
                  {activeSection === "scrollReveals" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
                {(activeSection === "scrollReveals" || searchQuery) && (
                  <div className="mt-2 flex flex-col gap-3">
                    {renderDrawerItem("hero", "scrollReveal1Tag", "Frame 1 Tag")}
                    {renderDrawerItem("hero", "scrollReveal1Title", "Frame 1 Title")}
                    {renderDrawerItem("hero", "scrollReveal1Desc", "Frame 1 Description", true)}

                    {renderDrawerItem("hero", "scrollReveal2Tag", "Frame 2 Tag")}
                    {renderDrawerItem("hero", "scrollReveal2Title", "Frame 2 Title")}
                    {renderDrawerItem("hero", "scrollReveal2Desc", "Frame 2 Description", true)}

                    {renderDrawerItem("hero", "scrollReveal3Tag", "Frame 3 Tag")}
                    {renderDrawerItem("hero", "scrollReveal3Title", "Frame 3 Title")}
                    {renderDrawerItem("hero", "scrollReveal3Desc", "Frame 3 Description", true)}

                    {renderDrawerItem("hero", "scrollReveal4Tag", "Frame 4 Tag")}
                    {renderDrawerItem("hero", "scrollReveal4Title", "Frame 4 Title")}
                    {renderDrawerItem("hero", "scrollReveal4Desc", "Frame 4 Description", true)}

                    {renderDrawerItem("hero", "scrollReveal5Tag", "Frame 5 Tag")}
                    {renderDrawerItem("hero", "scrollReveal5Title", "Frame 5 Title")}
                    {renderDrawerItem("hero", "scrollReveal5Desc", "Frame 5 Description", true)}

                    {renderDrawerItem("hero", "scrollReveal6Tag", "Frame 6 Tag")}
                    {renderDrawerItem("hero", "scrollReveal6Title", "Frame 6 Title")}
                    {renderDrawerItem("hero", "scrollReveal6Desc", "Frame 6 Subtitle")}
                  </div>
                )}
              </div>

              {/* Products Section */}
              <div className="flex flex-col gap-2 rounded-2xl border border-glass bg-[#111111] p-4">
                <div
                  onClick={() => setActiveSection(activeSection === "productsSection" ? "" : "productsSection")}
                  className="flex items-center justify-between cursor-pointer font-heading text-xs font-bold uppercase tracking-wider text-[#C5A880]"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="h-4 w-4" /> Catalog Section
                  </span>
                  {activeSection === "productsSection" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
                {(activeSection === "productsSection" || searchQuery) && (
                  <div className="mt-2 flex flex-col gap-3">
                    {renderDrawerItem("productsSection", "title", "Section Main Title")}
                    {renderDrawerItem("productsSection", "subtitle", "Section Subtitle", true)}
                  </div>
                )}
              </div>

              {/* About Us */}
              <div className="flex flex-col gap-2 rounded-2xl border border-glass bg-[#111111] p-4">
                <div
                  onClick={() => setActiveSection(activeSection === "aboutUs" ? "" : "aboutUs")}
                  className="flex items-center justify-between cursor-pointer font-heading text-xs font-bold uppercase tracking-wider text-[#C5A880]"
                >
                  <span className="flex items-center gap-2">
                    <Info className="h-4 w-4" /> About Us & Founder Bio
                  </span>
                  {activeSection === "aboutUs" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
                {(activeSection === "aboutUs" || searchQuery) && (
                  <div className="mt-2 flex flex-col gap-3">
                    {renderDrawerItem("aboutUs", "headerTag", "Header Tagline")}
                    {renderDrawerItem("aboutUs", "headerTitle", "Header Main Title")}
                    {renderDrawerItem("aboutUs", "founderName", "Founder Title")}
                    {renderDrawerItem("aboutUs", "founderTagline", "Founder Subtitle")}
                    {renderDrawerItem("aboutUs", "founderQuote", "Founder Quote")}
                    {renderDrawerItem("aboutUs", "founderBio", "Founder Biography", true)}
                    {renderDrawerItem("aboutUs", "chapter1Title", "Chapter 1 Title")}
                    {renderDrawerItem("aboutUs", "chapter1Text1", "Chapter 1 Text 1", true)}
                    {renderDrawerItem("aboutUs", "chapter1Text2", "Chapter 1 Text 2", true)}
                    {renderDrawerItem("aboutUs", "chapter2Title", "Chapter 2 Title")}
                    {renderDrawerItem("aboutUs", "chapter2Text1", "Chapter 2 Text 1", true)}
                    {renderDrawerItem("aboutUs", "chapter2Text2", "Chapter 2 Text 2", true)}
                  </div>
                )}
              </div>

              {/* Contact Us */}
              <div className="flex flex-col gap-2 rounded-2xl border border-glass bg-[#111111] p-4">
                <div
                  onClick={() => setActiveSection(activeSection === "contactUs" ? "" : "contactUs")}
                  className="flex items-center justify-between cursor-pointer font-heading text-xs font-bold uppercase tracking-wider text-[#C5A880]"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Contact Us & Outlets
                  </span>
                  {activeSection === "contactUs" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
                {(activeSection === "contactUs" || searchQuery) && (
                  <div className="mt-2 flex flex-col gap-3">
                    {renderDrawerItem("contactUs", "hotlineTitle", "Hotline Box Title")}
                    {renderDrawerItem("contactUs", "hotlineDesc", "Hotline Availability Description")}
                    {renderDrawerItem("contactUs", "phone", "Direct Phone Hotline")}
                    {renderDrawerItem("contactUs", "branch1Title", "Branch 1 Title")}
                    {renderDrawerItem("contactUs", "branch1Sub", "Branch 1 Subtitle")}
                    {renderDrawerItem("contactUs", "branch1Hours", "Branch 1 Store Hours")}
                    {renderDrawerItem("contactUs", "branch2Title", "Branch 2 Title")}
                    {renderDrawerItem("contactUs", "branch2Sub", "Branch 2 Subtitle")}
                    {renderDrawerItem("contactUs", "branch2Hours", "Branch 2 Store Hours")}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex flex-col gap-2 rounded-2xl border border-glass bg-[#111111] p-4">
                <div
                  onClick={() => setActiveSection(activeSection === "footer" ? "" : "footer")}
                  className="flex items-center justify-between cursor-pointer font-heading text-xs font-bold uppercase tracking-wider text-[#C5A880]"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" /> Footer & Store Notices
                  </span>
                  {activeSection === "footer" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
                {(activeSection === "footer" || searchQuery) && (
                  <div className="mt-2 flex flex-col gap-3">
                    {renderDrawerItem("footer", "tagline", "Footer Description", true)}
                    {renderDrawerItem("footer", "nicotineDisclaimer", "Health Warning Notice", true)}
                    {renderDrawerItem("footer", "copyright", "Legal Copyright")}
                    {renderDrawerItem("footer", "address", "Physical Store Address")}
                  </div>
                )}
              </div>

              {/* 18+ Age Gate & Loader */}
              <div className="flex flex-col gap-2 rounded-2xl border border-glass bg-[#111111] p-4">
                <div
                  onClick={() => setActiveSection(activeSection === "ageGate" ? "" : "ageGate")}
                  className="flex items-center justify-between cursor-pointer font-heading text-xs font-bold uppercase tracking-wider text-[#C5A880]"
                >
                  <span className="flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4" /> 18+ Age Gate & Loader
                  </span>
                  {activeSection === "ageGate" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
                {(activeSection === "ageGate" || searchQuery) && (
                  <div className="mt-2 flex flex-col gap-3">
                    {renderDrawerItem("ageGate", "badge", "Gate Badge Tag")}
                    {renderDrawerItem("ageGate", "title", "Gate Title")}
                    {renderDrawerItem("ageGate", "warningHeadline", "Nicotine Warning Headline", true)}
                    {renderDrawerItem("ageGate", "warningBody", "Restriction Body Text", true)}
                    {renderDrawerItem("ageGate", "confirmBtn", "Accept Button Text")}
                    {renderDrawerItem("ageGate", "declineBtn", "Decline Button Text")}
                    {renderDrawerItem("loader", "text", "Theater Loader Handwriting Text")}
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
