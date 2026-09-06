# 5ensei

A working prototype for **5ensei**, a fragrance studio organized by sense
(smell, touch, sound) instead of by gender or occasion. Built with Next.js 14
(App Router), TypeScript, and Tailwind CSS. No backend — product data lives
in `lib/products.ts` and the cart persists to `localStorage` on the client.

Inspired by the structure of niche-fragrance e-commerce (mega-menu
navigation, size/format variants, label personalization, a slide-out cart)
but with entirely original branding, product names, copy, and hand-drawn SVG
vessel illustrations in place of photography.

## What's actually interactive

- **Mega menu** — hover any sense in the header to see that collection's
  products plus a featured item.
- **Product pages** — pick a size, add an optional personalization line,
  and add to bag.
- **Cart drawer** — slides in on add, persists across reloads, quantity
  stepper, remove line, running subtotal. "Checkout" is intentionally a stub
  (this is a prototype, no payment processor is wired up).
- **Collections** — `/collections/smell`, `/collections/touch`,
  `/collections/sound`.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy

### Push to GitHub

```bash
git init
git add .
git commit -m "Initial 5ensei prototype"
git branch -M main
git remote add origin https://github.com/<your-username>/5ensei.git
git push -u origin main
```

(If you unzip this project fresh, the steps above are all you need — a
git repo is not pre-initialized in the zip so you get a clean history.)

### Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo
   you just pushed.
2. Framework preset: **Next.js** (auto-detected, no config needed).
3. Click **Deploy**. No environment variables are required for this
   prototype.

Every subsequent push to `main` will auto-deploy.

## Project structure

```
app/
  layout.tsx            root layout, fonts, cart provider
  page.tsx               homepage
  collections/[slug]/    collection listing (smell / touch / sound)
  products/[slug]/       product detail page
  about/                 manifesto, FAQ, shipping, contact
components/
  Header.tsx, MegaMenu.tsx, CartDrawer.tsx, Footer.tsx,
  ProductCard.tsx, ProductDetail.tsx, VesselArt.tsx (SVG illustrations)
lib/
  products.ts             product data + types
  cart-context.tsx        cart state (React context + localStorage)
```

## Extending this prototype

- Swap `lib/products.ts` for a real CMS or database query.
- Wire the "Checkout" button in `CartDrawer.tsx` to a real payment
  provider (Stripe Checkout is the least code for a Next.js/Vercel stack).
- Replace `VesselArt.tsx` with real product photography once you have it —
  the component API (`format`, `tint`, `code`) can stay the same.
