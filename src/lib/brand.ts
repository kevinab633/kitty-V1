/** Brand facts taken from the Kitty Karma price list and ordering card. */

export const brand = {
  name: "Kitty Karma",
  tagline: "Herbal care, delivered across Ghana.",
  currency: "GH₵",
  momo: {
    network: "MTN MoMo",
    number: "0598872496",
    accountName: "KITTY KARMA",
    reminder: "Please include charges when you pay.",
  },
  whatsapp: {
    /** International format without the plus sign, for wa.me links. */
    primary: "233598872496",
    primaryDisplay: "+233 59 887 2496",
    secondary: "+233 20 715 7127",
  },
  social: {
    instagram: { handle: "@kittykarmagh", url: "https://www.instagram.com/kittykarmagh" },
    tiktok: { handle: "@kittykarmaghana", url: "https://www.tiktok.com/@kittykarmaghana" },
  },
  delivery: {
    accra: "Orders within Accra arrive in a 2-day window.",
    outside: "Orders outside Accra arrive in a 4-day window.",
  },
} as const;
