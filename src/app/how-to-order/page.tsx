import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "How to Order",
  description: "How to pay with MTN MoMo, send your receipt, and get Kitty Karma delivered across Ghana.",
};

const steps = [
  {
    title: "Choose your products",
    body: "Add blends, combos, pops, oil or kits to your cart. The total is shown before you check out.",
  },
  {
    title: "Pay on MTN MoMo",
    body: `Send payment to ${brand.momo.number}, account name ${brand.momo.accountName}. ${brand.momo.reminder}`,
  },
  {
    title: "Send your receipt",
    body: "Send a screenshot of the payment with the transaction ID visible, your account name, what you ordered, and your name, location and number for delivery.",
  },
  {
    title: "We process and deliver",
    body: "Orders are processed the next business day. Same-day orders are not processed on the day they are placed.",
  },
];

export default function HowToOrderPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-8 md:pt-16">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-magenta-700">Ordering guide</p>
        <h1 className="mt-3 text-5xl font-medium leading-none text-plum-950 md:text-6xl">How to order</h1>
        <p className="mt-5 text-lg leading-relaxed text-plum-600">
          Four steps from cart to doorstep. Payment comes before delivery.
        </p>
      </header>

      <ol className="mt-14 grid gap-5 md:grid-cols-2">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-5 rounded-[1.5rem] border border-plum-100 bg-white p-7">
            <span aria-hidden="true" className="tabular flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-magenta-600 text-xl font-bold text-white">
              {i + 1}
            </span>
            <div>
              <h2 className="text-2xl font-semibold text-plum-950">{s.title}</h2>
              <p className="mt-2 text-[1.02rem] leading-relaxed text-plum-600">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <section id="delivery" aria-labelledby="delivery-heading" className="mt-20 grid gap-10 rounded-[2rem] bg-plum-950 p-8 text-white md:p-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="delivery-heading" className="text-4xl font-medium leading-tight">Delivery times</h2>
          <p className="mt-4 text-lg leading-relaxed text-plum-200">
            Times run from the day your order is processed.
          </p>
        </div>
        <dl className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-magenta-300">Within Accra</dt>
            <dd className="tabular mt-2 text-4xl font-medium">2 days</dd>
            <dd className="mt-2 text-plum-200">2-day delivery window.</dd>
          </div>
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-magenta-300">Outside Accra</dt>
            <dd className="tabular mt-2 text-4xl font-medium">4 days</dd>
            <dd className="mt-2 text-plum-200">4-day delivery window.</dd>
          </div>
          <p className="text-sm leading-relaxed text-plum-300 sm:col-span-2">
            We do not process same-day orders. All orders received are processed the next business day.
          </p>
        </dl>
      </section>

      <section aria-labelledby="faq-heading" className="mt-20 max-w-3xl">
        <h2 id="faq-heading" className="text-4xl font-medium text-plum-950">Questions</h2>
        <div className="mt-8 divide-y divide-plum-100 border-y border-plum-100">
          {[
            ["Do you take card payments?", `Payments are made by ${brand.momo.network} to ${brand.momo.number}. Please include the MoMo charges when you pay.`],
            ["What do I send after paying?", "A screenshot of the payment with the transaction ID visible, your account name, what you ordered, and your name, location and phone number."],
            ["What is the delivery fee?", "No delivery fee is listed on our price sheet. Ask us on WhatsApp before you pay."],
          ].map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-plum-950 [&::-webkit-details-marker]:hidden">
                {q}
                <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-magenta-50 text-magenta-700 transition-transform duration-300 ease-out group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-plum-600">{a}</p>
            </details>
          ))}
        </div>
        <p className="mt-10 text-plum-700">
          Still stuck? <Link href="/contact" className="font-semibold text-magenta-700 underline-offset-4 hover:underline">Contact the team</Link>.
        </p>
      </section>
    </div>
  );
}
