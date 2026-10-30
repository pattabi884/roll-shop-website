import { brand, instagramUrl } from "@/data/site";

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-cream/10 pt-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {brand.name}. Made in Bengaluru.
        </p>
        <div className="flex flex-wrap gap-5">
          {brand.phone && (
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="hover:text-cream">{brand.phone}</a>
          )}
          {brand.email && (
            <a href={`mailto:${brand.email}`} className="hover:text-cream">{brand.email}</a>
          )}
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cream">Instagram</a>
        </div>
      </div>
      <p aria-hidden="true" className="mt-6 text-center font-display text-[13vw] leading-[0.75] font-extrabold tracking-tighter whitespace-nowrap text-cream/[0.06] uppercase select-none">
        {brand.name}
      </p>
    </footer>
  );
}
