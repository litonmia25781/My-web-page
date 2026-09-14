# Md Riyad Hasan Liton — Professional Electrician

A Bengali-first React and Vite portfolio website for residential, commercial, and industrial electrical services.

## Local development

```bash
pnpm install
pnpm dev
```

The development server runs at `http://localhost:5173`.

## Production build

```bash
pnpm build
pnpm preview
```

## Configuration

### Firebase Configuration

The site always keeps the existing trusted testimonials available locally. Firebase enables approved live testimonials, public review submissions, and optional archival of contact messages. Copy `.env.example` to `.env.local` and add the Firebase Web App values:

```bash
cp .env.example .env.local
```

The same `VITE_FIREBASE_*` variables must be added to the Vercel project under **Settings → Environment Variables** for the production build. If they are missing, the contact form still sends through the server-side Resend endpoint; only Firebase archival and review submission are unavailable.

New reviews are written with `status: "pending"` and are never rendered publicly until an operator changes the record to `status: "approved"`. The current client has no moderation credentials; approval should be performed through the Firebase Console or a future authenticated moderation tool. A non-deployed proposal and test checklist are in `firebase/database.rules.proposed.json` and `firebase/testimonials-rules-checklist.md`.

### Resend Email Integration

The contact form sends emails using the Resend API via a server-side Vercel function. The following environment variables are required:

- `RESEND_API_KEY`: Your Resend API key.
- `RESEND_CONTACT_EMAIL`: The email address where contact-form messages should be received.
- `RESEND_FROM_EMAIL`: A verified sender email configured in Resend.

These variables should be added to Vercel under **Settings → Environment Variables**. Do **not** use the `VITE_` prefix for these secrets, as they are used only on the server side.

After changing environment variables in Vercel, redeploy the production branch. Vercel injects `VITE_*` values at build time, so changing them does not repair an already-built deployment until a new deployment is created.

## Vercel deployment

Import the repository into Vercel with the following settings:

- **Framework preset:** Vite
- **Build command:** `pnpm build`
- **Output directory:** `dist`
- **Install command:** `pnpm install --frozen-lockfile`

`vercel.json` enables clean URLs and immutable caching for built assets. The application is a single-page site, so the root route is the primary entry point.

## Performance and accessibility improvements

The production pass removes the artificial one-second loading gate, converts large local images to optimized WebP assets, lazy-loads gallery media, adds image dimensions to reduce layout shift, adds Bengali SEO and social metadata, and converts the primary hero calls-to-action into real telephone and contact links. Firebase failures now degrade gracefully to static testimonials instead of preventing the page from rendering.
