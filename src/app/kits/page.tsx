import type { Metadata } from "next";
import Link from "next/link";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { kits } from "@/lib/catalog";
import { formatGHS, pluralise } from "@/lib/format";

export const metadata: Metadata = {
  title: "Kits & Bundles",
  description: "Ready-made Kitty Karma kits and bundles, with contents exactly as listed on the brand's bundle sheet.",
};

export default function KitsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-8 md:pt-16">
      <nav aria-label="Breadcrumb" className="text-sm text-plum-500">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-plum-900 hover:underline">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-plum-900">Kits &amp; Bundles</li>
        </ol>
      </nav>

      <header className="mt-6 max-w-3xl">
        <h1 className="text-5xl font-medium leading-none text-plum-950 md:text-6xl">Kits &amp; bundles</h1>
        <p className="mt-5 text-lg leading-relaxed text-plum-600">
          Pre-packed bundles with the items listed together, so you order once. {pluralise(kits.length, "kit")} in total.
          Each kit lists exactly what is included.
        </p>
      </header>

      <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {kits.map((k) => (
          <li key={k.slug} className="flex flex-col rounded-[1.5rem] border border-plum-100 bg-white p-7 transition-[border-color,box-shadow] duration-300 hover:border-magenta-200 hover:shadow-[0_24px_48px_-32px_rgb(110_20_68/0.4)]">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-semibold leading-tight text-plum-950">{k.name}</h2>
              <p className="tabular shrink-0 text-xl font-bold text-magenta-700">{formatGHS(k.price)}</p>
            </div>
            <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-plum-500">Includes</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {k.contents.map((c) => (
                <li key={c} className="rounded-full bg-plum-50 px-3 py-1.5 text-sm text-plum-800">
                  {c}
                </li>
              ))}
            </ul>
            <AddToCartButton id={k.slug} name={k.name} className="mt-auto w-full" />
          </li>
        ))}
      </ul>

      <p className="mt-12 max-w-2xl rounded-2xl bg-cream p-5 text-sm leading-relaxed text-plum-700">
        Kit contents are as listed on the brand’s bundle sheet. Products and kits are herbal and personal-care items, not medicine.
        For a health concern, please speak with a qualified health professional.
      </p>
    </div>
  );
}
