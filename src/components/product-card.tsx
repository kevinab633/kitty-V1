import Link from "next/link";
import { ProductArt } from "./product-art";
import { AddToCartButton } from "./add-to-cart-button";
import { formatGHS } from "@/lib/format";
import { getCategory, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-plum-100 bg-white transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-magenta-200 hover:shadow-[0_24px_48px_-28px_rgb(110_20_68/0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <Link
        href={`/products/${product.slug}`}
        className="relative block bg-cream focus-visible:outline-offset-[-3px]"
        aria-label={`View ${product.name}`}
      >
        <ProductArt product={product} className="aspect-[5/6] w-full transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none" />
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-plum-950 px-3 py-1 text-xs font-semibold text-white">
            Popular
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {category && <p className="text-xs font-semibold uppercase tracking-[0.12em] text-magenta-700">{category.name}</p>}
            <h3 className="mt-1 text-xl font-semibold leading-tight text-plum-950">
              <Link href={`/products/${product.slug}`} className="rounded hover:text-magenta-700">
                {product.name}
              </Link>
            </h3>
          </div>
          <p className="tabular shrink-0 pt-1 text-lg font-bold text-plum-950">{formatGHS(product.price)}</p>
        </div>
        <p className="text-[0.95rem] leading-relaxed text-plum-600">{product.summary}</p>
        <div className="mt-auto pt-2">
          <AddToCartButton id={product.slug} name={product.name} className="w-full" />
        </div>
      </div>
    </article>
  );
}
