# Kitty Karma · Online store

A storefront for the Kitty Karma range, built with Next.js (App Router), TypeScript and Tailwind CSS v4.

## What's in it

- **Home**: hero, shop by category, customer favourites, kits preview, how ordering works.
- **Shop** (`/shop`): filter by category, sort, and search. Filters live in the URL, so a view can be shared or bookmarked.
- **Product pages** (`/products/[slug]`): contents, quantity picker, add to cart, related items.
- **Kits & bundles** (`/kits`): all 12 kits with contents exactly as listed on the brand's bundle sheet.
- **Cart** (`/cart`): persisted in `localStorage`, with quantity controls and a summary.
- **Checkout** (`/checkout`): delivery details with inline validation. It builds an order message and opens WhatsApp, matching the brand's existing process (pay on MoMo, then send the receipt).
- **How to order** and **Contact** pages.

## Where the data lives

| What | File |
| --- | --- |
| Products, prices, categories, kits | `src/lib/catalog.ts` |
| Phone numbers, MoMo details, social handles, delivery copy | `src/lib/brand.ts` |
| Order message format | `src/lib/order.ts` |
| Colours, fonts, design tokens | `src/app/globals.css` |

Prices are taken from the Kitty Karma price list and bundles poster. Change them in `catalog.ts`.

## Brand assets still to replace

- **Logo**: the header and footer load the official logo from `public/brand/logo.svg` (path set in `src/components/brand-mark.tsx`). The file has not been added yet, because the original artwork was not available in the workspace. The logo is used as supplied and is not redrawn in code. Add the file to show it; if you supply a PNG instead, change `LOGO_SRC`.
- **Favicon**: none set yet. Add `public/brand/favicon.png` or `.svg` from the logo and register it in `src/app/layout.tsx`.
- **Product photography**: `src/components/product-art.tsx` draws simple packaging shapes in the brand colours. Swap in real photos (e.g. `public/products/<slug>.jpg`) and keep the 5:6 aspect ratio.

## Things to confirm before launch

- **Health claims.** The source material makes medical and wellness claims (for example, treating infections, STIs or genital warts, and tightening). The site deliberately does not repeat those claims. It includes a "not medicine" disclaimer. Please check the claims and the kit names with a pharmacist or health regulator before publishing them.
- **Delivery fee.** No delivery fee is listed on the brand material, so the site says to ask on WhatsApp.
- **Payments.** There is no card or MoMo API integration. Customers pay manually to MTN MoMo and confirm on WhatsApp. An automated payment provider can be added later.
- **Domain.** `metadataBase` in `src/app/layout.tsx` is a placeholder. Set it to the real domain.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

Typecheck with `npx tsc --noEmit`.
