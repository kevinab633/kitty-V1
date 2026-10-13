import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout-view";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-8 md:pt-16">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-5xl font-medium leading-none text-plum-950 md:text-6xl">Checkout</h1>
        <p className="mt-4 text-lg text-plum-600">Tell us where to deliver. Payment goes to MTN MoMo, then the order is confirmed on WhatsApp.</p>
      </header>
      <CheckoutView />
    </div>
  );
}
