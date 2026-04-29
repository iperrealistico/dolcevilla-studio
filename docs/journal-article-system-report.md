# Journal Article System Report

## Purpose
This document explains two related but different systems inside the Dolcevilla Studio workspace:

1. the AI-assisted article generation and publishing workflow;
2. the runtime website architecture that renders those articles live.

It is written as both:
- a map of how this repository works today;
- a blueprint you can reuse on other content-driven sites.

## Executive Summary
The most important architectural truth is this:

- the **article generator is not a single application service inside the tracked repo**;
- the **live website is** a conventional Next.js application inside the tracked repo.

In other words:

- article generation is mostly a **documented operating procedure** executed by Codex/AI against local files, queues, staging folders, and publish gates;
- article rendering is a **TypeScript/React/Next.js runtime system** that loads local MDX, validates frontmatter, resolves image slots, compiles MDX, and renders a custom journal template.

That split is deliberate and worth copying.

## System At A Glance

### Editorial pipeline
`article-titles-raw.md` -> `article-title-queue.jsonl` -> staged MDX draft -> staged image package -> staged slot assignment -> live MDX + live slots + live image library + public assets -> validation -> git push -> Vercel deploy -> public verification

### Runtime pipeline
`content/journal/**/*.mdx` -> `gray-matter` -> Zod frontmatter validation -> image slot resolution -> MDX compile -> journal template -> statically generated article route

## 1. Article Generation System

### 1.1 What the generation system really is
The generation system is a **prompt-driven content-ops framework**, not a code microservice.

Its logic lives across:

- local-only operational docs that define the workflow;
- queue/state files that tell the AI what can be processed;
- staging folders that hold intermediate artifacts;
- tracked repo files that are promoted only after validation passes.

This gives the project a useful separation:

- unpublished work stays outside the tracked site;
- published work enters the tracked site only after gates pass;
- the live app never needs to know how the article was generated.

### 1.2 Core generation files and what each one does

#### Local control plane and run discipline
| Path | Role | Why it matters |
| --- | --- | --- |
| `START-HERE-AI.local.md` | Mandatory AI operator start file | Defines read order, logging rules, board usage, and closing protocol for every AI session. |
| `documents-local/agent-operations/01-OPERATIONS-BOARD.md` | Shared active-agent registry and task board | Tracks who is working and what operational tasks exist. |
| `documents-local/platform-dossier/00-indice-maestro.md` | Local dossier index | Points operators to deeper architecture and operational documentation. |

#### Canonical article pipeline rules
| Path | Role | Why it matters |
| --- | --- | --- |
| `documents-local/workspace-local/content-ops/AI-BLOG-ARTICLE-PIPELINE-PLAN.md` | High-level pipeline contract | Defines Journal V3, image package, word limits, stages, queue model, and publish rules. |
| `documents-local/workspace-local/content-ops/AI-BLOG-ARTICLE-SCHEMA-DECISIONS.md` | Canonical schema decisions | Freezes queue format, frontmatter contract, slot naming, CTA rules, and publish interpretation. |
| `documents-local/workspace-local/content-ops/VILLA-RAFFAELLI-SOURCE-DESCRIPTION.md` | Canonical factual/editorial source | Prevents AI from describing Villa Raffaelli inconsistently across articles. |

#### Automation instruction set
| Path | Role | Why it matters |
| --- | --- | --- |
| `documents-local/workspace-local/content-ops/codex-automation/00-SYSTEM-OVERVIEW.md` | Entry file for the recurring automation rules | Summarizes the whole system and the required read order. |
| `.../01-AUTOMATION-RUN-PROMPT.md` | Base execution prompt | Tells Codex exactly how to process one queued article. |
| `.../02-QUEUE-RULES.md` | Queue mutation rules | Separates immutable titles from mutable workflow state. |
| `.../03-STYLE-SELECTOR.md` | Active style pointer | Lets the team swap writing styles without changing the whole pipeline. |
| `.../04-STYLE-MODULE-DOLCEVILLA-CORE.md` | Current editorial voice | Defines tone, audience, pacing, and prohibited writing moves. |
| `.../05-ARTICLE-WRITING-RULES.md` | Body/content rules | Defines structure, block usage, link requirements, and factual safety. |
| `.../06-MDX-OUTPUT-TEMPLATE.md` | Frontmatter and draft template | Defines the exact MDX shape and the staged slot-assignment JSON shape. |
| `.../07-IMAGE-PIPELINE-RULES.md` | Image workflow contract | Defines reference-photo selection, output dimensions, optimization, and sidecars. |
| `.../08-IMAGE-PROMPT-TEMPLATE.md` | Prompt templates for cover/wash/orbit | Standardizes image generation prompts. |
| `.../09-CODEX-AUTOMATION-SETUP.md` | Scheduling/setup notes | Documents how the recurring Codex automation should eventually be configured. |
| `.../10-LIVE-PUBLISH-RULES.md` | Final publish gates | Defines when a staged article is allowed to become live. |

#### Queue and staging artifacts
| Path | Role | Why it matters |
| --- | --- | --- |
| `documents-local/workspace-local/content-ops/article-titles-raw.md` | Immutable editorial backlog | One title per line; wording and order must not be changed automatically. |
| `documents-local/workspace-local/content-ops/article-title-queue.jsonl` | Mutable processing state | Stores queueId, status, slug, last outcome, and timestamps. |
| `documents-local/workspace-local/content-ops/reference-photo-library/` | Private style-reference source | Supplies one random photo per cover generation run. |
| `documents-local/workspace-local/content-ops/staging/mdx-drafts/` | Staged draft MDX | First publishable draft output for each article. |
| `documents-local/workspace-local/content-ops/staging/slot-assignments/` | Staged image slot mapping | Connects deterministic slot IDs to future asset-library keys. |
| `documents-local/workspace-local/content-ops/staging/image-work/` | Human-readable image sidecars | Records prompts, dimensions, optimization, and provenance for each generated image. |
| `documents-local/workspace-local/content-ops/staging/generated-images/` | Optimized staged images | Holds the accepted image outputs before or alongside live promotion. |

#### Tracked live publish targets
| Path | Role | Why it matters |
| --- | --- | --- |
| `content/journal/<category>/<slug>.mdx` | Live journal article | Becomes the source file the website renders. |
| `content/site/image-slots.json` | Live slot registry | Maps slot IDs like `journal.<slug>.cover` to asset-library keys. |
| `lib/images/imageLibrary.ts` | Curated asset library | Registers physical image files and their metadata. |
| `public/images/brand/journal-generated/` | Live article image files | Stores the final tracked cover/wash/orbit assets. |

### 1.3 The generation flow step by step

#### Step 1: select one title from the queue
The queue model is intentionally two-layered:

- `article-titles-raw.md` is the immutable editorial source;
- `article-title-queue.jsonl` is the mutable execution state.

Rules:

- the AI selects one random queue record whose `workflowStatus` is `queued`;
- it must confirm that the queue title still exactly matches the raw-title line referenced by `rawTitleLineNumber`;
- it must not rewrite or normalize the title.

This is a smart design because it cleanly separates:

- editorial planning;
- machine execution state.

#### Step 2: derive the article package
For the selected title, the AI derives:

- `slug`
- `excerpt`
- `category`
- `location`
- `primaryKeyword`
- `searchIntent`
- `seoTitle`
- `seoDescription`
- `chapterShortTitles`
- `articleCtas.sticky`
- `articleCtas.segue`

But it does **not** change:

- the frontmatter `title`;
- the headline promise;
- the queue title.

#### Step 3: draft a Journal V3 MDX article
The required current model is **Journal V3**.

That means each new article must use:

- `articleTemplate: v3`
- exactly one `coverImage`
- exactly one `ornamentWashImage`
- exactly one `ornamentOrbitImage`
- `chapterShortTitles`
- `articleCtas.sticky`
- `articleCtas.segue`
- exactly one `<JournalPhotographerSegue />`
- 2 to 4 approved editorial blocks
- at least one natural link to `/film-wedding-photography`
- at least one natural link to `/villa-raffaelli`

The staged draft is written first to:

- `documents-local/workspace-local/content-ops/staging/mdx-drafts/<slug>.mdx`

It is **not** written directly into `content/journal/`.

#### Step 4: create the image package
Every Journal V3 article gets a fixed three-image package:

- one hero cover;
- one wash ornament;
- one orbit ornament.

The current documented image system works like this:

- the cover uses exactly one random photo from the local private reference library as a **style-only** reference;
- the cover also uses one downloaded web image as a **source-of-truth** reference for the exact subject being depicted;
- the cover must be realistic film photography;
- the cover must look like 35mm Portra 800 scanned on a Fujifilm Frontier;
- the cover must use one of two exposure treatments:
  - `overexposed_portra_800_plus_2`
  - `underexposed_portra_800_flash`
- the cover must always be a **single close-up detail**, never a wide shot or multi-subject scene;
- the ornaments do **not** use the random reference-photo workflow;
- all three images must be horizontal 16:9;
- all three must be optimized to no larger than Full HD and stripped of metadata.

This is important for replication: the image system is not "add any featured image you like". It is a constrained visual grammar.

#### Step 5: write image sidecars
For every generated image, the system writes a sidecar note into:

- `documents-local/workspace-local/content-ops/staging/image-work/`

Each sidecar records:

- why the image was generated;
- the slot ID and slot key;
- the prompt used;
- the raw artifact path;
- the final file path;
- final pixel dimensions;
- aspect ratio confirmation;
- optimization actions;
- the intended future asset-library key.

The **cover** sidecar additionally records:

- `Style reference used: <absolute path>`
- `Source-truth query used: <...>`
- `Source-truth page URL: <...>`
- `Source-truth image URL: <...>`
- `Source-truth local copy: <...>`
- `Exposure treatment used: <...>`
- `Close-up detail subject used: <...>`

This is one of the strongest parts of the system. It makes AI image generation auditable.

#### Step 6: create deterministic slot assignments
The article's three images are not referenced by direct file path in frontmatter.
They are referenced by **deterministic slot IDs**:

- `journal.<slug>.cover`
- `journal.<slug>.ornament.wash`
- `journal.<slug>.ornament.orbit`

The staged slot assignment file maps those slot IDs to concrete asset-library keys:

- `documents-local/workspace-local/content-ops/staging/slot-assignments/<slug>.json`

This is a major replication lesson:

- content should reference **stable semantic slots**;
- the slot registry should decide which asset fulfills that slot.

#### Step 7: promote staged work into live tracked files
If publish gates pass, the AI promotes the package into tracked repo files:

- the staged draft becomes `content/journal/<category>/<slug>.mdx`;
- slot assignments are merged into `content/site/image-slots.json`;
- the new image metadata is added to `lib/images/imageLibrary.ts`;
- the final files are placed under `public/images/brand/journal-generated/`.

#### Step 8: validate locally
The documented local validation gate is:

- `pnpm content:validate`
- `pnpm build`

And when changes affect more than pure content:

- `pnpm typecheck`
- `pnpm test`

#### Step 9: publish and verify
The documented publication gate requires:

- committing repo-facing changes;
- pushing the branch Vercel uses for live publication;
- waiting for the Vercel deployment to reach `READY`;
- verifying the public article route;
- verifying `/journal` as well.

The system is explicit that:

- a Vercel deployment reaching `READY` is not enough;
- the public route must be reachable without authentication.

### 1.4 What a successful article run leaves behind
One full successful run should produce:

- one updated queue record;
- one staged MDX draft;
- one staged slot-assignment JSON file;
- three image sidecars;
- three optimized staged generated images;
- one live MDX file in `content/journal/`;
- three live slot records in `content/site/image-slots.json`;
- three asset registrations in `lib/images/imageLibrary.ts`;
- three live image files in `public/`.

### 1.5 Architectural strengths of the generation system

#### The system separates editorial truth from machine state
The raw title list remains clean and immutable, while the JSONL queue stores execution state.

#### The system is staged-first, not publish-first
Drafts and generated images land in staging before they touch the live site.

#### The system uses semantic image slots
The content references stable slot keys instead of brittle direct file paths.

#### The system makes AI outputs inspectable
Image sidecars preserve prompts, dimensions, and provenance.

#### The system has a real publish gate
Publication requires validation, deploy success, and public verification.

### 1.6 Important current caveats

#### Caveat 1: the "automation" is mostly instructions, not a tracked scheduler
The repository contains the operating instructions for a recurring Codex automation, but not a normal in-repo cron worker or background Node service.

So if you replicate this elsewhere, understand that you are replicating:

- a content-ops framework;
- not a standalone autonomous app backend.

#### Caveat 2: queue state is more authoritative than MDX `workflowStatus`
In the current checked live articles, the queue records show real published states, but the live MDX files still use:

- `workflowStatus: drafted`

and that field is not used by the runtime site code.

For replication, I recommend either:

- making the queue the single source of truth for workflow state; or
- keeping queue state and MDX frontmatter synchronized.

Right now, the queue is operational truth.

## 2. How Articles Are Rendered On The Website

### 2.1 Runtime architecture summary
The live article renderer is a static-first Next.js App Router implementation built on:

- Next.js 16;
- React 19;
- TypeScript;
- local MDX files;
- `next-mdx-remote/rsc` for MDX compilation in React Server Components;
- `gray-matter` for frontmatter parsing;
- Zod for frontmatter/content validation;
- a local image slot manifest;
- a custom journal template and chapter-navigation system.

### 2.2 The render path from file to page

#### 1. Next.js discovers article routes
`app/(site)/journal/[slug]/page.tsx` defines the dynamic article route.

It uses:

- `generateStaticParams()` to precompute all slugs from local content;
- `generateMetadata()` to build per-article SEO metadata;
- `getEntryBySlug()` to load one article.

This means the journal is designed as **statically generable content**, not CMS-driven runtime fetching.

#### 2. The filesystem loader finds MDX files
`lib/content/listContentFiles.ts` recursively walks:

- `content/journal/`

and returns every `.mdx` file.

#### 3. Frontmatter is parsed and validated
`lib/content/parseFrontmatter.ts`:

- reads the file;
- parses frontmatter with `gray-matter`;
- normalizes date values;
- validates the result against `journalEntryFrontmatterSchema`.

That schema lives in:

- `lib/content/schemas.ts`

and enforces the expected journal frontmatter structure.

#### 4. Journal entry collections are built
`lib/content/getJournalEntries.ts`:

- loads every MDX file;
- parses frontmatter and body;
- resolves the cover and ornament slots through `imageManifest`;
- sorts entries by `publishedAt` descending;
- caches the result with React `cache()`.

#### 5. One article is selected by slug
`lib/content/getEntryBySlug.ts`:

- walks the content files;
- returns the first entry whose frontmatter `slug` matches;
- resolves its `coverAsset`, `ornamentWashAsset`, and `ornamentOrbitAsset`.

#### 6. The article source is analyzed structurally
`lib/content/journalSource.ts` does several important jobs:

- builds deterministic slot IDs from a slug;
- splits the MDX body into intro content plus H2-based sections;
- slugifies H2 headings into chapter IDs;
- counts approved editorial blocks;
- counts `<JournalPhotographerSegue />`;
- detects forbidden inline-image usage;
- builds short desktop chapter snippets.

This file is the bridge between:

- raw MDX text;
- the interactive Journal V3 reading chrome.

#### 7. The MDX is compiled into React
`components/templates/JournalEntryTemplate.tsx` uses:

- `compileMDX` from `next-mdx-remote/rsc`

to compile:

- the intro block;
- each H2 chapter section separately.

This is a notable design choice. The system does **not** render the whole article as one undifferentiated MDX blob. It splits the article at the H2 level so the UI can build:

- a hero;
- a chapter rail;
- per-section cards;
- quick-takeaway side panels.

#### 8. The article is wrapped in a custom journal UI
`JournalEntryTemplate.tsx` renders:

- breadcrumbs;
- the cover-image hero;
- ambient ornaments behind the content shell;
- the desktop/mobile chapter guide;
- the intro card;
- one card per chapter;
- one quick-takeaway card per chapter on desktop;
- related stories;
- a sticky CTA banner.

So the final page is much more than "render markdown". It is a custom reading application built around structured MDX.

### 2.3 Runtime journal file map
| Path | Role | Notes |
| --- | --- | --- |
| `app/(site)/journal/page.tsx` | Journal index route | Renders the journal landing page and story-card grid. |
| `app/(site)/journal/[slug]/page.tsx` | Individual article route | Generates static params, metadata, and the article page. |
| `content/pages/journal.ts` | Journal index page content | Defines intro copy, CTA copy, and SEO for `/journal`. |
| `content/journal/template.ts` | Shared journal fallback content | Provides fallback CTA copy and breadcrumb labels. |
| `lib/content/listContentFiles.ts` | Filesystem article discovery | Recursively finds `.mdx` files in `content/journal/`. |
| `lib/content/parseFrontmatter.ts` | Frontmatter parser | Uses `gray-matter` and Zod schema validation. |
| `lib/content/getJournalEntries.ts` | Journal collection builder | Loads all entries, resolves images, sorts by date, caches results. |
| `lib/content/getEntryBySlug.ts` | Single-article loader | Resolves one article and its cover/ornament assets. |
| `lib/content/journalSource.ts` | Article structure analyzer | Splits source into intro/sections and powers V3 behavior. |
| `lib/content/validateContent.ts` | Global content validator | Enforces image existence, page story references, and Journal V3 contract rules. |
| `lib/content/schemas.ts` | Shared Zod schemas | Defines frontmatter schema, CTA schema, page schema, and image schema. |
| `lib/content/storyCards.ts` | Card projection layer | Converts full entries into lighter preview cards for grids and related stories. |
| `components/templates/JournalEntryTemplate.tsx` | Main article renderer | Compiles MDX and assembles the full article UI. |
| `components/journal/journalMdxComponents.tsx` | Approved MDX component registry | Limits which custom components can appear inside article MDX. |
| `components/journal/JournalEditorialBlocks.tsx` | Editorial callout components | Implements `JournalQuickAnswer`, `JournalPlanningNote`, etc. |
| `components/journal/JournalPhotographerSegue.tsx` | In-body homepage CTA block | Rendered exactly once per V3 article; copy comes from frontmatter. |
| `components/journal/JournalEntryHero.tsx` | Article hero | Renders the cover image, metadata chips, and excerpt. |
| `components/journal/JournalReadingChrome.tsx` | Chapter navigation UI | Builds the desktop rail, mobile chapter dock, and scroll tracking. |
| `components/journal/JournalStickyBannerCTA.tsx` | Sticky contact CTA | Uses `articleCtas.sticky` and aligns to the article body column. |
| `components/journal/JournalAmbientOrnaments.tsx` | Decorative background layer | Places the two ornament assets around the article shell. |
| `components/blocks/RelatedStories.tsx` | Related-story section | Uses story cards derived from other entries. |

### 2.4 The Journal V3 render contract
At runtime, `validateJournalV3Contract()` in `lib/content/validateContent.ts` enforces that a V3 article:

- has a valid cover slot;
- has both ornament slots;
- uses the deterministic slot naming convention;
- defines `articleCtas`;
- defines `chapterShortTitles`;
- keeps sticky CTA href at `/contact`;
- keeps segue CTA href at `/`;
- contains exactly one `<JournalPhotographerSegue />`;
- contains zero inline image components;
- contains 2 to 4 approved editorial blocks;
- contains at least two H2 sections;
- provides one short title per H2;
- links naturally to `/film-wedding-photography`;
- links naturally to `/villa-raffaelli`.

This is not just content hygiene. It is how the UI can assume:

- chapter navigation exists;
- CTA surfaces exist;
- the article matches the design system.

### 2.5 How the MDX component system works
The MDX component registry in `components/journal/journalMdxComponents.tsx` exposes only approved components:

- `JournalQuickAnswer`
- `JournalPlanningNote`
- `JournalChecklist`
- `JournalCommonMistake`
- `JournalLocalInsight`
- `JournalFilmNote`
- `JournalPullQuote`
- `JournalPhotographerSegue`

Two subtle but important implementation details:

#### `JournalParagraph`
The custom `p` renderer unwraps cases where a custom block component would otherwise be incorrectly wrapped inside a paragraph. This keeps MDX block components rendering cleanly.

#### `JournalPhotographerSegue` is data-driven
The MDX file contains only:

- `<JournalPhotographerSegue />`

but the actual copy is injected from frontmatter via `createJournalMdxComponents()`.

That means:

- structure stays in the article body;
- copy stays in frontmatter;
- the component remains reusable.

### 2.6 How the image slot system works at runtime
This is one of the best architectural patterns in the repo.

#### Layer 1: the article references slot IDs
Frontmatter stores:

- `coverImage: journal.<slug>.cover`
- `ornamentWashImage: journal.<slug>.ornament.wash`
- `ornamentOrbitImage: journal.<slug>.ornament.orbit`

#### Layer 2: slot IDs map to asset keys
`content/site/image-slots.json` maps each slot ID to a curated asset-library key.

Example shape:

```json
{
  "journal.some-article.cover": {
    "asset": "journalSomeArticleCover"
  }
}
```

#### Layer 3: asset keys map to physical file metadata
`lib/images/imageLibrary.ts` maps `journalSomeArticleCover` to:

- the public `src`;
- alt text;
- width;
- height;
- tone metadata.

#### Layer 4: the manifest assembles render-ready image assets
`lib/images/imageManifest.ts` combines:

- the slot map;
- the asset library;
- shared blur placeholder data.

Runtime components then read the manifest, not raw files.

This gives you:

- stable content references;
- swappable assets;
- centralized image metadata;
- runtime validation.

If you replicate only one content-architecture idea from this repo, replicate this one.

### 2.7 How article pages are made interactive
The journal page itself is largely server-rendered, but specific UI systems are client components:

- `JournalReadingChrome.tsx`
- `JournalStickyBannerCTA.tsx`

These client islands handle:

- active chapter tracking based on scroll position;
- mobile horizontal chapter chips;
- desktop floating rail animation;
- sticky CTA visibility;
- alignment of the CTA banner to the article column.

This is a good modern pattern:

- static content and MDX compilation stay server-side;
- only interaction-heavy chrome is hydrated on the client.

## 3. The Wider Website Technology And Architecture

### 3.1 Core stack
The live site uses:

- **Next.js App Router** (`next@16.1.6`)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **MDX** for journal articles
- **Zod** for schema validation
- **gray-matter** for frontmatter parsing
- **next-mdx-remote/rsc** for server-side MDX compilation
- **Framer Motion** for interaction and motion
- **react-hook-form** for the inquiry form
- **Vitest** and **Playwright** for test coverage

### 3.2 Language mix
The system uses multiple file types, each with a specific role:

- `.tsx` for UI, routing, and application logic
- `.ts` for content models, loaders, schemas, and utilities
- `.mdx` for live journal articles
- `.md` for local content-ops instructions and reports
- `.json` for image-slot mapping
- `.jsonl` for queue state
- `.css` for global tokens, prose styling, and mobile utilities

### 3.3 High-level application layers

#### Layer 1: routing
The `app/` directory defines routes using Next.js App Router.

Important patterns:

- root layout in `app/layout.tsx`
- public site shell in `app/(site)/layout.tsx`
- journal index and article routes in `app/(site)/journal/...`
- metadata endpoints in `app/sitemap.ts`, `app/robots.ts`, and `app/manifest.ts`

#### Layer 2: content
The site uses two content strategies:

- **typed TS objects** for normal marketing pages in `content/pages/`
- **MDX files** for journal articles in `content/journal/`

This split is very intentional:

- normal service pages stay rigid and structured;
- journal articles stay flexible and prose-oriented.

#### Layer 3: rendering templates
Page templates in `components/templates/` provide reusable shells:

- `SitePageTemplate.tsx`
- `FilmPageTemplate.tsx`
- `VillaPageTemplate.tsx`
- `JournalEntryTemplate.tsx`

This makes the site template-driven rather than page-by-page handcrafted.

#### Layer 4: shared blocks and primitives
`components/blocks/`, `components/ui/`, `components/layout/`, and `components/motion/` contain the reusable building blocks the templates consume.

#### Layer 5: infrastructure helpers
`lib/` contains:

- content loaders;
- image manifest logic;
- SEO builders;
- analytics helpers;
- form submission logic;
- utilities.

### 3.4 Root shell and providers
`app/layout.tsx`:

- imports global CSS;
- loads Google fonts through `next/font/google`;
- applies `Providers`;
- mounts `ConsentScriptGate`;
- mounts `AnalyticsPageTracker`.

`app/providers.tsx` wraps the app with:

- `ConsentProvider`
- `MobileUIProvider`
- `LightboxProvider`
- `StudioCursor`
- viewport-height synchronization

This is the global client-side behavior layer.

### 3.5 Layout architecture
`components/layout/PageShell.tsx` provides the site-wide shell:

- header;
- mobile bottom-sheet menu;
- main content;
- footer;
- footer socket;
- gallery lightbox;
- sticky mobile CTA.

So route files mostly just supply page-specific content to shared templates. That is the correct mental model for the site.

### 3.6 Styling architecture
Global style entrypoint:

- `app/globals.css`

It imports:

- `styles/tokens.css`
- `styles/prose.css`
- `styles/mobile.css`

This creates a three-part CSS system:

#### Token layer
`styles/tokens.css` defines:

- colors
- spacing
- radii
- shadows
- container width

#### Prose layer
`styles/prose.css` defines typography rules for rendered journal/article content:

- H2/H3 sizing
- spacing
- list styling
- emphasis behavior
- link underlines

#### Utility/mobile layer
`styles/mobile.css` adds focused utility classes such as:

- safe-area bottom padding
- scroll-snap helpers
- dynamic viewport panel sizing

On top of that, the repo uses Tailwind CSS 4 utilities directly in components.

### 3.7 Image delivery architecture
Important current behavior from `next.config.ts`:

- `images.unoptimized = true`

That means:

- the app still uses `next/image` for layout, loading behavior, and placeholders;
- but Next.js image optimization is disabled;
- images are served directly from `public/`.

This is simple and predictable, but if you replicate this on a larger media-heavy site you may want:

- Next.js optimized images;
- or a dedicated image CDN.

### 3.8 Form architecture
The inquiry system is fully client-side:

- `components/forms/InquiryForm.tsx` renders and validates the form;
- `lib/forms/formSchema.ts` defines the Zod schema;
- `lib/forms/submitInquiry.ts` sends JSON to `NEXT_PUBLIC_INQUIRY_ENDPOINT`.

Important characteristics:

- there is no in-repo server action or API route for inquiries;
- the frontend posts directly to a public external endpoint;
- UTM/referrer data is captured client-side;
- successful submission switches the form into an inline thank-you state.

This is a practical architecture for brochure sites, but when replicating it you need a stable external form receiver.

### 3.9 Consent and analytics architecture
Consent is a first-class subsystem, not an afterthought.

Important files:

- `components/consent/ConsentProvider.tsx`
- `components/consent/ConsentScriptGate.tsx`
- `components/consent/AnalyticsPageTracker.tsx`
- `lib/analytics/*`

How it works:

- consent state is stored in `localStorage`;
- the app blocks analytics and marketing until consent exists;
- once consent is granted, scripts are injected dynamically;
- route changes trigger pageview tracking only after consent.

The current integrations include:

- GA4
- Google Ads
- Meta Pixel

This is a solid replication pattern for privacy-conscious marketing sites.

### 3.10 SEO and metadata architecture
Important files:

- `lib/seo/metadata.ts`
- `lib/seo/sitemap.ts`
- `lib/seo/canonical.ts`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/manifest.ts`

Key behavior:

- per-page metadata is generated through the Next metadata API;
- canonical URLs are based on `content/site/settings.ts`;
- the sitemap includes both static pages and journal entries;
- robots and manifest are generated from code.

Structured-data helpers exist in:

- `lib/seo/structuredData.ts`

but they are helper utilities, not the central journal renderer.

### 3.11 Validation and test architecture
The repo has both content validation and application tests.

#### Content validation
`scripts/validate-content.ts` runs `validateContent()`, which checks:

- every image in the manifest points to an existing public file;
- page story references point to real journal slugs;
- related article slugs exist;
- each V3 journal article satisfies the contract.

#### Unit tests
Examples:

- `tests/unit/journal-source.test.ts`
- `tests/unit/journal-frontmatter.test.ts`
- `tests/unit/journal-cta-rendering.test.ts`
- `tests/unit/content-validation.test.ts`

These cover:

- section splitting;
- slot ID generation;
- frontmatter rules;
- CTA rendering;
- global content validation.

#### End-to-end tests
`tests/e2e/site.spec.ts` provides smoke coverage for:

- consent behavior;
- key route availability;
- mobile menu behavior;
- cursor/lightbox behavior;
- journal reachability.

### 3.12 Deployment model
The tracked code assumes a Git -> Vercel publish flow.

That matters because the content pipeline itself also uses this assumption:

- publish means commit and push tracked files;
- Vercel builds the site from the branch;
- public verification happens after the deployment is ready.

So the content system and deployment model are tightly aligned.

### 3.13 What is not part of the live runtime
These are present in the workspace but are not the main live site system:

- `bootstrap-app/` - legacy scaffold
- `documents-local/` - local-only operational memory and content-ops system
- `.playwright-cli/`, `.next/`, `output/`, `tmp/`, `coverage/`, `test-results/` - generated/local tool artifacts

When replicating the site, do not mistake these for required runtime application layers.

## 4. Replication Blueprint For Your Other Sites

### 4.1 The main design principle to copy
Copy the **separation of concerns**:

- keep the **content-generation workflow** separate from the **runtime website**;
- keep **staged editorial artifacts** separate from **live tracked content**;
- keep **semantic slot references** separate from **physical image files**.

That separation is what makes the system manageable.

### 4.2 Minimum subsystems to replicate

#### Required if you want the same kind of system
1. A local or private title queue with immutable titles and mutable workflow state.
2. A strict article frontmatter schema.
3. A staged draft folder outside the live content tree.
4. A deterministic image-slot naming convention.
5. An asset library plus slot manifest.
6. A validator that checks both content and image references.
7. A publish gate that verifies both build success and public reachability.
8. A constrained MDX component set for your editorial blocks.

#### Optional but strongly recommended
1. Image sidecar files for AI image provenance.
2. Canonical source documents for sensitive recurring facts.
3. Consent-gated analytics if the site is marketing-oriented.
4. A separate local operations/control-plane folder for AI handoff and logging.

### 4.3 Recommended folder blueprint

```text
your-site/
  app/
    (site)/
      journal/
        page.tsx
        [slug]/
          page.tsx
    layout.tsx
    sitemap.ts
    robots.ts
    manifest.ts

  components/
    templates/
      JournalEntryTemplate.tsx
    journal/
      journalMdxComponents.tsx
      JournalEditorialBlocks.tsx
      JournalReadingChrome.tsx
      JournalStickyBannerCTA.tsx
      JournalEntryHero.tsx

  content/
    journal/
      guides/
        your-article.mdx
    site/
      image-slots.json
    pages/
      journal.ts

  lib/
    content/
      listContentFiles.ts
      parseFrontmatter.ts
      getJournalEntries.ts
      getEntryBySlug.ts
      journalSource.ts
      schemas.ts
      validateContent.ts
    images/
      imageLibrary.ts
      imageManifest.ts
    seo/
      metadata.ts
      sitemap.ts

  public/
    images/
      journal-generated/

  docs/
    journal-article-system-report.md

  private-content-ops-or-local-docs/
    article-titles-raw.md
    article-title-queue.jsonl
    reference-photo-library/
    staging/
      mdx-drafts/
      slot-assignments/
      image-work/
      generated-images/
```

### 4.4 Recommended implementation order
1. Build the live article runtime first.
2. Add the frontmatter schema and content validator.
3. Add the image slot system.
4. Add the MDX editorial block system.
5. Add the staging folders and queue model.
6. Add the AI writing/image-generation rules.
7. Add publish gates and deployment verification.
8. Add scheduling only after manual dry runs are stable.

This order matters because the generator should target a stable runtime contract, not invent one as it goes.

### 4.5 Rules I would keep unchanged on other sites
These ideas are strong and general-purpose:

- immutable title source + mutable queue state
- staged-first publication
- semantic image slots instead of direct file references
- strict validation before promotion
- per-image sidecars for AI-generated assets
- one canonical fact-source doc for repeated sensitive claims
- static-first article rendering from local MDX

### 4.6 Rules I would customize per site
These are Dolcevilla-specific and should change on a new project:

- editorial tone/style module
- CTA copy model
- approved editorial block names and visuals
- image art direction
- canonical fact-source documents
- category taxonomy
- hero and chapter-rail design

### 4.7 One upgrade I would recommend if you replicate this
I would make workflow state authoritative in one place only.

Right now, the system has:

- queue status in `article-title-queue.jsonl`;
- a `workflowStatus` field in live MDX frontmatter that is not actually driving runtime behavior.

For a fresh implementation, choose one of these:

- make the queue the only workflow-state source; or
- automatically sync the queue state back into the live MDX frontmatter on publish.

That will reduce ambiguity.

## 5. Bottom Line
This workspace is not "just a blog in Next.js".

It is really three systems working together:

1. a **private AI content-ops framework** that chooses, drafts, stages, and audits articles;
2. a **strict content contract** built on MDX, Zod validation, and deterministic image slots;
3. a **static-first Next.js marketing site** that renders those articles through a bespoke editorial UI and deploys them through Git + Vercel.

If you want to recreate this on other sites, the key is not copying the exact brand voice or visual style.
The key is copying the architecture:

- queue -> staging -> slot mapping -> validation -> promotion -> deployment verification

and keeping the runtime site cleanly separated from the AI publishing workflow that feeds it.
