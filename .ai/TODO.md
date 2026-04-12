# Dolcevilla Studio Master TODO

## Phase 1 — Foundation And Project Memory
- [x] Create `.ai/TODO.md` with this 5-phase checklist using strict markdown checkboxes.
- [x] Create `.ai/LOG.md` with a kickoff entry covering document review, project scope, and the 5 planned phases.
- [x] Create `.ai/GIT.md` summarizing current repo state, remote configuration, and intended workflow.
- [x] Add repo hygiene files so macOS artifacts like `.DS_Store` stay out of version control while `.ai` memory files remain intentionally tracked.
- [x] Bootstrap Next.js App Router with `pnpm`, TypeScript strict mode, Tailwind CSS, ESLint, Prettier, and portable static-friendly config.
- [x] Establish design tokens, font loading, global styles, and the editorial visual foundation for desktop, tablet, and mobile.
- [x] Define central types and zod schemas for core site content, journal content, consent state, SEO payloads, and inquiry form payloads.
- [x] Scaffold content loaders, dictionaries, image manifest utilities, metadata helpers, sitemap/robots stubs, and the core route structure.
- [x] Implement the consent architecture foundation: context, doorway shell, script gate, localStorage persistence, reduced-motion handling, and env-driven third-party integration hooks.

## Phase 2 — Core Commercial Experience
- [x] Build the global shell: header, footer, skip link, mobile bottom-sheet navigation, sticky mobile CTA, and page layout primitives.
- [x] Implement reusable presentational blocks for hero, editorial text, signature gallery, story cards, testimonials, geography, investment note, FAQ, CTA, process preview, and Villa Raffaelli identity variants.
- [x] Create typed content payloads for Home, Weddings, Elopements, Experience, Pricing, About, Contact, Thank-you, Privacy, and Legal.
- [x] Build the Home page with oversized hero typography, hard-cut image rhythm, geography, selected stories, testimonials, investment preview, and inquiry CTA.
- [x] Build the Weddings, Elopements, Experience, Pricing, About, and Contact pages with distinct block sequencing and subtle Villa Raffaelli positioning.
- [x] Implement the inquiry form with `react-hook-form` + zod, hidden attribution fields, spam mitigation, thank-you flow, and discreet Villa Raffaelli interest capture.
- [x] Add route-level metadata, canonical handling, structured data, internal links, and initial SEO coverage for all core pages.

## Phase 3 — Search Growth Pages
- [x] Create a reusable SEO landing page template that stays lighter than Home while preserving strong typography, curated imagery, testimonial, FAQ, investment note, and CTA.
- [x] Build materially distinct payloads and pages for Tuscany, Lucca, Florence, Val d’Orcia, Chianti, Siena, Tuscany Elopement, and Intimate Wedding in Tuscany.
- [x] Give each landing page a unique local angle, unique intro, unique gallery selection, unique featured story, and local FAQ cluster.
- [x] Add local-to-service and local-to-story internal linking so search pages support both SEO and conversion.
- [x] Tune hero behavior, sticky CTA behavior, and mobile gallery patterns specifically for landing-page clarity and speed.
- [x] Verify canonical tags, sitemap inclusion, and no duplicate-content patterns across all landing pages.

## Phase 4 — Editorial Proof System
- [x] Implement the MDX content pipeline for real weddings, elopements, guides, planning notes, and stories of place.
- [x] Build the Journal index with featured stories, category grouping, and a lighter visual system than service pages.
- [x] Build journal story templates with narrative gallery rhythm, short editorial text inserts, related links, CTA placement, and article metadata.
- [x] Build guide templates optimized for search intent, trust-building, and direct paths back into service pages and inquiry.
- [x] Add related-content resolution, frontmatter parsing, slug uniqueness checks, and editorial sitemap coverage.
- [x] Document the content operations workflow for adding journal entries, landings, images, and shared UI copy.

## Phase 5 — Ads, Analytics, QA, And Launch Readiness
- [x] Build simplified Google Ads and Meta Ads landing page variants with tighter messaging, reduced navigation, higher-form visibility, and `noindex`.
- [x] Finalize consent-gated GA4, Google Ads, and Meta Pixel injection plus UTM persistence across multi-page browsing.
- [x] Add unit coverage for content loaders, validation, frontmatter parsing, consent helpers, dictionary access, sitemap utilities, and attribution helpers.
- [x] Add Playwright coverage for consent gating, navigation, mobile bottom sheet, sticky CTA, inquiry form validation/submission, journal pages, landing pages, and sitemap generation.
- [x] Run manual QA for reduced motion, 100dvh hero behavior, mobile scroll-snap galleries, keyboard accessibility, slow-network image loading, and visual polish on real devices.
- [x] Finalize deployment workflow with feature-branch guidance, preview review, typecheck/lint/build/content validation gates, and launch checklist notes.

## Validation
- [x] Confirm every public page is statically generated and no CMS, database, or backend is introduced in V1.
- [x] Confirm no raw marketing copy or gallery data is hardcoded directly in route JSX.
- [x] Confirm all local content is validated at build time and all image references resolve.
- [x] Confirm no third-party analytics or ad scripts load before explicit consent.
- [x] Confirm mobile tap targets, bottom-sheet navigation, sticky CTAs, and safe-area behavior are implemented in the shared UI.
- [x] Confirm Villa Raffaelli is presented as brand origin, never as a public venue funnel.

## Notes
- [x] Replace placeholder SVG imagery with an expanded optimized web-ready editorial image library and reduce repeated image usage across the site.
- [x] Connect a live external form endpoint and production tracking IDs before launch.
- [ ] Complete real-device manual QA before the first production deployment.

## Brand Repositioning — Hybrid Film Craft
- [x] Rebalance the shared brand messaging so Villa Raffaelli remains the origin story but no longer carries the full identity alone.
- [x] Add reusable craft-first content support plus a dedicated film wedding photography page covering reasons for film, why digital is still essential, format education, uncommon skill requirements, and the darkroom.
- [x] Spread the hybrid film-and-digital story across Home, About, Experience, Weddings, Elopements, Pricing, Contact, FAQs, navigation, and journal internal linking.
- [x] Add supporting journal entries for the hybrid philosophy, film formats, and darkroom perspective.
- [x] Remove the preview-only contact-sheet composites from the public image manifest and all live page surfaces.
- [ ] Generate and integrate a fresh analog-focused AI placeholder library with film rolls, camera bodies, ground-glass POVs, and darkroom scenes once the image API billing limit is resolved.
