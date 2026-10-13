import { brand } from "./brand";
import { findItem } from "./catalog";
import type { CartLine } from "./cart-store";
import { formatGHS } from "./format";

export type OrderDetails = {
  name: string;
  phone: string;
  area: "accra" | "outside";
  location: string;
  notes: string;
};

export function makeOrderRef(date = new Date()) {
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `KK-${yy}${mm}${dd}-${rand}`;
}

/** Builds the message the brand's team expects: what was ordered, who, where. */
export function buildOrderMessage(ref: string, cart: CartLine[], details: OrderDetails, subtotal: number) {
  const lines = cart
    .map((l) => {
      const item = findItem(l.id);
      if (!item) return null;
      return `• ${l.qty} × ${item.name} — ${formatGHS(item.price * l.qty)}`;
    })
    .filter(Boolean);

  const areaLine =
    details.area === "accra" ? "Accra (2-day delivery window)" : "Outside Accra (4-day delivery window)";

  return [
    `Hello Kitty Karma, I'd like to place an order.`,
    ``,
    `Order ref: ${ref}`,
    ``,
    `Items:`,
    ...lines,
    ``,
    `Total: ${formatGHS(subtotal)} (plus MoMo charges)`,
    ``,
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    `Delivery: ${areaLine}`,
    `Location: ${details.location}`,
    details.notes ? `Notes: ${details.notes}` : null,
    ``,
    `I will pay to MTN MoMo ${brand.momo.number} (${brand.momo.accountName}) and send the screenshot with the transaction ID.`,
  ]
    .filter((l): l is string => l !== null)
    .join("\n");
}

export function whatsappLink(message: string) {
  return `https://wa.me/${brand.whatsapp.primary}?text=${encodeURIComponent(message)}`;
}
