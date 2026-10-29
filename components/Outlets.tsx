import { outlets } from "@/data/site";

export default function Outlets() {
  return (
    <section id="outlets" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">Find us</p>
        <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          {outlets.length} outlets across Bengaluru
        </h2>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outlets.map((o, i) => {
            const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapsQuery ?? o.address)}`;
            return (
              <li key={o.area} className="flex flex-col rounded-2xl border border-cream/10 bg-ink-soft p-6">
                <span className="font-display text-sm font-bold text-chili">0{i + 1}</span>
                <h3 className="mt-1 font-display text-2xl font-extrabold">{o.area}</h3>
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
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-ink transition hover:bg-saffron"
                >
                  Get directions →
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
