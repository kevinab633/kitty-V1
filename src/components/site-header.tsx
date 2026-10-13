"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "./brand-mark";
import { useCartLines, cartTotals } from "@/lib/cart-store";
import { brand } from "@/lib/brand";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/kits", label: "Kits & Bundles" },
  { href: "/how-to-order", label: "How to Order" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const lines = useCartLines();
  const { count } = cartTotals(lines);

  return (
    <header className="sticky top-0 z-50 border-b border-plum-100/80 bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <BrandMark className="py-3" />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex min-h-11 items-center rounded-full px-4 text-[0.95rem] font-medium transition-colors duration-200 hover:bg-magenta-50 hover:text-magenta-700 ${
                      active ? "text-magenta-700" : "text-plum-700"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span aria-hidden="true" className="absolute inset-x-4 -bottom-[7px] h-0.5 rounded-full bg-magenta-600" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="group relative inline-flex min-h-11 items-center gap-2 rounded-full bg-plum-950 px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-magenta-700"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 7h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7Z" />
              <path d="M9 7V5.5a3 3 0 0 1 6 0V7" />
            </svg>
            <span>Cart</span>
            <span
              aria-live="polite"
              className="tabular inline-flex min-w-5 items-center justify-center rounded-full bg-magenta-500 px-1.5 text-xs font-bold leading-5 text-white"
            >
              <span className="sr-only">{count === 0 ? "Cart is empty, " : `${count} items in cart, `}</span>
              {count}
            </span>
          </Link>

          <details className="group relative md:hidden">
            <summary className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-full border border-plum-200 bg-white text-plum-900 transition-colors hover:border-magenta-300 [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Open menu</span>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h10" />
              </svg>
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 top-[calc(100%+0.5rem)] w-64 rounded-2xl border border-plum-100 bg-white p-2 shadow-[0_18px_40px_-18px_rgb(42_24_40/0.35)]"
            >
              <ul>
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="flex min-h-11 items-center rounded-xl px-4 font-medium text-plum-800 transition-colors hover:bg-magenta-50 hover:text-magenta-700">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-2 border-t border-plum-100 px-4 pt-3 text-sm text-plum-500">
                WhatsApp <a className="font-semibold text-plum-800 underline-offset-4 hover:underline" href={`https://wa.me/${brand.whatsapp.primary}`}>{brand.whatsapp.primaryDisplay}</a>
              </p>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
