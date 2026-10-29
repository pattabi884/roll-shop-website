"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useScroll, useTransform } from "motion/react";
import { brand, outlets } from "@/data/site";
import Magnetic from "@/components/Magnetic";
import Embers from "@/components/Embers";
import { useIntro } from "@/components/Providers";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const artRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { ready } = useIntro();
  const [first, ...rest] = brand.name.split(" ");

  return (
    <section
      id="top"
      ref={ref}
      className="spotlight relative overflow-hidden"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <Embers />
      {/* drifting colour blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="blob absolute -top-32 -left-24 h-96 w-96 rounded-full bg-chili/30 blur-3xl" />
        <div className="blob blob-delay absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-saffron/20 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-14 pb-20 sm:px-6 md:grid-cols-[1.25fr_1fr] md:pt-24 md:pb-28">
        <motion.div style={{ y: titleY, opacity: fade }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={ready && { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-saffron/30 bg-saffron/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-saffron"
          >
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-saffron" />
            Bengaluru · {outlets.length} outlets
          </motion.p>

          <h1 className="font-display leading-[0.82] font-extrabold tracking-tighter uppercase">
            <span className="sr-only">{brand.name}</span>
            <span aria-hidden="true" className="block text-[clamp(4.5rem,22vw,10rem)]">
              <Letters text={first} className="neon text-saffron" />
            </span>
            {rest.length > 0 && (
              <span aria-hidden="true" className="block text-[clamp(4.5rem,22vw,10rem)]">
                <Letters text={rest.join(" ")} delay={0.25} className="text-outline" />
              </span>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready && { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="mt-6 font-display text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {brand.tagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready && { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="mt-3 max-w-md text-lg text-muted"
          >
            {brand.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready && { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Magnetic>
              <a href="#menu" className="shine inline-block rounded-full bg-chili px-6 py-3 font-semibold text-cream shadow-[0_0_40px_-8px] shadow-chili transition hover:brightness-110">
                See the menu
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#outlets" className="inline-block rounded-full border border-cream/25 px-6 py-3 font-semibold transition hover:border-cream hover:bg-cream/5">
                Find an outlet
              </a>
            </Magnetic>
          </motion.div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-cream/10 pt-6">
            <Stat value={String(outlets.length)} label="Outlets" />
            <Stat value={brand.instagramFollowers} label="On Instagram" />
            <Stat value="100%" label="Rolled to order" />
          </dl>
        </motion.div>

        <motion.div
          style={{ y: artY, rotate: artRotate }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={ready && { opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
        >
          <RollArt />
        </motion.div>
      </div>
    </section>
  );
}

// Each letter springs up from below the baseline, one after another.
function Letters({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const { ready } = useIntro();
  return (
    <span className={`letters inline-flex pb-[0.06em] ${className ?? ""}`}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", rotate: 8 }}
          animate={ready && { y: "0%", rotate: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.05, ease }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

// Counts the number up from 0 when it scrolls into view ("27.8K+" → 0.0K+ … 27.8K+).
function Stat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    const match = value.match(/^([\d.]+)(.*)$/);
    const node = ref.current;
    if (!inView || !match || !node) return;
    const target = parseFloat(match[1]);
    const decimals = match[1].split(".")[1]?.length ?? 0;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => (node.textContent = v.toFixed(decimals) + match[2]),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd ref={ref} className="font-display text-3xl font-extrabold text-saffron tabular-nums">
        {value}
      </dd>
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
    </div>
  );
}

// Decorative roll cross-section, drawn in SVG, with fillings orbiting it.
function RollArt() {
  const orbit = [
    { label: "🌶️", r: "-rotate-12" },
    { label: "🧅", r: "rotate-6" },
    { label: "🥚", r: "-rotate-6" },
    { label: "🍋", r: "rotate-12" },
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem]" aria-hidden="true">
      <div className="absolute inset-6 rounded-full bg-chili/25 blur-3xl" />
      <div className="absolute inset-0 rounded-full border border-dashed border-saffron/25" />
      <svg viewBox="0 0 200 200" className="relative h-full w-full animate-[spin_40s_linear_infinite] motion-reduce:animate-none">
        <defs>
          <radialGradient id="paratha" cx="40%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#f3d6a0" />
            <stop offset="100%" stopColor="#c98d45" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="84" fill="url(#paratha)" />
        <circle cx="100" cy="100" r="72" fill="#d9a35b" />
        <path
          d="M100 100 m0 -6 a6 6 0 1 1 -0.1 0 M100 100 m0 -18 a18 18 0 1 1 -0.1 0 M100 100 m0 -32 a32 32 0 1 1 -0.1 0 M100 100 m0 -48 a48 48 0 1 1 -0.1 0 M100 100 m0 -62 a62 62 0 1 1 -0.1 0"
          fill="none"
          stroke="#8a4b1f"
          strokeWidth="3"
          strokeDasharray="6 5"
          opacity="0.5"
        />
        <circle cx="74" cy="80" r="9" fill="#d9452b" />
        <circle cx="126" cy="92" r="7" fill="#4f9d4a" />
        <circle cx="96" cy="130" r="8" fill="#d9452b" />
        <circle cx="134" cy="124" r="6" fill="#f7ecd9" />
        <circle cx="68" cy="118" r="6" fill="#4f9d4a" />
        <circle cx="110" cy="64" r="5" fill="#f7ecd9" />
      </svg>
      {/* fillings riding an orbit around the roll */}
      <div className="absolute inset-0 animate-[spin_18s_linear_infinite_reverse] motion-reduce:animate-none">
        {orbit.map((o, i) => (
          <span
            key={i}
            className={`absolute grid h-12 w-12 place-items-center rounded-2xl border border-cream/10 bg-ink-soft/80 text-2xl backdrop-blur ${o.r}`}
            style={{
              left: `${50 + 50 * Math.cos((i / orbit.length) * 2 * Math.PI)}%`,
              top: `${50 + 50 * Math.sin((i / orbit.length) * 2 * Math.PI)}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {o.label}
          </span>
        ))}
      </div>
    </div>
  );
}
