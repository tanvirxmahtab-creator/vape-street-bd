import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/src/lib/supabase";

export interface SiteContentMap {
  ageGate: {
    badge: string;
    title: string;
    warningHeadline: string;
    warningBody: string;
    confirmBtn: string;
    declineBtn: string;
  };
  loader: {
    text: string;
  };
  navbar: {
    brandTitle: string;
    brandSubtitle: string;
    navHome: string;
    navProducts: string;
    navAbout: string;
    navContact: string;
    hotlineLabel: string;
    phone: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaText: string;
    scrollReveal1Tag: string;
    scrollReveal1Title: string;
    scrollReveal1Desc: string;
    scrollReveal2Tag: string;
    scrollReveal2Title: string;
    scrollReveal2Desc: string;
    scrollReveal3Tag: string;
    scrollReveal3Title: string;
    scrollReveal3Desc: string;
    scrollReveal4Tag: string;
    scrollReveal4Title: string;
    scrollReveal4Desc: string;
    scrollReveal5Tag: string;
    scrollReveal5Title: string;
    scrollReveal5Desc: string;
    scrollReveal6Tag: string;
    scrollReveal6Title: string;
    scrollReveal6Desc: string;
  };
  productsSection: {
    title: string;
    subtitle: string;
  };
  aboutUs: {
    headerTag: string;
    headerTitle: string;
    founderName: string;
    founderTagline: string;
    founderQuote: string;
    founderBio: string;
    ctaTitle: string;
    ctaSubtitle: string;
    chapter1Title: string;
    chapter1Text1: string;
    chapter1Text2: string;
    chapter2Title: string;
    chapter2Text1: string;
    chapter2Text2: string;
  };
  contactUs: {
    pageTitle: string;
    pageSubtitle: string;
    hotlineTitle: string;
    hotlineDesc: string;
    phone: string;
    branch1Title: string;
    branch1Sub: string;
    branch1Hours: string;
    branch2Title: string;
    branch2Sub: string;
    branch2Hours: string;
  };
  footer: {
    tagline: string;
    address: string;
    copyright: string;
    nicotineDisclaimer: string;
  };
  stickyScroll: {
    badge: string;
    title: string;
    subtitle: string;
    footerTitle: string;
    footerSubtitle: string;
  };
  testimonials: {
    tag: string;
    title: string;
    subtitle: string;
  };
  allProducts: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
  };
  productDetail: {
    inStockBadge: string;
    authenticBadge: string;
    callToOrder: string;
    addToCartBtn: string;
    specsTitle: string;
    batteryLabel: string;
    coilLabel: string;
    capacityLabel: string;
    warrantyLabel: string;
    nicotineLabel: string;
  };
}

export const defaultSiteContent: SiteContentMap = {
  ageGate: {
    badge: "18+ RESTRICTED PRODUCT",
    title: "AGE VERIFICATION REQUIRED",
    warningHeadline: "HEALTH WARNING: Vaping products contain nicotine, an addictive chemical.",
    warningBody: "This website contains age-restricted products intended strictly for adults (18 years or older) in Bangladesh. By entering this website, you confirm that you are at least 18 years of age.",
    confirmBtn: "I AM 18 OR OLDER — ENTER STORE",
    declineBtn: "UNDER 18 — EXIT",
  },
  loader: {
    text: "Welcome to Vape Street BD",
  },
  navbar: {
    brandTitle: "VAPE STREET BD",
    brandSubtitle: "Luxury Vape Shop",
    navHome: "Home",
    navProducts: "Products",
    navAbout: "About Us",
    navContact: "Contact Us",
    hotlineLabel: "Hotline:",
    phone: "01721-747998",
  },
  hero: {
    badge: "The Vape Shop Standard",
    title: "Vape street BD",
    subtitle: "Vape Street BD is Bangladesh's premier luxury vape shop. We offer an expertly curated selection of world-class devices, authentic premium e-liquids, and high-performance hardware designed for discerning connoisseurs.",
    ctaText: "Explore collections",
    scrollReveal1Tag: "The Vape Shop Standard",
    scrollReveal1Title: "Crafted for Connoisseurs",
    scrollReveal1Desc: "Vape Street BD brings the world's most exclusive e-liquids, authentic devices, and high-performance hardware directly to Dhaka.",
    scrollReveal2Tag: "Vaping Fun Fact",
    scrollReveal2Title: "Complexity of Taste",
    scrollReveal2Desc: "Premium e-liquids feature intricate flavor profiles, blending up to 15 different organic extracts to construct a single signature note.",
    scrollReveal3Tag: "Pure Verification",
    scrollReveal3Title: "100% Genuine Quality",
    scrollReveal3Desc: "Every product is fully serialized and verified directly with the manufacturers, offering safety and authenticity you can trust.",
    scrollReveal4Tag: "Engineered Excellence",
    scrollReveal4Title: "Next-Gen Precision",
    scrollReveal4Desc: "Featuring advanced temperature control, mesh coil technology, and ergonomic aerodynamics for ultra-smooth vapor production.",
    scrollReveal5Tag: "Elevate Your Journey",
    scrollReveal5Title: "Experience Perfection",
    scrollReveal5Desc: "Step into the world of luxury vaping. Explore our curated collections and discover your next signature device.",
    scrollReveal6Tag: "Vape Street BD",
    scrollReveal6Title: "Luxury For Vapers",
    scrollReveal6Desc: "Where Pure Passion Meets Unrivaled Elevation",
  },
  productsSection: {
    title: "Curated Collections",
    subtitle: "Handcrafted lineup of world-class pod systems, artisanal salt nicotine e-liquids, flagship mods, and disposable vapes.",
  },
  aboutUs: {
    headerTag: "The Connoisseur's Legacy",
    headerTitle: "About Vape Street BD",
    founderName: "PALLAB — FOUNDER & VISIONARY",
    founderTagline: "Elevating Bangladesh's Vaping Culture Through Pure Authenticity",
    founderQuote: "Uncompromising Authenticity is Our Only Benchmark.",
    founderBio: "Driven by a relentless passion for perfection, Pallab established Vape Street BD to transform the local vaping landscape. Every device, mod, and e-liquid is personally verified to deliver absolute authenticity to true connoisseurs across Bangladesh.",
    ctaTitle: "Experience The Gold Standard",
    ctaSubtitle: "Step into the world Pallab envisioned. Explore our hand-picked collection of 100% authentic hardware, elite mods, and premium e-liquids.",
    chapter1Title: "The Genesis",
    chapter1Text1: "Before Vape Street BD became Bangladesh’s premier luxury vape shop, it started with a single unyielding vision championed by Pallab: every vaping enthusiast deserves genuine quality, safety, and an uncompromised sensory experience.",
    chapter1Text2: "In a market overcrowded with doubtful replicas and low-grade hardware, Pallab chose a different path—building a sanctuary for discerning connoisseurs who appreciate true craftsmanship.",
    chapter2Title: "The Pursuit of Perfection",
    chapter2Text1: "Pallab spent years forging direct relationships with international manufacturers and certified global distributors. By enforcing rigorous serial verification on every shipment, Vape Street BD guarantees that 100% of products arriving on our shelves are authentic.",
    chapter2Text2: "From organic e-liquid extract formulations to high-precision temperature control mods, every product line undergoes personal evaluation before earning the Vape Street BD badge.",
  },
  contactUs: {
    pageTitle: "Get In Touch",
    pageSubtitle: "Have questions regarding specific salt nic flavors, pod compatibility, or store outlets? Fill out the inquiry terminal below.",
    hotlineTitle: "Direct Phone Hotline",
    hotlineDesc: "Available 10:00 AM - 11:30 PM for instant order placement & assistance.",
    phone: "01721-747998",
    branch1Title: "Vape Street BD (Main Outlet)",
    branch1Sub: "Paikpara / Mirpur Outlet",
    branch1Hours: "10:00 AM - 11:30 PM Daily",
    branch2Title: "Vape Street BD 2.0",
    branch2Sub: "Mirpur 1 / Stadium Outlet",
    branch2Hours: "11:00 AM - 11:00 PM Daily",
  },
  footer: {
    tagline: "Bangladesh's premier destination for authentic vape devices, pod systems, and imported e-liquids.",
    address: "Paikpara & Stadium Branch, Mirpur, Dhaka, Bangladesh",
    copyright: "© 2026 Vape Street BD. All Rights Reserved.",
    nicotineDisclaimer: "WARNING: Vaping products contain nicotine, an addictive chemical. Intended for adult vapers (18+) only.",
  },
  stickyScroll: {
    badge: "Direct Global Sourcing & Reasonable Prices",
    title: "Authentic Products From USA, UK, China & Dubai",
    subtitle: "By importing directly from certified global distributors, Vape Street BD eliminates middleman scalper markups—delivering genuine world-class devices and e-liquids to Bangladesh at fair, accessible prices.",
    footerTitle: "VAPE STREET BD",
    footerSubtitle: "DIRECT IMPORTER • 100% AUTHENTIC • FAIR PRICING",
  },
  testimonials: {
    tag: "VOICES OF DISCERNING VAPERS",
    title: "Endorsed By Connoisseurs",
    subtitle: "Hear real stories from veteran vapers and daily enthusiasts who trust Vape Street BD for 100% verified authentic hardware and flavor purity.",
  },
  allProducts: {
    title: "All Authentic Vapes & E-Liquids",
    subtitle: "Browse our complete catalog of verified pod systems, artisanal salt nicotine e-liquids, high-wattage box mods, and disposable vapes.",
    searchPlaceholder: "Search by device name, brand, or flavor profile...",
  },
  productDetail: {
    inStockBadge: "In Stock & Ready for Delivery",
    authenticBadge: "100% Verified Genuine Sourcing",
    callToOrder: "Call to Order",
    addToCartBtn: "Add to Order Cart",
    specsTitle: "Technical Specifications",
    batteryLabel: "Battery Spec",
    coilLabel: "Coil Resistance",
    capacityLabel: "E-Liquid Capacity",
    warrantyLabel: "Warranty Protection",
    nicotineLabel: "Nicotine Level",
  },
};

const STORAGE_KEY = "vape_street_bd_site_content_v3";

export const getLocalSiteContent = (): SiteContentMap => {
  try {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults to guarantee all keys exist
        return {
          ageGate: { ...defaultSiteContent.ageGate, ...(parsed.ageGate || {}) },
          loader: { ...defaultSiteContent.loader, ...(parsed.loader || {}) },
          navbar: { ...defaultSiteContent.navbar, ...(parsed.navbar || {}) },
          hero: { ...defaultSiteContent.hero, ...(parsed.hero || {}) },
          productsSection: { ...defaultSiteContent.productsSection, ...(parsed.productsSection || {}) },
          aboutUs: { ...defaultSiteContent.aboutUs, ...(parsed.aboutUs || {}) },
          contactUs: { ...defaultSiteContent.contactUs, ...(parsed.contactUs || {}) },
          footer: { ...defaultSiteContent.footer, ...(parsed.footer || {}) },
          stickyScroll: { ...defaultSiteContent.stickyScroll, ...(parsed.stickyScroll || {}) },
          testimonials: { ...defaultSiteContent.testimonials, ...(parsed.testimonials || {}) },
          allProducts: { ...defaultSiteContent.allProducts, ...(parsed.allProducts || {}) },
          productDetail: { ...defaultSiteContent.productDetail, ...(parsed.productDetail || {}) },
        };
      }
    }
  } catch (e) {
    console.error("Error loading site content from localStorage", e);
  }
  return defaultSiteContent;
};

export const saveLocalSiteContent = (content: SiteContentMap) => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    }
  } catch (e) {
    console.error("Error saving site content to localStorage", e);
  }
};

export const fetchSiteContent = async (): Promise<SiteContentMap> => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("id", "main_v3")
        .single();

      if (!error && data?.content) {
        const content = typeof data.content === "string" ? JSON.parse(data.content) : data.content;
        const merged = {
          ageGate: { ...defaultSiteContent.ageGate, ...(content.ageGate || {}) },
          loader: { ...defaultSiteContent.loader, ...(content.loader || {}) },
          navbar: { ...defaultSiteContent.navbar, ...(content.navbar || {}) },
          hero: { ...defaultSiteContent.hero, ...(content.hero || {}) },
          productsSection: { ...defaultSiteContent.productsSection, ...(content.productsSection || {}) },
          aboutUs: { ...defaultSiteContent.aboutUs, ...(content.aboutUs || {}) },
          contactUs: { ...defaultSiteContent.contactUs, ...(content.contactUs || {}) },
          footer: { ...defaultSiteContent.footer, ...(content.footer || {}) },
          stickyScroll: { ...defaultSiteContent.stickyScroll, ...(content.stickyScroll || {}) },
          testimonials: { ...defaultSiteContent.testimonials, ...(content.testimonials || {}) },
          allProducts: { ...defaultSiteContent.allProducts, ...(content.allProducts || {}) },
          productDetail: { ...defaultSiteContent.productDetail, ...(content.productDetail || {}) },
        };
        saveLocalSiteContent(merged);
        return merged;
      }
    } catch (e) {
      console.warn("Supabase site_content fetch fallback to localStorage:", e);
    }
  }
  return getLocalSiteContent();
};

export const updateSiteContent = async (newContent: SiteContentMap): Promise<SiteContentMap> => {
  saveLocalSiteContent(newContent);
  if (supabase) {
    try {
      await supabase
        .from("site_content")
        .upsert({ id: "main_v3", content: newContent, updated_at: new Date().toISOString() });
    } catch (e) {
      console.warn("Supabase site_content upsert error:", e);
    }
  }
  return newContent;
};

export interface ActiveEditField {
  section: keyof SiteContentMap;
  field: string;
  label: string;
  isMultiline?: boolean;
  defaultValue?: string;
}

interface SiteContentContextType {
  content: SiteContentMap;
  loading: boolean;
  isVisualEditMode: boolean;
  setIsVisualEditMode: (flag: boolean) => void;
  activeEditField: ActiveEditField | null;
  setActiveEditField: (field: ActiveEditField | null) => void;
  updateContent: (newContent: SiteContentMap) => Promise<void>;
  updateSingleField: (section: keyof SiteContentMap, field: string, value: string) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  modifiedCount: number;
}

const SiteContentContext = createContext<SiteContentContextType>({
  content: defaultSiteContent,
  loading: false,
  isVisualEditMode: false,
  setIsVisualEditMode: () => {},
  activeEditField: null,
  setActiveEditField: () => {},
  updateContent: async () => {},
  updateSingleField: async () => {},
  resetToDefaults: async () => {},
  modifiedCount: 0,
});

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContentMap>(getLocalSiteContent());
  const [loading, setLoading] = useState(true);
  const [isVisualEditMode, setIsVisualEditMode] = useState<boolean>(false);
  const [activeEditField, setActiveEditField] = useState<ActiveEditField | null>(null);

  useEffect(() => {
    fetchSiteContent().then((data) => {
      setContent(data);
      setLoading(false);
    });
  }, []);

  const handleUpdate = async (newContent: SiteContentMap) => {
    setContent(newContent);
    await updateSiteContent(newContent);
  };

  const handleUpdateSingleField = async (section: keyof SiteContentMap, field: string, value: string) => {
    const updated: SiteContentMap = {
      ...content,
      [section]: {
        ...content[section],
        [field]: value,
      },
    };
    setContent(updated);
    await updateSiteContent(updated);
  };

  const handleReset = async () => {
    setContent(defaultSiteContent);
    await updateSiteContent(defaultSiteContent);
  };

  // Calculate modified count
  let modifiedCount = 0;
  try {
    (Object.keys(defaultSiteContent) as Array<keyof SiteContentMap>).forEach((section) => {
      const currentSec = content[section] || {};
      const defaultSec = defaultSiteContent[section] || {};
      Object.keys(defaultSec).forEach((field) => {
        // @ts-ignore
        if (currentSec[field] !== defaultSec[field]) {
          modifiedCount++;
        }
      });
    });
  } catch (e) {}

  return React.createElement(
    SiteContentContext.Provider,
    {
      value: {
        content,
        loading,
        isVisualEditMode,
        setIsVisualEditMode,
        activeEditField,
        setActiveEditField,
        updateContent: handleUpdate,
        updateSingleField: handleUpdateSingleField,
        resetToDefaults: handleReset,
        modifiedCount,
      },
    },
    children
  );
};

export const useSiteContent = () => useContext(SiteContentContext);
