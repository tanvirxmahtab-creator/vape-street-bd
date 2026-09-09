'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle,
  Database,
  UploadCloud,
  X,
  Star,
  Tag,
  DollarSign,
  Package,
  Layers,
  Eye,
  Sliders,
  FileText,
  Edit3,
} from "lucide-react";
import { Product } from "@/components/ui/products-section";
import { ProductDetailPage } from "@/components/ui/product-detail";
import { TextCopyEditor } from "@/components/admin/TextCopyEditor";
import { useSiteContent } from "@/src/lib/siteContent";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  isSupabaseConfigured,
} from "@/src/lib/supabase";

interface AdminDashboardProps {
  onLogout: () => void;
}

const CATEGORIES = ["Pods", "E-Liquids", "Vapes & Mods", "Disposables", "Starter Kits"] as const;

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { setIsVisualEditMode } = useSiteContent();
  const [adminTab, setAdminTab] = useState<"products" | "textCopy">("products");
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  /* Modal States */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState<Product | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null);
  const [showConfigHelp, setShowConfigHelp] = useState(false);
  const [showLivePreview, setShowLivePreview] = useState(false);

  /* Form Data with Up to 3 Images & Extra Specs */
  const [formData, setFormData] = useState<{
    name: string;
    category: "Pods" | "E-Liquids" | "Vapes & Mods" | "Disposables" | "Starter Kits";
    price: string;
    originalPrice: string;
    description: string;
    images: string[];
    badge: string;
    rating: string;
    battery: string;
    coil: string;
    capacity: string;
    warranty: string;
  }>({
    name: "",
    category: "Pods",
    price: "",
    originalPrice: "",
    description: "",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: "",
    rating: "4.8",
    battery: "1000mAh Fast Charge",
    coil: "0.6Ω Mesh Coil Tech",
    capacity: "2ml E-Juice Pod",
    warranty: "7-Day Replacement Guarantee",
  });

  /* Load Products on Mount */
  const loadData = async () => {
    setLoading(true);
    const data = await fetchProducts();
    setProductsList(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  /* Open Modal for Adding */
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "Pods",
      price: "",
      originalPrice: "",
      description: "",
      images: ["/shop-logo.png", "", ""],
      badge: "",
      rating: "4.8",
      battery: "1000mAh Built-in Battery",
      coil: "0.6Ω Mesh Pod Coil",
      capacity: "2ml Pod / Salt Nic",
      warranty: "7-Day Exchange Guarantee",
    });
    setIsModalOpen(true);
  };

  /* Open Modal for Editing */
  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    const productImgs = product.images && product.images.length > 0
      ? product.images
      : [product.image];

    const imgs: string[] = [
      productImgs[0] || "",
      productImgs[1] || "",
      productImgs[2] || "",
    ];

    setFormData({
      name: product.name,
      category: product.category as any,
      price: String(product.price),
      originalPrice: product.originalPrice ? String(product.originalPrice) : "",
      description: product.description,
      images: imgs,
      badge: product.badge || "",
      rating: String(product.rating),
      battery: product.specs?.battery || "1000mAh Battery",
      coil: product.specs?.coil || "Mesh Coil Tech",
      capacity: product.specs?.capacity || product.specs?.nicotine || "Standard Vape Shop Spec",
      warranty: product.specs?.warranty || "7-Day Exchange Guarantee",
    });
    setIsModalOpen(true);
  };

  /* Upload File Handler for Slot index (0, 1, 2) */
  const handleSlotFileUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingSlot(index);
    try {
      const imageUrl = await uploadProductImage(file);
      setFormData((prev) => {
        const nextImgs = [...prev.images];
        nextImgs[index] = imageUrl;
        return { ...prev, images: nextImgs };
      });
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploadingSlot(null);
    }
  };

  /* Set URL String for Slot index */
  const handleSlotUrlChange = (index: number, url: string) => {
    setFormData((prev) => {
      const nextImgs = [...prev.images];
      nextImgs[index] = url;
      return { ...prev, images: nextImgs };
    });
  };

  /* Save Product (Add or Edit) */
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);

    const priceNum = parseFloat(formData.price) || 0;
    const origPriceNum = formData.originalPrice ? parseFloat(formData.originalPrice) : null;
    const ratingNum = parseFloat(formData.rating) || 4.8;

    const validImages = formData.images.filter((img) => img.trim() !== "");
    if (validImages.length === 0) {
      validImages.push("/shop-logo.png");
    }

    const payload = {
      name: formData.name,
      category: formData.category,
      price: priceNum,
      originalPrice: origPriceNum,
      description: formData.description,
      image: validImages[0],
      images: validImages,
      badge: formData.badge ? formData.badge : null,
      rating: ratingNum,
      specs: {
        battery: formData.battery,
        coil: formData.coil,
        capacity: formData.capacity,
        warranty: formData.warranty,
      },
    };

    if (editingProduct) {
      const updated = await updateProduct({ ...payload, id: editingProduct.id });
      setProductsList((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    } else {
      const created = await addProduct(payload);
      setProductsList((prev) => [created, ...prev]);
    }

    setSaveLoading(false);
    setIsModalOpen(false);
  };

  /* Confirm Delete */
  const handleDeleteConfirm = async () => {
    if (!isDeleting) return;
    setSaveLoading(true);
    await deleteProduct(isDeleting.id);
    setProductsList((prev) => prev.filter((p) => p.id !== isDeleting.id));
    setSaveLoading(false);
    setIsDeleting(null);
  };

  /* Preview Product Construction */
  const validFormImages = formData.images.filter((img) => img.trim() !== "");
  const previewProduct: Product = {
    id: editingProduct ? editingProduct.id : 9999,
    name: formData.name || "Sample Product Title",
    category: formData.category,
    price: parseFloat(formData.price) || 3500,
    originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
    description: formData.description || "Sample product description preview...",
    image: validFormImages[0] || "/shop-logo.png",
    images: validFormImages.length > 0 ? validFormImages : ["/shop-logo.png"],
    badge: formData.badge || null,
    rating: parseFloat(formData.rating) || 4.8,
    specs: {
      battery: formData.battery,
      coil: formData.coil,
      capacity: formData.capacity,
      warranty: formData.warranty,
    },
  };

  /* Filtered Products */
  const filteredProducts = productsList.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen w-full bg-[#080808] text-[#E1E0CC] selection:bg-[#C5A880] selection:text-black">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-glass bg-[#0C0C0C]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-black font-bold font-heading shadow-[0_0_20px_rgba(197,168,128,0.3)]">
              VS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-lg font-black uppercase tracking-tight text-[#E1E0CC]">
                  Vape Street BD
                </h1>
                <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 font-heading text-[10px] font-bold uppercase tracking-wider text-primary">
                  Admin Panel
                </span>
              </div>
              <p className="text-[11px] text-accent/50">Product & Inventory Management Portal</p>
            </div>
          </div>

          {/* Action Header Buttons */}
          <div className="flex items-center gap-3">
            {/* Supabase Status Pill */}
            <button
              onClick={() => setShowConfigHelp(true)}
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border transition-all cursor-pointer ${
                isSupabaseConfigured
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-400"
              }`}
            >
              <Database className="h-3.5 w-3.5" />
              {isSupabaseConfigured ? "Supabase Live" : "Local Storage Mode"}
            </button>

            <button
              onClick={() => {
                setIsVisualEditMode(true);
                window.location.hash = "#/";
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-amber-400 hover:bg-amber-500 hover:text-black transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Visual Live Editor</span>
            </button>

            <a
              href="#/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-glass bg-[#141414] px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:border-primary/40 hover:text-primary cursor-pointer"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Store
            </a>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-400 transition-colors hover:bg-red-500/20 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-10">
        
        {/* Primary Admin Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-3 border-b border-glass pb-4 mb-8">
          <button
            onClick={() => {
              setIsVisualEditMode(true);
              window.location.hash = "/";
            }}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-[#C5A880] to-amber-500 px-6 py-3 text-xs font-black uppercase tracking-wider text-black shadow-[0_0_25px_rgba(197,168,128,0.4)] hover:scale-102 transition-all cursor-pointer"
          >
            <Edit3 className="h-4 w-4" />
            <span>✏️ Open Visual Elementor Mode</span>
          </button>

          <button
            onClick={() => setAdminTab("products")}
            className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              adminTab === "products"
                ? "bg-primary text-black shadow-[0_0_20px_rgba(197,168,128,0.3)]"
                : "border border-glass bg-[#111111] text-accent/70 hover:border-primary/40 hover:text-primary"
            }`}
          >
            <Package className="h-4 w-4" />
            <span>Products & Inventory</span>
          </button>

          <button
            onClick={() => setAdminTab("textCopy")}
            className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              adminTab === "textCopy"
                ? "bg-primary text-black shadow-[0_0_20px_rgba(197,168,128,0.3)]"
                : "border border-glass bg-[#111111] text-accent/70 hover:border-primary/40 hover:text-primary"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Website Copy & List Editor</span>
          </button>
        </div>

        {adminTab === "textCopy" ? (
          <TextCopyEditor />
        ) : (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
              <div className="rounded-2xl border border-glass bg-[#111111] p-5">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold uppercase tracking-wider text-accent/60">
                    Total Products
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Package className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-2 font-heading text-3xl font-black text-accent">{productsList.length}</p>
              </div>

              <div className="rounded-2xl border border-glass bg-[#111111] p-5">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold uppercase tracking-wider text-accent/60">
                    Active Categories
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Layers className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-2 font-heading text-3xl font-black text-accent">{CATEGORIES.length}</p>
              </div>

              <div className="rounded-2xl border border-glass bg-[#111111] p-5">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold uppercase tracking-wider text-accent/60">
                    Backend Status
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Database className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-2 font-heading text-lg font-bold text-primary">
                  {isSupabaseConfigured ? "Connected (Supabase)" : "Local Storage Ready"}
                </p>
              </div>
            </div>

            {/* Toolbar: Search, Category & Add Button */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                {/* Search Input */}
            <div className="relative flex items-center min-w-[260px]">
              <Search className="absolute left-3.5 h-4 w-4 text-accent/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-xl border border-glass bg-[#121212] py-2.5 pl-10 pr-4 text-xs font-sans text-accent placeholder:text-accent/40 focus:border-primary focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-glass bg-[#121212] px-4 py-2.5 text-xs font-sans text-accent focus:border-primary focus:outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Add Product Button */}
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(197,168,128,0.25)] transition-all hover:bg-primary-hover cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add New Product
          </button>
        </div>

        {/* Product Table Grid */}
        {loading ? (
          <div className="flex h-64 w-full items-center justify-center rounded-2xl border border-glass bg-[#111111]">
            <div className="flex items-center gap-3 text-accent/60 text-sm">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              Loading products...
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-glass bg-[#111111] p-8 text-center">
            <Package className="h-10 w-10 text-accent/30 mb-2" />
            <h3 className="font-heading text-lg font-bold text-accent">No Products Found</h3>
            <p className="text-xs text-accent/50 mt-1 max-w-sm">
              Try adjusting your search query or category filter, or click "Add New Product" to create one.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-glass bg-[#111111]">
            <table className="w-full text-left font-sans text-xs text-accent">
              <thead className="border-b border-glass bg-[#0D0D0D] font-heading text-[11px] uppercase tracking-wider text-accent/60">
                <tr>
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Gallery Images</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Badge</th>
                  <th className="px-5 py-4">Rating</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass">
                {filteredProducts.map((product) => {
                  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
                  return (
                    <tr key={product.id} className="transition-colors hover:bg-[#161616]">
                      {/* Image & Title */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-black border border-glass">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-heading text-sm font-bold uppercase tracking-tight text-accent">
                              {product.name}
                            </div>
                            <div className="line-clamp-1 max-w-xs text-[11px] text-accent/50">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Multi Images Count / Thumbnails */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          {productImages.slice(0, 3).map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt={`Thumb ${i+1}`}
                              className="h-7 w-7 rounded-md object-cover border border-glass bg-black"
                            />
                          ))}
                          <span className="font-heading text-[10px] text-primary font-bold ml-1">
                            ({productImages.length}/3)
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-primary/10 px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20">
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-4">
                        <div className="font-heading font-extrabold text-accent">
                          ৳{product.price.toLocaleString()}
                        </div>
                        {product.originalPrice && (
                          <div className="text-[10px] text-accent/40 line-through">
                            ৳{product.originalPrice.toLocaleString()}
                          </div>
                        )}
                      </td>

                      {/* Badge */}
                      <td className="px-5 py-4">
                        {product.badge ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 font-heading text-[10px] font-bold uppercase tracking-wider text-amber-400 border border-amber-500/20">
                            <Zap className="h-2.5 w-2.5" />
                            {product.badge}
                          </span>
                        ) : (
                          <span className="text-accent/30">—</span>
                        )}
                      </td>

                      {/* Rating */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                          <span className="font-heading font-semibold text-accent">{product.rating}</span>
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(product)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-glass bg-[#1A1A1A] text-accent/80 transition-colors hover:border-primary/40 hover:text-primary cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setIsDeleting(product)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 transition-colors hover:bg-red-500/20 cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        </>
        )}
      </main>

      {/* Add / Edit Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-glass bg-[#0F0F0F] p-6 shadow-2xl sm:p-8"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-glass pb-4 mb-6">
                <div>
                  <h2 className="font-heading text-xl font-black uppercase tracking-tight text-accent">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h2>
                  <p className="text-xs text-accent/50 mt-0.5">
                    Customize title, gallery images, pricing & extra specifications.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Live Preview Button */}
                  <button
                    type="button"
                    onClick={() => setShowLivePreview(true)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-black transition-all cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                    Live Preview Page
                  </button>

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A1A1A] text-accent/60 hover:text-accent cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="flex flex-col gap-6">
                
                {/* Basic Details Group */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary border-b border-glass pb-2">
                    <Package className="h-4 w-4" />
                    <span>1. Basic Product Info</span>
                  </div>

                  {/* Product Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-heading text-xs font-bold uppercase tracking-wider text-accent/80">
                      Product Title *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Obsidian Pod Pro"
                      required
                      className="rounded-xl border border-glass bg-[#161616] py-3 px-4 text-xs font-sans text-accent focus:border-primary focus:outline-none"
                    />
                  </div>

                  {/* Category & Rating */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-heading text-xs font-bold uppercase tracking-wider text-accent/80">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className="rounded-xl border border-glass bg-[#161616] py-3 px-4 text-xs font-sans text-accent focus:border-primary focus:outline-none cursor-pointer"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-heading text-xs font-bold uppercase tracking-wider text-accent/80">
                        Star Rating (1 - 5)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                        placeholder="4.8"
                        className="rounded-xl border border-glass bg-[#161616] py-3 px-4 text-xs font-sans text-accent focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Price & Original Price */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-heading text-xs font-bold uppercase tracking-wider text-accent/80">
                        Price (BDT ৳) *
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="3500"
                        required
                        className="rounded-xl border border-glass bg-[#161616] py-3 px-4 text-xs font-sans text-accent focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-heading text-xs font-bold uppercase tracking-wider text-accent/80">
                        Original Price (Optional)
                      </label>
                      <input
                        type="number"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                        placeholder="4200"
                        className="rounded-xl border border-glass bg-[#161616] py-3 px-4 text-xs font-sans text-accent focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Badge Tag */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-heading text-xs font-bold uppercase tracking-wider text-accent/80">
                      Badge Tag (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="e.g. Best Seller, New Arrival, Hot, Signature"
                      className="rounded-xl border border-glass bg-[#161616] py-3 px-4 text-xs font-sans text-accent focus:border-primary focus:outline-none"
                    />
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-heading text-xs font-bold uppercase tracking-wider text-accent/80">
                      Product Description *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter short engaging description..."
                      required
                      className="rounded-xl border border-glass bg-[#161616] py-3 px-4 text-xs font-sans text-accent focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                {/* Extra Specifications Sub-Menu */}
                <div className="flex flex-col gap-4 rounded-2xl border border-glass bg-[#121212] p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary border-b border-glass pb-2">
                    <Sliders className="h-4 w-4" />
                    <span>2. Extra Specifications (For Single Product Page)</span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-heading text-[11px] font-bold uppercase tracking-wider text-accent/80">
                        Battery / Power Spec
                      </label>
                      <input
                        type="text"
                        value={formData.battery}
                        onChange={(e) => setFormData({ ...formData, battery: e.target.value })}
                        placeholder="e.g. 1000mAh Fast Charge"
                        className="rounded-xl border border-glass bg-[#181818] py-2.5 px-3 text-xs font-sans text-accent focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-heading text-[11px] font-bold uppercase tracking-wider text-accent/80">
                        Coil / Airflow Tech
                      </label>
                      <input
                        type="text"
                        value={formData.coil}
                        onChange={(e) => setFormData({ ...formData, coil: e.target.value })}
                        placeholder="e.g. 0.6Ω Dual Mesh Coil"
                        className="rounded-xl border border-glass bg-[#181818] py-2.5 px-3 text-xs font-sans text-accent focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-heading text-[11px] font-bold uppercase tracking-wider text-accent/80">
                        Liquid Capacity / Nicotine
                      </label>
                      <input
                        type="text"
                        value={formData.capacity}
                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                        placeholder="e.g. 2ml Pod / 5% Salt Nic"
                        className="rounded-xl border border-glass bg-[#181818] py-2.5 px-3 text-xs font-sans text-accent focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-heading text-[11px] font-bold uppercase tracking-wider text-accent/80">
                        Warranty & Exchange
                      </label>
                      <input
                        type="text"
                        value={formData.warranty}
                        onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                        placeholder="e.g. 7-Day Direct Exchange Guarantee"
                        className="rounded-xl border border-glass bg-[#181818] py-2.5 px-3 text-xs font-sans text-accent focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Multi-Image Upload (Up to 3 Images) */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-glass pb-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                      <ImageIcon className="h-4 w-4" />
                      <span>3. Product Gallery Images (Max 3) *</span>
                    </div>
                    <span className="text-[11px] text-primary font-bold">
                      {formData.images.filter(i => i.trim() !== "").length} of 3 uploaded
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[0, 1, 2].map((slotIdx) => {
                      const imgVal = formData.images[slotIdx] || "";
                      const isUploading = uploadingSlot === slotIdx;

                      return (
                        <div
                          key={slotIdx}
                          className="flex flex-col gap-2 rounded-2xl border border-glass bg-[#141414] p-3 text-center"
                        >
                          <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-primary">
                            {slotIdx === 0 ? "Main Image (Primary)" : `Gallery Image ${slotIdx + 1}`}
                          </span>

                          {/* Image Preview Box */}
                          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-black border border-glass">
                            {imgVal ? (
                              <>
                                <img src={imgVal} alt={`Slot ${slotIdx + 1}`} className="h-full w-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => handleSlotUrlChange(slotIdx, "")}
                                  className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500/80 text-white hover:bg-red-600 cursor-pointer"
                                  title="Remove image"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </>
                            ) : (
                              <div className="flex h-full w-full flex-col items-center justify-center p-2 text-accent/30">
                                <ImageIcon className="h-7 w-7 mb-1" />
                                <span className="text-[10px]">Empty Slot</span>
                              </div>
                            )}
                          </div>

                          {/* URL Input */}
                          <input
                            type="text"
                            value={imgVal}
                            onChange={(e) => handleSlotUrlChange(slotIdx, e.target.value)}
                            placeholder="Paste image URL..."
                            className="w-full rounded-lg border border-glass bg-[#1A1A1A] py-1.5 px-2 text-[10px] font-sans text-accent placeholder:text-accent/30 focus:border-primary focus:outline-none"
                          />

                          {/* Local File Upload Button */}
                          <label className="inline-flex items-center justify-center gap-1 rounded-lg border border-glass bg-[#1A1A1A] py-1.5 px-2 text-[10px] font-semibold text-accent/90 hover:border-primary/40 hover:text-primary transition-all cursor-pointer">
                            {isUploading ? (
                              <span className="flex items-center gap-1">
                                <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                Uploading...
                              </span>
                            ) : (
                              <>
                                <UploadCloud className="h-3 w-3" />
                                {imgVal ? "Replace File" : "Upload File"}
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleSlotFileUpload(slotIdx, e)}
                              disabled={isUploading}
                              className="hidden"
                            />
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="mt-4 flex items-center justify-between border-t border-glass pt-4">
                  <button
                    type="button"
                    onClick={() => setShowLivePreview(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-black transition-all cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                    Preview Live Page
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-xl border border-glass bg-[#161616] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-accent/70 hover:text-accent cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={saveLoading || uploadingSlot !== null}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(197,168,128,0.25)] hover:bg-primary-hover disabled:opacity-50 cursor-pointer"
                    >
                      {saveLoading ? (
                        <>
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                          Saving...
                        </>
                      ) : (
                        "Publish Product"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Live Preview Modal Overlay */}
      <AnimatePresence>
        {showLivePreview && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl">
            <div className="sticky top-0 z-50 flex items-center justify-between border-b border-glass bg-[#0F0F0F] px-6 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-primary">
                  Live Product Page Preview Mode
                </span>
              </div>

              <button
                onClick={() => setShowLivePreview(false)}
                className="inline-flex items-center gap-2 rounded-full border border-glass bg-red-500/10 px-4 py-1.5 text-xs font-bold uppercase text-red-400 hover:bg-red-500/20 cursor-pointer"
              >
                <X className="h-4 w-4" />
                Close Preview
              </button>
            </div>

            {/* Render Detailed Product Page with Live Form Data */}
            <ProductDetailPage product={previewProduct} onBack={() => setShowLivePreview(false)} />
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {isDeleting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#121212] p-6 shadow-2xl text-center"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                <AlertCircle className="h-6 w-6" />
              </div>

              <h3 className="font-heading text-lg font-bold uppercase text-accent">
                Delete Product?
              </h3>
              <p className="mt-2 text-xs text-accent/60">
                Are you sure you want to remove <span className="text-accent font-bold">"{isDeleting.name}"</span>? This action will remove it from the live store.
              </p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsDeleting(null)}
                  className="rounded-xl border border-glass bg-[#1A1A1A] px-5 py-2 text-xs font-bold uppercase text-accent/70 hover:text-accent cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={saveLoading}
                  className="rounded-xl bg-red-500 px-5 py-2 text-xs font-bold uppercase text-white hover:bg-red-600 disabled:opacity-50 cursor-pointer"
                >
                  {saveLoading ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Supabase Config Guidance Modal */}
      <AnimatePresence>
        {showConfigHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl border border-glass bg-[#121212] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-glass pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  <h3 className="font-heading text-base font-bold uppercase text-accent">
                    Supabase Backend Connection
                  </h3>
                </div>
                <button
                  onClick={() => setShowConfigHelp(false)}
                  className="text-accent/50 hover:text-accent cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-accent/70 leading-relaxed">
                <p>
                  Your admin panel is currently operating in <strong className="text-primary">Live Supabase Mode</strong>.
                </p>
                <p>
                  Connected Project: <code className="text-primary bg-black px-1.5 py-0.5 rounded">https://iukwilarqfqijbzetygq.supabase.co</code>
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowConfigHelp(false)}
                  className="rounded-xl bg-primary px-5 py-2 text-xs font-bold uppercase text-black hover:bg-primary-hover cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
