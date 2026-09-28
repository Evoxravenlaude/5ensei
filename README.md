# 5ENSEI

A Nigerian fragrance house — presence before introduction.

Next.js 14 (App Router) + TypeScript + Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

## Admin panel

Visit `/admin` to manage the collection (add/edit/delete products, upload
images). Every change is committed straight to this GitHub repo's
`data/products.json` (and `public/products/` for images) via the GitHub API,
which triggers a normal Vercel redeploy — changes go live within about a
minute of saving.

**Before the admin panel will work**, see `ADMIN-SETUP.md` for the one-time
environment variable setup (a GitHub token, an admin username/password, and a
session secret) in your Vercel project.

## What's on the site

- **Home** — dark hero with the bottle and a slow vapour behind it (a 160px canvas, paused off screen, off under reduced motion), a lowercase typed line, four editorial tiles, the collection row, the label explained, the manifesto, the atelier.
- **Mega-menu** — full-width panel on hover/focus with column lists and the featured bottle; a slide-in drawer with accordions on phones.
- **Search** — overlay over products and pages, with popular searches.
- **Product page** — sticky bottle, tabs, and **Personalise your label**: a name and an optional line, typed live onto the label. The label travels into the bag and into the WhatsApp order message.
- **Bag** — one line per bottle-and-label; "Send order on WhatsApp" opens a pre-written message with every line and the subtotal (`lib/whatsapp.ts`).
- **Footer** — columns collapse into accordions on phones; newsletter with consent.

The admin panel, API routes and `data/products.json` are untouched. Products gain no new fields; the label lives only in the visitor's bag.

## Structure

- `app/` — pages (App Router)
- `components/` — shared UI: `Header` (nav, mega-menu, mobile drawer), `SearchOverlay`, `Hero` + `Vapour`, `Label` + `LabelComposer`, `ProductCard`, `ProductDetail`, `CartDrawer`, `Footer`, `Loader`
- `lib/products.ts` — typed product helpers, reads from `data/products.json`
- `lib/cart-context.tsx` — the bag; lines carry an optional label `{ name, note }`
- `lib/whatsapp.ts` — composes the wa.me order links and the label date
- `data/products.json` — the actual product data (single source of truth)
- `app/api/*` — admin auth + GitHub-commit endpoints
- `public/` — real brand assets (logo, product photography)
