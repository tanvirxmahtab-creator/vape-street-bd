'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HandwritingSvg } from "@/components/ui/handwriting-svg";

export function TheaterLoader({ onLoaded }: { onLoaded?: () => void }) {
  const [stage, setStage] = useState<"writing" | "complete" | "revealed">("writing");

  const handleWritingComplete = () => {
    // Hold handwriting briefly then trigger theater curtain split
    setTimeout(() => {
      setStage("complete");
    }, 600);
  };

  // Fallback safety timer: if opentype font fetch takes longer, auto-complete after 4.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage === "writing") {
        setStage("complete");
      }
    }, 4500);
    return () => clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage === "complete") {
      // Trigger background hero playback right as curtain begins splitting open
      if (onLoaded) onLoaded();

      const timer = setTimeout(() => {
        setStage("revealed");
      }, 1100); // Duration matching curtain split animation
      return () => clearTimeout(timer);
    }
  }, [stage, onLoaded]);

  if (stage === "revealed") return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden flex items-center justify-center">
      {/* Center Writing Content (Fades out right before curtain splits) */}
      <AnimatePresence>
        {stage === "writing" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="absolute z-30 flex flex-col items-center justify-center text-center px-4 w-full"
          >
            {/* Handwriting SVG Animation - Enlarged */}
            <div className="w-[92vw] sm:w-[85vw] md:w-[880px] max-w-5xl flex justify-center items-center">
              <HandwritingSvg
                text="Welcome to Vape Street BD"
                fontSize={72}
                strokeWidth={2.5}
                duration={2.8}
                delay={0.3}
                width={880}
                height={200}
                className="text-primary font-heading font-black drop-shadow-[0_0_35px_rgba(197,168,128,0.75)] w-full h-auto"
                onAnimationComplete={handleWritingComplete}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Theater Curtain Panel */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: stage === "complete" ? "-100%" : "0%" }}
        transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
        className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#090909] z-10 shadow-[20px_0_50px_rgba(0,0,0,0.9)] flex items-center justify-end pointer-events-auto"
      />

      {/* Right Theater Curtain Panel */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: stage === "complete" ? "100%" : "0%" }}
        transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
        className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#090909] z-10 shadow-[-20px_0_50px_rgba(0,0,0,0.9)] flex items-center justify-start pointer-events-auto"
      />
    </div>
  );
}
