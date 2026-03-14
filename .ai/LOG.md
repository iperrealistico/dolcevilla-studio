# Project Log

## 2026-03-14 — Kickoff And Foundation Build

- Reviewed `.ai/TECHNICAL_DESIGN_DOC.md` and `.ai/MASTER_WEBSITE_BRIEF.md` to align the implementation with the brand world, conversion goals, content architecture, consent model, and route map.
- Established a five-phase working plan covering foundation, core commercial pages, search landing pages, editorial proof pages, and ads/launch readiness.
- Confirmed the repository already points at `https://github.com/iperrealistico/dolcevilla-studio.git` and appears to be an empty remote waiting for its first commit.
- Bootstrapped a new Next.js App Router application with TypeScript, Tailwind CSS, ESLint, Prettier, Vitest, Playwright, and the core runtime dependencies for content validation, MDX, forms, motion, and SEO helpers.
- Added project memory files so future chats can recover context directly from the codebase rather than relying on chat history.
- Began replacing the starter scaffold with the Dolcevilla-specific architecture: route groups, typed content, reusable blocks, consent system, analytics gates, and static content loaders.

## Implementation Notes

- Placeholder atmospheric SVG artwork is being used as stand-in media until final photography assets are supplied.
- The inquiry form is scaffolded for an external endpoint and can simulate success in development when the endpoint is not configured.
- Manual device QA remains a launch blocker and is intentionally still open in `.ai/TODO.md`.

## 2026-03-14 — Verification Pass

- `pnpm typecheck` passed.
- `pnpm content:validate` passed with 10 structured pages, 8 search landing pages, 5 journal entries, and 12 image manifest entries.
- `pnpm build` passed and generated a fully static public route set plus SSG journal detail pages.
- `pnpm lint` passed after excluding generated artifact folders.
- `pnpm test` passed with 3 unit test files and 5 assertions.
- `pnpm test:coverage` passed and generated a baseline coverage report.
- `pnpm test:e2e` passed with 2 Playwright browser tests.
- A manual Playwright CLI smoke flow also confirmed the consent doorway, home page, and journal navigation in a headed browser session.

## 2026-03-14 — Manual QA Pass And Visual Polish Fixes

- Ran a focused manual QA sweep against the live local app in Chrome plus Playwright-driven desktop/mobile contexts, covering reduced motion behavior, hero viewport fit, mobile drawer presentation, sticky mobile CTA behavior, scroll-snap gallery handling, keyboard focus treatment, and slow-image-load readability.
- Captured verification artifacts in `output/playwright/`, including desktop and mobile home screenshots, mobile menu states, keyboard-focus screenshots, and a delayed-image-loading pass.
- Identified a primary CTA contrast regression where `LinkButton` instances rendered dark text on dark fills outside light text containers. Fixed this by moving button foreground/background tokens into explicit variant style maps in `components/ui/Button.tsx` and `components/ui/LinkButton.tsx`, while preserving hover styling in utility classes.
- Identified a typography regression where `font-[var(--font-display)]` compiled as a font-weight utility instead of a font-family utility under Tailwind v4. Introduced a stable `.font-display-face` utility in `app/globals.css` and replaced the affected heading, card, testimonial, navigation, footer, and hero usages across the site shell and page templates.
- Improved keyboard accessibility and reduced-motion handling by adding a global `:focus-visible` outline treatment and a `prefers-reduced-motion` override that disables smooth scrolling and compresses animation/transition duration for motion-sensitive users.
- Tightened mobile gallery behavior by adding touch-friendly `scroll-padding-inline`, `overscroll-behavior-x`, and `-webkit-overflow-scrolling` rules to the shared scroll-snap utility.
- Cleaned up the mobile navigation state by hiding the sticky mobile inquiry bar while the bottom-sheet menu is open, preventing layered call-to-action clutter beneath the navigation overlay.
- Re-verified the QA fixes with fresh Playwright checks: the desktop hero CTA and mobile sticky CTA now both render light text on dark backgrounds, reduced motion keeps the hero image stable over time, delayed image requests still leave the hero heading readable, `pnpm typecheck` passed, `pnpm lint` passed, `pnpm content:validate` passed, and `pnpm build` passed.
- Left the separate launch note `Complete real-device manual QA before the first production deployment.` intentionally open in `.ai/TODO.md` as the remaining production hardening reminder beyond this implementation step.
