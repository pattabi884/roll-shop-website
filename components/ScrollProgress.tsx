"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Thin saffron-to-chili line along the top that fills as you scroll the page.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 h-[3px] origin-left bg-gradient-to-r from-saffron to-chili"
      style={{ scaleX }}
    />
  );
}
