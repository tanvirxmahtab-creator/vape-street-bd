'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Save,
  RotateCcw,
  Search,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Home,
  Scroll,
  Info,
  Phone,
  Layers,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { useSiteContent, defaultSiteContent, SiteContentMap } from "@/src/lib/siteContent";

export function TextCopyEditor() {
  const { content, updateContent, resetToDefaults } = useSiteContent();
  const [editableContent, setEditableContent] = useState<SiteContentMap>(content);
  const [activeTab, setActiveTab] = useState<"ageGate" | "hero" | "scrollReveals" | "aboutUs" | "contactUs" | "footer">("ageGate");
  const [searchQuery, setSearchQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    setEditableContent(content);
  }, [content]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateContent(editableContent);
    setSaving(false);
    showToast("Website copy & text saved successfully!");
  };

  const handleResetAll = async () => {
    setSaving(true);
    await resetToDefaults();
    setEditableContent(defaultSiteContent);
    setSaving(false);
    setShowResetConfirm(false);
    showToast("All text content reset to original defaults!");
  };

  const handleFieldChange = (section: keyof SiteContentMap, field: string, value: string) => {
    setEditableContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const resetField = (section: keyof SiteContentMap, field: string) => {
    // @ts-ignore
    const defaultValue = defaultSiteContent[section]?.[field] || "";
    handleFieldChange(section, field, defaultValue);
    showToast(`Reset field to default`);
  };

  const categories = [
    { id: "ageGate", label: "Age Warning Gate", icon: ShieldAlert, count: 7 },
    { id: "hero", label: "Home & Header", icon: Home, count: 12 },
    { id: "scrollReveals", label: "Scroll Story Reveals", icon: Scroll, count: 18 },
    { id: "aboutUs", label: "About Us Story", icon: Info, count: 12 },
    { id: "contactUs", label: "Contact & Outlets", icon: Phone, count: 10 },
    { id: "footer", label: "Footer & Notices", icon: Layers, count: 6 },
  ];

  /* Helper to render editable item card */
  const renderFieldInput = (
    section: keyof SiteContentMap,
    field: string,
    label: string,
    description: string,
    isMultiline: boolean = false
  ) => {
    // @ts-ignore
    const val = editableContent[section]?.[field] || "";
    // @ts-ignore
    const defVal = defaultSiteContent[section]?.[field] || "";
    const isModified = val !== defVal;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches = label.toLowerCase().includes(q) || description.toLowerCase().includes(q) || val.toLowerCase().includes(q);
      if (!matches) return null;
    }

    return (
      <div key={`${section}-${field}`} className="flex flex-col gap-2 rounded-2xl border border-glass bg-[#121212] p-4 sm:p-5 transition-all hover:border-[#C5A880]/30">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-accent">
              {label}
            </span>
            {isModified && (
              <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-400">
                Modified
              </span>
            )}
          </div>
          {isModified && (
            <button
              onClick={() => resetField(section, field)}
              className="inline-flex items-center gap-1 text-[11px] text-accent/50 hover:text-[#C5A880] transition-colors cursor-pointer"
              title="Reset field to default"
            >
              <RotateCcw className="h-3 w-3" /> Reset Default
            </button>
          )}
        </div>
        <p className="text-[11px] text-accent/50">{description}</p>

        {isMultiline ? (
          <textarea
            rows={3}
            value={val}
            onChange={(e) => handleFieldChange(section, field, e.target.value)}
            className="w-full rounded-xl border border-glass bg-[#181818] p-3 text-xs font-sans text-accent focus:border-[#C5A880] focus:outline-none transition-colors"
          />
        ) : (
          <input
            type="text"
            value={val}
            onChange={(e) => handleFieldChange(section, field, e.target.value)}
            className="w-full rounded-xl border border-glass bg-[#181818] px-3 py-2.5 text-xs font-sans text-accent focus:border-[#C5A880] focus:outline-none transition-colors"
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 flex items-center gap-3 rounded-2xl border border-[#C5A880]/40 bg-[#141414] px-5 py-3.5 shadow-2xl text-xs font-bold text-[#E1E0CC]"
          >
            <CheckCircle2 className="h-5 w-5 text-[#C5A880]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editor Control Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-glass bg-[#111111] p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#C5A880]" />
            <h2 className="font-heading text-lg font-black uppercase tracking-tight text-[#E1E0CC]">
              Website Copy & Text Manager
            </h2>
          </div>
          <p className="text-xs text-accent/50 mt-1">
            Manually edit, customize, or remove any text copy across the website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" /> Reset All
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#C5A880] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-black shadow-[0_0_20px_rgba(197,168,128,0.3)] hover:bg-amber-300 transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </button>
        </div>
      </div>

      {/* Search & Category Tabs Toolbar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex items-center min-w-[280px]">
          <Search className="absolute left-3.5 h-4 w-4 text-accent/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any website text or label..."
            className="w-full rounded-xl border border-glass bg-[#121212] py-2.5 pl-10 pr-4 text-xs font-sans text-accent placeholder:text-accent/40 focus:border-[#C5A880] focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  active
                    ? "bg-[#C5A880] text-black shadow-md"
                    : "border border-glass bg-[#121212] text-accent/80 hover:border-[#C5A880]/40 hover:text-[#C5A880]"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Fields */}
      <div className="flex flex-col gap-4">
        
        {/* Category 1: 18+ Age Warning Gate & Loader */}
        {(activeTab === "ageGate" || searchQuery.trim() !== "") && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-glass pb-2 font-heading text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              <ShieldAlert className="h-4 w-4" /> 18+ Age Warning Gate & Loader
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {renderFieldInput("ageGate", "badge", "Gate Badge Tag", "Displays at the top of the 18+ modal.")}
              {renderFieldInput("ageGate", "title", "Modal Headline Title", "Main title on the age verification pop-up.")}
              {renderFieldInput("ageGate", "warningHeadline", "Health Warning Box Text", "Nicotine health warning callout banner.", true)}
              {renderFieldInput("ageGate", "warningBody", "Restriction Description", "Detailed age warning disclaimer.", true)}
              {renderFieldInput("ageGate", "confirmBtn", "Accept Button Text", "Button to confirm 18+ age.")}
              {renderFieldInput("ageGate", "declineBtn", "Decline Button Text", "Button for users under 18.")}
              {renderFieldInput("loader", "text", "Theater Loader Writing Text", "Text animated by handwriting SVG during site loading.")}
            </div>
          </div>
        )}

        {/* Category 2: Home Hero & Header */}
        {(activeTab === "hero" || searchQuery.trim() !== "") && (
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-2 border-b border-glass pb-2 font-heading text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              <Home className="h-4 w-4" /> Home Hero & Navbar
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {renderFieldInput("navbar", "brandTitle", "Navbar Brand Title", "Header brand text (e.g. VAPE STREET BD).")}
              {renderFieldInput("navbar", "brandSubtitle", "Navbar Tagline", "Small subtitle under logo.")}
              {renderFieldInput("navbar", "phone", "Hotline Phone Number", "Phone number shown in header and call buttons.")}
              {renderFieldInput("hero", "badge", "Hero Category Badge", "Small uppercase tag above main hero title.")}
              {renderFieldInput("hero", "title", "Main Hero Title", "Primary heading on the homepage hero section.")}
              {renderFieldInput("hero", "ctaText", "Hero CTA Button", "Button label to explore products.")}
              {renderFieldInput("hero", "subtitle", "Hero Paragraph Description", "Detailed intro paragraph on homepage hero.", true)}
            </div>
          </div>
        )}

        {/* Category 3: 3D Scroll Story Reveals (Frames 1-6) */}
        {(activeTab === "scrollReveals" || searchQuery.trim() !== "") && (
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-2 border-b border-glass pb-2 font-heading text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              <Scroll className="h-4 w-4" /> 3D Hero Scroll Story Reveals (Frames 1 - 6)
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Frame 1 */}
              {renderFieldInput("hero", "scrollReveal1Tag", "Frame 1 Tag", "Tag for 1st scroll text.")}
              {renderFieldInput("hero", "scrollReveal1Title", "Frame 1 Title", "Heading for 1st scroll text.")}
              {renderFieldInput("hero", "scrollReveal1Desc", "Frame 1 Description", "Body text for 1st scroll text.", true)}

              {/* Frame 2 */}
              {renderFieldInput("hero", "scrollReveal2Tag", "Frame 2 Tag", "Tag for 2nd scroll text.")}
              {renderFieldInput("hero", "scrollReveal2Title", "Frame 2 Title", "Heading for 2nd scroll text.")}
              {renderFieldInput("hero", "scrollReveal2Desc", "Frame 2 Description", "Body text for 2nd scroll text.", true)}

              {/* Frame 3 */}
              {renderFieldInput("hero", "scrollReveal3Tag", "Frame 3 Tag", "Tag for 3rd scroll text.")}
              {renderFieldInput("hero", "scrollReveal3Title", "Frame 3 Title", "Heading for 3rd scroll text.")}
              {renderFieldInput("hero", "scrollReveal3Desc", "Frame 3 Description", "Body text for 3rd scroll text.", true)}

              {/* Frame 4 */}
              {renderFieldInput("hero", "scrollReveal4Tag", "Frame 4 Tag", "Tag for 4th scroll text.")}
              {renderFieldInput("hero", "scrollReveal4Title", "Frame 4 Title", "Heading for 4th scroll text.")}
              {renderFieldInput("hero", "scrollReveal4Desc", "Frame 4 Description", "Body text for 4th scroll text.", true)}

              {/* Frame 5 */}
              {renderFieldInput("hero", "scrollReveal5Tag", "Frame 5 Tag", "Tag for 5th scroll text.")}
              {renderFieldInput("hero", "scrollReveal5Title", "Frame 5 Title", "Heading for 5th scroll text.")}
              {renderFieldInput("hero", "scrollReveal5Desc", "Frame 5 Description", "Body text for 5th scroll text.", true)}

              {/* Frame 6 */}
              {renderFieldInput("hero", "scrollReveal6Tag", "Frame 6 Tag", "Tag for final luxury scroll quote.")}
              {renderFieldInput("hero", "scrollReveal6Title", "Frame 6 Title", "Main script quote on final frame.")}
              {renderFieldInput("hero", "scrollReveal6Desc", "Frame 6 Subtitle", "Italic serif subtitle on final frame.")}
            </div>
          </div>
        )}

        {/* Category 4: About Us Story & Bio */}
        {(activeTab === "aboutUs" || searchQuery.trim() !== "") && (
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-2 border-b border-glass pb-2 font-heading text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              <Info className="h-4 w-4" /> About Us Page & Founder Story
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {renderFieldInput("aboutUs", "headerTag", "Header Tagline", "Top tag on opening about section.")}
              {renderFieldInput("aboutUs", "headerTitle", "Main Header Title", "Title on opening about header.")}
              {renderFieldInput("aboutUs", "founderName", "Founder Title", "Founder name heading.")}
              {renderFieldInput("aboutUs", "founderTagline", "Founder Subtitle", "Catchphrase under founder title.")}
              {renderFieldInput("aboutUs", "founderQuote", "Founder Quote", "Quote displayed on 3D card.")}
              {renderFieldInput("aboutUs", "founderBio", "Founder Bio", "Detailed biography of Pallab.", true)}
              {renderFieldInput("aboutUs", "chapter1Title", "Chapter 1 Title", "Heading of story chapter 1.")}
              {renderFieldInput("aboutUs", "chapter1Text1", "Chapter 1 Part 1", "First paragraph of chapter 1.", true)}
              {renderFieldInput("aboutUs", "chapter1Text2", "Chapter 1 Part 2", "Second paragraph of chapter 1.", true)}
              {renderFieldInput("aboutUs", "chapter2Title", "Chapter 2 Title", "Heading of story chapter 2.")}
              {renderFieldInput("aboutUs", "chapter2Text1", "Chapter 2 Part 1", "First paragraph of chapter 2.", true)}
              {renderFieldInput("aboutUs", "chapter2Text2", "Chapter 2 Part 2", "Second paragraph of chapter 2.", true)}
            </div>
          </div>
        )}

        {/* Category 5: Contact Page & Outlets */}
        {(activeTab === "contactUs" || searchQuery.trim() !== "") && (
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-2 border-b border-glass pb-2 font-heading text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              <Phone className="h-4 w-4" /> Contact Us & Dhaka Outlets
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {renderFieldInput("contactUs", "phone", "Hotline Phone Number", "Direct phone hotline number.")}
              {renderFieldInput("contactUs", "hotlineTitle", "Hotline Box Title", "Title on phone hotline card.")}
              {renderFieldInput("contactUs", "hotlineDesc", "Hotline Availability", "Store availability hours description.")}
              {renderFieldInput("contactUs", "branch1Title", "Branch 1 Title", "Title of main branch.")}
              {renderFieldInput("contactUs", "branch1Sub", "Branch 1 Subtitle", "Sub-location name.")}
              {renderFieldInput("contactUs", "branch1Hours", "Branch 1 Hours", "Opening hours for main branch.")}
              {renderFieldInput("contactUs", "branch2Title", "Branch 2 Title", "Title of stadium branch.")}
              {renderFieldInput("contactUs", "branch2Sub", "Branch 2 Subtitle", "Sub-location name.")}
              {renderFieldInput("contactUs", "branch2Hours", "Branch 2 Hours", "Opening hours for branch 2.")}
            </div>
          </div>
        )}

        {/* Category 6: Footer & Legal */}
        {(activeTab === "footer" || searchQuery.trim() !== "") && (
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-2 border-b border-glass pb-2 font-heading text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              <Layers className="h-4 w-4" /> Footer & Store Notices
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {renderFieldInput("productsSection", "title", "Products Section Heading", "Title above shop inventory grid.")}
              {renderFieldInput("productsSection", "subtitle", "Products Section Subtitle", "Subtitle description above inventory grid.", true)}
              {renderFieldInput("footer", "tagline", "Footer Description", "Paragraph description in footer.", true)}
              {renderFieldInput("footer", "address", "Footer Address", "Physical store location text in footer.")}
              {renderFieldInput("footer", "copyright", "Copyright Text", "Legal copyright line at bottom of page.")}
              {renderFieldInput("footer", "nicotineDisclaimer", "Health Disclaimer", "Nicotine health warning notice in footer.", true)}
            </div>
          </div>
        )}

      </div>

      {/* Reset All Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl border border-glass bg-[#121212] p-6 shadow-2xl text-center"
            >
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-3" />
              <h3 className="font-heading text-lg font-bold text-accent uppercase">
                Reset All Website Copy?
              </h3>
              <p className="text-xs text-accent/60 mt-2 mb-6">
                Are you sure you want to reset all website text strings back to their original factory defaults?
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 rounded-xl border border-glass bg-[#181818] py-2.5 text-xs font-bold text-accent hover:bg-[#202020] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetAll}
                  className="flex-1 rounded-xl bg-red-500 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-red-600 cursor-pointer"
                >
                  Confirm Reset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
