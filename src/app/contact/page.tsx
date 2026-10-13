import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Kitty Karma on WhatsApp, Instagram or TikTok.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-8 md:pt-16">
      <header className="max-w-3xl">
        <h1 className="text-5xl font-medium leading-none text-plum-950 md:text-6xl">Contact</h1>
        <p className="mt-5 text-lg leading-relaxed text-plum-600">
          WhatsApp is the fastest way to reach us, for orders, receipts and product questions.
        </p>
      </header>

      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        <li className="flex flex-col rounded-[1.5rem] bg-plum-950 p-8 text-white md:col-span-2 md:flex-row md:items-center md:justify-between md:gap-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-magenta-300">WhatsApp</p>
            <p className="tabular mt-2 text-3xl font-medium">{brand.whatsapp.primaryDisplay}</p>
            <p className="tabular mt-1 text-plum-200">{brand.whatsapp.secondary}</p>
          </div>
          <a
            href={`https://wa.me/${brand.whatsapp.primary}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-13 items-center justify-center rounded-full bg-white px-7 text-base font-semibold text-plum-950 transition-[transform,background-color] duration-200 ease-out hover:bg-magenta-50 active:scale-[0.98] md:mt-0"
          >
            Message on WhatsApp
          </a>
        </li>

        <li className="rounded-[1.5rem] border border-plum-100 bg-white p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-magenta-700">Instagram</p>
          <p className="mt-2 text-2xl font-semibold text-plum-950">{brand.social.instagram.handle}</p>
          <a href={brand.social.instagram.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center font-semibold text-magenta-700 underline-offset-4 hover:underline">
            Open Instagram
          </a>
        </li>

        <li className="rounded-[1.5rem] border border-plum-100 bg-white p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-magenta-700">TikTok</p>
          <p className="mt-2 text-2xl font-semibold text-plum-950">{brand.social.tiktok.handle}</p>
          <a href={brand.social.tiktok.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center font-semibold text-magenta-700 underline-offset-4 hover:underline">
            Open TikTok
          </a>
        </li>
      </ul>

      <section aria-labelledby="pay-heading" className="mt-16 rounded-[1.5rem] bg-cream p-8 md:p-10">
        <h2 id="pay-heading" className="text-3xl font-medium text-plum-950">Payment</h2>
        <p className="mt-4 text-lg text-plum-700">
          {brand.momo.network}: <span className="tabular font-semibold text-plum-950">{brand.momo.number}</span>, account name{" "}
          <span className="font-semibold text-plum-950">{brand.momo.accountName}</span>. {brand.momo.reminder}
        </p>
        <p className="mt-4 text-plum-600">
          Ready to order? <Link href="/shop" className="font-semibold text-magenta-700 underline-offset-4 hover:underline">Shop the range</Link> or read the{" "}
          <Link href="/how-to-order" className="font-semibold text-magenta-700 underline-offset-4 hover:underline">ordering guide</Link>.
        </p>
      </section>
    </div>
  );
}
