"use client";

import { useState } from "react";
import { menu, orderLinks } from "@/data/site";

export default function Menu() {
  const [active, setActive] = useState(0);
  const category = menu[active];

  return (
    <section id="menu" className="bg-ink-soft py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">The menu</p>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Pick your roll</h2>
          </div>
          <OrderButtons />
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="tablist">
          {menu.map((c, i) => (
            <button
              key={c.name}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${
                i === active ? "bg-saffron text-ink" : "border border-cream/15 text-muted hover:text-cream"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {category.items.map((item) => (
            <li
              key={item.name}
              className="group rounded-2xl border border-cream/10 bg-ink p-5 transition hover:-translate-y-1 hover:border-saffron/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <VegMark veg={item.veg} />
                  <h3 className="font-display text-lg font-bold">{item.name}</h3>
                </div>
                <span className="font-display text-lg font-bold text-saffron">₹{item.price}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
              {item.bestseller && (
                <span className="mt-3 inline-block rounded-full bg-chili/15 px-3 py-1 text-xs font-semibold text-chili">
                  Bestseller
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Indian veg / non-veg indicator: green dot for veg, red triangle for non-veg.
function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      title={veg ? "Veg" : "Non-veg"}
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border-2 ${veg ? "border-leaf" : "border-chili"}`}
    >
      {veg ? (
        <span className="h-2 w-2 rounded-full bg-leaf" />
      ) : (
        <span className="h-0 w-0 border-x-[4px] border-b-[7px] border-x-transparent border-b-chili" />
      )}
      <span className="sr-only">{veg ? "Veg" : "Non-veg"}</span>
    </span>
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
