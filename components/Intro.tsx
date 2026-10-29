"use client";

import { useEffect, useState } from "react";
import { animate, AnimatePresence, motion } from "motion/react";
import { brand } from "@/data/site";
import { useIntro } from "@/components/Providers";

// Full-screen curtain on the first visit of a session: the brand name fills up
// with saffron while a counter runs to 100, then the curtain lifts.
export default function Intro() {
  const { ready, setReady } = useIntro();
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      setReady(true);
      return;
    }
    const controls = animate(0, 100, {
      duration: 1.3,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setProgress(v),
      onComplete: () => {
        setShow(false);
        setTimeout(() => setReady(true), 250);
      },
    });
    return () => controls.stop();
  }, [setReady]);

  if (ready && !show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="intro fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="relative font-display text-[clamp(3.5rem,16vw,9rem)] leading-none font-extrabold tracking-tighter uppercase">
            <span className="text-outline">{brand.name.split(" ")[0]}</span>
            <span
              className="neon absolute inset-0 text-saffron"
              style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
            >
              {brand.name.split(" ")[0]}
            </span>
          </div>
          <span className="mt-6 font-display text-sm font-bold tracking-[0.3em] text-muted tabular-nums">
            {String(Math.round(progress)).padStart(3, "0")}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
