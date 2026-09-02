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
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { TheaterLoader } from "@/components/ui/TheaterLoader";
import { AgeModal } from "@/components/ui/AgeModal";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { fetchProducts } from "@/src/lib/supabase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function App() {
  const [isMounted, setIsMounted] = useState(false);
  const [pathname, setPathname] = useState("/");
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoaderFinished, setIsLoaderFinished] = useState(false);
  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(false);

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

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const verified = sessionStorage.getItem("vape_street_age_verified") === "true";
      setIsAgeVerified(verified);
      setPathname(window.location.pathname);
    }

    // Check initial admin auth state
    const isAuth = typeof window !== "undefined" && sessionStorage.getItem("vape_street_admin_auth") === "true";
    setIsAdminAuth(isAuth);

    const handleLocationChange = async () => {
      const currentPath = window.location.pathname;
      setPathname(currentPath);
      scrollToTopInstant();

      // Check if path is /product/:id
      if (currentPath.toLowerCase().startsWith("/product/")) {
        const idStr = currentPath.split("/")[2];
        const id = parseInt(idStr, 10);
        if (!isNaN(id)) {
          const allProducts = await fetchProducts();
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

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const handleLoginSuccess = () => {
    setIsAdminAuth(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("vape_street_admin_auth");
    setIsAdminAuth(false);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    window.history.pushState({}, "", `/product/${product.id}`);
    setPathname(`/product/${product.id}`);
    scrollToTopInstant();
  };

  const handleNavigateHome = () => {
    setSelectedProduct(null);
    window.history.pushState({}, "", "/");
    setPathname("/");
    scrollToTopInstant();
  };

  const handleNavigateProducts = () => {
    setSelectedProduct(null);
    window.history.pushState({}, "", "/all-products");
    setPathname("/all-products");
    scrollToTopInstant();
  };

  const handleNavigateContact = () => {
    setSelectedProduct(null);
    window.history.pushState({}, "", "/contact");
    setPathname("/contact");
    scrollToTopInstant();
  };

  const handleNavigateAbout = () => {
    setSelectedProduct(null);
    window.history.pushState({}, "", "/about");
    setPathname("/about");
    scrollToTopInstant();
  };

  const handleNavigateAdmin = () => {
    setSelectedProduct(null);
    window.history.pushState({}, "", "/admin");
    setPathname("/admin");
    scrollToTopInstant();
  };

  const isAdminRoute = pathname.toLowerCase().startsWith("/admin");

  // Key for page transition rendering
  const activeRouteKey = selectedProduct ? `product-${selectedProduct.id}` : pathname;

  // Render current active route content
  const renderContent = () => {
    // Route: /admin
    if (isAdminRoute) {
      if (!isAdminAuth) {
        return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
      }
      return <AdminDashboard onLogout={handleLogout} />;
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
      {!isAgeVerified && (
        <AgeModal onVerify={handleAgeVerify} />
      )}

      {/* Theater Loader animation (starts after age is verified) */}
      {isAgeVerified && (
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
          onNavigateAdmin={handleNavigateAdmin}
        />
      )}
    </>
  );
}
