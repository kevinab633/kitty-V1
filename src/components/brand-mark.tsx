import Link from "next/link";
import { brand } from "@/lib/brand";

/**
 * Links to the home page and shows the official Kitty Karma logo.
 *
 * The logo file is not in the repo yet: add the extracted artwork at
 * public/brand/logo.svg (or .png, then update LOGO_SRC). Nothing here redraws it.
 */
export const LOGO_SRC = "/brand/logo.svg";

export function BrandMark({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  const logo = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={LOGO_SRC} alt={brand.name} className="block h-10 w-auto" />
  );

  return (
    <Link
      href="/"
      aria-label={`${brand.name} home`}
      className={`inline-flex items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta-600 ${className}`}
    >
      {onDark ? <span className="inline-flex rounded-xl bg-white px-4 py-2.5">{logo}</span> : logo}
    </Link>
  );
}
