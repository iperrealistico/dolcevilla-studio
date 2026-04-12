# Dolcevilla Studio

Static-first Next.js marketing site for a premium Tuscany wedding photography brand shaped by Upper Tuscany, Villa Raffaelli, and a hybrid film-plus-digital craft.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- Local typed content plus MDX journal entries
- Custom consent doorway with consent-gated analytics hooks

## Project Memory

The repo stores implementation memory inside `.ai/` so future chats can recover context directly from the codebase.

- `.ai/TODO.md` tracks the phased plan and current completion state.
- `.ai/LOG.md` records project progress and verification milestones.
- `.ai/GIT.md` records repo and workflow decisions.

## Scripts

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm content:validate
pnpm build
pnpm test
pnpm test:coverage
pnpm test:e2e
```

## Current Notes

- The brand system now balances place with craft, including a dedicated `/film-wedding-photography` page and supporting journal content about hybrid film coverage, formats, and the darkroom.
- An expanded temporary AI-generated editorial library is still in place as a visual stand-in until final photography exports are supplied, including an 18-image analog-focused set for film rolls, camera bodies, ground-glass POVs, and darkroom scenes in `public/images/brand/film-generated/`.
- Preview-only contact-sheet composites have been removed from all live page surfaces and from the public image manifest.
- The inquiry form posts JSON to a public external endpoint configured through `NEXT_PUBLIC_INQUIRY_ENDPOINT`, with timeout and response-error handling for production failures.
- Tracking IDs remain environment-driven, route-aware, and blocked until explicit consent.

## Environment Setup

Copy `.env.example` to a local `.env.local` and provide the production values through your deployment platform as well.

- `NEXT_PUBLIC_INQUIRY_ENDPOINT`: public POST endpoint that accepts the inquiry form JSON payload
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: GA4 measurement ID, for example `G-XXXXXXXXXX`
- `NEXT_PUBLIC_GOOGLE_ADS_ID`: Google Ads tag ID, for example `AW-XXXXXXXXXX`
- `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`: Google Ads conversion label for successful inquiry submissions
- `NEXT_PUBLIC_META_PIXEL_ID`: Meta Pixel ID

The site sends pageviews only after consent and tracks successful inquiry submissions as GA4 `generate_lead`, Google Ads `conversion` when a conversion label is present, and Meta `Lead`.
