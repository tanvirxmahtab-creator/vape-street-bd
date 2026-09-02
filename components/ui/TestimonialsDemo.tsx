'use client';

import React from "react";
import { TestimonialsColumn, TestimonialItem } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";
import { MessageSquareHeart } from "lucide-react";

const testimonials: TestimonialItem[] = [
  {
    text: "Vape Street BD is hands down the best vape shop in Dhaka! Got my Caliburn G3 delivered within 3 hours. 100% authentic products and super smooth salt nic flavors.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    name: "Briana Patton",
    role: "Verified Vaper • Gulshan",
    rating: 5,
  },
  {
    text: "Top-notch customer service. Helped me select the perfect 30mg salt nic e-liquid for my pod system. The flavor payout is unbelievable!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    name: "Bilal Ahmed",
    role: "Regular Customer • Banani",
    rating: 5,
  },
  {
    text: "I was skeptical about finding original Vaporesso pods in Bangladesh, but Vape Street BD delivered guaranteed genuine products with QR check.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    name: "Saman Malik",
    role: "Cloud Enthusiast • Uttara",
    rating: 5,
  },
  {
    text: "The selection of imported sub-ohm box mods and artisanal freebase liquids is unparalleled. Delivery was blisteringly fast and packaged premium.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    name: "Omar Raza",
    role: "Mod Collector • Dhanmondi",
    rating: 5,
  },
  {
    text: "Seamless shopping experience from ordering to unboxing. Their disposable vape lineup has incredible puff counts and rich taste.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    name: "Zainab Hussain",
    role: "Verified Buyer • Mirpur",
    rating: 5,
  },
  {
    text: "Switched from cigarette smoking to pod systems thanks to their consultation. 6 months tobacco-free now! Highly recommend Vape Street BD.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
    name: "Aliza Khan",
    role: "Satisfied Customer • Bashundhara",
    rating: 5,
  },
  {
    text: "Prices are super fair compared to market rates, and everything comes sealed in original manufacturing boxes with warranty.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
    name: "Farhan Siddiqui",
    role: "Vape Enthusiast • Sylhet",
    rating: 5,
  },
  {
    text: "Best vape shop in Bangladesh. Extremely helpful staff on chat and phone, answering every technical query with patience.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    name: "Sana Sheikh",
    role: "Verified Vaper • Chattogram",
    rating: 5,
  },
  {
    text: "High quality coils and replacement pods always in stock when other shops run out. Will definitely remain a loyal customer!",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    name: "Hassan Ali",
    role: "Vape Street Member • Mohakhali",
    rating: 5,
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const TestimonialsDemo = () => {
  return (
    <section className="bg-bg-dark py-20 sm:py-28 relative overflow-hidden border-t border-glass">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container z-10 mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[600px] mx-auto text-center mb-14"
        >
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary text-glow">
              <MessageSquareHeart className="h-3.5 w-3.5" /> Customer Feedback
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-accent text-glow">
            What Our Vapers Say
          </h2>
          <p className="font-sans text-sm sm:text-base text-accent/70 mt-4 leading-relaxed">
            Real stories from real vapers across Bangladesh who trust Vape Street BD for 100% authentic hardware & e-liquids.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[640px] overflow-hidden py-4">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
        </div>
      </div>
    </section>
  );
};
