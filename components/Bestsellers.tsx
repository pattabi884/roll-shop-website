"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { menu } from "@/data/site";
import VegMark from "@/components/VegMark";

// "Fan favourites": on desktop the page pins and the cards glide sideways as you
// scroll down. On phones (and for reduced motion) it is a normal swipeable row.
export default function Bestsellers() {
  const all = menu.flatMap((c) => c.items.map((item) => ({ ...item, category: c.name })));
  const items = [...all.filter((i) => i.bestseller), ...all.filter((i) => !i.bestseller)].slice(0, 6);

  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      const el = track.current;
      setDistance(wide.matches && !reduce.matches && el ? Math.max(0, el.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    wide.addEventListener("change", measure);
    return () => {
      window.removeEventListener("resize", measure);
      wide.removeEventListener("change", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * distance);
  const pinned = distance > 0;

  return (
    <section ref={section} className="relative" style={{ height: pinned ? `calc(100vh + ${distance}px)` : undefined }}>
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-24"}>
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">Fan favourites</p>
          <h2 className="mt-2 font-display text-5xl font-extrabold tracking-tight sm:text-7xl">
            The ones <span className="text-outline">everyone</span> orders.
          </h2>
        </div>

        <motion.div
          ref={track}
          style={{ x: pinned ? x : 0 }}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-6 md:overflow-visible md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
        >
          {items.map((item, i) => (
            <article
              key={item.name}
              className="group relative flex h-[26rem] w-[78vw] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-3xl border border-cream/10 bg-ink-soft p-6 sm:w-[22rem] md:h-[60vh] md:max-h-[34rem] md:w-[26rem]"
            >
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt={item.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              ) : (
                <CardArt index={i} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
              <span aria-hidden="true" className="absolute top-4 right-6 font-display text-8xl font-extrabold text-cream/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  <VegMark veg={item.veg} /> {item.category}
                </div>
                <h3 className="mt-2 font-display text-4xl leading-none font-extrabold tracking-tight">{item.name}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
                <p className="mt-4 font-display text-3xl font-extrabold text-saffron">₹{item.price}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Placeholder art until real photos are added: a glowing, slowly turning roll.
function CardArt({ index }: { index: number }) {
  const glows = ["bg-chili/40", "bg-saffron/30", "bg-leaf/30"];
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-start justify-center pt-12">
      <div className={`absolute top-10 h-56 w-56 rounded-full blur-3xl ${glows[index % glows.length]}`} />
      <svg viewBox="0 0 200 200" className="relative h-56 w-56 animate-[spin_30s_linear_infinite] transition-transform duration-700 group-hover:scale-110 motion-reduce:animate-none">
        <circle cx="100" cy="100" r="80" fill="#d9a35b" />
        <path
          d="M100 100 m0 -8 a8 8 0 1 1 -0.1 0 M100 100 m0 -24 a24 24 0 1 1 -0.1 0 M100 100 m0 -42 a42 42 0 1 1 -0.1 0 M100 100 m0 -62 a62 62 0 1 1 -0.1 0"
          fill="none"
          stroke="#8a4b1f"
          strokeWidth="4"
          strokeDasharray="8 6"
          opacity="0.55"
        />
        <circle cx="70" cy="80" r="10" fill="#d9452b" />
        <circle cx="130" cy="95" r="8" fill="#4f9d4a" />
        <circle cx="100" cy="135" r="9" fill="#f7ecd9" />
      </svg>
    </div>
  );
}
