import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  metadataBase: new URL("https://kittykarma.example"),
  title: {
    default: `${brand.name} · Herbal care, delivered across Ghana`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Shop Kitty Karma herbal blends, combos, pops, oils and kits. Pay with MTN MoMo and get delivery across Ghana.",
  applicationName: brand.name,
  openGraph: {
    title: brand.name,
    description: brand.tagline,
    siteName: brand.name,
    locale: "en_GH",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fcf8f6",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GH" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-plum-950 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
