'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Heart,
  Minus,
  Plus,
  MessageCircle,
} from "lucide-react";
import { Product } from "@/components/ui/products-section";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const WHATSAPP_NUMBER = "8801721747998";

export const ProductDetailPage: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const productImages = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  const [selectedImage, setSelectedImage] = useState<string>(productImages[0] || product.image);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price);
  const discountPercent = hasDiscount && product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleWhatsAppOrder = () => {
    const message = `Hi, I'm interested in ordering:\n\n🛒 *${product.name}*\n📦 Category: ${product.category}\n💰 Price: ৳${product.price.toLocaleString()}\n🔢 Quantity: ${quantity}\n💵 Total: ৳${(product.price * quantity).toLocaleString()}\n\nPlease confirm availability and delivery details.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen w-full bg-[#070707] text-[#E1E0CC] selection:bg-[#C5A880] selection:text-black pt-24 sm:pt-28 pb-16">
      
      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        
        {/* Prominent Floating Back Button & Breadcrumbs Bar */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-glass pb-4">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary shadow-[0_0_15px_rgba(197,168,128,0.15)] transition-all hover:bg-primary hover:text-black cursor-pointer w-fit"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Products
          </button>

          <div className="flex items-center gap-2 text-xs text-accent/60 font-sans">
            <button onClick={onBack} className="hover:text-primary transition-colors cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-accent/80">{product.category}</span>
            <span>/</span>
            <span className="text-primary font-semibold truncate max-w-[200px] sm:max-w-none">{product.name}</span>
          </div>
        </div>

        {/* Product Detail Layout Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: High-Res Multi-Image Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Display Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-glass bg-[#0F0F0F] p-4 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
              
              {/* Badge */}
              {product.badge && (
                <div className="absolute left-5 top-5 z-10 flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 shadow-lg">
                  <Zap className="h-3.5 w-3.5 text-black fill-black" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-black">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Discount Badge */}
              {hasDiscount && (
                <div className="absolute right-5 top-5 z-10 rounded-full bg-red-500/90 px-3 py-1 text-xs font-extrabold uppercase text-white shadow-lg backdrop-blur-md">
                  SAVE {discountPercent}%
                </div>
              )}

              {/* Main Image */}
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                src={selectedImage}
                alt={product.name}
                className="h-full w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
              />
            </div>

            {/* Thumbnail Carousel Selector (Supports up to 6 images) */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {productImages.map((img, idx) => {
                  const isSelected = selectedImage === img;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative aspect-square overflow-hidden rounded-2xl border bg-[#0F0F0F] transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary shadow-[0_0_20px_rgba(197,168,128,0.3)] ring-2 ring-primary/50"
                          : "border-glass opacity-60 hover:opacity-100 hover:border-primary/40"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                      {isSelected && (
                        <span className="absolute bottom-1 right-1 rounded-full bg-primary p-0.5 text-black">
                          <CheckCircle2 className="h-3 w-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: E-Commerce Product Information & WhatsApp CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex flex-col gap-5">
              
              {/* Category & Verified Tag */}
              <div className="flex items-center justify-between">
                <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  {product.category}
                </span>

                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>100% Genuine Verified</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#E1E0CC] leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-lg bg-primary/10 border border-primary/20 px-2.5 py-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-heading text-sm font-bold text-accent">{product.rating}</span>
                </div>
                <span className="text-xs text-accent/60">
                  (128 Verified Customer Reviews)
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 border-y border-glass py-4">
                <span className="font-heading text-3xl sm:text-4xl font-black text-accent text-glow">
                  ৳{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="font-sans text-lg text-accent/40 line-through">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {hasDiscount && product.originalPrice && (
                  <span className="ml-auto rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary border border-primary/20">
                    Save ৳{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Product Description */}
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-accent/80">
                  Product Overview
                </h3>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-accent/70">
                  {product.description}
                </p>
              </div>

              {/* Key Specs Grid */}
              {product.category === "E-Liquids" || Boolean(product.specs?.flavors) ? (
                /* E-Liquid Category Specific Specs Box */
                <div className="flex flex-col gap-3 rounded-2xl border border-amber-500/30 bg-[#111111] p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      Bottle Capacity & Nicotine Strength
                    </span>
                    <span className="text-xs font-semibold text-accent/90">
                      {product.specs?.capacity || product.specs?.nicotine || "60ml / 3mg & 6mg Freebase"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 border-t border-glass pt-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      Available Flavors & Options
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(product.specs?.flavors || "Iced Mango, Strawberry Watermelon, Mint Chill, Blue Razz")
                        .split(",")
                        .map((flv, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 text-[11px] font-medium text-amber-300"
                          >
                            🍇 {flv.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Hardware Categories Specs Box */
                <div className="grid grid-cols-3 gap-3 rounded-2xl border border-glass bg-[#111111] p-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Battery / Power</span>
                    <span className="text-xs font-semibold text-accent/90 truncate">
                      {product.specs?.battery || "Long-lasting 1000mAh+"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Airflow & Coil</span>
                    <span className="text-xs font-semibold text-accent/90 truncate">
                      {product.specs?.coil || "Precision Mesh Tech"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Capacity / Pod</span>
                    <span className="text-xs font-semibold text-accent/90 truncate">
                      {product.specs?.capacity || product.specs?.nicotine || "Standard Spec"}
                    </span>
                  </div>
                </div>
              )}

              {/* Quantity Selector & WhatsApp Order */}
              <div className="flex flex-col gap-3 pt-2">
                <label className="font-heading text-xs font-bold uppercase tracking-wider text-accent/80">
                  Select Quantity
                </label>

                <div className="flex items-center gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center rounded-2xl border border-glass bg-[#141414] p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1A1A] text-accent hover:text-primary cursor-pointer"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-heading text-base font-bold text-accent">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1A1A] text-accent hover:text-primary cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Like */}
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-all cursor-pointer ${
                        isLiked
                          ? "border-red-500 bg-red-500/10 text-red-500"
                          : "border-glass bg-[#141414] text-accent/60 hover:text-accent"
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* WhatsApp Order Button */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="mt-2 flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] py-4 font-heading text-xs sm:text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_30px_rgba(37,211,102,0.35)] transition-all hover:bg-[#20bd5a] hover:shadow-[0_0_45px_rgba(37,211,102,0.55)] cursor-pointer"
                >
                  <MessageCircle className="h-5 w-5 fill-white" />
                  Order via WhatsApp
                </button>

                {/* Price Summary */}
                <div className="flex items-center justify-between rounded-xl border border-glass bg-[#111111] px-4 py-3">
                  <span className="text-xs text-accent/60 truncate max-w-[180px]">
                    {quantity}x {product.name}
                  </span>
                  <span className="font-heading text-sm sm:text-base font-extrabold text-accent">
                    Total: ৳{(product.price * quantity).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Trust Features Row */}
              <div className="grid grid-cols-3 gap-2 border-t border-glass pt-5 text-center">
                <div className="flex flex-col items-center gap-1 p-2">
                  <Truck className="h-5 w-5 text-primary mb-1" />
                  <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-accent">
                    Same-Day Dhaka
                  </span>
                  <span className="text-[10px] text-accent/50">Express Delivery</span>
                </div>

                <div className="flex flex-col items-center gap-1 p-2 border-x border-glass">
                  <ShieldCheck className="h-5 w-5 text-primary mb-1" />
                  <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-accent">
                    Authenticity
                  </span>
                  <span className="text-[10px] text-accent/50">100% Guaranteed</span>
                </div>

                <div className="flex flex-col items-center gap-1 p-2">
                  <RotateCcw className="h-5 w-5 text-primary mb-1" />
                  <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-accent">
                    7-Day Exchange
                  </span>
                  <span className="text-[10px] text-accent/50">Hassle-Free Return</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

    </div>
  );
};
