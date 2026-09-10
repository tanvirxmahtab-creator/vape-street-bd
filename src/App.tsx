'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DemoOne from "@/components/ui/demo";
import { TestimonialsDemo } from "@/components/ui/TestimonialsDemo";
import AllProductsPage from "@/src/pages/AllProducts";
import ContactUsPage from "@/src/pages/ContactUs";
import AboutUsPage from "@/src/pages/AboutUs";
import { ProductsSection, Product } from "@/components/ui/products-section";
import { ProductDetailPage } from "@/components/ui/product-detail";
import { getProducts } from "@/src/data/products";
import { TheaterLoader } from "@/components/ui/TheaterLoader";
import { AgeModal } from "@/components/ui/AgeModal";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { supabase } from "@/src/lib/supabase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function App() {
  const [isMounted, setIsMounted] = useState(false);
  const [pathname, setPathname] = useState("/");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);
  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  const handleAgeVerify = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("vape_street_age_verified", "true");
    }
    setIsAgeVerified(true);
  };

  // Helper to force immediate scroll to top on page transition
  const scrollToTopInstant = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (ScrollTrigger) {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    }
  };

  const checkAdminAuth = async () => {
    if (typeof window !== "undefined") {
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setIsAdminAuthenticated(true);
          return;
        }
      }
      const token = sessionStorage.getItem("vape_street_admin_auth");
      setIsAdminAuthenticated(Boolean(token));
    }
  };

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const verified = sessionStorage.getItem("vape_street_age_verified") === "true";
      setIsAgeVerified(verified);
      setPathname(window.location.hash.replace("#", "") || "/");
    }

    checkAdminAuth();

    const handleLocationChange = async () => {
      const currentPath = window.location.hash.replace("#", "") || "/";
      setPathname(currentPath);
      scrollToTopInstant();

      if (currentPath === "/admin") {
        await checkAdminAuth();
      }

      // Check if path is /product/:id
      if (currentPath.toLowerCase().startsWith("/product/")) {
        const idStr = currentPath.split("/")[2];
        const id = parseInt(idStr, 10);
        if (!isNaN(id)) {
          const allProducts = await getProducts();
          const found = allProducts.find((p) => p.id === id);
          if (found) {
            setSelectedProduct(found);
          }
        }
      } else {
        setSelectedProduct(null);
      }
    };

    handleLocationChange();

    window.addEventListener("hashchange", handleLocationChange);
    return () => window.removeEventListener("hashchange", handleLocationChange);
  }, []);

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    window.location.hash = "/admin";
    setPathname("/admin");
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    window.location.hash = "/";
    setPathname("/");
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    window.location.hash = `/product/${product.id}`;
    setPathname(`/product/${product.id}`);
    scrollToTopInstant();
  };

  const handleNavigateHome = () => {
    setSelectedProduct(null);
    window.location.hash = "/";
    setPathname("/");
    scrollToTopInstant();
  };

  const handleNavigateProducts = () => {
    setSelectedProduct(null);
    window.location.hash = "/all-products";
    setPathname("/all-products");
    scrollToTopInstant();
  };

  const handleNavigateContact = () => {
    setSelectedProduct(null);
    window.location.hash = "/contact";
    setPathname("/contact");
    scrollToTopInstant();
  };

  const handleNavigateAbout = () => {
    setSelectedProduct(null);
    window.location.hash = "/about";
    setPathname("/about");
    scrollToTopInstant();
  };

  const handleNavigateAdmin = () => {
    setSelectedProduct(null);
    window.location.hash = "/admin";
    setPathname("/admin");
    scrollToTopInstant();
  };

  const isAdminRoute = pathname === "/admin";

  // Key for page transition rendering
  const activeRouteKey = selectedProduct ? `product-${selectedProduct.id}` : pathname;

  // Render current active route content
  const renderContent = () => {
    // Route: /admin
    if (isAdminRoute) {
      return isAdminAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      );
    }

    // Route: /product/:id
    if (selectedProduct) {
      return <ProductDetailPage product={selectedProduct} onBack={handleNavigateHome} />;
    }

    // Route: /all-products
    if (pathname === "/all-products") {
      return (
        <AllProductsPage
          onBack={handleNavigateHome}
          onSelectProduct={handleSelectProduct}
        />
      );
    }

    // Route: /contact
    if (pathname === "/contact") {
      return (
        <ContactUsPage
          onBack={handleNavigateHome}
          onNavigateProducts={handleNavigateProducts}
        />
      );
    }

    // Route: /about
    if (pathname === "/about") {
      return (
        <AboutUsPage
          onBack={handleNavigateHome}
          onNavigateProducts={handleNavigateProducts}
          onNavigateContact={handleNavigateContact}
        />
      );
    }

    // Public Storefront Home
    return (
      <div className="min-h-screen bg-black text-[#E1E0CC]">
        <DemoOne
          onNavigateProducts={handleNavigateProducts}
          onNavigateContact={handleNavigateContact}
          onNavigateAbout={handleNavigateAbout}
          isLoaderFinished={isLoaderFinished}
        />
        <ProductsSection onSelectProduct={handleSelectProduct} />
        <TestimonialsDemo />
      </div>
    );
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Age Verification Modal */}
      {!isAdminRoute && !isAgeVerified && (
        <AgeModal onVerify={handleAgeVerify} />
      )}

      {/* Theater Loader animation (starts after age is verified) */}
      {!isAdminRoute && isAgeVerified && (
        <TheaterLoader onLoaded={() => setIsLoaderFinished(true)} />
      )}
      
      {/* Global Transparent Liquid Glass Fixed Header */}
      {!isAdminRoute && (
        <Navbar
          currentPath={pathname}
          onNavigateHome={handleNavigateHome}
          onNavigateProducts={handleNavigateProducts}
          onNavigateAbout={handleNavigateAbout}
          onNavigateContact={handleNavigateContact}
          onNavigateAdmin={handleNavigateAdmin}
        />
      )}

      {/* Main Active Page Content with Smooth Framer Motion Page Transition */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activeRouteKey}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          {renderContent()}
        </motion.main>
      </AnimatePresence>

      {/* Global Luxury Footer */}
      {!isAdminRoute && (
        <Footer
          onNavigateHome={handleNavigateHome}
          onNavigateProducts={handleNavigateProducts}
          onNavigateAbout={handleNavigateAbout}
          onNavigateContact={handleNavigateContact}
        />
      )}
    </>
  );
}
