'use client';
import React, { forwardRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryImage {
  src: string;
  alt?: string;
  country?: string;
  title?: string;
}

interface StickyScrollGalleryProps {
  /** Images for the left scrolling column (recommended: 5-6) */
  leftImages: GalleryImage[];
  /** Images for the center sticky column (exactly 3) */
  centerImages: GalleryImage[];
  /** Images for the right scrolling column (recommended: 5-6) */
  rightImages: GalleryImage[];
  /** Header section title */
  headerTitle?: React.ReactNode;
  /** Header section subtitle */
  headerSubtitle?: string;
  /** Footer large text */
  footerText?: string;
  /** Footer subtitle */
  footerSubtitle?: string;
}

/**
 * StickyScrollGallery — CSS + GSAP Zoom-Out Boxed Sticky Scroll Image Gallery.
 *
 * Key features requested by user:
 * 1. Boxed container (max-w-7xl / rounded-3xl / luxury gold border / page padding around it).
 * 2. Zoom-out animation on scroll: As the user scrolls into this section, the gallery
 *    container zooms out (scales down from full scale to a framed floating box).
 * 3. Sticky 3-column middle scroll pinning mechanism.
 */
const StickyScrollGallery = forwardRef<HTMLElement, StickyScrollGalleryProps>(
  (
    {
      leftImages,
      centerImages,
      rightImages,
      headerTitle,
      headerSubtitle,
      footerText = 'VAPE STREET BD',
      footerSubtitle = 'DIRECT IMPORTER • 100% AUTHENTIC • FAIR PRICING',
    },
    ref
  ) => {
    const galleryContainerRef = useRef<HTMLDivElement>(null);
    const boxFrameRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === 'undefined') return;

      const ctx = gsap.context(() => {
        // Zoom out animation: as user scrolls into the gallery, scale down the outer box
        if (boxFrameRef.current) {
          gsap.fromTo(
            boxFrameRef.current,
            {
              scale: 1,
              borderRadius: '0px',
              borderWidth: '0px',
              boxShadow: '0 0 0px rgba(0,0,0,0)',
            },
            {
              scale: 0.94,
              borderRadius: '32px',
              borderWidth: '1px',
              borderColor: 'rgba(197, 168, 128, 0.3)',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(197, 168, 128, 0.15)',
              ease: 'power2.out',
              scrollTrigger: {
                trigger: galleryContainerRef.current,
                start: 'top 80%',
                end: 'top 15%',
                scrub: 0.8,
              },
            }
          );
        }
      }, galleryContainerRef);

      return () => ctx.revert();
    }, []);

    return (
      <main className="bg-[#050505] py-6 sm:py-12" ref={ref}>
        {/* Outer scroll trigger wrapper */}
        <div ref={galleryContainerRef} className="w-full">
          
          {/* Zooming Boxed Frame Container */}
          <div
            ref={boxFrameRef}
            className="w-full max-w-[94vw] xl:max-w-[1400px] mx-auto bg-[#0a0a0f] border border-primary/25 rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-shadow duration-500"
          >
            {/* Wrapper: contains ONLY the sticky header section */}
            <div className="wrapper">
              <section className="text-white h-screen w-full bg-[#08080c] grid place-content-center sticky top-0 rounded-2xl sm:rounded-3xl">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,rgba(197,168,128,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,168,128,0.08)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none rounded-2xl sm:rounded-3xl" />

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-4">
                  {headerTitle ? (
                    typeof headerTitle === 'string' ? (
                      <h1 className="2xl:text-6xl text-3xl sm:text-5xl font-extrabold tracking-tight leading-[120%] bg-gradient-to-r from-[#FFF0D4] via-[#C5A880] to-[#9A7B4F] bg-clip-text text-transparent">
                        {headerTitle}
                      </h1>
                    ) : (
                      headerTitle
                    )
                  ) : (
                    <h1 className="2xl:text-6xl text-3xl sm:text-5xl font-extrabold tracking-tight leading-[120%] bg-gradient-to-r from-[#FFF0D4] via-[#C5A880] to-[#9A7B4F] bg-clip-text text-transparent">
                      Authentic Products From
                      <br />
                      USA, UK, China & Dubai
                      <br />
                      <span className="text-white/60 text-2xl sm:text-4xl">Scroll down! 👇</span>
                    </h1>
                  )}
                  {headerSubtitle && (
                    <p className="text-white/70 text-xs sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                      {headerSubtitle}
                    </p>
                  )}
                </div>
              </section>
            </div>

            {/* Gallery section: SIBLING of wrapper — slides OVER the sticky header */}
            <section className="text-white w-full bg-[#08080c] px-3 sm:px-6 pb-8">
              <div className="grid grid-cols-12 gap-3 sm:gap-4">
                {/* Left Column — scrolls naturally */}
                <div className="grid gap-3 sm:gap-4 col-span-4">
                  {leftImages.map((img, i) => (
                    <figure key={i} className="w-full relative group overflow-hidden rounded-xl sm:rounded-2xl border border-primary/20 bg-[#101017]">
                      <img
                        src={img.src}
                        alt={img.alt || img.title || ''}
                        className="transition-transform duration-500 w-full h-64 sm:h-96 align-bottom object-cover rounded-xl sm:rounded-2xl group-hover:scale-105"
                        loading="lazy"
                      />
                      {img.title && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none flex items-end p-3">
                          <span className="text-xs font-semibold text-white/90 drop-shadow">{img.title}</span>
                        </div>
                      )}
                    </figure>
                  ))}
                </div>

                {/* Center Column — STICKY: locked in viewport while siblings scroll */}
                <div className="sticky top-4 h-screen w-full col-span-4 gap-3 sm:gap-4 grid grid-rows-3 py-4">
                  {centerImages.slice(0, 3).map((img, i) => (
                    <figure key={i} className="w-full h-full relative group overflow-hidden rounded-xl sm:rounded-2xl border border-primary/40 bg-[#101017] shadow-[0_0_25px_rgba(197,168,128,0.25)]">
                      <img
                        src={img.src}
                        alt={img.alt || img.title || ''}
                        className="transition-transform duration-500 h-full w-full align-bottom object-cover rounded-xl sm:rounded-2xl group-hover:scale-105"
                        loading="lazy"
                      />
                      {img.title && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none flex items-end p-3">
                          <span className="text-xs font-bold text-primary drop-shadow-md">{img.title}</span>
                        </div>
                      )}
                    </figure>
                  ))}
                </div>

                {/* Right Column — scrolls naturally */}
                <div className="grid gap-3 sm:gap-4 col-span-4">
                  {rightImages.map((img, i) => (
                    <figure key={i} className="w-full relative group overflow-hidden rounded-xl sm:rounded-2xl border border-primary/20 bg-[#101017]">
                      <img
                        src={img.src}
                        alt={img.alt || img.title || ''}
                        className="transition-transform duration-500 w-full h-64 sm:h-96 align-bottom object-cover rounded-xl sm:rounded-2xl group-hover:scale-105"
                        loading="lazy"
                      />
                      {img.title && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none flex items-end p-3">
                          <span className="text-xs font-semibold text-white/90 drop-shadow">{img.title}</span>
                        </div>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            </section>

            {/* Arched Footer inside box */}
            <footer className="group bg-[#06060a] rounded-b-2xl sm:rounded-b-3xl overflow-hidden">
              <h1 className="text-[5.5vw] sm:text-[6.5vw] md:text-[6vw] lg:text-[5vw] whitespace-nowrap leading-none uppercase font-black text-center bg-gradient-to-r from-[#C5A880] to-[#6B5B3E] bg-clip-text text-transparent transition-transform duration-500 group-hover:scale-105 pt-6 sm:pt-10 pb-4 px-4 translate-y-2 sm:translate-y-4">
                {footerText}
              </h1>
              <div className="bg-[#0a0a0f] h-32 sm:h-40 relative z-10 grid place-content-center text-xs sm:text-base text-[#C5A880]/90 font-mono tracking-[0.15em] rounded-tr-full rounded-tl-full border-t border-primary/20">
                {footerSubtitle}
              </div>
            </footer>

          </div>
        </div>
      </main>
    );
  }
);

StickyScrollGallery.displayName = 'StickyScrollGallery';

export default StickyScrollGallery;
