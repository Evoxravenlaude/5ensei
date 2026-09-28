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

- **Home** — the Soren film as the hero (portrait, 31 s: cream, marshmallow, musk, the bottle), with a caption that follows the chapter and a small chapter timeline you can click; a sound toggle on desktop. Then four editorial tiles, **Soren in three notes** (each note loops its chapter of the film), the collection row, the label explained, the manifesto, the atelier.
- **Mega-menu** — full-width panel on hover/focus with column lists and the featured bottle; a slide-in drawer with accordions on phones.
- **Search** — overlay over products and pages, with popular searches.
- **Product page** — sticky bottle, notes line, tabs, the three-notes player, and **Personalise your label**: a name and an optional line, typed live onto the label. The label travels into the bag and into the WhatsApp order message.
- **Bag** — one line per bottle-and-label; "Send order on WhatsApp" opens a pre-written message with every line and the subtotal (`lib/whatsapp.ts`).
- **Footer** — columns collapse into accordions on phones; newsletter with consent.

Products have one new optional field, `notes` (a list, editable in the admin panel). The label lives only in the visitor's bag.

### The film
`public/soren-film.mp4` (720px, with sound, 4.3 MB) and `soren-film-480.mp4` (muted, 1.8 MB, served to phones and low-power devices). Both have the CapCut mark cropped off. Chapter times live in `lib/film.ts`; videos load and play only while on screen and stop under reduced motion.

## Wide screens

The root font size is fluid (`globals.css`: 16px on laptops, ~19px at 1920, 21px on wide monitors) and every text size is in rem, so type and spacing grow with the screen. The site column (`max-w-7xl`, redefined in `tailwind.config.ts`) runs 1280px on laptops up to 1720px on wide monitors. From 1280px up, the hero gains a third column: the label, the three notes, price, and Add to bag.

## Structure

- `app/` — pages (App Router)
- `components/` — shared UI: `Header` (nav, mega-menu, mobile drawer), `SearchOverlay`, `Hero` (the film) + `NotesFilm`, `Label` + `LabelComposer`, `ProductCard`, `ProductDetail`, `CartDrawer`, `Footer`, `Loader`
- `lib/products.ts` — typed product helpers, reads from `data/products.json`
- `lib/cart-context.tsx` — the bag; lines carry an optional label `{ name, note }`
- `lib/whatsapp.ts` — composes the wa.me order links and the label date
- `data/products.json` — the actual product data (single source of truth)
- `app/api/*` — admin auth + GitHub-commit endpoints
- `public/` — real brand assets (logo, product photography)
