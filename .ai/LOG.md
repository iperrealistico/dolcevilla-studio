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

## 2026-04-12 — Production Inquiry Endpoint And Tracking Readiness

- Completed the next open launch-readiness item by hardening the external inquiry submission path and making the consent-gated tracking stack production-oriented instead of dev-placeholder-oriented.
- Added a tracked `.env.example` and updated `.gitignore` so the repository now carries an explicit environment contract for:
  - `NEXT_PUBLIC_INQUIRY_ENDPOINT`
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  - `NEXT_PUBLIC_GOOGLE_ADS_ID`
  - `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`
  - `NEXT_PUBLIC_META_PIXEL_ID`
- Refreshed `.ai/GIT.md` so future sessions no longer start from the stale bootstrap assumption that the repository had no published branches or no pushed history.
- Updated `README.md` to document how the public endpoint is expected to behave, how production IDs are supplied, and how inquiry success now maps to real marketing events.
- Added a new route-aware tracking client component at `components/consent/AnalyticsPageTracker.tsx` and mounted it in `app/layout.tsx` behind `Suspense` so page views fire on both initial load and App Router navigation after consent is granted.
- Adjusted the script bootstrap behavior in the analytics helpers:
  - `lib/analytics/ga.ts` now disables GA4 auto pageview dispatch (`send_page_view: false`) so page views are owned centrally by the route tracker and do not double-fire.
  - `lib/analytics/meta.ts` now initializes the Meta Pixel without immediately firing `PageView`, again leaving page-view ownership to the shared route tracker.
  - `lib/analytics/googleAds.ts` now derives an optional `send_to` destination from the Google Ads tag ID plus a new conversion label environment variable.
- Refactored `lib/analytics/tracking.ts` so the site continues to expose the same app-level event names while mapping the launch-critical ones to provider-appropriate semantics:
  - page views now call GA `page_view` plus Meta `PageView`
  - contact CTA clicks now map to GA `contact` plus Meta `Contact`
  - inquiry starts now map to GA `form_start`
  - inquiry submissions now map to GA `generate_lead`, optional Google Ads `conversion`, and Meta `Lead`
- Hardened `lib/forms/submitInquiry.ts` for real-world failures:
  - added a 10-second timeout with `AbortController`
  - set `Accept` plus `Content-Type` headers for JSON-first form services and webhook endpoints
  - disabled request caching
  - surfaced concise endpoint-provided JSON or plain-text error messages when safe
  - preserved the existing development fallback when no endpoint is configured outside production
- Added unit coverage for the new launch plumbing:
  - `tests/unit/tracking.test.ts` verifies page-view dispatch and Google Ads conversion mapping on inquiry submission
  - `tests/unit/submit-inquiry.test.ts` verifies missing-endpoint behavior, JSON error propagation, and successful submission handling
- Verification for this step:
  - `pnpm lint` passed
  - `pnpm typecheck` passed
  - `pnpm content:validate` passed
  - `pnpm test` passed with 5 test files and 10 tests
  - `pnpm build` passed with all public routes still statically generated
  - `pnpm test:e2e` passed with 2/2 Playwright tests
- Important implementation note: no live production secrets or endpoint URLs were invented or committed. The codebase is now ready to accept the real values through deployment environment configuration without further front-end refactoring.

## 2026-04-12 — Brand Repositioning Around Hybrid Film Craft

- Rebalanced the brand architecture so the site no longer reads as though Villa Raffaelli alone is the identity. The messaging now treats Villa Raffaelli as the studio’s origin while elevating hybrid film-and-digital craft to equal importance across the commercial pages.
- Expanded the shared content model in `lib/content/schemas.ts` with a new optional `craft` block for service pages. This let the sitewide brand shift stay data-driven instead of pushing raw new marketing copy into route files.
- Added new reusable presentation blocks:
  - `components/blocks/CraftIdentityBlock.tsx`
  - `components/blocks/PointsEditorialBlock.tsx`
  - `components/templates/FilmPageTemplate.tsx`
- Updated the shared site shell and content surfaces to surface the new direction:
  - `components/templates/SitePageTemplate.tsx` now renders the craft block when present
  - `components/blocks/WhyChooseUs.tsx` now frames the brand around place, craft, and clarity
  - `content/site/navigation.ts` now exposes the new `Film` route in primary navigation
  - `content/site/settings.ts`, `content/site/faqs.ts`, `content/site/testimonials.ts`, and `content/pages/journal.ts` now reflect the hybrid analog identity
- Rewrote the core page payloads so the film story is distributed across the site rather than isolated on one page:
  - `content/pages/home.ts`
  - `content/pages/about.ts`
  - `content/pages/experience.ts`
  - `content/pages/weddings.ts`
  - `content/pages/elopements.ts`
  - `content/pages/pricing.ts`
  - `content/pages/contact.ts`
- Added a new contact-form signal for analog interest:
  - `lib/forms/formSchema.ts` and `components/forms/InquiryForm.tsx` now capture `filmInterest`
  - `content/dictionaries/en.ts` was updated so the form vocabulary and navigation dictionary stay aligned
- Added the dedicated film route with substantial educational and commercial content:
  - `content/pages/film-wedding-photography.ts` introduces the base page payload plus dedicated detail sections for:
    - 10 reasons film gives something digital cannot fully replace
    - why digital is still essential
    - 35mm / 120 / large format format explanations
    - why few photographers can work this way well
    - the role of the darkroom
  - `app/(site)/film-wedding-photography/page.tsx` mounts the new page
- Extended editorial proof around the new positioning by adding three journal entries:
  - `content/journal/guides/why-we-photograph-weddings-on-film-and-digital.mdx`
  - `content/journal/guides/35mm-120-large-format-wedding-photography.mdx`
  - `content/journal/stories-of-place/inside-our-darkroom.mdx`
- Updated route wiring and page consumers so the new editorial content actually appears on the relevant pages:
  - `content/pages/index.ts`
  - `app/(site)/about/page.tsx`
  - `app/(site)/experience/page.tsx`
- Extended the temporary image manifest in `lib/images/imageManifest.ts` with two proof-sheet-style contact-sheet assets derived from the existing AI image library:
  - `filmContactSheetEditorial`
  - `filmContactSheetProofs`
- Image-generation attempt and blocker:
  - Used the `imagegen` skill workflow and wrote a 20-job batch prompt file under `tmp/imagegen/` for a new analog-focused placeholder library covering film cameras, darkroom scenes, contact sheets, behind-the-scenes craft, and hybrid camera kits.
  - The live OpenAI image batch failed immediately for every job with `billing_hard_limit_reached`, so no new analog-specific AI imagery could be generated in this session.
  - Rather than fabricate success, reused the existing temporary AI library plus the two proof-sheet derivatives copied into `public/images/brand/ai-temp/film/` so the new film page and journal entries have at least some craft-oriented visual support until billing is restored or new source assets arrive.
  - Deleted the temporary JSONL batch file after the failed run to keep the repo clean.
- Updated `README.md` and `.ai/TODO.md` so future sessions understand both the completed brand shift and the remaining image-generation blocker.
- Verification for this step:
  - `pnpm typecheck` passed
  - `pnpm lint` passed
  - `pnpm content:validate` passed with 11 structured pages, 8 landing pages, 8 journal entries, and 24 manifest images
  - `pnpm test` passed with 5 test files and 10 tests
  - `pnpm build` passed with the new `/film-wedding-photography` route and all public routes still statically generated
  - `pnpm test:e2e` passed with 2/2 Playwright tests after updating the journal heading assertion to match the new editorial copy

## 2026-04-12 — Contact-Sheet Removal, Gallery Rebuild, And Scroll Motion Pass

- Removed the preview-only contact-sheet assets from the live site after they leaked onto public surfaces. Deleted both `filmContactSheetEditorial` and `filmContactSheetProofs` from `lib/images/imageManifest.ts`, rewired the affected service pages and journal frontmatter to use normal editorial stills instead, and removed the two underlying files from `public/images/brand/ai-temp/film/`.
- Cleaned the film-oriented journal metadata after the image swap so no duplicated gallery IDs remain in:
  - `content/journal/guides/35mm-120-large-format-wedding-photography.mdx`
  - `content/journal/guides/why-we-photograph-weddings-on-film-and-digital.mdx`
  - `content/journal/stories-of-place/inside-our-darkroom.mdx`
- Rebuilt the shared gallery system to behave like a real tiled photo wall instead of the old grid-plus-carousel hybrid:
  - `components/galleries/ImageGallery.tsx` now renders a single editorial wall
  - `components/galleries/EditorialGrid.tsx` now uses a multi-column masonry layout
  - `components/galleries/ImageCard.tsx` now uses break-inside-safe cards, natural image aspect ratios, and stronger reveal / hover motion
- Added a reusable scroll-motion system to make the pages feel more cinematic while preserving `prefers-reduced-motion` support:
  - new `components/motion/ScrollParallax.tsx`
  - expanded `components/motion/FloatIn.tsx`
  - applied the new motion wrappers across the shared templates and major blocks, including heroes, editorial sections, proof grids, testimonials, process cards, and the film-specific educational sections
- Upgraded `components/galleries/HeroSequence.tsx` so hero imagery now eases between frames instead of swapping abruptly.
- Updated `README.md` and `.ai/TODO.md` so future sessions understand that the contact-sheet composites were intentionally removed and should not be reused.
- Image-generation blocker status for this step:
  - attempted to resume analog-specific AI image generation for film rolls, film cameras, POV ground-glass frames, and darkroom scenes
  - the OpenAI image API remains blocked by `billing_hard_limit_reached`
  - no new requested film-camera or darkroom image assets could be generated truthfully in this session, so the site was cleaned up and motion-polished without fabricating those missing visuals

## 2026-04-12 — Analog Image Library Generation And Sitewide Integration

- Resumed the `imagegen` workflow after the API became available again and generated a new 18-image analog-focused placeholder set specifically for the film identity work. The batch covered:
  - 35mm, 120, and 4x5 film stock still lifes
  - a Nikon F, Nikon F5, Rolleiflex 3.5, Hasselblad 500cm, black wooden 8x10 view camera, and 4x5 Smartflex/Graflex-like body
  - three Hasselblad waist-level finder / ground-glass POV scenes
  - five darkroom scenes with hanging prints, chemistry trays, enlarger equipment, shelves, and sink area
  - one broader film-camera collection still life for shared brand surfaces
- Wrote the batch outputs to `output/imagegen/film-batch/`, then copied the approved WebP files into `public/images/brand/film-generated/` for production use. The generated files are:
  - `35mm-film-roll-still-life.webp`
  - `120-film-roll-styling.webp`
  - `4x5-sheet-film-box-holder.webp`
  - `nikon-f-vintage-villa-library.webp`
  - `nikon-f5-reception-corner.webp`
  - `rolleiflex-35-bridal-prep.webp`
  - `hasselblad-500cm-window-garden.webp`
  - `8x10-view-camera-olive-grove.webp`
  - `smartflex-4x5-courtyard.webp`
  - `hasselblad-ground-glass-olive-ceremony.webp`
  - `hasselblad-ground-glass-bridal-window.webp`
  - `hasselblad-ground-glass-reception.webp`

## 2026-04-12 — Bespoke Desktop Cursor Experience

- Added a new lightweight branded cursor system instead of pulling in a third-party cursor package. The implementation lives in `components/cursor/StudioCursor.tsx` and is mounted globally from `app/providers.tsx`.
- Chose a bespoke implementation because the site already has the motion primitives it needs, and a custom cursor is sensitive to bundle size, event-listener churn, and accessibility. A small local component gives more control than a generic library over:
  - inertia tuning
  - ring-to-dot click behavior
  - fine-pointer-only activation
  - reduced-motion fallback
- Built the cursor as a single fixed overlay with one `requestAnimationFrame` loop and direct CSS variable updates for position, avoiding React re-renders on pointer movement.
- The new cursor behavior includes:
  - hidden native cursor for fine-pointer desktop sessions only
  - an idle hollow ring with a soft pulse
  - a larger interactive state over links, buttons, summaries, and form controls
  - a satisfying click response that collapses the ring into a solid dot with a quick burst animation
  - eased follow motion so the cursor carries slight inertia instead of snapping rigidly to the pointer
- Added `lib/cursor/getCursorMode.ts` so interactive-target detection stays centralized and testable rather than being buried inside the component.
- Added unit coverage in `tests/unit/cursor-mode.test.ts` for nested links, label/form interactions, and non-interactive surfaces.
- Updated `app/globals.css` with the custom-cursor shell, pulse keyframes, interactive/pressed variants, and a fine-pointer media-query guard so touch devices keep the native browser behavior.

## 2026-04-12 — Consent Simplification And Inline Privacy Popup

- Simplified the branded consent doorway so the first-contact experience is lighter and faster to parse. The left side now keeps only the `Welcome` label plus the core studio statement, while the right side focuses on:
  - `Allow the full studio experience`
  - `Continue with essential only`
  - `Choose manually`
  - `Read privacy details`
- Removed the extra explanatory copy blocks, feature cards, inset image, and the bottom EU-notice paragraph from `components/consent/ConsentActions.tsx`, per the new UX direction.
- Restyled the accept-all button to use a much lighter editorial cream treatment with dark text so it visually leads the choice set without hiding or weakening refusal.
- Replaced the old `/privacy` page flow with an inline privacy popup layered inside the consent system:
  - added structured popup copy in `content/site/privacy.ts`
  - extended the consent context/provider with panel-state support (`choices` vs `privacy`)
  - wired the footer `Privacy` control to open the same popup from anywhere on the site
  - converted `Read privacy details` from a link into an inline popup trigger
- Deleted the standalone privacy route and its related content wiring:
  - removed `content/pages/privacy.ts`
  - removed `app/(site)/privacy/page.tsx`
  - removed privacy page exports from `content/pages/index.ts`
  - removed `/privacy` from `lib/seo/sitemap.ts`
- Refined the doorway dismissal animation so accepting or closing now feels more cinematic:
  - doorway overlay fades and softens
  - consent card zooms out while fading and blurring
  - background site content fades back in and sharpens underneath
- Updated `tests/e2e/site.spec.ts` so browser coverage matches the current consent copy and now checks that privacy details open as an in-place popup without navigating away.
  - `darkroom-hanging-prints-red-light.webp`
  - `darkroom-chemistry-trays-hands.webp`
  - `darkroom-enlarger-workbench.webp`
  - `darkroom-film-shelves-tools.webp`
  - `darkroom-sink-prints-portrait.webp`
  - `film-camera-collection-studio-table.webp`
- Extended `lib/images/imageManifest.ts` with typed entries for the entire new analog library, including alt text, dimensions, and tone metadata so the content model can reference the images normally.
- Reworked the key film-related page payloads to actually use the new images rather than simply storing them:
  - `content/pages/home.ts` now introduces the analog-craft imagery directly on the home hero rotation and home gallery
  - `content/pages/about.ts` now uses film tools, rolls, and darkroom images to support the studio’s process story
  - `content/pages/experience.ts` now uses ground-glass and hybrid-coverage imagery to show how the workflow feels in practice
  - `content/pages/film-wedding-photography.ts` now uses a much larger camera / format / darkroom gallery instead of generic couple-only imagery
- Updated the supporting journal entries so the new imagery propagates into story cards and editorial proof surfaces:
  - `content/journal/guides/35mm-120-large-format-wedding-photography.mdx`
  - `content/journal/guides/why-we-photograph-weddings-on-film-and-digital.mdx`
  - `content/journal/stories-of-place/inside-our-darkroom.mdx`
- Deleted the temporary batch JSONL file after the run so `tmp/imagegen/` stays clean and the repo only keeps the final public assets.
