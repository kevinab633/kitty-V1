import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { categories, getCategory, products, type CategoryId, type Product } from "@/lib/catalog";
import { pluralise } from "@/lib/format";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse every Kitty Karma herbal blend, combo, pop and oil.",
};

type SortId = "featured" | "price-asc" | "price-desc" | "name";
const sorts: { id: SortId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "name", label: "Name A–Z" },
];

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

function filterProducts(list: Product[], category: CategoryId | undefined, sort: SortId, q: string) {
  let out = category ? list.filter((p) => p.category === category) : list;
  if (q) {
    const needle = q.toLowerCase();
    out = out.filter((p) => `${p.name} ${p.summary} ${p.contents.join(" ")}`.toLowerCase().includes(needle));
  }
  const sorted = [...out];
  switch (sort) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "name":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }
  return sorted;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const categoryParam = first(sp.category);
  const category = categoryParam && getCategory(categoryParam) ? (categoryParam as CategoryId) : undefined;
  const sortParam = first(sp.sort);
  const sort: SortId = sorts.some((s) => s.id === sortParam) ? (sortParam as SortId) : "featured";
  const q = (first(sp.q) ?? "").trim().slice(0, 80);

  const list = filterProducts(products, category, sort, q);
  const activeCategory = category ? getCategory(category) : undefined;

  const buildHref = (next: Partial<{ category: string; sort: string; q: string }>) => {
    const params = new URLSearchParams();
    const merged = { category: category ?? "", sort: sort === "featured" ? "" : sort, q, ...next };
    for (const [k, v] of Object.entries(merged)) if (v) params.set(k, v);
    const s = params.toString();
    return s ? `/shop?${s}` : "/shop";
  };

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-8 md:pt-16">
      <nav aria-label="Breadcrumb" className="text-sm text-plum-500">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-plum-900 hover:underline">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-plum-900">{activeCategory?.name ?? "Shop"}</li>
        </ol>
      </nav>

      <header className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-5xl font-medium leading-none text-plum-950 md:text-6xl">
            {activeCategory?.name ?? "The full range"}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-plum-600">
            {activeCategory?.blurb ?? "Every Kitty Karma product in one place. Filter by category or search by name."}
          </p>
        </div>
        <p className="tabular text-sm text-plum-500" aria-live="polite">
          {pluralise(list.length, "product")}
        </p>
      </header>

      <div className="mt-10 flex flex-col gap-5 border-y border-plum-100 py-5">
        <ul className="-mx-1 flex flex-wrap gap-2" aria-label="Categories">
          <li>
            <FilterChip href={buildHref({ category: "" })} active={!category}>All</FilterChip>
          </li>
          {categories
            .filter((c) => c.id !== "kits")
            .map((c) => (
              <li key={c.id}>
                <FilterChip href={buildHref({ category: c.id })} active={category === c.id}>
                  {c.name}
                </FilterChip>
              </li>
            ))}
        </ul>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <form action="/shop" method="get" role="search" className="flex w-full max-w-md items-center gap-2">
            {category && <input type="hidden" name="category" value={category} />}
            {sort !== "featured" && <input type="hidden" name="sort" value={sort} />}
            <label htmlFor="shop-search" className="sr-only">
              Search products
            </label>
            <input
              id="shop-search"
              name="q"
              type="search"
              defaultValue={q}
              placeholder="Search e.g. Qarma, pops…"
              autoComplete="off"
              spellCheck={false}
              className="min-h-11 w-full rounded-full border border-plum-200 bg-white px-5 text-[0.97rem] text-plum-950 placeholder:text-plum-400 transition-colors duration-200 focus:border-magenta-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta-300"
            />
            <button
              type="submit"
              className="min-h-11 shrink-0 rounded-full bg-plum-950 px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-magenta-700"
            >
              Search
            </button>
          </form>

          <nav aria-label="Sort products" className="flex flex-wrap gap-2">
            {sorts.map((s) => (
              <Link
                key={s.id}
                href={buildHref({ sort: s.id === "featured" ? "" : s.id })}
                aria-current={sort === s.id ? "true" : undefined}
                className={`inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium transition-colors duration-200 ${
                  sort === s.id ? "bg-magenta-50 text-magenta-800 ring-1 ring-magenta-200" : "text-plum-600 hover:text-plum-950"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {list.length > 0 ? (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-16 rounded-[1.5rem] border border-dashed border-plum-200 bg-white p-12 text-center">
          <h2 className="text-2xl font-semibold text-plum-950">No products match “{q}”</h2>
          <p className="mx-auto mt-3 max-w-md text-plum-600">Try a shorter search, or browse all products.</p>
          <Link href="/shop" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-magenta-600 px-6 font-semibold text-white hover:bg-magenta-700">
            Clear filters
          </Link>
        </div>
      )}
    </div>
  );
}

function FilterChip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={`inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-semibold transition-colors duration-200 ${
        active
          ? "border-plum-950 bg-plum-950 text-white"
          : "border-plum-200 bg-white text-plum-800 hover:border-magenta-300 hover:text-magenta-700"
      }`}
    >
      {children}
    </Link>
  );
}
