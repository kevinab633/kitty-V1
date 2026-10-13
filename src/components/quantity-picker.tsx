"use client";

import { useId, useState } from "react";
import { AddToCartButton } from "./add-to-cart-button";

const MAX = 20;

export function QuantityPicker({ id, name }: { id: string; name: string }) {
  const [qty, setQty] = useState(1);
  const inputId = useId();
  const clamp = (n: number) => Math.min(Math.max(1, n), MAX);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <label htmlFor={inputId} className="text-sm font-semibold text-plum-800">
          Quantity
        </label>
        <div className="flex items-center rounded-full border border-plum-200 bg-white">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => clamp(q - 1))}
            disabled={qty <= 1}
            className="flex h-12 w-12 items-center justify-center rounded-full text-xl text-plum-800 transition-colors duration-150 hover:bg-magenta-50 hover:text-magenta-700 disabled:cursor-not-allowed disabled:text-plum-300 disabled:hover:bg-transparent"
          >
            <span aria-hidden="true">−</span>
          </button>
          <input
            id={inputId}
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX}
            value={qty}
            onChange={(e) => {
              const n = Number.parseInt(e.target.value, 10);
              if (!Number.isNaN(n)) setQty(clamp(n));
            }}
            className="tabular h-12 w-14 bg-transparent text-center text-base font-semibold text-plum-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta-300 rounded"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => clamp(q + 1))}
            disabled={qty >= MAX}
            className="flex h-12 w-12 items-center justify-center rounded-full text-xl text-plum-800 transition-colors duration-150 hover:bg-magenta-50 hover:text-magenta-700 disabled:cursor-not-allowed disabled:text-plum-300 disabled:hover:bg-transparent"
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>
      <AddToCartButton id={id} name={name} quantity={qty} size="lg" className="w-full sm:flex-1" />
    </div>
  );
}
