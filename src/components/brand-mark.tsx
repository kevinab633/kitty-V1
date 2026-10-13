import Link from "next/link";
import { brand } from "@/lib/brand";

/**
 * Wordmark stand-in. Replace the text with the extracted logo SVG
 * (public/brand/logo.svg) once the original artwork is available.
 */
export function BrandMark({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${brand.name} home`}
      className={`group inline-flex items-baseline rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta-600 ${className}`}
    >
      <span
        className={`font-script text-[2.1rem] leading-none tracking-normal transition-colors duration-200 ${
          onDark ? "text-white" : "text-magenta-600 group-hover:text-plum-900"
        }`}
      >
        {brand.name}
      </span>
    </Link>
  );
}
