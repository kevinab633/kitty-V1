import Link from "next/link";
import { brand } from "@/lib/brand";
import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-plum-950 text-plum-100">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-magenta-600/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <BrandMark onDark />
          <p className="mt-5 max-w-sm text-[0.98rem] leading-relaxed text-plum-200">
            {brand.tagline} Pay with MTN MoMo, send your screenshot, and we deliver to your door.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={brand.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-medium text-white transition-colors hover:border-magenta-400 hover:text-magenta-300"
            >
              Instagram <span className="text-plum-300">{brand.social.instagram.handle}</span>
            </a>
            <a
              href={brand.social.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-medium text-white transition-colors hover:border-magenta-400 hover:text-magenta-300"
            >
              TikTok <span className="text-plum-300">{brand.social.tiktok.handle}</span>
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-4 md:col-start-7">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-plum-300">Shop</h2>
            <ul className="mt-4 space-y-3 text-[0.95rem]">
              <li><Link className="hover:text-white" href="/shop?category=herbs">Herbal Blends</Link></li>
              <li><Link className="hover:text-white" href="/shop?category=combos">Combos</Link></li>
              <li><Link className="hover:text-white" href="/shop?category=pops">Pops</Link></li>
              <li><Link className="hover:text-white" href="/kits">Kits &amp; Bundles</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-plum-300">Help</h2>
            <ul className="mt-4 space-y-3 text-[0.95rem]">
              <li><Link className="hover:text-white" href="/how-to-order">How to Order</Link></li>
              <li><Link className="hover:text-white" href="/how-to-order#delivery">Delivery Times</Link></li>
              <li><Link className="hover:text-white" href="/contact">Contact</Link></li>
              <li><Link className="hover:text-white" href="/cart">Cart</Link></li>
            </ul>
          </div>
        </nav>

        <div className="md:col-span-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-plum-300 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <p className="max-w-xl">
            Products are herbal and personal-care items, not medicine. They are not a substitute for advice from a qualified health professional.
          </p>
        </div>
      </div>
    </footer>
  );
}
