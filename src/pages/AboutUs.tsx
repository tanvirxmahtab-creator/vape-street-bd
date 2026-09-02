'use client';

import React, { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import StickyScrollGallery from "@/components/ui/sticky-scroll-gallery";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Award,
  Crown,
  MapPin,
  CheckCircle2,
  HeartHandshake,
  Zap,
  ArrowRight,
  Globe2,
  Plane,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const carouselImagesLeft = [
  { src: "/carousel/468427407_122233675070011074_6155529749893504258_n.jpg", country: "🇺🇸 USA", title: "Premium Hardware" },
  { src: "/carousel/494532212_122267467064011074_8772494420156102795_n.jpg", country: "🇬🇧 UK", title: "Artisanal Salt Nics" },
  { src: "/carousel/531798336_122289986138011074_4533220398835478456_n.jpg", country: "🇨🇳 China", title: "Mesh Coil Pods" },
  { src: "/carousel/533836483_122291253614011074_7220852537404250917_n.jpg", country: "🇦🇪 Dubai", title: "Exotic E-Liquids" },
  { src: "/carousel/538134940_122294116022011074_1156388185327929263_n.jpg", country: "🇺🇸 USA", title: "High-Performance Mods" },
  { src: "/carousel/539207153_122294116082011074_5557545811899280022_n.jpg", country: "🇬🇧 UK", title: "TPD Certified Salts" },
];

const carouselImagesCenter = [
  { src: "/carousel/558761878_122302699820011074_1285799200142645356_n.jpg", country: "🇨🇳 China", title: "Ultra-Portable Pods" },
  { src: "/carousel/577830511_122307899864011074_5225343322603451255_n.jpg", country: "🇦🇪 Dubai", title: "Luxury Reserve Flavors" },
  { src: "/carousel/589954350_122311521656011074_6963431804783336509_n.jpg", country: "🇺🇸 USA", title: "Sub-Ohm Atomizers" },
];

const carouselImagesRight = [
  { src: "/carousel/589987566_122311520978011074_3227637789520886715_n.jpg", country: "🇬🇧 UK", title: "Award-Winning Brands" },
  { src: "/carousel/590090133_122311519208011074_8353509033857179629_n.jpg", country: "🇨🇳 China", title: "Smart OLED Mods" },
  { src: "/carousel/591745980_122311521026011074_4013517563504897940_n.jpg", country: "🇦🇪 Dubai", title: "Gold Edition Kits" },
  { src: "/carousel/604775802_122316431414011074_4037281289057022901_n.jpg", country: "🇺🇸 USA", title: "Custom Dripper Tanks" },
  { src: "/carousel/604855483_122316431492011074_5905099553743233037_n.jpg", country: "🇬🇧 UK", title: "Organic Extracts" },
  { src: "/carousel/605642712_122316431096011074_6413183367371120477_n.jpg", country: "🇨🇳 China", title: "Aerodynamic Devices" },
  { src: "/carousel/606060241_122316431480011074_5242036826327114147_n.jpg", country: "🇦🇪 Dubai", title: "Vape Shop Collections" },
];

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, rgba(197, 168, 128, 0.07) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(197, 168, 128, 0.07) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
  }

  .text-gold-gradient {
      background: linear-gradient(135deg, #FFF0D4 0%, #C5A880 50%, #9A7B4F 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
  }

  .text-silver-gradient {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
  }

  /* Premium Obsidian & Gold Depth Card */
  .premium-depth-card {
      background: linear-gradient(145deg, #121018 0%, #050505 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.95),
          0 0 50px rgba(197, 168, 128, 0.15),
          inset 0 1px 2px rgba(197, 168, 128, 0.3),
          inset 0 -2px 4px rgba(0, 0, 0, 0.9);
      border: 1px solid rgba(197, 168, 128, 0.25);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(197,168,128,0.12) 0%, transparent 45%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  /* Owner Portrait Holographic Frame */
  .portrait-frame {
      background: #09090b;
      box-shadow: 
          0 30px 60px -10px rgba(0, 0, 0, 0.9),
          0 0 30px rgba(197, 168, 128, 0.2),
          inset 0 0 0 2px rgba(197, 168, 128, 0.4),
          inset 0 0 0 8px #000;
      transform-style: preserve-3d;
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(197, 168, 128, 0.15) 0%, rgba(20, 20, 20, 0.8) 100%);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
          0 0 0 1px rgba(197, 168, 128, 0.3),
          0 25px 50px -12px rgba(0, 0, 0, 0.9),
          inset 0 1px 1px rgba(255, 255, 255, 0.2);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }
`;

interface AboutUsPageProps {
  onBack?: () => void;
  onNavigateProducts?: () => void;
  onNavigateContact?: () => void;
}

export default function AboutUsPage({
  onBack,
  onNavigateProducts,
  onNavigateContact,
}: AboutUsPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const portraitCardRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const lenisRef = useRef<any>(null);

  // 1. Mouse tilt interaction on Owner's portrait card
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2.5) return;

      cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && portraitCardRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(portraitCardRef.current, {
            rotationY: xVal * 14,
            rotationX: -yVal * 14,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. GSAP ScrollTrigger timeline setup
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Parallax layer timeline
      const triggerElement = parallaxRef.current?.querySelector("[data-parallax-layers]");
      if (triggerElement) {
        const pTl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: "0% 0%",
            end: "100% 0%",
            scrub: 0,
          },
        });

        const layers = [
          { layer: "1", yPercent: 65 },
          { layer: "2", yPercent: 50 },
          { layer: "3", yPercent: 35 },
          { layer: "4", yPercent: 10 },
        ];

        layers.forEach((layerObj, idx) => {
          pTl.to(
            triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
            { yPercent: layerObj.yPercent, ease: "none" },
            idx === 0 ? undefined : "<"
          );
        });
      }

      // Cinematic Card reveal timeline
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)" });
      gsap.set(".main-card", { y: window.innerHeight + 150, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".portrait-scroll-wrapper", ".floating-badge"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const introTl = gsap.timeline({ delay: 0.2 });
      introTl.to(".text-track", {
        duration: 1.6,
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        ease: "expo.out",
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3800",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".portrait-scroll-wrapper",
          { y: 250, z: -400, rotationX: 40, rotationY: -25, autoAlpha: 0, scale: 0.7 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .to(".progress-ring", { strokeDashoffset: 10, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".counter-val", { innerHTML: 100, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".floating-badge", { y: 80, autoAlpha: 0, scale: 0.7 }, { y: 0, autoAlpha: 1, scale: 1, ease: "back.out(1.4)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".card-left-text", { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 40, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1.2 })
        .to([".portrait-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.9, y: -30, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".main-card", {
          width: isMobile ? "92vw" : "86vw",
          height: isMobile ? "90vh" : "85vh",
          borderRadius: isMobile ? "28px" : "40px",
          ease: "expo.inOut",
          duration: 1.8,
        }, "pullback")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 250, ease: "power3.in", duration: 1.4 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis ref={lenisRef} autoRaf root>
      <div className="min-h-screen bg-[#050505] text-[#E1E0CC] font-sans antialiased">
        <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

        {/* Section 1: Parallax Opening Header */}
        <div className="parallax w-full relative" ref={parallaxRef}>
          <section className="parallax__header relative w-full h-[100vh] overflow-hidden bg-black">
            <div className="parallax__visuals absolute inset-0 w-full h-full">
              <div data-parallax-layers className="parallax__layers relative w-full h-full">
                {/* Layer 1: Deep space background */}
                <img
                  src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp"
                  loading="eager"
                  data-parallax-layer="1"
                  alt="Parallax Background"
                  className="parallax__layer-img absolute inset-0 w-full h-full object-cover select-none pointer-events-none opacity-40"
                  referrerPolicy="no-referrer"
                />
                {/* Layer 2: Midground mountain silhouettes */}
                <img
                  src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp"
                  loading="eager"
                  data-parallax-layer="2"
                  alt="Parallax Midground"
                  className="parallax__layer-img absolute inset-0 w-full h-full object-cover select-none pointer-events-none opacity-60 mix-blend-screen"
                  referrerPolicy="no-referrer"
                />
                {/* Layer 3: Main Parallax Title */}
                <div
                  data-parallax-layer="3"
                  className="parallax__layer-title absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none text-center px-4"
                >
                  <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary mb-3">
                    The Connoisseur's Legacy
                  </span>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-gold-gradient drop-shadow-[0_10px_35px_rgba(197,168,128,0.4)]">
                    About Vape Street BD
                  </h1>
                </div>
                {/* Layer 4: Foreground mist */}
                <img
                  src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp"
                  loading="eager"
                  data-parallax-layer="4"
                  alt="Parallax Foreground"
                  className="parallax__layer-img absolute inset-0 w-full h-full object-cover select-none pointer-events-none opacity-70"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
            </div>
          </section>
        </div>

        {/* Section 2: GSAP Pin & Cinematic 3D Card Story Section */}
        <div
          ref={containerRef}
          className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-[#050505] text-[#E1E0CC] font-sans antialiased"
          style={{ perspective: "1500px" }}
        >
          <div className="film-grain" aria-hidden="true" />
          <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-40" aria-hidden="true" />

          {/* Background Layer: Hero Catchphrase */}
          <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4">
            <h2 className="text-track gsap-reveal text-gold-gradient text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-2">
              PALLAB — FOUNDER & VISIONARY
            </h2>
            <p className="text-track gsap-reveal text-silver-gradient text-lg sm:text-2xl md:text-3xl font-light tracking-wide max-w-2xl">
              Elevating Bangladesh's Vaping Culture Through Pure Authenticity
            </p>
          </div>

          {/* Background Layer 2: Final Story CTA Buttons */}
          <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight text-gold-gradient">
              Experience The Gold Standard
            </h2>
            <p className="text-accent/80 text-base md:text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">
              Step into the world Pallab envisioned. Explore our hand-picked collection of 100% authentic hardware, elite mods, and premium e-liquids.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onNavigateProducts}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-black font-bold uppercase tracking-wider text-sm hover:scale-105 transition-all cursor-pointer shadow-[0_0_25px_rgba(197,168,128,0.5)]"
              >
                Explore Catalog <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onNavigateContact}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-primary/50 bg-black/60 text-primary font-bold uppercase tracking-wider text-sm hover:bg-primary/10 transition-all cursor-pointer"
              >
                Contact Our Vape Shop
              </button>
            </div>
          </div>

          {/* Foreground Layer: 3D Holographic Founder Card */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
            <div
              ref={mainCardRef}
              className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[86vw] h-[90vh] md:h-[85vh] rounded-[28px] md:rounded-[40px]"
            >
              <div className="card-sheen" aria-hidden="true" />

              <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
                
                {/* 1. Header Column (Mobile: Top, Desktop: Right) */}
                <div className="card-right-text gsap-reveal order-1 lg:order-3 flex flex-col justify-center items-center lg:items-end text-center lg:text-right z-20 w-full">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/80 mb-1">
                    Vape Street BD Founder
                  </span>
                  <h2 className="text-4xl md:text-[3.8rem] font-black uppercase tracking-tighter text-gold-gradient leading-tight">
                    PALLAB
                  </h2>
                  <p className="text-xs sm:text-sm text-accent/70 mt-2 font-mono">
                    Established 2018 — Dhaka, Bangladesh
                  </p>
                </div>

                {/* 2. Middle 3D Portrait Frame (Mobile: Center, Desktop: Center) */}
                <div className="portrait-scroll-wrapper order-2 lg:order-2 relative w-full h-[360px] lg:h-[550px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
                  <div className="relative w-full h-full flex items-center justify-center transform scale-[0.75] md:scale-90 lg:scale-100">
                    
                    {/* Founder Portrait Frame */}
                    <div
                      ref={portraitCardRef}
                      className="relative w-[300px] h-[480px] rounded-[2.5rem] portrait-frame flex flex-col overflow-hidden will-change-transform transform-style-3d border border-primary/30"
                    >
                      <img
                        src="/owner-pallab.jpg"
                        alt="Pallab - Founder of Vape Street BD"
                        className="w-full h-full object-cover object-top select-none pointer-events-none filter brightness-95 contrast-105"
                      />
                      
                      {/* Dark film gradient overlay for luxury text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

                      {/* Card Overlay Info */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col items-center text-center">
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-[11px] font-bold uppercase tracking-widest mb-1 shadow-lg backdrop-blur-md">
                          <Crown className="h-3 w-3" /> Founder & CEO
                        </div>
                        <h4 className="text-lg font-bold text-white tracking-wide drop-shadow-md">
                          Pallab
                        </h4>
                        <p className="text-[10px] text-accent/70 uppercase tracking-wider font-mono">
                          Pioneer of Luxury Vaping
                        </p>
                      </div>

                      {/* Metric Gauge Circle */}
                      <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-black/60 border border-primary/30 backdrop-blur-md flex items-center justify-center p-1 shadow-xl">
                        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                          <circle cx="32" cy="32" r="24" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                          <circle className="progress-ring" cx="32" cy="32" r="24" fill="none" stroke="#C5A880" strokeWidth="4" />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="counter-val text-xs font-black text-primary">0</span>
                          <span className="text-[6px] text-primary/70 uppercase font-bold">%</span>
                        </div>
                      </div>
                    </div>

                    {/* Floating Glass Badges */}
                    <div className="floating-badge absolute flex top-4 lg:top-8 left-[-10px] lg:left-[-60px] floating-ui-badge rounded-2xl p-3.5 items-center gap-3 z-30">
                      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 text-primary">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-white text-xs font-bold tracking-tight">100% Authentic</p>
                        <p className="text-primary/70 text-[10px] font-medium">Direct Importer</p>
                      </div>
                    </div>

                    <div className="floating-badge absolute flex bottom-8 lg:bottom-14 right-[-10px] lg:right-[-60px] floating-ui-badge rounded-2xl p-3.5 items-center gap-3 z-30">
                      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 text-primary">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-white text-xs font-bold tracking-tight">Premier Standard</p>
                        <p className="text-primary/70 text-[10px] font-medium">Dhaka's Finest</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 3. Account Description (Mobile: Bottom, Desktop: Left) */}
                <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-2 lg:px-0">
                  <h3 className="text-primary text-xl md:text-3xl font-bold mb-3 tracking-tight">
                    "Uncompromising Authenticity is Our Only Benchmark."
                  </h3>
                  <p className="hidden md:block text-accent/80 text-xs md:text-sm lg:text-base font-normal leading-relaxed mx-auto lg:mx-0 max-w-md">
                    Driven by a relentless passion for perfection, Pallab established Vape Street BD to transform the local vaping landscape. Every device, mod, and e-liquid is personally verified to deliver absolute authenticity to true connoisseurs across Bangladesh.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Sticky Scroll Gallery — uses the standalone StickyScrollGallery component
            which follows the EXACT HTML structure from the reference sticky-scroll.tsx.
            The component handles wrapper/sibling nesting internally. */}
        <StickyScrollGallery
          leftImages={carouselImagesLeft}
          centerImages={carouselImagesCenter}
          rightImages={carouselImagesRight}
          headerTitle={
            <>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 text-[#C5A880] text-xs font-bold uppercase tracking-[0.3em] shadow-[0_0_25px_rgba(197,168,128,0.3)] mb-4">
                <Globe2 className="h-3.5 w-3.5" /> Direct Global Sourcing & Reasonable Prices
              </span>
              <h1 className="2xl:text-7xl text-4xl sm:text-5xl font-semibold tracking-tight leading-[120%] bg-gradient-to-r from-[#FFF0D4] via-[#C5A880] to-[#9A7B4F] bg-clip-text text-transparent">
                Authentic Products From
                <br />
                USA, UK, China & Dubai
                <br />
                <span className="text-white/60 text-3xl sm:text-4xl 2xl:text-5xl">Scroll down! 👇</span>
              </h1>
            </>
          }
          headerSubtitle="By importing directly from certified global distributors, Vape Street BD eliminates middleman scalper markups—delivering genuine world-class devices and e-liquids to Bangladesh at fair, accessible prices."
          footerText="VAPE STREET BD"
          footerSubtitle="DIRECT IMPORTER • 100% AUTHENTIC • FAIR PRICING"
        />

        {/* Section 4: Cinematic Storytelling Chapters */}
        <section className="py-24 px-4 sm:px-8 md:px-16 max-w-6xl mx-auto space-y-24">
          
          {/* Chapter 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-primary/15 pb-16">
            <div className="md:col-span-4 flex flex-col">
              <span className="text-xs font-mono text-primary uppercase tracking-widest mb-2">CHAPTER 01</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gold-gradient">The Genesis</h2>
            </div>
            <div className="md:col-span-8 space-y-4 text-accent/80 text-sm md:text-base leading-relaxed">
              <p>
                Before Vape Street BD became Bangladesh’s premier luxury vape shop, it started with a single unyielding vision championed by <strong className="text-primary font-semibold">Pallab</strong>: every vaping enthusiast deserves genuine quality, safety, and an uncompromised sensory experience.
              </p>
              <p>
                In a market overcrowded with doubtful replicas and low-grade hardware, Pallab chose a different path—building a sanctuary for discerning connoisseurs who appreciate true craftsmanship.
              </p>
            </div>
          </div>

          {/* Chapter 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-primary/15 pb-16">
            <div className="md:col-span-4 flex flex-col md:order-2">
              <span className="text-xs font-mono text-primary uppercase tracking-widest mb-2">CHAPTER 02</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gold-gradient">The Pursuit of Perfection</h2>
            </div>
            <div className="md:col-span-8 md:order-1 space-y-4 text-accent/80 text-sm md:text-base leading-relaxed">
              <p>
                Pallab spent years forging direct relationships with international manufacturers and certified global distributors. By enforcing rigorous serial verification on every shipment, Vape Street BD guarantees that 100% of products arriving on our shelves are authentic.
              </p>
              <p>
                From organic e-liquid extract formulations to high-precision temperature control mods, every product line undergoes personal evaluation before earning the Vape Street BD badge.
              </p>
            </div>
          </div>

          {/* Chapter 3: Core Pillars */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono text-primary uppercase tracking-widest">OUR FOUNDATION</span>
              <h2 className="text-3xl md:text-5xl font-black text-gold-gradient">The Pillars of Vape Street BD</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="p-6 rounded-2xl bg-black/60 border border-primary/20 space-y-3 hover:border-primary/50 transition-colors">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold text-white">Verified Authenticity</h3>
                <p className="text-xs text-accent/70 leading-relaxed">
                  Every product features serialized batch verification directly traceable to official global manufacturers.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/60 border border-primary/20 space-y-3 hover:border-primary/50 transition-colors">
                <Sparkles className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold text-white">Curated Collection</h3>
                <p className="text-xs text-accent/70 leading-relaxed">
                  Only the highest-rated devices, pods, tanks, and artisanal e-liquids make it into our vape shop storefront.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/60 border border-primary/20 space-y-3 hover:border-primary/50 transition-colors">
                <HeartHandshake className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold text-white">White-Glove Support</h3>
                <p className="text-xs text-accent/70 leading-relaxed">
                  Our dedicated team, trained under Pallab's standards, offers expert guidance for beginners and veteran vapers alike.
                </p>
              </div>
            </div>
          </div>

        </section>

      </div>
    </ReactLenis>
  );
}
