import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductArt } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { QuantityPicker } from "@/components/quantity-picker";
import { brand } from "@/lib/brand";
import { getCategory, getProduct, products } from "@/lib/catalog";
import { formatGHS } from "@/lib/format";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: `${product.summary} ${formatGHS(product.price)}.`,
    openGraph: { title: `${product.name} · ${brand.name}`, description: product.summary },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);
  const fallback = related.length < 3 ? products.filter((p) => p.slug !== product.slug && !related.includes(p)).slice(0, 3 - related.length) : [];
  const more = [...related, ...fallback];

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-8 md:pt-14">
      <nav aria-label="Breadcrumb" className="text-sm text-plum-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/" className="hover:text-plum-900 hover:underline">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/shop" className="hover:text-plum-900 hover:underline">Shop</Link></li>
          {category && (
            <>
              <li aria-hidden="true">/</li>
              <li><Link href={`/shop?category=${category.id}`} className="hover:text-plum-900 hover:underline">{category.name}</Link></li>
            </>
          )}
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-plum-900">{product.name}</li>
        </ol>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <div className="sticky top-28 overflow-hidden rounded-[2rem] bg-cream">
            <ProductArt product={product} className="aspect-[5/6] w-full" />
          </div>
        </div>

        <div className="flex flex-col lg:col-span-6 lg:py-4">
          {category && <p className="text-sm font-semibold uppercase tracking-[0.14em] text-magenta-700">{category.name}</p>}
          <h1 className="mt-3 text-5xl font-medium leading-[1.02] text-plum-950 md:text-6xl">{product.name}</h1>
          <p className="tabular mt-6 text-3xl font-bold text-plum-950">{formatGHS(product.price)}</p>
          <p className="mt-2 text-sm text-plum-500">Plus MoMo charges. Delivery fee not listed; ask us on WhatsApp.</p>

          <p className="mt-8 text-lg leading-relaxed text-plum-700">{product.summary}</p>

          <div className="mt-8 rounded-2xl border border-plum-100 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-plum-500">In the pack</h2>
            <ul className="mt-4 space-y-2.5">
              {product.contents.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[1.02rem] text-plum-900">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-magenta-500" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <QuantityPicker id={product.slug} name={product.name} />
          </div>

          <dl className="mt-10 grid gap-4 border-t border-plum-100 pt-8 text-[0.97rem] sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-plum-950">Payment</dt>
              <dd className="mt-1 text-plum-600">
                Pay to {brand.momo.network} <span className="tabular">{brand.momo.number}</span> ({brand.momo.accountName}) before delivery.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-plum-950">Delivery</dt>
              <dd className="mt-1 text-plum-600">
                {brand.delivery.accra} {brand.delivery.outside}
              </dd>
            </div>
          </dl>

          <p className="mt-8 rounded-xl bg-paper p-4 text-sm leading-relaxed text-plum-600">
            These are herbal and personal-care products, not medicine. For a health concern, please speak with a qualified health professional.
          </p>
        </div>
      </div>

      {more.length > 0 && (
        <section aria-labelledby="more-heading" className="mt-24">
          <h2 id="more-heading" className="text-3xl font-medium text-plum-950 md:text-4xl">
            You may also like
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
