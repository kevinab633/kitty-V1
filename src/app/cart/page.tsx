import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-8 md:pt-16">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-5xl font-medium leading-none text-plum-950 md:text-6xl">Your cart</h1>
        <p className="mt-4 text-lg text-plum-600">Check your items, then continue to checkout.</p>
      </header>
      <CartView />
    </div>
  );
}
