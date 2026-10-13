"use client";

import { useSyncExternalStore } from "react";
import { findItem } from "./catalog";

export type CartLine = { id: string; qty: number };

const STORAGE_KEY = "kitty-karma-cart-v1";
const MAX_QTY = 20;
const EMPTY: CartLine[] = [];

let lines: CartLine[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function read(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed
      .filter((l): l is CartLine => typeof l?.id === "string" && Number.isInteger(l?.qty))
      .filter((l) => findItem(l.id) !== undefined)
      .map((l) => ({ id: l.id, qty: Math.min(Math.max(l.qty, 1), MAX_QTY) }));
  } catch {
    return EMPTY;
  }
}

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  lines = read();
}

function write(next: CartLine[]) {
  lines = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be full or blocked (private mode). The cart still works for this visit.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  ensureHydrated();
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      lines = read();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => {
  ensureHydrated();
  return lines;
};
const getServerSnapshot = () => EMPTY;

export function addToCart(id: string, qty = 1) {
  ensureHydrated();
  const existing = lines.find((l) => l.id === id);
  if (existing) {
    write(lines.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + qty, MAX_QTY) } : l)));
  } else {
    write([...lines, { id, qty: Math.min(qty, MAX_QTY) }]);
  }
}

export function setQty(id: string, qty: number) {
  ensureHydrated();
  if (qty <= 0) return removeFromCart(id);
  write(lines.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, MAX_QTY) } : l)));
}

export function removeFromCart(id: string) {
  ensureHydrated();
  write(lines.filter((l) => l.id !== id));
}

export function clearCart() {
  write(EMPTY);
}

export function useCartLines() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function cartTotals(cart: CartLine[]) {
  let count = 0;
  let subtotal = 0;
  for (const line of cart) {
    const item = findItem(line.id);
    if (!item) continue;
    count += line.qty;
    subtotal += item.price * line.qty;
  }
  return { count, subtotal };
}
