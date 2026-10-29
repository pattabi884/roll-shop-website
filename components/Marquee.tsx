import { menu } from "@/data/site";

// Two skewed bands of menu names scrolling in opposite directions.
export default function Marquee() {
  const names = menu.flatMap((c) => c.items.map((i) => i.name));
  return (
    <div aria-hidden="true" className="relative -my-4 overflow-hidden py-10">
      <Band items={names} className="-rotate-2 bg-saffron text-ink" />
      <Band items={[...names].reverse()} className="mt-[-0.25rem] rotate-1 bg-chili text-cream" reverse />
    </div>
  );
}

function Band({ items, className, reverse }: { items: string[]; className: string; reverse?: boolean }) {
  return (
    <div className={`-mx-4 flex overflow-hidden py-3 ${className}`}>
      {[0, 1].map((copy) => (
        <ul key={copy} className={`marquee flex shrink-0 items-center ${reverse ? "marquee-reverse" : ""}`}>
          {items.map((name) => (
            <li key={name} className="flex items-center gap-6 px-3 font-display text-2xl font-extrabold uppercase tracking-tight whitespace-nowrap sm:text-3xl">
              {name}
              <span className="text-lg">✦</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
