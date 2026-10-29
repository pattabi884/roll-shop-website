import { brand, instagramUrl } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {brand.name}. Made in Bengaluru.
        </p>
        <div className="flex flex-wrap gap-5">
          <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="hover:text-cream">{brand.phone}</a>
          <a href={`mailto:${brand.email}`} className="hover:text-cream">{brand.email}</a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cream">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
