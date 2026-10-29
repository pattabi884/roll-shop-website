import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Outlets from "@/components/Outlets";
import InstagramCta from "@/components/InstagramCta";
import Footer from "@/components/Footer";
import { isSampleData } from "@/data/site";

export default function Home() {
  return (
    <>
      {isSampleData && (
        <div className="bg-saffron px-4 py-1.5 text-center text-xs font-medium text-ink">
          Sample content — real menu, prices and outlets coming soon.
        </div>
      )}
      <Header />
      <main>
        <Hero />
        <Menu />
        <Outlets />
        <InstagramCta />
      </main>
      <Footer />
    </>
  );
}
