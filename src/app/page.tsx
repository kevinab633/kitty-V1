import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ProductArt } from "@/components/product-art";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { brand } from "@/lib/brand";
import { categories, getKit, getProduct, kits, products } from "@/lib/catalog";
import { formatGHS, pluralise } from "@/lib/format";

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const kitPreview = ["finish-him-kit", "uti-kit", "after-birth-kit"]
    .map((s) => getKit(s))
    .filter((k): k is NonNullable<typeof k> => Boolean(k));
  const heroQarma = getProduct("qarma-herbal")!;
  const heroCombo = getProduct("qarma-herbal-candy-drizzle-pops")!;
  const heroDrops = getProduct("oops-neem-oil")!;
  const shopCategories = categories.filter((c) => c.id !== "kits");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_80%_20%,rgb(248_166_210/0.55),transparent_70%),radial-gradient(50%_50%_at_10%_90%,rgb(191_155_191/0.35),transparent_70%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h1 className="mt-6 text-[clamp(2.6rem,6vw,4.9rem)] font-medium leading-[1.02] text-plum-950">
              Herbal care,{" "}
              <em className="font-medium italic text-magenta-600">delivered</em> to your door.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-plum-700">
              The full Kitty Karma range: signature herbal blends, combos, pops, oil and ready-made kits. Order on the site, pay on MoMo, and get it delivered.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex min-h-13 items-center gap-2 rounded-full bg-magenta-600 px-7 text-base font-semibold text-white shadow-[0_18px_30px_-16px_rgb(212_42_126/0.8)] transition-[background-color,transform] duration-200 ease-out hover:bg-magenta-700 active:scale-[0.98]"
              >
                Shop the range
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <Link
                href="/kits"
                className="inline-flex min-h-13 items-center rounded-full border border-plum-300 bg-white px-7 text-base font-semibold text-plum-900 transition-colors duration-200 hover:border-magenta-400 hover:text-magenta-700"
              >
                Kits &amp; bundles
              </Link>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-plum-200/70 pt-6">
              <div>
                <dt className="text-sm text-plum-600">Accra delivery</dt>
                <dd className="tabular mt-1 text-2xl font-semibold text-plum-950">2 days</dd>
              </div>
              <div>
                <dt className="text-sm text-plum-600">Outside Accra</dt>
                <dd className="tabular mt-1 text-2xl font-semibold text-plum-950">4 days</dd>
              </div>
              <div>
                <dt className="text-sm text-plum-600">Products</dt>
                <dd className="tabular mt-1 text-2xl font-semibold text-plum-950">{pluralise(products.length, "item")}</dd>
              </div>
            </dl>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden rounded-[2rem] bg-gradient-to-br from-magenta-600 via-magenta-700 to-plum-900 shadow-[0_40px_80px_-40px_rgb(110_20_68/0.6)]">
              <div aria-hidden="true" className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-magenta-400/40 blur-3xl" />
              <div aria-hidden="true" className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-plum-700/70 blur-3xl" />

              <div className="absolute left-[8%] top-[18%] w-[52%] rotate-[-6deg] drop-shadow-[0_30px_30px_rgb(20_6_22/0.45)] transition-transform duration-700 ease-out hover:rotate-[-4deg]">
                <ProductArt product={heroQarma} bare className="w-full" />
              </div>
              <div className="absolute right-[6%] top-[34%] w-[46%] rotate-[7deg] drop-shadow-[0_30px_30px_rgb(20_6_22/0.45)]">
                <ProductArt product={heroCombo} bare className="w-full" />
              </div>
              <div className="absolute bottom-[10%] left-[18%] w-[28%] drop-shadow-[0_24px_24px_rgb(20_6_22/0.4)]">
                <ProductArt product={heroDrops} bare className="w-full" />
              </div>
            </div>

            <div className="absolute -bottom-5 -left-4 rounded-2xl bg-white p-4 pr-6 shadow-[0_22px_40px_-22px_rgb(42_24_40/0.45)] sm:-left-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-magenta-700">Pay on MoMo</p>
              <p className="tabular mt-1 text-lg font-bold text-plum-950">{brand.momo.number}</p>
              <p className="text-sm text-plum-600">{brand.momo.accountName}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section aria-labelledby="categories-heading" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 id="categories-heading" className="text-4xl font-medium leading-tight text-plum-950 md:text-5xl">
              Shop by category
            </h2>
            <p className="mt-3 max-w-xl text-lg text-plum-600">Start with the blend you know, or browse everything in one place.</p>
          </div>
          <Link href="/shop" className="inline-flex min-h-11 items-center gap-1 self-start text-base font-semibold text-magenta-700 underline-offset-4 hover:underline md:self-auto">
            View all products
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shopCategories.map((c) => {
            const count = products.filter((p) => p.category === c.id).length;
            return (
              <li key={c.id}>
                <Link
                  href={`/shop?category=${c.id}`}
                  className="group flex h-full min-h-44 flex-col justify-between rounded-[1.5rem] border border-plum-100 bg-white p-7 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-magenta-200 hover:shadow-[0_24px_48px_-30px_rgb(110_20_68/0.4)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-semibold text-plum-950">{c.name}</h3>
                    <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-magenta-50 text-magenta-700 transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
                  </div>
                  <div className="mt-8 flex items-end justify-between gap-4">
                    <p className="max-w-xs text-[0.97rem] leading-relaxed text-plum-600">{c.blurb}</p>
                    <p className="tabular shrink-0 text-sm font-semibold text-plum-500">{pluralise(count, "item")}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Featured */}
      <section aria-labelledby="featured-heading" className="bg-cream/70 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 id="featured-heading" className="text-4xl font-medium leading-tight text-plum-950 md:text-5xl">
                Customer favourites
              </h2>
              <p className="mt-3 text-lg text-plum-600">The blends and combos people reorder most.</p>
            </div>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kits */}
      <section aria-labelledby="kits-heading" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 id="kits-heading" className="text-4xl font-medium leading-tight text-plum-950 md:text-5xl">
              Kits &amp; bundles
            </h2>
            <p className="mt-3 max-w-xl text-lg text-plum-600">
              Pre-packed bundles with everything in one order. {kits.length} kits in total.
            </p>
          </div>
          <Link href="/kits" className="inline-flex min-h-11 items-center gap-1 self-start text-base font-semibold text-magenta-700 underline-offset-4 hover:underline md:self-auto">
            Browse all kits <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {kitPreview.map((k) => (
            <li key={k.slug} className="flex flex-col rounded-[1.5rem] bg-plum-950 p-7 text-white">
              <p className="tabular text-sm font-semibold text-magenta-300">{formatGHS(k.price)}</p>
              <h3 className="mt-3 text-2xl font-semibold">{k.name}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {k.contents.map((c) => (
                  <li key={c} className="rounded-full bg-white/10 px-3 py-1 text-sm text-plum-100">{c}</li>
                ))}
              </ul>
              <AddToCartButton id={k.slug} name={k.name} variant="light" className="mt-auto w-full" />
            </li>
          ))}
        </ul>
      </section>

      {/* How to order */}
      <section aria-labelledby="how-heading" className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
        <div className="grid gap-12 rounded-[2rem] border border-plum-100 bg-white p-8 md:p-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="how-heading" className="text-4xl font-medium leading-tight text-plum-950">
              How ordering works
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-plum-600">
              Payment comes first, then delivery. Orders are processed on the next business day.
            </p>
            <Link href="/how-to-order" className="mt-6 inline-flex min-h-11 items-center font-semibold text-magenta-700 underline-offset-4 hover:underline">
              Full ordering guide
            </Link>
          </div>
          <ol className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            {[
              ["Add to cart", "Pick your products or kits and check the total."],
              ["Pay on MoMo", `Send payment to ${brand.momo.number} (${brand.momo.accountName}). Include charges.`],
              ["Send your receipt", "Message us on WhatsApp with the screenshot, transaction ID and your name."],
              ["Get it delivered", "Accra in 2 days, outside Accra in 4 days."],
            ].map(([title, body], i) => (
              <li key={title} className="flex gap-5 rounded-2xl bg-paper p-6">
                <span aria-hidden="true" className="tabular flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-magenta-600 text-lg font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-plum-950">{title}</h3>
                  <p className="mt-1 text-[0.97rem] leading-relaxed text-plum-600">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-magenta-600 px-8 py-14 text-white md:px-14">
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-magenta-400/50 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="max-w-xl text-4xl font-medium leading-tight md:text-5xl">Questions before you order?</h2>
              <p className="mt-3 max-w-lg text-lg text-white/85">
                Message the team on WhatsApp and we will help you choose.
              </p>
            </div>
            <a
              href={`https://wa.me/${brand.whatsapp.primary}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-13 items-center rounded-full bg-white px-7 text-base font-semibold text-magenta-800 transition-[transform,background-color] duration-200 ease-out hover:bg-magenta-50 active:scale-[0.98]"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
