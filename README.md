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

- Placeholder SVG artwork is intentionally used until final photography assets are supplied.
- The contact form is ready for an external endpoint via `NEXT_PUBLIC_INQUIRY_ENDPOINT`.
- Tracking IDs remain environment-driven and stay blocked until explicit consent.
