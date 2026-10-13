"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { brand } from "@/lib/brand";
import { cartTotals, clearCart, useCartLines } from "@/lib/cart-store";
import { findItem } from "@/lib/catalog";
import { formatGHS } from "@/lib/format";
import { buildOrderMessage, makeOrderRef, whatsappLink, type OrderDetails } from "@/lib/order";

type Errors = Partial<Record<keyof OrderDetails, string>>;

const PHONE_RE = /^(?:\+?233|0)\d{9}$/;

function validate(d: OrderDetails): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = "Enter the name for delivery.";
  const phone = d.phone.replace(/[\s-]/g, "");
  if (!PHONE_RE.test(phone)) e.phone = "Enter a Ghana number, like 0244 123 456.";
  if (d.location.trim().length < 5) e.location = "Add an area or landmark so we can find you, e.g. East Legon, near the Shell station.";
  return e;
}

export function CheckoutView() {
  const lines = useCartLines();
  const { count, subtotal } = cartTotals(lines);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<{ ref: string; message: string } | null>(null);
  const [copied, setCopied] = useState<"message" | "momo" | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(null), 1600);
    return () => window.clearTimeout(t);
  }, [copied]);

  async function copy(text: string, which: "message" | "momo") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
    } catch {
      setCopied(null);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const details: OrderDetails = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      area: fd.get("area") === "outside" ? "outside" : "accra",
      location: String(fd.get("location") ?? ""),
      notes: String(fd.get("notes") ?? "").slice(0, 400),
    };
    const found = validate(details);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
      return;
    }
    const ref = makeOrderRef();
    const message = buildOrderMessage(ref, lines, details, subtotal);
    setSubmitted({ ref, message });
  }

  if (count === 0 && !submitted) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-plum-200 bg-white px-8 py-16 text-center">
        <h2 className="text-3xl font-medium text-plum-950">Nothing to check out yet</h2>
        <p className="mx-auto mt-3 max-w-md text-lg text-plum-600">Add some products to your cart first.</p>
        <Link href="/shop" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-magenta-600 px-7 font-semibold text-white hover:bg-magenta-700">
          Shop the range
        </Link>
      </div>
    );
  }

  if (submitted) {
    const link = whatsappLink(submitted.message);
    return (
      <div className="grid gap-10 lg:grid-cols-12">
        <section aria-labelledby="done-heading" className="rounded-[1.75rem] bg-white p-8 md:p-10 lg:col-span-7">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mint-brand">Order ready</p>
          <h2 id="done-heading" className="mt-3 text-4xl font-medium leading-tight text-plum-950">
            Send your order on WhatsApp
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-plum-600">
            Your order reference is <span className="tabular font-semibold text-plum-950">{submitted.ref}</span>. Your order is not confirmed until payment is made and the receipt is sent.
          </p>

          <ol className="mt-8 space-y-5">
            <li className="flex gap-4">
              <span aria-hidden="true" className="tabular flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-magenta-600 font-bold text-white">1</span>
              <div>
                <p className="font-semibold text-plum-950">Send the order message</p>
                <p className="text-plum-600">Opens WhatsApp with your order filled in.</p>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-12 items-center rounded-full bg-mint-brand px-6 font-semibold text-white transition-[transform,background-color] duration-200 ease-out hover:brightness-110 active:scale-[0.98]"
                >
                  Open WhatsApp
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <span aria-hidden="true" className="tabular flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-magenta-600 font-bold text-white">2</span>
              <div className="min-w-0">
                <p className="font-semibold text-plum-950">Pay on {brand.momo.network}</p>
                <p className="text-plum-600">
                  Send <span className="tabular font-semibold text-plum-950">{formatGHS(subtotal)}</span> to{" "}
                  <span className="tabular font-semibold text-plum-950">{brand.momo.number}</span>, account name{" "}
                  <span className="font-semibold text-plum-950">{brand.momo.accountName}</span>. {brand.momo.reminder}
                </p>
                <button
                  type="button"
                  onClick={() => copy(brand.momo.number, "momo")}
                  className="mt-3 inline-flex min-h-11 items-center rounded-full border border-plum-200 bg-white px-5 text-sm font-semibold text-plum-900 transition-colors hover:border-magenta-300 hover:text-magenta-700"
                >
                  {copied === "momo" ? "Number copied" : "Copy MoMo number"}
                </button>
              </div>
            </li>
            <li className="flex gap-4">
              <span aria-hidden="true" className="tabular flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-magenta-600 font-bold text-white">3</span>
              <div>
                <p className="font-semibold text-plum-950">Send your receipt</p>
                <p className="text-plum-600">
                  Send the payment screenshot with the transaction ID visible, your account name, and what you ordered.
                </p>
              </div>
            </li>
          </ol>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-plum-100 pt-8">
            <button
              type="button"
              onClick={() => copy(submitted.message, "message")}
              className="inline-flex min-h-11 items-center rounded-full border border-plum-200 px-5 text-sm font-semibold text-plum-900 transition-colors hover:border-magenta-300 hover:text-magenta-700"
            >
              {copied === "message" ? "Order copied" : "Copy order message"}
            </button>
            <button
              type="button"
              onClick={() => {
                clearCart();
                setSubmitted(null);
              }}
              className="inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold text-plum-600 underline-offset-4 hover:text-magenta-700 hover:underline"
            >
              Clear cart and start again
            </button>
          </div>
        </section>

        <aside className="lg:col-span-5" aria-label="Order message preview">
          <div className="rounded-[1.75rem] bg-plum-950 p-7 text-plum-50">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-magenta-300">Message preview</p>
            <pre className="mt-4 max-h-[26rem] overflow-auto whitespace-pre-wrap break-words font-sans text-[0.93rem] leading-relaxed text-plum-100">
              {submitted.message}
            </pre>
          </div>
        </aside>
      </div>
    );
  }

  const fieldClass = (hasError: boolean) =>
    `min-h-12 w-full rounded-xl border bg-white px-4 text-[1rem] text-plum-950 placeholder:text-plum-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta-300 ${
      hasError ? "border-magenta-600" : "border-plum-200 focus:border-magenta-400"
    }`;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-8 lg:col-span-7" aria-describedby={`${uid}-intro`}>
        <p id={`${uid}-intro`} className="text-plum-600">
          Enter your delivery details. Send the order on WhatsApp to confirm it with the team.
        </p>

        <fieldset className="space-y-5">
          <legend className="mb-4 text-xl font-semibold text-plum-950">Your details</legend>

          <div>
            <label htmlFor={`${uid}-name`} className="block text-sm font-semibold text-plum-800">Full name</label>
            <input
              id={`${uid}-name`}
              name="name"
              autoComplete="name"
              placeholder="e.g. Ama Mensah…"
              className={`${fieldClass(!!errors.name)} mt-2`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            />
            {errors.name && <p id={`${uid}-name-err`} className="mt-2 text-sm text-magenta-700">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor={`${uid}-phone`} className="block text-sm font-semibold text-plum-800">Phone number</label>
            <input
              id={`${uid}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="e.g. 0244 123 456…"
              className={`${fieldClass(!!errors.phone)} mt-2 tabular`}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? `${uid}-phone-err` : `${uid}-phone-help`}
            />
            {errors.phone ? (
              <p id={`${uid}-phone-err`} className="mt-2 text-sm text-magenta-700">{errors.phone}</p>
            ) : (
              <p id={`${uid}-phone-help`} className="mt-2 text-sm text-plum-500">We use this number to confirm your order on WhatsApp.</p>
            )}
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="mb-2 text-xl font-semibold text-plum-950">Where should we deliver?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { v: "accra", title: "Within Accra", sub: "2-day delivery window" },
              { v: "outside", title: "Outside Accra", sub: "4-day delivery window" },
            ].map((opt, i) => (
              <label
                key={opt.v}
                className="group flex cursor-pointer items-start gap-3 rounded-2xl border border-plum-200 bg-white p-5 transition-[border-color,box-shadow] duration-200 has-[:checked]:border-magenta-500 has-[:checked]:shadow-[0_0_0_3px_rgb(212_42_126/0.12)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-magenta-300"
              >
                <input type="radio" name="area" value={opt.v} defaultChecked={i === 0} className="mt-1 h-4 w-4 accent-magenta-600" />
                <span>
                  <span className="block font-semibold text-plum-950">{opt.title}</span>
                  <span className="block text-sm text-plum-600">{opt.sub}</span>
                </span>
              </label>
            ))}
          </div>

          <div>
            <label htmlFor={`${uid}-location`} className="block text-sm font-semibold text-plum-800">Delivery location</label>
            <input
              id={`${uid}-location`}
              name="location"
              autoComplete="street-address"
              placeholder="e.g. East Legon, near the Shell station…"
              className={`${fieldClass(!!errors.location)} mt-2`}
              aria-invalid={!!errors.location}
              aria-describedby={errors.location ? `${uid}-loc-err` : undefined}
            />
            {errors.location && <p id={`${uid}-loc-err`} className="mt-2 text-sm text-magenta-700">{errors.location}</p>}
          </div>

          <div>
            <label htmlFor={`${uid}-notes`} className="block text-sm font-semibold text-plum-800">
              Notes <span className="font-normal text-plum-500">(optional)</span>
            </label>
            <textarea
              id={`${uid}-notes`}
              name="notes"
              rows={3}
              maxLength={400}
              placeholder="Preferred delivery time, gate code…"
              className={`${fieldClass(false)} mt-2 min-h-24 py-3`}
            />
          </div>
        </fieldset>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            className="inline-flex min-h-13 items-center justify-center rounded-full bg-magenta-600 px-8 text-base font-semibold text-white transition-[background-color,transform] duration-200 ease-out hover:bg-magenta-700 active:scale-[0.98]"
          >
            Place order on WhatsApp
          </button>
          <Link href="/cart" className="inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-semibold text-plum-700 underline-offset-4 hover:underline">
            Back to cart
          </Link>
        </div>
      </form>

      <aside aria-labelledby="order-summary" className="lg:col-span-5">
        <div className="sticky top-28 rounded-[1.75rem] border border-plum-100 bg-white p-7">
          <h2 id="order-summary" className="text-2xl font-medium text-plum-950">Your order</h2>
          <ul className="mt-5 divide-y divide-plum-100">
            {lines.map((l) => {
              const item = findItem(l.id);
              if (!item) return null;
              return (
                <li key={l.id} className="flex items-start justify-between gap-4 py-3.5 text-[0.97rem]">
                  <span className="min-w-0 text-plum-800">
                    {item.name} <span className="tabular text-plum-500">× {l.qty}</span>
                  </span>
                  <span className="tabular shrink-0 font-semibold text-plum-950">{formatGHS(item.price * l.qty)}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex justify-between border-t border-plum-100 pt-4 text-lg">
            <span className="font-semibold text-plum-950">Subtotal</span>
            <span className="tabular font-bold text-plum-950">{formatGHS(subtotal)}</span>
          </div>
          <p className="mt-2 text-sm text-plum-500">Plus MoMo charges. Delivery fee not listed; ask us on WhatsApp.</p>

          <div className="mt-6 rounded-xl bg-cream p-4 text-sm leading-relaxed text-plum-700">
            <p className="font-semibold text-plum-900">Payment before delivery</p>
            <p className="mt-1">
              Pay {brand.momo.network} <span className="tabular font-semibold">{brand.momo.number}</span> ({brand.momo.accountName}). Orders are processed the next business day.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
