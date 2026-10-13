"use client";

import { useEffect, useState } from "react";
import { addToCart } from "@/lib/cart-store";

export function AddToCartButton({
  id,
  name,
  size = "md",
  className = "",
  quantity = 1,
  variant = "primary",
}: {
  id: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  quantity?: number;
  variant?: "primary" | "light";
}) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 1800);
    return () => window.clearTimeout(t);
  }, [added]);

  const sizes = {
    sm: "min-h-10 px-4 text-sm",
    md: "min-h-11 px-5 text-sm",
    lg: "min-h-13 px-7 text-base",
  } as const;

  return (
    <button
      type="button"
      onClick={() => {
        addToCart(id, quantity);
        setAdded(true);
      }}
      aria-label={added ? `${name} added to cart` : `Add ${name} to cart`}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,transform,color] duration-200 ease-out active:scale-[0.97] ${
        added
          ? "bg-mint-brand text-white"
          : variant === "light"
            ? "bg-white text-plum-950 hover:bg-magenta-100"
            : "bg-magenta-600 text-white hover:bg-magenta-700"
      } ${sizes[size]} ${className}`}
    >
      {added ? (
        <>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
          Added
        </>
      ) : (
        <>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add to cart
        </>
      )}
    </button>
  );
}
