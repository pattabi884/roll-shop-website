import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/dm-sans";
import { brand } from "@/data/site";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: `${brand.name} — Rolls in Bengaluru`,
  description: brand.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grain font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
