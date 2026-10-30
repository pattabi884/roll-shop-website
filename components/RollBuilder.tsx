"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useSpring, useTransform } from "motion/react";
import { brand, builder, instagramUrl, type BuilderOption } from "@/data/site";
import Reveal from "@/components/Reveal";
import VegMark from "@/components/VegMark";

const spiceLabels = ["Mild", "Medium", "Hot", "Tronic hot"];

// Where each extra's specks sit inside the roll drawing (x, y on a 200×200 grid).
const speckSpots = [
  [[72, 76], [128, 120], [96, 140]],
  [[118, 70], [70, 118], [138, 98]],
  [[90, 62], [140, 132], [62, 96]],
  [[108, 104], [80, 132], [132, 78]],
];

export default function RollBuilder() {
  const [base, setBase] = useState(1);
  const [filling, setFilling] = useState(0);
  const [extras, setExtras] = useState<number[]>([0]);
  const [spice, setSpice] = useState(1);

  const chosen = [builder.bases[base], builder.fillings[filling], ...extras.map((i) => builder.extras[i])];
  const total = chosen.reduce((sum, o) => sum + o.price, 0);
  const veg = chosen.every((o) => o.veg);
  const rollName = `${builder.bases[base].name.replace(/ ?paratha/i, "").replace("Classic", "")} ${builder.fillings[filling].name} roll`.trim();

  const toggleExtra = (i: number) => setExtras((xs) => (xs.includes(i) ? xs.filter((x) => x !== i) : [...xs, i]));

  return (
    <section id="build" className="relative overflow-hidden py-24">
      <div aria-hidden="true" className="pointer-events-none absolute top-1/4 -left-40 h-[30rem] w-[30rem] rounded-full bg-chili/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">Play with your food</p>
          <h2 className="mt-2 font-display text-5xl font-extrabold tracking-tight sm:text-7xl">
            Build your <span className="text-chili">roll.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-start">
          {/* the roll, live */}
          <div className="md:sticky md:top-24">
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <motion.div
                aria-hidden="true"
                className="absolute inset-4 rounded-full bg-chili blur-3xl"
                animate={{ opacity: 0.12 + spice * 0.12, scale: 0.9 + spice * 0.05 }}
              />
              <RollDrawing base={builder.bases[base]} filling={builder.fillings[filling]} extras={extras} />
              <div aria-hidden="true" className="absolute inset-x-0 -top-2 flex justify-center gap-1 text-2xl">
                <AnimatePresence>
                  {Array.from({ length: spice + 1 }, (_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20, scale: 0 }}
                      animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ y: { repeat: Infinity, duration: 1.6, delay: i * 0.15 }, default: { type: "spring" } }}
                    >
                      🌶️
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-cream/10 bg-ink-soft p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    <VegMark veg={veg} /> Your roll
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={rollName}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1 font-display text-2xl font-extrabold capitalize"
                    >
                      {rollName}
                    </motion.p>
                  </AnimatePresence>
                  <p className="mt-1 text-sm text-muted">
                    {extras.length > 0 ? `+ ${extras.map((i) => builder.extras[i].name.toLowerCase()).join(", ")} · ` : ""}
                    {spiceLabels[spice]}
                  </p>
                </div>
                <Price value={total} />
              </div>
              <p className="mt-4 text-sm text-muted">
                Screenshot it and show us at the counter, or{" "}
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-cream underline underline-offset-4 hover:text-saffron">
                  DM @{brand.instagramHandle}
                </a>
                .
              </p>
            </div>
          </div>

          {/* the choices */}
          <div className="space-y-8">
            {/* phones: keep the roll and price in sight while picking */}
            <div className="sticky top-[4.75rem] z-10 -mx-1 flex items-center gap-3 rounded-2xl border border-cream/10 bg-ink/85 p-2 pr-4 backdrop-blur-lg md:hidden">
              <div className="h-12 w-12 shrink-0">
                <RollDrawing base={builder.bases[base]} filling={builder.fillings[filling]} extras={extras} />
              </div>
              <p className="min-w-0 flex-1 truncate font-display font-bold capitalize">{rollName}</p>
              <Price value={total} small />
            </div>
            <Step n={1} title="Pick your paratha">
              <Choices options={builder.bases} isOn={(i) => i === base} onPick={setBase} group="base" />
            </Step>
            <Step n={2} title="Pick a filling">
              <Choices options={builder.fillings} isOn={(i) => i === filling} onPick={setFilling} group="filling" />
            </Step>
            <Step n={3} title="Load it up">
              <Choices options={builder.extras} isOn={(i) => extras.includes(i)} onPick={toggleExtra} multi />
            </Step>
            <Step n={4} title="How hot?">
              <div className="flex flex-col gap-3">
                <input
                  type="range"
                  min={0}
                  max={3}
                  step={1}
                  value={spice}
                  onChange={(e) => setSpice(Number(e.target.value))}
                  aria-label="Spice level"
                  aria-valuetext={spiceLabels[spice]}
                  className="spice-range w-full"
                  style={{ "--fill": `${(spice / 3) * 100}%` } as React.CSSProperties}
                />
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-muted">
                  {spiceLabels.map((l, i) => (
                    <span key={l} className={i === spice ? "text-chili" : ""}>
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </Step>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-3 font-display text-xl font-bold">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-saffron text-sm text-ink">{n}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function Choices({
  options,
  isOn,
  onPick,
  group,
  multi,
}: {
  options: BuilderOption[];
  isOn: (i: number) => boolean;
  onPick: (i: number) => void;
  group?: string;
  multi?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o, i) => {
        const on = isOn(i);
        return (
          <motion.button
            key={o.name}
            type="button"
            aria-pressed={on}
            onClick={() => onPick(i)}
            whileTap={{ scale: 0.94 }}
            className={`relative flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
              on ? "border-transparent text-ink" : "border-cream/15 text-cream hover:border-cream/40"
            }`}
          >
            {on &&
              (multi ? (
                <motion.span layout className="absolute inset-0 rounded-full bg-saffron" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} />
              ) : (
                <motion.span layoutId={`pick-${group}`} className="absolute inset-0 rounded-full bg-saffron" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              ))}
            <span className="relative flex items-center gap-2">
              <span className="h-3 w-3 rounded-full ring-1 ring-ink/20" style={{ background: o.colour }} />
              {o.name}
              <span className={on ? "text-ink/60" : "text-muted"}>₹{o.price}</span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

// The total springs to its new value instead of jumping.
function Price({ value, small }: { value: number; small?: boolean }) {
  const spring = useSpring(value, { stiffness: 120, damping: 20 });
  const text = useTransform(spring, (v) => `₹${Math.round(v)}`);
  useEffect(() => spring.set(value), [spring, value]);
  return <motion.span className={`font-display font-extrabold text-saffron tabular-nums ${small ? "text-xl" : "text-4xl"}`}>{text}</motion.span>;
}

// Cross-section of the roll: paratha ring, a spiral of filling, specks for extras.
function RollDrawing({ base, filling, extras }: { base: BuilderOption; filling: BuilderOption; extras: number[] }) {
  return (
    <svg viewBox="0 0 200 200" className="relative h-full w-full" aria-hidden="true">
      <motion.circle cx="100" cy="100" r="90" animate={{ fill: base.colour }} transition={{ duration: 0.4 }} />
      <motion.circle cx="100" cy="100" r="78" animate={{ fill: filling.colour }} transition={{ duration: 0.4 }} />
      <motion.path
        key={base.name + filling.name}
        d="M100 100 m0 -6 a6 6 0 1 1 -0.1 0 M100 100 m0 -20 a20 20 0 1 1 -0.1 0 M100 100 m0 -36 a36 36 0 1 1 -0.1 0 M100 100 m0 -52 a52 52 0 1 1 -0.1 0 M100 100 m0 -68 a68 68 0 1 1 -0.1 0"
        fill="none"
        stroke={base.colour}
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.4 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      <AnimatePresence>
        {extras.flatMap((e) =>
          speckSpots[e].map(([x, y], j) => (
            <motion.circle
              key={`${e}-${j}`}
              cx={x}
              cy={y}
              r={7 - j}
              fill={builder.extras[e].colour}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 18, delay: j * 0.05 }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
          )),
        )}
      </AnimatePresence>
    </svg>
  );
}
