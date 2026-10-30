import { brand, instagramUrl } from "@/data/site";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";

export default function InstagramCta() {
  return (
    <section id="follow" className="px-4 py-24 sm:px-6">
      <Reveal className="mx-auto max-w-6xl">
        <div className="glow-border relative overflow-hidden rounded-3xl p-[2px]">
          <div className="cta-bg relative rounded-[calc(1.5rem-2px)] p-8 text-ink sm:p-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em]">Join {brand.instagramFollowers} roll lovers</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
              New rolls, offers and outlet drops — first on Instagram.
            </h2>
            <div className="mt-10">
              <Magnetic>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-lg font-semibold text-cream transition hover:scale-105"
                >
                  Follow @{brand.instagramHandle} <span aria-hidden="true">↗</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
