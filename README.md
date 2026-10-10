# NutriVé storefront redesign

This is a standalone Next.js storefront styled to follow the supplied NutriVé visual reference: black and deep-brown backgrounds, dramatic warm-gold lighting, elegant serif type, ingredient photography, and understated gold details.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Replace the files in the test repository with the contents of this project. Keep `package.json` and the `app/` and `public/` folders at the repository root.
2. In Vercel → Project Settings → Build and Deployment, keep the framework preset as **Next.js** and leave **Root Directory** empty (or `./`).
3. Commit the files to GitHub. Vercel should automatically build the new commit.
4. Open the latest deployment and choose **Visit** to preview it.

This is a separate test project. Do not attach your main NutriVé domain until you are happy with the preview.

## Important

- The three product prices (₹399 each) are placeholders and can be changed in `app/page.tsx`.
- Cart quantity changes work in the browser. Checkout is intentionally a demo and does not collect payment or create real orders.
- Product/ingredient visuals are local assets in `public/`, so they do not depend on external image hosts.
