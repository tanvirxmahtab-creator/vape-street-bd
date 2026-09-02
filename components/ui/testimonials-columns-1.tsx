"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
  rating?: number;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 15,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role, rating = 5 }, i) => (
              <div
                className="p-6 sm:p-8 rounded-2xl border border-glass bg-[#111111]/90 backdrop-blur-md shadow-xl shadow-primary/5 max-w-xs sm:max-w-sm w-full transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(197,168,128,0.15)] flex flex-col justify-between"
                key={`${index}-${i}`}
              >
                <div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(rating)].map((_, starIdx) => (
                      <Star key={starIdx} className="h-3.5 w-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-accent/80 font-sans italic">
                    "{text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-glass">
                  <img
                    width={44}
                    height={44}
                    src={image}
                    alt={name}
                    className="h-11 w-11 rounded-full object-cover border border-primary/30"
                  />
                  <div className="flex flex-col">
                    <div className="font-heading text-sm font-bold tracking-tight text-accent">{name}</div>
                    <div className="text-xs text-primary font-medium tracking-wide opacity-90">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
