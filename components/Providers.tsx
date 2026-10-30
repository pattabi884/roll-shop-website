"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";

// Flips to true once the intro curtain has lifted, so the hero can start its entrance.
const IntroContext = createContext({ ready: false, setReady: (_: boolean) => {} });
export const useIntro = () => useContext(IntroContext);

// Site-wide motion setup:
// - every Motion animation follows the visitor's reduced-motion setting
// - Lenis gives the buttery inertia scroll (skipped for reduced motion)
export default function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ anchors: { offset: -80 }, lerp: 0.12 });
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <IntroContext.Provider value={{ ready, setReady }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </IntroContext.Provider>
  );
}
