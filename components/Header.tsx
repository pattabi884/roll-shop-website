import { brand, instagramUrl } from "@/data/site";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#outlets", label: "Outlets" },
  { href: "#follow", label: "Follow us" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-cream/10 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#top" className="font-display text-xl font-extrabold tracking-tight">
          {brand.name}
          <span className="text-chili">.</span>
        </a>
        <nav className="flex items-center gap-5 text-sm text-muted">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hidden transition hover:text-cream sm:inline">
              {l.label}
            </a>
          ))}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-saffron px-4 py-2 font-semibold text-ink transition hover:bg-cream"
          >
            @{brand.instagramHandle}
          </a>
        </nav>
      </div>
    </header>
  );
}
