/**
 * Kitty Karma catalogue.
 *
 * Source of truth: the brand's price list and bundles & kits poster.
 * Prices are in Ghana cedis (GH₵). Edit this file to change products.
 */

export type CategoryId = "herbs" | "combos" | "candy" | "pops" | "oils" | "men" | "kits";

export type Category = {
  id: CategoryId;
  name: string;
  blurb: string;
};

export const categories: Category[] = [
  { id: "herbs", name: "Herbal Blends", blurb: "Single herbal blends in signature pouches." },
  { id: "combos", name: "Combos", blurb: "Herbs paired with candy and pops in one order." },
  { id: "candy", name: "Candy", blurb: "Kitty Candy, the brand's signature candy." },
  { id: "pops", name: "Pops", blurb: "Drizzle and boric acid pops, sold by the pot." },
  { id: "oils", name: "Oils", blurb: "Neem oil in a dropper bottle." },
  { id: "men", name: "Men’s", blurb: "Blends made for men." },
  { id: "kits", name: "Kits & Bundles", blurb: "Pre-packed bundles from the kits poster." },
];

export type ArtKind = "pouch" | "pouch-dark" | "tub" | "dropper" | "kit";

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: CategoryId;
  /** Short line shown on cards. Kept factual; no medical claims. */
  summary: string;
  /** What is in the pack, from the brand's own listing. */
  contents: string[];
  art: ArtKind;
  /** Accent used by the stand-in artwork. */
  accent: "magenta" | "violet" | "ink" | "mint" | "rose";
  featured?: boolean;
  size?: string;
};

export const products: Product[] = [
  {
    slug: "qarma-herbal",
    name: "Qarma Herbal",
    price: 180,
    category: "herbs",
    summary: "The signature Qarma Herbal blend in a resealable pouch.",
    contents: ["1 × Qarma Herbal pouch"],
    art: "pouch",
    accent: "magenta",
    featured: true,
  },
  {
    slug: "intense-infection-herbs",
    name: "Intense Infection Herbs",
    price: 350,
    category: "herbs",
    summary: "A stronger herbal blend from the Intense range.",
    contents: ["1 × Intense Infection Herbs pouch"],
    art: "pouch",
    accent: "violet",
    featured: true,
  },
  {
    slug: "tightening-herbs",
    name: "Tightening Herbs",
    price: 280,
    category: "herbs",
    summary: "Tightening herbal blend in a pink pouch.",
    contents: ["1 × Tightening Herbs pouch"],
    art: "pouch",
    accent: "rose",
  },
  {
    slug: "after-birth",
    name: "After Birth",
    price: 200,
    category: "herbs",
    summary: "Herbal blend from the After Birth range.",
    contents: ["1 × After Birth pouch"],
    art: "pouch",
    accent: "mint",
  },
  {
    slug: "hercules-male-herbs",
    name: "Hercules Male Herbs",
    price: 350,
    category: "men",
    summary: "Herbal blend for men, in a black and white pouch.",
    contents: ["1 × Hercules Male Herbs pouch"],
    art: "pouch-dark",
    accent: "ink",
  },
  {
    slug: "qarma-herbal-and-candy",
    name: "Qarma Herbal & Candy",
    price: 300,
    category: "combos",
    summary: "Qarma Herbal paired with Kitty Candy.",
    contents: ["1 × Qarma Herbal pouch", "1 × Kitty Candy pouch"],
    art: "pouch",
    accent: "magenta",
  },
  {
    slug: "qarma-herbal-candy-drizzle-pops",
    name: "Qarma Herbal, Candy & Drizzle Pops",
    price: 420,
    category: "combos",
    summary: "The full combo: Qarma Herbal, Kitty Candy and Drizzle Pops.",
    contents: ["1 × Qarma Herbal pouch", "1 × Kitty Candy pouch", "1 × Drizzle Pops (10 pops)"],
    art: "kit",
    accent: "magenta",
    featured: true,
  },
  {
    slug: "kitty-candy",
    name: "Kitty Candy",
    price: 150,
    category: "candy",
    summary: "Kitty Candy in a dark pouch.",
    contents: ["1 × Kitty Candy pouch"],
    art: "pouch-dark",
    accent: "ink",
  },
  {
    slug: "drizzle-pops",
    name: "Drizzle Pops",
    price: 120,
    category: "pops",
    summary: "Drizzle Pops, 10 pops per tub.",
    contents: ["10 pops"],
    art: "tub",
    accent: "rose",
    size: "10 pops",
  },
  {
    slug: "boric-acid-pops",
    name: "Boric Acid Pops",
    price: 100,
    category: "pops",
    summary: "Boric Acid Pops, 15 pops per tub.",
    contents: ["15 pops"],
    art: "tub",
    accent: "mint",
    size: "15 pops",
  },
  {
    slug: "oops-neem-oil",
    name: "Oops! Neem Oil",
    price: 150,
    category: "oils",
    summary: "Neem oil in an amber dropper bottle.",
    contents: ["1 × Oops! Neem Oil dropper bottle"],
    art: "dropper",
    accent: "mint",
    featured: true,
  },
];

export type Kit = {
  slug: string;
  name: string;
  price: number;
  /** Contents exactly as listed on the bundles poster. */
  contents: string[];
};

export const kits: Kit[] = [
  {
    slug: "finish-him-kit",
    name: "Finish Him Kit",
    price: 420,
    contents: ["Qarma Herbal", "Candy", "Drizzle Pops"],
  },
  {
    slug: "uti-kit",
    name: "UTI Kit",
    price: 700,
    contents: ["2 × Qarma Herbal", "Probiotics", "Boric Pops"],
  },
  {
    slug: "pcos-kit",
    name: "PCOS Kit",
    price: 600,
    contents: ["2 × Qarma Herbal", "Probiotics"],
  },
  {
    slug: "after-birth-kit",
    name: "After Birth Kit",
    price: 450,
    contents: ["After Birth Herbs", "Steam Bowl", "Portable Bidet"],
  },
  {
    slug: "ovarian-cyst-fibroid-kit",
    name: "Ovarian Cyst / Fibroid Kit",
    price: 360,
    contents: ["2 × Qarma Herbal"],
  },
  {
    slug: "yeast-infection-kit",
    name: "Yeast Infection / Candidiasis Kit",
    price: 650,
    contents: ["2 × Qarma Herbal", "Boric Pops", "Vagisil pH Balance"],
  },
  {
    slug: "bv-odor-control-kit",
    name: "BV / Odor Control Kit",
    price: 650,
    contents: ["2 × Qarma Herbal", "Boric Pops", "Vagisil Odor Block"],
  },
  {
    slug: "after-intimacy-kit",
    name: "After Intimacy Kit",
    price: 480,
    contents: ["Qarma Herbal", "Boric Pops", "Vagisil pH Balance"],
  },
  {
    slug: "no-infection-maintenance-kit",
    name: "No Infection, Maintenance Kit",
    price: 480,
    contents: ["Qarma Herbal", "Boric Pops", "Vagisil Odor Block"],
  },
  {
    slug: "mild-genital-warts-kit",
    name: "Mild Genital Warts Kit",
    price: 530,
    contents: ["Intense Herbs", "Qarma Herbal"],
  },
  {
    slug: "severe-genital-warts-kit",
    name: "Severe Genital Warts Kit",
    price: 880,
    contents: ["2 × Intense Herbs", "Qarma Herbal"],
  },
  {
    slug: "sti-pid-kit",
    name: "STI / PID Kit",
    price: 880,
    contents: ["2 × Intense Herbs", "Qarma Herbal"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getKit(slug: string) {
  return kits.find((k) => k.slug === slug);
}

export function getCategory(id: string) {
  return categories.find((c) => c.id === id);
}

export function findItem(id: string): { kind: "product" | "kit"; name: string; price: number; slug: string } | undefined {
  const p = getProduct(id);
  if (p) return { kind: "product", name: p.name, price: p.price, slug: p.slug };
  const k = getKit(id);
  if (k) return { kind: "kit", name: k.name, price: k.price, slug: k.slug };
  return undefined;
}
