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

## 2026-04-12 — Temporary AI Photography Replacement

- The next open note item (`Replace placeholder SVG imagery with final optimized photography exports.`) was still blocked by the absence of supplied real photo assets in the repository. To improve the live visual quality without falsely closing that note, generated a temporary 10-image editorial set via the OpenAI Image API instead of waiting for final exports.
- Used the `imagegen` skill workflow and the bundled CLI to batch-generate ten photorealistic wedding/editorial scenes aligned to the Dolcevilla brand world: villa exteriors, intimate couple portraits, reception atmosphere, Upper Tuscany landscapes, and journal/story horizontals.
- Wrote generation outputs as compressed WebP assets into `output/imagegen/`, then copied the integrated set into `public/images/brand/ai-temp/`. The final temporary public folder weighs about 2.3 MB total across ten images.
- Replaced the old SVG stand-ins in `lib/images/imageManifest.ts` with the new AI-generated WebP paths, updated the referenced image dimensions to match the generated files, and refreshed a few alt descriptions so they accurately describe the new content.
- Reused the 10 generated images across the existing 12 manifest slots where the site architecture already expected repeated editorial imagery (`journalCover` / `storyFrame`, `homePortraits` / `studioInterior`) rather than introducing unnecessary content-model churn.
- Updated `README.md` so the repo now documents that temporary AI-generated WebP imagery is in use, while still making clear that final photography exports are the real target.
- Verification: `pnpm content:validate` passed, `pnpm typecheck` passed, `pnpm lint` passed, and `pnpm build` passed after the asset swap. A browser-based sanity check also confirmed the new imagery is rendering on the home hero and secondary content surfaces.
- Intentionally kept the `.ai/TODO.md` note for final photography exports unchecked, because these AI images are temporary placeholders and should still be replaced by real optimized photography before launch.

## 2026-04-12 — AI Editorial Library Expansion And Sitewide Image Remap

- Expanded the temporary media library with 10 additional AI-generated WebP images via the bundled OpenAI Image CLI, using a structured batch prompt set targeted at the actual content gaps in the site: Florence architecture, Siena portraiture, Chianti hospitality, Val d'Orcia vows, olive-garden ceremony coverage, bridal preparation, Villa Raffaelli interiors, Versilia coastline, candlelit toasts, and welcome-dinner atmosphere.
- Generated the new assets into `output/imagegen/new/`, visually reviewed the resulting contact sheet, then copied the approved WebPs into `public/images/brand/ai-temp/` so the production-facing asset tree remains static and portable.
- Added 10 new typed entries to `lib/images/imageManifest.ts` with dimensions, alt text, and dominant-tone metadata:
  - `florenceLoggiaBlueHour`
  - `sienaCourtyardPortrait`
  - `chiantiVineyardDinner`
  - `valDorciaCypressVows`
  - `oliveGardenCeremony`
  - `bridalPrepWindowSilk`
  - `villaLibraryPortrait`
  - `versiliaSeasideWalk`
  - `candlelitCourtyardToast`
  - `welcomeDinnerLanterns`
- Rebalanced image usage across the highest-visibility content sources instead of only appending new files:
  - updated the core service pages in `content/pages/home.ts`, `weddings.ts`, `elopements.ts`, and `about.ts`
  - updated all major SEO landing pages in `content/landings/`
  - updated all ads landing payloads in `content/ads/`
  - updated journal frontmatter in `content/journal/` so story cards and article templates stop reusing the same generic `journalCover`
- The remap materially reduced old-image repetition. After the change, legacy placeholder-heavy IDs like `homeReceptionNight`, `homeUpperTuscany`, `homePortraits`, `journalCover`, and `storyFrame` dropped sharply or to zero usage in content, while the new imagery now carries the differentiation load across pages and journal cards.
- Updated `README.md` so repository context now reflects the expanded temporary AI image library rather than the earlier 10-image state.
- Updated `.ai/TODO.md` to mark the media step complete against the newly executed scope: replacing the old placeholder system with a larger optimized editorial image library and reducing repeated image usage across the site.
- Verification:
  - `pnpm content:validate` passed with 22 manifest images
  - `pnpm typecheck` passed
  - `pnpm lint` passed
  - `pnpm build` passed with all public routes still statically generated
  - `pnpm test:e2e` initially failed because Playwright's Chromium binary was missing from the local cache; installed it with `pnpm exec playwright install chromium`, then reran the suite successfully with 2/2 tests passing
