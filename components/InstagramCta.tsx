import { brand, instagramUrl } from "@/data/site";

export default function InstagramCta() {
  return (
    <section id="follow" className="px-4 pb-20 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-chili to-saffron p-10 text-ink sm:p-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em]">Join {brand.instagramFollowers} roll lovers</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          New rolls, offers and outlet drops — first on Instagram.
        </h2>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-cream transition hover:scale-105"
        >
          Follow @{brand.instagramHandle}
        </a>
      </div>
    </section>
  );
}
