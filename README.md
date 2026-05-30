# S.S. Engineers — Website

Marketing & product-showcase site for S.S. Engineers, built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. Fully data-driven: products and categories are plain data files, so adding to the catalogue never requires touching JSX.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm start        # serve the build
```

> Note: the production build fetches Google Fonts (Archivo, Public Sans, IBM Plex Mono) at build time via `next/font`. Make sure you have internet access when building.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import it at vercel.com → it auto-detects Next.js, no config needed.
3. **Storage → Create database → Postgres** (Neon-backed, free tier). Vercel auto-injects `POSTGRES_URL` and friends.
4. **Settings → Environment Variables** — add:
   - `ADMIN_PASSWORD` — your chosen admin password (used to log into `/admin`)
   - `ADMIN_COOKIE_SECRET` — a 32+ character random string (used to sign the admin session cookie)
   - `NEXT_PUBLIC_CLARITY_ID` — *optional*, your Microsoft Clarity project ID for heatmaps/recordings
5. Redeploy. Then run the database migration once:
   ```bash
   # locally, with POSTGRES_URL pointing at the Vercel-provisioned DB
   npm run db:migrate
   ```
   (or open Vercel Postgres → Query and paste the contents of `drizzle/0000_init.sql`)
6. Add your custom domain in Vercel → Settings → Domains.
7. Update `SITE_URL` in `data/company.ts` to your real domain (used for SEO + sitemap).

> **Heads-up:** the old GitHub Pages workflow (`.github/workflows/nextjs.yml`) is disabled. GitHub Pages is static-only and cannot run the analytics + admin server functions.

## Admin analytics

Visit `/admin/login` and enter the `ADMIN_PASSWORD`. You get:

- **Overview** — visitors / sessions / pageviews / clicks / submits, daily chart, top pages, top CTAs, referrers, countries, devices, browsers
- **Visitors** — every session with location, device, landing page, referrer; click into a session for full timeline (every pageview, click, scroll, form step)
- **Products** — most-viewed products and categories
- **Funnel** — `/contact` visit → form started → 2+ fields filled → submit attempt → submit success, with drop-off %
- **Settings** — CSV export (sessions and events), links to Vercel Analytics + Microsoft Clarity

Visitors see a consent banner on first load. Accept = full tracking (IP + Clarity); reject = anonymous pageviews only (IP truncated, no Clarity).

## Editing content — no code knowledge needed

Everything lives in the `data/` folder.

| To change… | Edit |
|---|---|
| Phone, email, address, hours, services, sectors, certifications, founder, hero text | `data/company.ts` |
| Product categories | `data/categories.ts` |
| Products (incl. specs, images, features) | `data/products.ts` |

### Add a new product
Append an object to the `products` array in `data/products.ts`:

```ts
{
  slug: "new-machine",                 // url-safe, unique
  name: "New Machine",
  categorySlug: "road-cleaning",       // must match a category slug
  shortDescription: "One-line summary.",
  longDescription: "Full paragraph for the detail page.",
  images: ["/images/products/new-machine.jpg"],
  specs: [
    { label: "Tank Capacity", value: "5000 L" },
    { label: "Pump Pressure", value: "150 bar" },
  ],
  features: ["Heavy-duty pump", "Stainless tank"],
  applications: ["Municipal Corporations", "Industrial Facilities"],
  status: "available",                 // or "coming-soon"
  featured: true,                      // optional — shows on homepage
}
```

### Add product images
Drop files into `public/images/products/` (name them after the product slug) and list the paths in the product's `images` array. Until an image is added, a branded "image coming soon" placeholder appears automatically. Recommended: 4:3 ratio, ~1200×900px, under ~300KB.

### Add specifications
Fill the `specs` array per product. Empty specs hide the table and show a "specifications available on request" line instead — so partial data still looks clean.

### Add a new category
Append to `categories` in `data/categories.ts` (set a unique `slug` and an `order` number). Products reference it via `categorySlug`.

## Contact form

The form posts to `app/api/contact/route.ts`, which logs the enquiry and returns success out of the box. A **"Send on WhatsApp"** button works with zero setup. To email enquiries, follow the commented Resend instructions in that file (add `RESEND_API_KEY` in Vercel env), or repoint the form fetch at Formspree/Web3Forms.

## Still to fill in
- Real product photos and specs (`data/products.ts` + `public/images/products/`)
- Logo (currently a clean "SS" wordmark in `Navbar`/`Footer`)
- MSME (Udyam) number + ISO certificate number (`data/company.ts` → `certifications`)
- Confirm the Google Maps location (`data/company.ts` → `address.mapsQuery`)
- Optional founder's message (`data/company.ts` → `founderMessage`)

## Design notes
Industrial-civic aesthetic: confident green (`brand`) + steel-slate (`ink`) with sparing hi-vis amber (`amber`) accents, blueprint-grid textures, and monospace technical labels. Theme tokens are in `tailwind.config.ts`; change the brand colours there to rebrand the whole site.

Fonts: Archivo (display), Public Sans (body), IBM Plex Mono (labels).
