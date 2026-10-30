"use client";

import { motion, useReducedMotion } from "motion/react";
import { brand, gallery, instagramUrl, menu } from "@/data/site";
import Reveal from "@/components/Reveal";

// Tile shapes for the bento grid, repeated in order (fills 2 columns on phones, 3 on desktop).
const spans = ["row-span-2", "", "", "row-span-2", "", "md:col-span-2"];

export default function Gallery() {
  const reduce = useReducedMotion();
  // Until real photos are listed in data/site.ts, show placeholder tiles named after menu items.
  const placeholders = menu.flatMap((c) => c.items.filter((i) => i.bestseller)).concat(menu[0].items).slice(0, 6);
  const count = gallery.length > 0 ? gallery.length : placeholders.length;

  return (
    <section id="feed" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">From the feed</p>
            <h2 className="mt-2 font-display text-5xl font-extrabold tracking-tight sm:text-7xl">
              Straight off <span className="text-chili">@{brand.instagramHandle}</span>
            </h2>
          </div>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-muted underline-offset-4 hover:text-cream hover:underline">
            See all on Instagram →
          </a>
        </Reveal>

        <ul className="mt-10 grid grid-flow-dense auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-3">
          {Array.from({ length: count }, (_, i) => {
            const media = gallery[i];
            return (
              <motion.li
                key={media?.src ?? i}
                className={`group relative overflow-hidden rounded-2xl border border-cream/10 bg-ink-soft ${spans[i % spans.length]}`}
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {media ? (
                  media.type === "video" ? (
                    <video
                      src={media.src}
                      poster={media.poster}
                      aria-label={media.alt}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      autoPlay={!reduce}
                      controls={!!reduce}
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={media.src} alt={media.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  )
                ) : (
                  <Placeholder name={placeholders[i].name} index={i} />
                )}
              </motion.li>
            );
          })}
        </ul>
        {gallery.length === 0 && (
          <p className="mt-4 text-xs text-muted">Photos and reels from Instagram go here.</p>
        )}
      </div>
    </section>
  );
}

function Placeholder({ name, index }: { name: string; index: number }) {
  const tones = [
    "from-chili/60 via-chili/20 to-transparent",
    "from-saffron/50 via-saffron/10 to-transparent",
    "from-leaf/40 via-leaf/10 to-transparent",
  ];
  return (
    <div className={`flex h-full w-full flex-col justify-end bg-gradient-to-tr p-4 ${tones[index % tones.length]}`}>
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-dashed border-cream/10 transition duration-700 group-hover:rotate-90 group-hover:scale-110" />
      <p className="relative font-display text-xl font-extrabold leading-tight sm:text-2xl">{name}</p>
    </div>
  );
}
