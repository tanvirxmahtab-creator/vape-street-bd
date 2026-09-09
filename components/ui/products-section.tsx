'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingBag, Star, Zap, Layers, Sparkles, Flame, Droplets, ShieldCheck, ArrowRight } from "lucide-react";
import { fetchProducts } from "@/src/lib/supabase";

/* ---- Product Type ---- */
export interface ProductSpecs {
  battery?: string;
  coil?: string;
  capacity?: string;
  warranty?: string;
  nicotine?: string;
  flavors?: string;
}

export interface Product {
  id: number;
  name: string;
  category: "Pods" | "E-Liquids" | "Vapes & Mods" | "Disposables" | "Starter Kits";
  price: number;
  originalPrice: number | null;
  description: string;
  image: string;
  images?: string[];
  badge: string | null;
  rating: number;
  specs?: ProductSpecs;
}

/* ---- Categories Info ---- */
const categoryMeta = [
  {
    id: "Pods",
    name: "Pod Systems",
    icon: Zap,
    subtitle: "Compact, Sleek & Powerful Salt Nicotine Devices",
    description: "Engineered for maximum portability and effortless draws with rapid magnetic pod refills."
  },
  {
    id: "E-Liquids",
    name: "E-Liquids & Salts",
    icon: Droplets,
    subtitle: "Artisanal Flavor Formulations & Salt Nicotine",
    description: "Crafted with 100% USP grade ingredients for rich flavor notes and ultra-smooth throat hits."
  },
  {
    id: "Vapes & Mods",
    name: "Vapes & Box Mods",
    icon: Flame,
    subtitle: "High-Performance Advanced Vaping Hardware",
    description: "Built for cloud enthusiasts with customizable wattage, dual-battery mods, and sub-ohm control."
  },
  {
    id: "Disposables",
    name: "Disposable Vapes",
    icon: Sparkles,
    subtitle: "Pre-Filled High Puff Count Devices",
    description: "No maintenance, ready to use out of the box with rechargeable batteries and mesh coil tech."
  },
  {
    id: "Starter Kits",
    name: "Starter Kits",
    icon: ShieldCheck,
    subtitle: "Complete All-In-One Vaping Sets",
    description: "Everything you need to begin your premium vaping journey with tank, mod, and coils included."
  }
];

/* ---- Single Product Card Component (Mobile 2-Column Responsive Optimized) ---- */
const ProductCard = ({
  product,
  index,
  onSelectProduct,
}: {
  key?: React.Key;
  product: Product;
  index: number;
  onSelectProduct?: (product: Product) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleClick}
      className="group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-glass bg-[#111111] transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(197,168,128,0.18)] cursor-pointer"
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute left-2 top-2 sm:left-3 sm:top-3 z-10 flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 sm:px-3 sm:py-1 shadow-md">
          <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-black fill-black" />
          <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-black">
            {product.badge}
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#0A0A0A] p-2 sm:p-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-108"
          loading="lazy"
        />
        {/* Desktop hover gradient overlay */}
        <div className="absolute inset-0 hidden sm:flex items-end justify-center bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pb-4">
          <span className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-lg">
            <ShoppingBag className="h-3.5 w-3.5" />
            View Details
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-5">
        {/* Category Tag */}
        <span className="font-heading text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="font-heading text-xs sm:text-base font-bold uppercase tracking-tight text-accent transition-colors group-hover:text-primary line-clamp-1">
          {product.name}
        </h3>

        {/* Description - Hidden on small mobile to save vertical space */}
        <p className="hidden sm:block line-clamp-2 font-sans text-xs leading-relaxed text-accent/60">
          {product.description}
        </p>

        {/* Rating */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-primary text-primary" />
            <span className="font-heading text-[10px] sm:text-xs font-semibold text-accent/80">{product.rating}</span>
          </div>

          {/* Mobile Tap CTA Badge */}
          <span className="sm:hidden text-[9px] font-bold uppercase text-primary flex items-center gap-0.5">
            Details <ArrowRight className="h-2.5 w-2.5" />
          </span>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-1.5 pt-1 border-t border-glass/60 sm:border-0 sm:pt-0">
          <span className="font-heading text-sm sm:text-xl font-extrabold text-accent">
            ৳{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="font-sans text-[10px] sm:text-xs text-accent/40 line-through">
              ৳{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ---- Products Section Component ---- */
const ProductsSection = ({ onSelectProduct }: { onSelectProduct?: (product: Product) => void }) => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProductsList(data);
  };

  useEffect(() => {
    loadProducts();
    window.addEventListener("focus", loadProducts);
    window.addEventListener("vape_street_products_updated", loadProducts);
    return () => {
      window.removeEventListener("focus", loadProducts);
      window.removeEventListener("vape_street_products_updated", loadProducts);
    };
  }, []);

  // Filtered categories to render
  const categoriesToDisplay = activeTab === "All"
    ? categoryMeta
    : categoryMeta.filter(c => c.id === activeTab);

  return (
    <section id="products-section" className="relative w-full bg-bg-dark py-16 sm:py-28 md:py-32">
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_115057_94c3699b-0fd1-4124-bcf3-3626bb8c1f77.mp4"></video>

      {/* Section Main Header */}
      <div ref={headingRef} className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16 mb-8 sm:mb-12">
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 inline-flex items-center gap-2"
          >
            <span className="h-[1px] w-6 sm:w-8 bg-primary" />
            <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary text-glow">
              Vape Shop Catalog
            </span>
            <span className="h-[1px] w-6 sm:w-8 bg-primary" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-accent text-glow"
          >
            Categorized Collections
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 max-w-2xl font-sans text-xs sm:text-base leading-relaxed text-accent/70"
          >
            Explore our meticulously categorized showcase of pods, authentic e-liquids, high-power mods, disposables, and starter kits.
          </motion.p>
        </div>

        {/* Category Navigation Filter Bar */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveTab("All")}
            className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === "All"
                ? "bg-primary text-black shadow-[0_0_20px_rgba(197,168,128,0.3)]"
                : "border border-glass bg-[#111111] text-accent/80 hover:border-primary/40 hover:text-primary"
              }`}
          >
            <Layers className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            All ({productsList.length})
          </button>

          {categoryMeta.map((cat) => {
            const count = productsList.filter((p) => p.category === cat.id).length;
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${isActive
                    ? "bg-primary text-black shadow-[0_0_20px_rgba(197,168,128,0.3)]"
                    : "border border-glass bg-[#111111] text-accent/80 hover:border-primary/40 hover:text-primary"
                  }`}
              >
                <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Categorized Product Sections */}
      <div className="mx-auto max-w-7xl px-3 sm:px-6 md:px-10 lg:px-16 flex flex-col gap-14 sm:gap-24">
        {categoriesToDisplay.map((category) => {
          const categoryProducts = productsList.filter((p) => p.category === category.id);
          const Icon = category.icon;

          return (
            <div key={category.id} className="relative flex flex-col gap-5 sm:gap-8">
              {/* Category Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-glass pb-4 sm:pb-6 gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </span>
                    <span className="font-heading text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary">
                      {category.subtitle}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl sm:text-3xl font-black uppercase tracking-tight text-accent mt-0.5">
                    {category.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-accent/60 max-w-xl">
                    {category.description}
                  </p>
                </div>

                <span className="self-start sm:self-auto rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] sm:text-xs font-semibold text-primary">
                  {categoryProducts.length} Items
                </span>
              </div>

              {/* Category Product Grid: 2 Columns on Mobile, 4 on Desktop */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
                {categoryProducts.slice(0, 4).map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onSelectProduct={onSelectProduct}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16 mt-12 sm:mt-20 flex justify-center">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => {
            window.location.hash = "/all-products";
          }}
          className="group inline-flex items-center gap-3 rounded-full border border-primary/30 px-6 py-3 sm:px-8 sm:py-3.5 font-heading text-xs sm:text-sm font-bold uppercase tracking-widest text-primary transition-all duration-300 hover:bg-primary hover:text-black hover:shadow-[0_0_30px_rgba(197,168,128,0.25)] cursor-pointer"
        >
          Explore All Categories
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-all group-hover:bg-black group-hover:text-primary">
            <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
        </motion.button>
      </div>
    </section>
  );
};

export { ProductsSection, ProductCard };
