"use client";

import Link from "next/link";
import { ProductArt } from "./product-art";
import { cartTotals, removeFromCart, setQty, useCartLines } from "@/lib/cart-store";
import { findItem, getProduct, type Product } from "@/lib/catalog";
import { formatGHS, pluralise } from "@/lib/format";
import { brand } from "@/lib/brand";

export function CartView() {
  const lines = useCartLines();
  const { count, subtotal } = cartTotals(lines);

  if (lines.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-plum-200 bg-white px-8 py-16 text-center">
        <h2 className="text-3xl font-medium text-plum-950">Your cart is empty</h2>
        <p className="mx-auto mt-3 max-w-md text-lg text-plum-600">
          Add a blend, a combo or a kit and it will show up here.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="inline-flex min-h-12 items-center rounded-full bg-magenta-600 px-7 font-semibold text-white transition-colors hover:bg-magenta-700">
            Shop the range
          </Link>
          <Link href="/kits" className="inline-flex min-h-12 items-center rounded-full border border-plum-300 bg-white px-7 font-semibold text-plum-900 transition-colors hover:border-magenta-300 hover:text-magenta-700">
            See kits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <section aria-labelledby="cart-items" className="lg:col-span-8">
        <h2 id="cart-items" className="sr-only">Items in your cart</h2>
        <p className="tabular mb-4 text-sm text-plum-500">{pluralise(count, "item")}</p>
        <ul className="divide-y divide-plum-100 rounded-[1.5rem] border border-plum-100 bg-white">
          {lines.map((line) => {
            const item = findItem(line.id);
            if (!item) return null;
            const product: Product | undefined = getProduct(line.id);
            const lineTotal = item.price * line.qty;
            return (
              <li key={line.id} className="grid grid-cols-[6rem_1fr] gap-5 p-5 sm:grid-cols-[7.5rem_1fr_auto] sm:items-center sm:p-6">
                <div className="overflow-hidden rounded-2xl bg-cream">
                  {product ? (
                    <ProductArt product={product} className="aspect-[5/6] w-full" />
                  ) : (
                    <div aria-hidden="true" className="aspect-[5/6] w-full bg-gradient-to-br from-magenta-100 to-plum-100" />
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold leading-snug text-plum-950">
                    {product ? <Link href={`/products/${product.slug}`} className="rounded hover:text-magenta-700">{item.name}</Link> : item.name}
                  </h3>
                  <p className="tabular mt-1 text-sm text-plum-500">{formatGHS(item.price)} each</p>

                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <div className="flex items-center rounded-full border border-plum-200">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => setQty(line.id, line.qty - 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-plum-800 transition-colors hover:bg-magenta-50 hover:text-magenta-700"
                      >
                        <span aria-hidden="true">−</span>
                      </button>
                      <span className="tabular min-w-8 text-center text-[0.97rem] font-semibold" aria-live="polite">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => setQty(line.id, line.qty + 1)}
                        disabled={line.qty >= 20}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-plum-800 transition-colors hover:bg-magenta-50 hover:text-magenta-700 disabled:text-plum-300"
                      >
                        <span aria-hidden="true">+</span>
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(line.id)}
                      className="inline-flex min-h-10 items-center rounded-full px-3 text-sm font-medium text-plum-600 underline-offset-4 transition-colors hover:text-magenta-700 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p className="tabular col-span-2 text-lg font-bold text-plum-950 sm:col-span-1 sm:text-right">
                  {formatGHS(lineTotal)}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <aside aria-labelledby="summary" className="lg:col-span-4">
        <div className="sticky top-28 rounded-[1.5rem] bg-plum-950 p-7 text-white">
          <h2 id="summary" className="text-2xl font-medium">Order summary</h2>
          <dl className="mt-6 space-y-3 text-[0.97rem]">
            <div className="flex justify-between gap-4">
              <dt className="text-plum-200">Subtotal</dt>
              <dd className="tabular font-semibold">{formatGHS(subtotal)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-plum-200">Delivery</dt>
              <dd className="text-right text-plum-200">Ask on WhatsApp</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-white/10 pt-4 text-lg">
              <dt className="font-semibold">Total before delivery</dt>
              <dd className="tabular font-bold">{formatGHS(subtotal)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-plum-300">Plus MoMo charges.</p>

          <Link
            href="/checkout"
            className="mt-7 inline-flex min-h-13 w-full items-center justify-center rounded-full bg-magenta-500 px-6 text-base font-semibold text-white transition-[background-color,transform] duration-200 ease-out hover:bg-magenta-400 active:scale-[0.98]"
          >
            Checkout
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-plum-300">
            Pay on {brand.momo.network} to <span className="tabular text-white">{brand.momo.number}</span>, then send your receipt on WhatsApp to confirm.
          </p>
        </div>
      </aside>
    </div>
  );
}
