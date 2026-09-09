'use client';

import React, { useState, useEffect } from "react";
import { Product, ProductCard } from "@/components/ui/products-section";
import { fetchProducts } from "@/src/lib/supabase";
import { 
  Search, 
  Filter, 
  RotateCcw, 
  SlidersHorizontal, 
  Layers, 
  Flame, 
  Droplets, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Star, 
  ChevronDown,
  ChevronUp
} from "lucide-react";

const categoryList = [
  { id: "All", name: "All Categories", icon: Layers },
  { id: "Pods", name: "Pod Systems", icon: Zap },
  { id: "E-Liquids", name: "E-Liquids & Salts", icon: Droplets },
  { id: "Vapes & Mods", name: "Vapes & Mods", icon: Flame },
  { id: "Disposables", name: "Disposables", icon: Sparkles },
  { id: "Starter Kits", name: "Starter Kits", icon: ShieldCheck },
];

export default function AllProductsPage({
  onBack,
  onSelectProduct,
}: {
  onBack?: () => void;
  onSelectProduct?: (product: Product) => void;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);

      if (data.length > 0) {
        const prices = data.map((p) => p.price);
        setMaxPrice(Math.max(...prices));
      }
      setLoading(false);
    };
    loadData();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    window.addEventListener("focus", loadData);
    window.addEventListener("vape_street_products_updated", loadData);
    return () => {
      window.removeEventListener("focus", loadData);
      window.removeEventListener("vape_street_products_updated", loadData);
    };
  }, []);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setMinPrice(0);
    if (products.length > 0) {
      setMaxPrice(Math.max(...products.map((p) => p.price)));
    }
    setMinRating(0);
    setSortBy("featured");
  };

  // Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    const matchesRating = product.rating >= minRating;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return a.id - b.id; // default featured
  });

  const activeFiltersCount = (selectedCategory !== "All" ? 1 : 0) + (searchQuery ? 1 : 0) + (minPrice > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-bg-dark text-[#E1E0CC]">
      {/* Header Banner */}
      <section className="relative border-b border-glass bg-[#0A0A0A] pt-24 pb-8 sm:pt-28 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 text-center">
          <span className="mb-2 inline-block font-heading text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-primary text-glow">
            Catalog Directory
          </span>
          <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-accent text-glow">
            Explore All Products
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-accent/70">
            Browse our complete inventory of authentic pods, artisanal salt nics, box mods, disposables & starter kits with custom filtering.
          </p>
        </div>
      </section>

      {/* Main Filter & Product Grid Container */}
      <main className="mx-auto max-w-7xl px-3 sm:px-6 md:px-8 py-6 sm:py-12">
        
        {/* Mobile Toggle Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="w-full flex items-center justify-between rounded-xl border border-primary/30 bg-[#111111] px-4 py-3 text-xs font-bold uppercase tracking-wider text-primary shadow-md cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              <span>Filter & Search Products</span>
              {activeFiltersCount > 0 && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-extrabold text-black">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            {mobileFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 items-start">
          
          {/* Filter Sidebar Container — Collapsible on mobile, sticky top-28 on desktop */}
          <aside
            className={`${
              mobileFilterOpen ? "flex" : "hidden"
            } lg:flex flex-col gap-6 rounded-2xl border border-glass bg-[#111111] p-4 sm:p-6 shadow-xl lg:col-span-1 relative lg:sticky lg:top-28 h-fit z-20`}
          >
            <div className="flex items-center justify-between border-b border-glass pb-3">
              <div className="flex items-center gap-2 font-heading text-sm sm:text-base font-bold uppercase tracking-wider text-accent">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                Filter Products
              </div>
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            </div>

            {/* Search Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-accent/80">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent/40" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-glass bg-black/50 py-2.5 pl-9 pr-3 text-xs text-accent placeholder:text-accent/30 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-accent/80">
                Category
              </label>
              <div className="flex flex-col gap-1.5">
                {categoryList.map((cat) => {
                  const Icon = cat.icon;
                  const count =
                    cat.id === "All"
                      ? products.length
                      : products.filter((p) => p.category === cat.id).length;
                  const isSelected = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        if (window.innerWidth < 1024) setMobileFilterOpen(false);
                      }}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-primary text-black font-bold shadow-md"
                          : "border border-glass bg-black/30 text-accent/70 hover:border-primary/40 hover:text-accent"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">{cat.name}</span>
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] ${
                          isSelected ? "bg-black/20 text-black font-bold" : "bg-primary/10 text-primary"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-accent/80">
                  Price Limit (৳)
                </label>
                <span className="font-mono text-[11px] font-bold text-primary">
                  ৳{minPrice} - ৳{maxPrice}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full rounded-xl border border-glass bg-black/50 px-3 py-2 text-xs text-accent focus:border-primary focus:outline-none"
                />
                <span className="text-accent/40">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full rounded-xl border border-glass bg-black/50 px-3 py-2 text-xs text-accent focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-accent/80">
                Minimum Rating
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[0, 4, 4.5].map((ratingVal) => (
                  <button
                    key={ratingVal}
                    onClick={() => setMinRating(ratingVal)}
                    className={`flex items-center justify-center gap-1 rounded-xl py-2 text-xs font-semibold transition-all cursor-pointer ${
                      minRating === ratingVal
                        ? "bg-primary text-black font-bold"
                        : "border border-glass bg-black/30 text-accent/70 hover:border-primary/40"
                    }`}
                  >
                    <Star className="h-3 w-3 fill-current" />
                    {ratingVal === 0 ? "Any" : `${ratingVal}+`}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <section className="flex flex-col gap-5 lg:col-span-3">
            {/* Top Results Bar & Sorting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-glass bg-[#111111] p-3.5 sm:p-4">
              <div className="text-xs text-accent/80">
                Showing <span className="font-bold text-primary">{sortedProducts.length}</span> of{" "}
                <span className="font-bold text-accent">{products.length}</span> products
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-accent/60">Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-xl border border-glass bg-black px-3 py-1.5 text-xs font-semibold text-accent focus:border-primary focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured / Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid: 2 Columns on Mobile, 3 on Desktop */}
            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-glass bg-[#111111] py-16 text-center px-4">
                <Filter className="h-10 w-10 text-accent/30" />
                <h3 className="font-heading text-base sm:text-lg font-bold text-accent">No Products Found</h3>
                <p className="text-xs text-accent/60 max-w-xs">
                  Try adjusting your search criteria or price filter limits.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-2 rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase text-black transition-transform hover:scale-105"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 xl:grid-cols-3 sm:gap-6">
                {sortedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onSelectProduct={onSelectProduct}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
