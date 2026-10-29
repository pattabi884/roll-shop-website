# Roll shop marketing website

## What this is
A marketing website for a roll shop (kathi rolls / egg rolls style) with 5 outlets in Bengaluru.
The shop already has a large Instagram following. The site's job: show the vibe, the menu and
where the outlets are, and push people to Instagram (and Swiggy/Zomato once links exist).
It is an experiment: no backend, no ordering, no login. Static site only.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Fonts are self-hosted via @fontsource (do NOT switch to next/font/google)
- Deploys on Vercel with zero config. Keep `npm run build` passing.

## Where things live
- `data/site.ts`: ALL content (brand name, tagline, Instagram handle, menu, prices, outlets, order links).
  Change content here, never hard-code it in components.
- `components/`: one file per section (Header, Hero, Menu, Outlets, InstagramCta, Footer).
- `app/globals.css`: colour and font tokens (`ink`, `cream`, `saffron`, `chili`, `leaf`, `muted`).

## Content rules
- Everything in `data/site.ts` is SAMPLE data until the owner provides real details.
  `isSampleData = true` shows a "sample content" strip. Set it to false only when real data is in.
- Never invent real-looking addresses, phone numbers, reviews or follower counts and present them as real.
- Prices are in rupees (₹). Use the Indian veg/non-veg markers already in the Menu component.
- Do not use the Instagram, Swiggy or Zomato logos; plain text links are fine.

## Style
Warm, dark, street-food energy: charcoal background, saffron and chili accents, big bold display type.
Mobile first: most visitors come from Instagram on their phones. Check 390px width, no horizontal scroll.
Respect prefers-reduced-motion for any animation.

## Workflow
- Work on a new branch and open a PR. Never push straight to `main`.
- Before finishing: run `npm run build` and fix any errors.
