"use client";

import { motion } from "motion/react";
import { outlets } from "@/data/site";
import Reveal from "@/components/Reveal";

export default function Outlets() {
  return (
    <section id="outlets" className="bg-ink-soft py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">Find us</p>
          <h2 className="mt-2 font-display text-5xl font-extrabold tracking-tight sm:text-7xl">
            {outlets.length} outlets.<br />
            <span className="text-outline [--outline-fill:var(--color-ink-soft)]">One city.</span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outlets.map((o, i) => {
            const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapsQuery ?? o.address)}`;
            return (
              <motion.li
                key={o.area}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-cream/10 bg-ink p-6 transition-colors hover:border-chili/60"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-6 -right-2 font-display text-9xl font-extrabold text-cream/[0.04] transition-colors group-hover:text-chili/15"
                >
                  0{i + 1}
                </span>
                <span className="font-display text-sm font-bold text-chili">0{i + 1}</span>
                <h3 className="mt-1 font-display text-3xl font-extrabold">{o.area}</h3>
                <p className="mt-3 text-sm text-muted">{o.address}</p>
                <p className="mt-2 text-sm">
                  <span className="text-muted">Open </span>
                  {o.hours}
                </p>
                {o.phone && (
                  <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="mt-1 text-sm underline-offset-4 hover:underline">
                    {o.phone}
                  </a>
                )}
                <a
                  href={maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-ink transition hover:bg-saffron"
                >
                  Get directions
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
