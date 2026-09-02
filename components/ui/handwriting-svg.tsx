"use client";

import { motion } from "framer-motion";
import * as opentype from "opentype.js";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_FONT_URL =
  "https://raw.githubusercontent.com/google/fonts/main/ofl/indieflower/IndieFlower-Regular.ttf";

interface HandwritingSvgProps {
  path?: string;
  text?: string;
  fontUrl?: string;
  className?: string;
  strokeClassName?: string;
  duration?: number;
  delay?: number;
  strokeWidth?: number;
  width?: number;
  height?: number;
  fontSize?: number;
  ease?: "linear" | "easeIn" | "easeOut" | "easeInOut";
  onAnimationComplete?: () => void;
}

export function HandwritingSvg({
  path: pathProp,
  text,
  fontUrl = DEFAULT_FONT_URL,
  className,
  strokeClassName,
  duration = 2.5,
  delay = 0.5,
  strokeWidth = 2,
  width = 600,
  height = 160,
  fontSize = 52,
  ease = "easeInOut",
  onAnimationComplete,
}: HandwritingSvgProps) {
  const [path, setPath] = useState<string | null>(pathProp ?? null);
  const [viewBox, setViewBox] = useState(`${0} ${0} ${width} ${height}`);
  const [loading, setLoading] = useState(!!text && !pathProp);

  useEffect(() => {
    if (!text || pathProp) {
      setPath(pathProp ?? null);
      setViewBox(`0 0 ${width} ${height}`);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(fontUrl)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        if (cancelled) {
          return;
        }
        const font = opentype.parse(buffer);
        const p = font.getPath(text, 0, fontSize, fontSize);
        const bbox = p.getBoundingBox();
        const pad = 10;
        const vx = Math.floor(bbox.x1) - pad;
        const vy = Math.floor(bbox.y1) - pad;
        const vw = Math.ceil(bbox.x2 - bbox.x1) + pad * 2;
        const vh = Math.ceil(bbox.y2 - bbox.y1) + pad * 2;
        setViewBox(`${vx} ${vy} ${vw} ${vh}`);
        setPath(p.toPathData(2));
      })
      .catch(() => {
        if (!cancelled) {
          setPath(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [text, fontUrl, pathProp, fontSize, width, height]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span className="font-heading text-xs font-bold uppercase tracking-widest text-primary/80 animate-pulse">
          Vape Street BD Loader...
        </span>
      </div>
    );
  }

  const d = path ?? "";
  if (!d) {
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={cn("text-primary", className)}
        aria-hidden={true}
      >
        <title>Handwriting SVG</title>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={fontSize ? Math.round(fontSize * 0.5) : 24}
          className="fill-primary font-heading font-bold uppercase tracking-widest"
        >
          {text || "Welcome to Vape Street BD"}
        </text>
      </svg>
    );
  }

  const svgViewBox = pathProp ? `0 0 ${width} ${height}` : viewBox;

  return (
    <svg
      width={width}
      height={height}
      viewBox={svgViewBox}
      className={cn("text-primary drop-shadow-[0_0_25px_rgba(197,168,128,0.5)]", className)}
      aria-hidden={true}
    >
      <title>Handwriting SVG</title>
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={strokeClassName}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration, ease }}
        onAnimationComplete={onAnimationComplete}
      />
    </svg>
  );
}

export default HandwritingSvg;
