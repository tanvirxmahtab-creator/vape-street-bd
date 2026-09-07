import { createClient } from "@supabase/supabase-js";
import { Product } from "@/components/ui/products-section";

const getEnvVar = (key: string): string => {
  if (typeof process !== "undefined" && process.env) {
    if (process.env[key]) return process.env[key] as string;
    const nextKey = `NEXT_PUBLIC_${key.replace("VITE_", "")}`;
    if (process.env[nextKey]) return process.env[nextKey] as string;
  }
  try {
    // @ts-ignore
    if (typeof import.meta !== "undefined" && import.meta.env) {
      // @ts-ignore
      return import.meta.env[key] || "";
    }
  } catch (e) {}
  return "";
};

const supabaseUrl = getEnvVar("VITE_SUPABASE_URL");
const supabaseAnonKey = getEnvVar("VITE_SUPABASE_ANON_KEY");

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
    image: "/products/pod-system-demo.png",
    images: ["/products/pod-system-demo.png", "/products/pod-device.png", "/products/starter-kit.png"],
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
    image: "/products/pod-device.png",
    images: ["/products/pod-device.png", "/products/pod-system-demo.png", "/products/starter-kit.png"],
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
    image: "/products/pod-device.png",
    images: ["/products/pod-device.png", "/products/pod-system-demo.png", "/products/box-mod.png"],
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
    image: "/products/pod-system-demo.png",
    images: ["/products/pod-system-demo.png", "/products/pod-device.png", "/products/starter-kit.png"],
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
    image: "/products/eliquid-demo.png",
    images: ["/products/eliquid-demo.png", "/products/eliquid-bottle.png", "/products/eliquid-demo.png"],
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
    image: "/products/eliquid-bottle.png",
    images: ["/products/eliquid-bottle.png", "/products/eliquid-demo.png", "/products/eliquid-bottle.png"],
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
    image: "/products/eliquid-demo.png",
    images: ["/products/eliquid-demo.png", "/products/eliquid-bottle.png", "/products/eliquid-demo.png"],
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
    image: "/products/eliquid-bottle.png",
    images: ["/products/eliquid-bottle.png", "/products/eliquid-demo.png", "/products/eliquid-bottle.png"],
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
    image: "/products/box-mod.png",
    images: ["/products/box-mod.png", "/products/starter-kit.png", "/products/pod-system-demo.png"],
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
    image: "/products/box-mod.png",
    images: ["/products/box-mod.png", "/products/starter-kit.png", "/products/pod-device.png"],
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
    image: "/products/box-mod.png",
    images: ["/products/box-mod.png", "/products/starter-kit.png", "/products/box-mod.png"],
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
    image: "/products/box-mod.png",
    images: ["/products/box-mod.png", "/products/pod-device.png", "/products/box-mod.png"],
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
    image: "/products/disposable-vape.png",
    images: ["/products/disposable-vape.png", "/products/pod-device.png", "/products/disposable-vape.png"],
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
    image: "/products/disposable-vape.png",
    images: ["/products/disposable-vape.png", "/products/pod-system-demo.png", "/products/disposable-vape.png"],
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
    image: "/products/disposable-vape.png",
    images: ["/products/disposable-vape.png", "/products/eliquid-demo.png", "/products/disposable-vape.png"],
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
    image: "/products/disposable-vape.png",
    images: ["/products/disposable-vape.png", "/products/pod-device.png", "/products/disposable-vape.png"],
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
    image: "/products/starter-kit.png",
    images: ["/products/starter-kit.png", "/products/box-mod.png", "/products/eliquid-demo.png"],
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
    image: "/products/starter-kit.png",
    images: ["/products/starter-kit.png", "/products/box-mod.png", "/products/pod-system-demo.png"],
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
    image: "/products/starter-kit.png",
    images: ["/products/starter-kit.png", "/products/box-mod.png", "/products/starter-kit.png"],
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
    image: "/products/starter-kit.png",
    images: ["/products/starter-kit.png", "/products/pod-system-demo.png", "/products/starter-kit.png"],
    badge: "Staff Pick",
    rating: 4.8,
  },
];

/* Helper to get local products */
export const getLocalProducts = (): Product[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((p: any) => ({
        ...p,
        images: p.images && Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.image || "/products/pod-device.png"],
      }));
    }
  } catch (e) {
    console.error("Failed to parse local products storage", e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSeedProducts));
  return initialSeedProducts;
};

/* Helper to save local products */
export const saveLocalProducts = (products: Product[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error("Failed to save local products", e);
  }
};

/* Fetch Products (Supabase with Local Fallback) */
export const fetchProducts = async (): Promise<Product[]> => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.warn("Supabase fetch error, falling back to local storage:", error.message);
        return getLocalProducts();
      }

      if (data && data.length > 0) {
        const formatted: Product[] = data.map((item) => {
          let imgs: string[] = [];
          if (item.images) {
            if (Array.isArray(item.images)) imgs = item.images;
            else if (typeof item.images === "string") {
              try { imgs = JSON.parse(item.images); } catch { imgs = [item.images]; }
            }
          }
          if (imgs.length === 0) {
            imgs = [item.image || "/products/pod-device.png"];
          }

          return {
            id: item.id,
            name: item.name,
            category: item.category,
            price: Number(item.price),
            originalPrice: item.original_price ? Number(item.original_price) : null,
            description: item.description || "",
            image: imgs[0] || item.image || "/products/pod-device.png",
            images: imgs,
            badge: item.badge || null,
            rating: Number(item.rating || 4.5),
            specs: item.specs || undefined,
          };
        });
        saveLocalProducts(formatted);
        return formatted;
      }
    } catch (err) {
      console.warn("Supabase fetch failed, using local storage fallback:", err);
    }
  }

  return getLocalProducts();
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
          images: imagesArray,
          badge: productData.badge,
          rating: productData.rating,
          specs: productData.specs,
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
        const current = getLocalProducts();
        saveLocalProducts([newProduct, ...current]);
        return newProduct;
      }
    } catch (err) {
      console.warn("Supabase add failed, using local fallback:", err);
    }
  }

  // Local fallback
  const current = getLocalProducts();
  const maxId = current.reduce((max, p) => (p.id > max ? p.id : max), 0);
  const newProduct: Product = {
    ...productData,
    id: maxId + 1,
    image: primaryImage,
    images: imagesArray,
  };
  saveLocalProducts([newProduct, ...current]);
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
          images: imagesArray,
          badge: product.badge,
          rating: product.rating,
          specs: product.specs,
        })
        .eq("id", product.id);

      if (error) {
        console.warn("Supabase update error:", error.message);
      }
    } catch (err) {
      console.warn("Supabase update exception:", err);
    }
  }

  // Local fallback & state sync
  const current = getLocalProducts();
  const updated = current.map((p) => (p.id === product.id ? updatedProduct : p));
  saveLocalProducts(updated);
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

  // Local fallback & state sync
  const current = getLocalProducts();
  const filtered = current.filter((p) => p.id !== id);
  saveLocalProducts(filtered);
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
