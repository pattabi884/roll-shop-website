import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Bestsellers from "@/components/Bestsellers";
import RollBuilder from "@/components/RollBuilder";
import FloatingCta from "@/components/FloatingCta";
import Intro from "@/components/Intro";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Outlets from "@/components/Outlets";
import InstagramCta from "@/components/InstagramCta";
import Footer from "@/components/Footer";
import { isSampleData } from "@/data/site";

export default function Home() {
  return (
    <>
      <Intro />
      <Cursor />
      <ScrollProgress />
      {isSampleData && (
        <div className="bg-saffron px-4 py-1.5 text-center text-xs font-medium text-ink">
          Sample content — real menu, prices and outlets coming soon.
        </div>
      )}
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Bestsellers />
        <Menu />
        <RollBuilder />
        <Gallery />
        <Outlets />
        <InstagramCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
