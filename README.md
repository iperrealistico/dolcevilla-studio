# Dolcevilla Studio

Static-first Next.js marketing site for a premium Tuscany wedding photography brand rooted at Villa Raffaelli.

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

- An expanded temporary AI-generated WebP editorial library is now in place as a visual stand-in, with 20 optimized images reducing repetition across core pages, landing pages, ads pages, and journal entries until final photography exports are supplied.
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
