'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- WordsPullUp (Controlled by start prop) ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  start?: boolean;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, start = false }: WordsPullUpProps) => {
  const words = text.split(" ");

  return (
    <div className={`inline-flex flex-nowrap whitespace-nowrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={start ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- Main Hero & Scroll Component ---------------- */
interface PrismaHeroProps {
  onNavigateProducts?: () => void;
  onNavigateContact?: () => void;
  onNavigateAbout?: () => void;
  isLoaderFinished?: boolean;
}

const PrismaHero = ({
  onNavigateProducts,
  onNavigateContact,
  onNavigateAbout,
  isLoaderFinished = true,
}: PrismaHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const activeFrameRef = useRef(0);

  const [isZoomed, setIsZoomed] = useState(false);
  const [start, setStart] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const navItems = ["Our story", "Collective", "Workshops", "Programs", "Inquiries"];

  // 1. Throttled batch preloading of 480 WebP frames to prevent network bloat & JS thread freezing
  useEffect(() => {
    const frameCount = 480;
    const preloadedImages: HTMLImageElement[] = new Array(frameCount);
    imagesRef.current = preloadedImages;

    let isCancelled = false;

    // Safety timeout: Ensure page scroll is NEVER permanently locked
    const safetyTimer = setTimeout(() => {
      if (!isCancelled) setImagesLoaded(true);
    }, 1200);

    // Step A: Load initial key frames (first 15 frames) for immediate display
    let initialCount = 0;
    const initialBatchSize = 15;

    for (let i = 1; i <= initialBatchSize; i++) {
      const img = new Image();
      img.src = `/scroll-frames/frame_${String(i).padStart(3, "0")}.webp`;
      img.onload = () => {
        if (isCancelled) return;
        initialCount++;
        if (i === 1) drawImage(0);
        if (initialCount >= Math.min(initialBatchSize, 5)) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        if (isCancelled) return;
        initialCount++;
        if (initialCount >= 5) setImagesLoaded(true);
      };
      preloadedImages[i - 1] = img;
    }

    // Step B: Load remaining frames in background chunks of 20 to prevent memory spikes & lag
    let currentFrame = initialBatchSize + 1;
    const loadNextChunk = () => {
      if (isCancelled || currentFrame > frameCount) return;
      const chunkSize = 20;
      const endFrame = Math.min(currentFrame + chunkSize, frameCount + 1);

      for (let i = currentFrame; i < endFrame; i++) {
        const img = new Image();
        img.src = `/scroll-frames/frame_${String(i).padStart(3, "0")}.webp`;
        preloadedImages[i - 1] = img;
      }

      currentFrame = endFrame;
      if (currentFrame <= frameCount) {
        setTimeout(loadNextChunk, 40);
      }
    };

    const chunkTimer = setTimeout(loadNextChunk, 200);

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
      clearTimeout(chunkTimer);
    };
  }, []);

  // 2. Control Entrance reveal timelines & scroll lock (Triggered when isLoaderFinished is true)
  useEffect(() => {
    if (!isLoaderFinished) {
      document.body.style.overflow = "hidden";
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      return;
    }

    // Disable body scroll initially while intro plays
    document.body.style.overflow = "hidden";

    // Play video from start (non-looping) right as loader reveals behind screen
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => { });
    }

    const zoomTimeout = setTimeout(() => {
      setIsZoomed(true); // 2.2s: Dolly Zoom starts
    }, 2200);

    const revealTimeout = setTimeout(() => {
      setStart(true); // 2.6s: Elements animate in
      setIntroDone(true);
      document.body.style.overflow = ""; // Always restore scroll after intro
    }, 2600);

    return () => {
      clearTimeout(zoomTimeout);
      clearTimeout(revealTimeout);
      document.body.style.overflow = "";
    };
  }, [isLoaderFinished]);

  // 3. Unlock scroll once intro is complete
  useEffect(() => {
    if (introDone) {
      document.body.style.overflow = "";
    }
  }, [introDone]);

  // Canvas cover drawing helper
  const drawImage = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgWidth = img.width;
      const imgHeight = img.height;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const r = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const nw = imgWidth * r;
      const nh = imgHeight * r;
      const cx = (canvasWidth - nw) / 2;
      const cy = (canvasHeight - nh) / 2;

      ctx.drawImage(img, cx, cy, nw, nh);
      activeFrameRef.current = index;
    }
  };

  // 4. Handle canvas resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (imagesRef.current.length > 0) {
      drawImage(activeFrameRef.current);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded]);

  // Helper: compute opacity and Y offset for a text block based on scroll progress.
  // Each text has exclusive non-overlapping ranges so only one is ever visible.
  const computeTextState = (
    progress: number,
    fadeInStart: number,
    fadeInEnd: number,
    fadeOutStart: number,
    fadeOutEnd: number
  ) => {
    let opacity = 0;
    let y = 35;

    if (progress >= fadeInStart && progress < fadeInEnd) {
      // Fading in
      const t = (progress - fadeInStart) / (fadeInEnd - fadeInStart);
      opacity = t;
      y = 35 * (1 - t);
    } else if (progress >= fadeInEnd && progress < fadeOutStart) {
      // Fully visible
      opacity = 1;
      y = 0;
    } else if (fadeOutStart < 1.0 && progress >= fadeOutStart && progress < fadeOutEnd) {
      // Fading out
      const t = (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
      opacity = 1 - t;
      y = -35 * t;
    } else if (progress >= fadeOutStart && fadeOutStart >= 1.0) {
      // Hold visible on final frame of scroll animation
      opacity = 1;
      y = 0;
    }

    return { opacity, y };
  };

  // 5. GSAP ScrollTrigger setup for Pinned Canvas Frame Animation
  useEffect(() => {
    if (!imagesLoaded) return;

    // Draw first frame initially
    drawImage(0);

    // Hard-reset all scroll text panels to hidden
    gsap.set(["#scroll-text-1", "#scroll-text-2", "#scroll-text-3", "#scroll-text-4", "#scroll-text-5", "#scroll-text-6"], {
      opacity: 0,
      y: 35,
    });

    // Text ranges across 480 frames scroll progress (0.0 to 1.0):
    const textRanges = [
      { el: "#scroll-text-1", fadeInStart: 0.04, fadeInEnd: 0.12, fadeOutStart: 0.15, fadeOutEnd: 0.19 },
      { el: "#scroll-text-2", fadeInStart: 0.20, fadeInEnd: 0.27, fadeOutStart: 0.30, fadeOutEnd: 0.34 },
      { el: "#scroll-text-3", fadeInStart: 0.36, fadeInEnd: 0.43, fadeOutStart: 0.46, fadeOutEnd: 0.50 },
      { el: "#scroll-text-4", fadeInStart: 0.52, fadeInEnd: 0.59, fadeOutStart: 0.62, fadeOutEnd: 0.66 },
      { el: "#scroll-text-5", fadeInStart: 0.68, fadeInEnd: 0.75, fadeOutStart: 0.78, fadeOutEnd: 0.82 },
      { el: "#scroll-text-6", fadeInStart: 0.85, fadeInEnd: 0.93, fadeOutStart: 1.00, fadeOutEnd: 1.00 },
    ];

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=6000",
      scrub: true,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // Toggle canvas/video visibility
        if (progress > 0.01) {
          setIsScrolling(true);
        } else {
          setIsScrolling(false);
        }

        // Draw the correct frame (0-479)
        const frameIndex = Math.min(479, Math.floor(progress * 480));
        drawImage(frameIndex);

        // Zoom matching: scale from 1.15 → 1.05 over first 20% of scroll
        if (canvasRef.current) {
          const zoomProgress = Math.min(progress / 0.2, 1);
          const scale = 1.15 - 0.10 * zoomProgress;
          canvasRef.current.style.transform = `scale(${scale})`;
        }

        // Update each text block using exclusive progress ranges
        textRanges.forEach(({ el, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd }) => {
          const state = computeTextState(progress, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd);
          gsap.set(el, { opacity: state.opacity, y: state.y });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [imagesLoaded]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden rounded-2xl md:rounded-[2rem] bg-black"
    >

      {/* Background Video (plays once, freezes at end) */}
      <motion.video
        ref={videoRef}
        src="/hero.mp4"
        animate={{ scale: isZoomed ? 1.15 : 1.02 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none"
        muted
        playsInline
        style={{ opacity: isScrolling ? 0 : 1, transition: "opacity 0.25s ease" }}
      />

      {/* Scroll Animation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none"
        style={{ opacity: isScrolling ? 1 : 0, transition: "opacity 0.25s ease" }}
      />

      {/* Dark film-vignette overlay for text legibility */}
      <div className="absolute inset-0 bg-black/45 z-10 pointer-events-none" />

      {/* ---------------- Elegant Centered Text Reveals Layer ---------------- */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
        <div className="relative w-full max-w-4xl px-6 flex flex-col items-center justify-center">

          {/* Text Reveal 1 */}
          <div
            id="scroll-text-1"
            className="absolute flex flex-col items-center text-center max-w-2xl pointer-events-auto"
            style={{ opacity: 0, transform: "translateY(35px)" }}
          >
            <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-[#C5A880] mb-2 text-glow">
              The Vape Shop Standard
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#E1E0CC] mb-4 text-glow leading-tight">
              Crafted for Connoisseurs
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base leading-relaxed text-accent/80 max-w-lg">
              Vape Street BD brings the world's most exclusive e-liquids, authentic devices, and high-performance hardware directly to Dhaka.
            </p>
          </div>

          {/* Text Reveal 2 */}
          <div
            id="scroll-text-2"
            className="absolute flex flex-col items-center text-center max-w-2xl pointer-events-auto"
            style={{ opacity: 0, transform: "translateY(35px)" }}
          >
            <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-[#C5A880] mb-2 text-glow">
              Vaping Fun Fact
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#E1E0CC] mb-4 text-glow leading-tight">
              Complexity of Taste
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base leading-relaxed text-accent/80 max-w-lg">
              Premium e-liquids feature intricate flavor profiles, blending up to 15 different organic extracts to construct a single signature note.
            </p>
          </div>

          {/* Text Reveal 3 */}
          <div
            id="scroll-text-3"
            className="absolute flex flex-col items-center text-center max-w-2xl pointer-events-auto"
            style={{ opacity: 0, transform: "translateY(35px)" }}
          >
            <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-[#C5A880] mb-2 text-glow">
              Pure Verification
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#E1E0CC] mb-4 text-glow leading-tight">
              100% Genuine Quality
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base leading-relaxed text-accent/80 max-w-lg">
              Every product is fully serialized and verified directly with the manufacturers, offering safety and authenticity you can trust.
            </p>
          </div>

          {/* Text Reveal 4 */}
          <div
            id="scroll-text-4"
            className="absolute flex flex-col items-center text-center max-w-2xl pointer-events-auto"
            style={{ opacity: 0, transform: "translateY(35px)" }}
          >
            <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-[#C5A880] mb-2 text-glow">
              Engineered Excellence
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#E1E0CC] mb-4 text-glow leading-tight">
              Next-Gen Precision
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base leading-relaxed text-accent/80 max-w-lg">
              Featuring advanced temperature control, mesh coil technology, and ergonomic aerodynamics for ultra-smooth vapor production.
            </p>
          </div>

          {/* Text Reveal 5 */}
          <div
            id="scroll-text-5"
            className="absolute flex flex-col items-center text-center max-w-2xl pointer-events-auto"
            style={{ opacity: 0, transform: "translateY(35px)" }}
          >
            <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-[#C5A880] mb-2 text-glow">
              Elevate Your Journey
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#E1E0CC] mb-4 text-glow leading-tight">
              Experience Perfection
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base leading-relaxed text-accent/80 max-w-lg">
              Step into the world of luxury vaping. Explore our curated collections and discover your next signature device.
            </p>
          </div>

          {/* Text Reveal 6: Final Frame Grand Luxury Quote */}
          <div
            id="scroll-text-6"
            className="absolute flex flex-col items-center text-center max-w-3xl pointer-events-auto px-4"
            style={{ opacity: 0, transform: "translateY(35px)" }}
          >
            <span className="font-heading text-xs sm:text-sm font-bold uppercase tracking-[0.4em] text-[#C5A880] mb-3 text-glow">
              Vape Street BD
            </span>
            <h2 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#E1E0CC] mb-4 drop-shadow-[0_10px_35px_rgba(197,168,128,0.4)] leading-[1.1] font-normal tracking-wide capitalize">
              Luxury For Vapers
            </h2>
            <p className="font-serif italic text-sm sm:text-base md:text-lg text-[#C5A880]/90 tracking-widest uppercase max-w-xl">
              Where Pure Passion Meets Unrivaled Elevation
            </p>
          </div>

        </div>
      </div>



      {/* ---------------- Hero Content (Restored Spacing & Style) ---------------- */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-12 sm:px-6 sm:pb-20 md:px-10 md:pb-24 lg:pb-28 z-20">
        <div className="grid grid-cols-12 items-end gap-4">

          {/* Title Grid Column */}
          <div className="col-span-12 lg:col-span-8">
            <h1
              className="font-medium leading-[0.85] tracking-[-0.05em] text-[9.5vw] sm:text-[8vw] md:text-[6.8vw] lg:text-[6vw] xl:text-[5.5vw] whitespace-nowrap overflow-hidden"
              style={{ color: "#E1E0CC" }}
            >
              <WordsPullUp text="Vape street BD" showAsterisk start={start && !isScrolling} />
            </h1>
          </div>

          {/* Paragraph & CTA Button Grid Column */}
          <div className="col-span-12 flex flex-col gap-5 pb-6 lg:col-span-4 lg:pb-10">

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={start && !isScrolling ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs text-primary/70 sm:text-sm md:text-base"
              style={{ lineHeight: 1.2 }}
            >
              Vape Street BD is Bangladesh's premier premium vape shop. We offer an expertly curated selection of world-class devices, authentic premium e-liquids, and high-performance hardware designed for discerning connoisseurs.
            </motion.p>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={start && !isScrolling ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                if (onNavigateProducts) {
                  onNavigateProducts();
                } else {
                  const elem = document.getElementById("products-section");
                  if (elem) elem.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="group inline-flex items-center gap-2 self-start rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-bold uppercase tracking-wider text-black transition-all hover:gap-3 sm:text-base cursor-pointer shadow-[0_0_25px_rgba(197,168,128,0.4)] pointer-events-auto relative z-30"
            >
              Explore collections
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                <ArrowRight className="h-4 w-4" style={{ color: "#E1E0CC" }} />
              </span>
            </motion.button>

          </div>
        </div>
      </div>

    </div>
  );
};

export { PrismaHero };
