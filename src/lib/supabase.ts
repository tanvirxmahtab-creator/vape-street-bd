import { createClient } from "@supabase/supabase-js";
import { Product } from "@/components/ui/products-section";
import { get, set, del } from "idb-keyval";

// Next.js requires DIRECT references to process.env.NEXT_PUBLIC_* for build-time inlining.
// Dynamic property access (e.g. process.env[variable]) will NOT be replaced.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const STORAGE_KEY = "vape_street_bd_products_v1";

/* Initial Seed Products Data with 3 Images Per Product */
export const initialSeedProducts: Product[] = [
  // POD SYSTEMS
  {
    id: 1,
    name: "Obsidian Pod Pro",
    category: "Pods",
    price: 3500,
    originalPrice: 4200,
    description: "Ultra-slim pod system with adjustable airflow and 800mAh battery. Perfect for salt nicotine.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: "Best Seller",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Nebula Pod Mini",
    category: "Pods",
    price: 2800,
    originalPrice: 3200,
    description: "Compact draw-activated pod with magnetic cartridge system. Weighs only 30g.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: null,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Stealth Pod X",
    category: "Pods",
    price: 3200,
    originalPrice: 3800,
    description: "Premium aluminium alloy pod with side-fill system and 1000mAh fast-charge battery.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: null,
    rating: 4.5,
  },
  {
    id: 4,
    name: "Zenith Pod Ultra",
    category: "Pods",
    price: 4100,
    originalPrice: 4800,
    description: "The ultimate pod: 1500mAh, smart wattage, OLED screen, and replaceable coil heads.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: "Editor's Pick",
    rating: 4.9,
  },

  // E-LIQUIDS
  {
    id: 5,
    name: "Royal Mango Fusion",
    category: "E-Liquids",
    price: 1200,
    originalPrice: 1500,
    description: "A tropical blend of ripe mango, passionfruit, and a hint of cool menthol. 60ml bottle.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: "Top Rated",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Velvet Tobacco Gold",
    category: "E-Liquids",
    price: 1400,
    originalPrice: 1800,
    description: "Rich Virginia tobacco with caramel and vanilla notes. Smooth freebase, 60ml.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: "Signature",
    rating: 4.9,
  },
  {
    id: 7,
    name: "Arctic Mint Blast",
    category: "E-Liquids",
    price: 1100,
    originalPrice: null,
    description: "Icy peppermint with eucalyptus undertones. An intense, refreshing all-day vape. 30ml.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: null,
    rating: 4.4,
  },
  {
    id: 8,
    name: "Blueberry Custard",
    category: "E-Liquids",
    price: 1300,
    originalPrice: null,
    description: "Creamy vanilla custard layered with fresh blueberry compote. Dessert lovers' dream. 60ml.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: null,
    rating: 4.6,
  },

  // VAPES & MODS
  {
    id: 9,
    name: "Titan X Box Mod",
    category: "Vapes & Mods",
    price: 8500,
    originalPrice: 10000,
    description: "220W dual-battery box mod with precision temperature control and OLED display.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: "Premium",
    rating: 4.8,
  },
  {
    id: 10,
    name: "Phantom V2 Mod",
    category: "Vapes & Mods",
    price: 7200,
    originalPrice: 8500,
    description: "Single 21700 battery mod with rapid 2A charging and IP68 dust/water resistance.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: null,
    rating: 4.7,
  },
  {
    id: 11,
    name: "Wrath 230W Mod",
    category: "Vapes & Mods",
    price: 9500,
    originalPrice: 11500,
    description: "Flagship triple-battery beast with haptic feedback, wireless charging dock, and app control.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: "Flagship",
    rating: 5.0,
  },
  {
    id: 12,
    name: "Rogue Mini Mod",
    category: "Vapes & Mods",
    price: 6000,
    originalPrice: 7000,
    description: "Palm-sized 80W mod with built-in 3000mAh battery. Sleek zinc alloy construction.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: null,
    rating: 4.5,
  },

  // DISPOSABLES
  {
    id: 13,
    name: "Cloud Burst Disposable",
    category: "Disposables",
    price: 800,
    originalPrice: null,
    description: "5000 puff disposable with mesh coil technology. Available in 12 flavors.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: null,
    rating: 4.5,
  },
  {
    id: 14,
    name: "Neon Grape Disposable",
    category: "Disposables",
    price: 900,
    originalPrice: 1100,
    description: "8000 puff rechargeable disposable with adjustable airflow slider. Grape ice flavor.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: "Hot",
    rating: 4.8,
  },
  {
    id: 15,
    name: "Lychee Rose Disposable",
    category: "Disposables",
    price: 750,
    originalPrice: null,
    description: "3000 puff floral-fruit fusion. Delicate lychee meets Bulgarian rose. Draw-activated.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: null,
    rating: 4.3,
  },
  {
    id: 16,
    name: "Watermelon Ice Disposable",
    category: "Disposables",
    price: 850,
    originalPrice: 1000,
    description: "10000 puff mega disposable with LED puff counter and type-C recharging.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: "Mega",
    rating: 4.7,
  },

  // STARTER KITS
  {
    id: 17,
    name: "Genesis Starter Kit",
    category: "Starter Kits",
    price: 5500,
    originalPrice: 6800,
    description: "Everything you need to start: mod, tank, coils, USB-C charger, and carry case.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: "New Arrival",
    rating: 4.9,
  },
  {
    id: 18,
    name: "Apex Pro Kit",
    category: "Starter Kits",
    price: 6200,
    originalPrice: null,
    description: "Advanced sub-ohm starter kit with 5ml bubble glass tank and three coil options.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: null,
    rating: 4.6,
  },
  {
    id: 19,
    name: "Vortex DTL Kit",
    category: "Starter Kits",
    price: 4800,
    originalPrice: 5500,
    description: "Direct-to-lung kit with massive airflow, top-fill tank, and pre-built mesh coils.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: null,
    rating: 4.7,
  },
  {
    id: 20,
    name: "Heritage MTL Kit",
    category: "Starter Kits",
    price: 5200,
    originalPrice: 6500,
    description: "Premium mouth-to-lung kit with tight draw, ceramic coils, and precision airflow ring.",
    image: "/shop-logo.png",
    images: ["/shop-logo.png", "/shop-logo.png", "/shop-logo.png"],
    badge: "Staff Pick",
    rating: 4.8,
  },
];

/* Helper to clear local products cache */
export const clearProductCache = async () => {
  try {
    await del(STORAGE_KEY);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.error("Failed to clear product cache:", e);
  }
};

/* Helper to get local products */
export const getLocalProducts = async (): Promise<Product[]> => {
  try {
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) {
      localStorage.removeItem(STORAGE_KEY);
    }
    const saved = await get(STORAGE_KEY);
    if (saved && Array.isArray(saved) && saved.length > 0) {
      // Check if saved items contain old fake seed products (e.g. Obsidian Pod Pro)
      const hasOldSeedData = saved.some((p: any) => p.name === "Obsidian Pod Pro" || p.name === "Nebula Pod Mini");
      if (hasOldSeedData && isSupabaseConfigured) {
        // Purge old fake seed cache!
        await clearProductCache();
        return [];
      }

      return saved.map((p: any) => ({
        ...p,
        images: p.images && Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.image || "/shop-logo.png"],
      }));
    }
  } catch (e) {
    console.error("Failed to parse local products storage", e);
  }

  // Only use seed products as absolute fallback if Supabase is NOT configured at all
  if (!isSupabaseConfigured) {
    await set(STORAGE_KEY, initialSeedProducts);
    return initialSeedProducts;
  }

  return [];
};

/* Helper to save local products */
export const saveLocalProducts = async (products: Product[]) => {
  try {
    await set(STORAGE_KEY, products);
  } catch (e) {
    console.error("Failed to save local products", e);
  }
};

/* Fetch Products (Supabase as primary source of truth) */
export const fetchProducts = async (): Promise<Product[]> => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.warn("Supabase fetch error, using local cache:", error.message);
        return await getLocalProducts();
      }

      if (data) {
        const formatted: Product[] = data.map((item) => {
          let imgs: string[] = [];
          if (item.images) {
            if (Array.isArray(item.images)) imgs = item.images;
            else if (typeof item.images === "string") {
              try { imgs = JSON.parse(item.images); } catch { imgs = [item.images]; }
            }
          }
          if (imgs.length === 0) {
            imgs = [item.image || "/shop-logo.png"];
          }

          return {
            id: item.id,
            name: item.name,
            category: item.category,
            price: Number(item.price),
            originalPrice: item.original_price ? Number(item.original_price) : null,
            description: item.description || "",
            image: imgs[0] || item.image || "/shop-logo.png",
            images: imgs,
            badge: item.badge || null,
            rating: Number(item.rating || 4.5),
            specs: item.specs || undefined,
          };
        });

        // Always save fresh live products to IndexedDB cache
        await saveLocalProducts(formatted);
        return formatted;
      }
    } catch (err) {
      console.warn("Supabase fetch failed, using local fallback:", err);
    }
  }

  return await getLocalProducts();
};

/* Add Product */
export const addProduct = async (productData: Omit<Product, "id">): Promise<Product> => {
  const imagesArray = productData.images && productData.images.length > 0
    ? productData.images.slice(0, 6)
    : [productData.image];

  const primaryImage = imagesArray[0] || productData.image;

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert({
          name: productData.name,
          category: productData.category,
          price: productData.price,
          original_price: productData.originalPrice,
          description: productData.description,
          image: primaryImage,
          // TODO: Uncomment these once you run the ALTER TABLE sql migrations!
          // images: imagesArray,
          badge: productData.badge,
          rating: productData.rating,
          // specs: productData.specs,
        })
        .select()
        .single();

      if (!error && data) {
        const newProduct: Product = {
          id: data.id,
          name: data.name,
          category: data.category,
          price: Number(data.price),
          originalPrice: data.original_price ? Number(data.original_price) : null,
          description: data.description || "",
          image: primaryImage,
          images: imagesArray,
          badge: data.badge || null,
          rating: Number(data.rating || 4.8),
          specs: data.specs || productData.specs,
        };
        // Re-fetch all products to keep cache 100% in sync
        await fetchProducts();
        return newProduct;
      }
    } catch (err) {
      console.warn("Supabase add failed, using local fallback:", err);
    }
  }

  // Local fallback
  const current = await getLocalProducts();
  const maxId = current.reduce((max, p) => (p.id > max ? p.id : max), 0);
  const newProduct: Product = {
    ...productData,
    id: maxId + 1,
    image: primaryImage,
    images: imagesArray,
  };
  await saveLocalProducts([newProduct, ...current]);
  return newProduct;
};

/* Update Product */
export const updateProduct = async (product: Product): Promise<Product> => {
  const imagesArray = product.images && product.images.length > 0
    ? product.images.slice(0, 6)
    : [product.image];

  const primaryImage = imagesArray[0] || product.image;
  const updatedProduct = { ...product, image: primaryImage, images: imagesArray };

  if (supabase) {
    try {
      const { error } = await supabase
        .from("products")
        .update({
          name: product.name,
          category: product.category,
          price: product.price,
          original_price: product.originalPrice,
          description: product.description,
          image: primaryImage,
          // TODO: Uncomment these once you run the ALTER TABLE sql migrations!
          // images: imagesArray,
          badge: product.badge,
          rating: product.rating,
          // specs: product.specs,
        })
        .eq("id", product.id);

      if (error) {
        console.warn("Supabase update error:", error.message);
      }
    } catch (err) {
      console.warn("Supabase update exception:", err);
    }
  }

  // Re-fetch all products to keep cache 100% in sync
  await fetchProducts();
  return updatedProduct;
};

/* Delete Product */
export const deleteProduct = async (id: number): Promise<boolean> => {
  if (supabase) {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        console.warn("Supabase delete error:", error.message);
      }
    } catch (err) {
      console.warn("Supabase delete exception:", err);
    }
  }

  // Re-fetch all products to keep cache 100% in sync
  await fetchProducts();
  return true;
};

/* Upload Product Image to Supabase Storage Bucket or return Data URL fallback */
export const uploadProductImage = async (file: File): Promise<string> => {
  if (supabase) {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file, { upsert: true });

      if (!uploadError) {
        const { data } = supabase.storage.from("product-images").getPublicUrl(filePath);
        if (data?.publicUrl) {
          return data.publicUrl;
        }
      } else {
        console.warn("Supabase storage upload error:", uploadError.message);
      }
    } catch (err) {
      console.warn("Supabase storage exception:", err);
    }
  }

  // Fallback: convert file to Base64 Data URL with canvas compression
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};
