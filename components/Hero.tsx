import { brand, outlets } from "@/data/site";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1.2fr_1fr] md:py-28">
        <div>
          <p className="rise mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-saffron">
            Bengaluru · {outlets.length} outlets
          </p>
          <h1 className="rise-2 font-display text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-7xl">
            {brand.tagline}
          </h1>
          <p className="rise-3 mt-6 max-w-md text-lg text-muted">{brand.description}</p>
          <div className="rise-3 mt-8 flex flex-wrap gap-3">
            <a href="#menu" className="rounded-full bg-chili px-6 py-3 font-semibold text-cream transition hover:brightness-110">
              See the menu
            </a>
            <a href="#outlets" className="rounded-full border border-cream/25 px-6 py-3 font-semibold transition hover:border-cream">
              Find an outlet
            </a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-cream/10 pt-6">
            <Stat value={String(outlets.length)} label="Outlets" />
            <Stat value={brand.instagramFollowers} label="On Instagram" />
            <Stat value="100%" label="Rolled to order" />
          </dl>
        </div>
        <RollArt />
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-3xl font-extrabold text-saffron">{value}</dd>
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
    </div>
  );
}

// Decorative roll cross-section, drawn in SVG (no image files needed).
function RollArt() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm" aria-hidden="true">
      <div className="absolute inset-0 rounded-full bg-chili/20 blur-3xl" />
      <svg viewBox="0 0 200 200" className="relative h-full w-full animate-[spin_40s_linear_infinite] motion-reduce:animate-none">
        <circle cx="100" cy="100" r="92" fill="#e9c58a" />
        <circle cx="100" cy="100" r="80" fill="#d9a35b" />
        <path
          d="M100 100 m0 -6 a6 6 0 1 1 -0.1 0 M100 100 m0 -18 a18 18 0 1 1 -0.1 0 M100 100 m0 -32 a32 32 0 1 1 -0.1 0 M100 100 m0 -48 a48 48 0 1 1 -0.1 0 M100 100 m0 -64 a64 64 0 1 1 -0.1 0"
          fill="none"
          stroke="#8a4b1f"
          strokeWidth="3"
          strokeDasharray="6 5"
          opacity="0.5"
        />
        <circle cx="72" cy="78" r="9" fill="#d9452b" />
        <circle cx="128" cy="92" r="7" fill="#4f9d4a" />
        <circle cx="96" cy="132" r="8" fill="#d9452b" />
        <circle cx="138" cy="128" r="6" fill="#f7ecd9" />
        <circle cx="66" cy="120" r="6" fill="#4f9d4a" />
        <circle cx="110" cy="62" r="5" fill="#f7ecd9" />
      </svg>
    </div>
  );
}
