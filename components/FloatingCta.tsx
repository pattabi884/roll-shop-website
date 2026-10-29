"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { brand, instagramUrl } from "@/data/site";

// Phones only: once the hero is scrolled past, a pill slides up with the two things people want.
export default function FloatingCta() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 700));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-4 bottom-4 z-40 flex gap-2 rounded-full border border-cream/10 bg-ink/80 p-1.5 shadow-2xl backdrop-blur-lg md:hidden"
        >
          <a href="#menu" className="flex-1 rounded-full py-3 text-center text-sm font-semibold">
            Menu
          </a>
          <a href="#build" className="flex-1 rounded-full py-3 text-center text-sm font-semibold">
            Build
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-[1.6] rounded-full bg-saffron py-3 text-center text-sm font-semibold text-ink"
          >
            @{brand.instagramHandle}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
