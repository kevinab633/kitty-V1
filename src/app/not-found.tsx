import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-5 py-28 sm:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-magenta-700">Error 404</p>
      <h1 className="mt-4 text-5xl font-medium leading-none text-plum-950 md:text-6xl">We can’t find that page.</h1>
      <p className="mt-5 text-lg text-plum-600">It may have moved, or the product may have been removed.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/shop" className="inline-flex min-h-12 items-center rounded-full bg-magenta-600 px-7 font-semibold text-white transition-colors hover:bg-magenta-700">
          Shop the range
        </Link>
        <Link href="/" className="inline-flex min-h-12 items-center rounded-full border border-plum-300 bg-white px-7 font-semibold text-plum-900 transition-colors hover:border-magenta-300 hover:text-magenta-700">
          Back to home
        </Link>
      </div>
    </div>
  );
}
