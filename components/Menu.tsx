"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { menu, orderLinks, type MenuItem } from "@/data/site";
import Reveal from "@/components/Reveal";
import VegMark from "@/components/VegMark";

export default function Menu() {
  const [active, setActive] = useState(0);
  const category = menu[active];

  return (
    <section id="menu" className="relative bg-ink-soft py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">The menu</p>
            <h2 className="mt-2 font-display text-5xl font-extrabold tracking-tight sm:text-7xl">
              Pick your <span className="text-chili">roll.</span>
            </h2>
          </div>
          <OrderButtons />
        </Reveal>

        <div className="-mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none]" role="tablist">
          {menu.map((c, i) => (
            <button
              key={c.name}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`relative shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                i === active ? "border-transparent text-ink" : "border-cream/15 text-muted hover:text-cream"
              }`}
            >
              {i === active && (
                <motion.span
                  layoutId="menu-pill"
                  className="absolute inset-0 rounded-full bg-saffron"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{c.name}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={category.name}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{ show: { transition: { staggerChildren: 0.06 } }, hidden: {} }}
          >
            {category.items.map((item) => (
              <motion.li
                key={item.name}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.97 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                }}
                style={{ perspective: 800 }}
              >
                <MenuCard item={item} />
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}

// A card that tilts toward the mouse with a glare following the cursor.
function MenuCard({ item }: { item: MenuItem }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 250, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), { stiffness: 250, damping: 20 });
  const glare = useTransform(
    [px, py],
    ([x, y]) => `radial-gradient(240px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgb(244 165 49 / 0.18), transparent 70%)`,
  );

  return (
    <motion.div
      style={{ rotateX, rotateY }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      className="group relative h-full overflow-hidden rounded-2xl border border-cream/10 bg-ink p-5 transition-colors hover:border-saffron/50"
    >
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: glare }} />
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <VegMark veg={item.veg} />
          <h3 className="font-display text-lg font-bold">{item.name}</h3>
        </div>
        <span className="font-display text-lg font-bold text-saffron">₹{item.price}</span>
      </div>
      <p className="relative mt-2 text-sm text-muted">{item.description}</p>
      {item.bestseller && (
        <span className="relative mt-3 inline-block rounded-full bg-chili/15 px-3 py-1 text-xs font-semibold text-chili">
          🔥 Bestseller
        </span>
      )}
    </motion.div>
  );
}

function OrderButtons() {
  const buttons = [
    { label: "Order on Swiggy", href: orderLinks.swiggy },
    { label: "Order on Zomato", href: orderLinks.zomato },
  ].filter((b) => b.href);
  if (buttons.length === 0) return null;
  return (
    <div className="flex gap-2">
      {buttons.map((b) => (
        <a
          key={b.label}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-cream/25 px-4 py-2 text-sm font-semibold transition hover:border-cream"
        >
          {b.label}
        </a>
      ))}
    </div>
  );
}
