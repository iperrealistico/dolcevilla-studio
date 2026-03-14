TECHNICAL DESIGN DOCUMENT
PROJECT: DOLCEVILLA.STUDIO
TYPE: STATIC B2C PREMIUM MARKETING WEBSITE
STACK: NEXT.JS + GITHUB + PORTABLE STATIC DEPLOYMENT
LAUNCH LANGUAGE: ENGLISH ONLY
SCOPE: FROM SCRATCH
BUSINESS MODEL: B2C ONLY
POSITIONING: PREMIUM INTERNATIONAL WEDDING PHOTOGRAPHY BRAND ROOTED IN TUSCANY

1. DOCUMENT PURPOSE

This document defines exactly what must be built, how it should be built, and why it must be built this way.

The website is a static-first, high-performance, premium marketing system for an international wedding photography studio. It must be visually distinctive, operationally lightweight, privacy-conscious, conversion-oriented, and ready for future scaling without rebuilding the front end from scratch.

The developer must treat this as a serious brand platform, not as a generic photographer portfolio and not as a wedding template site.

2. WHO WE ARE

Dolcevilla Studio is a Tuscany-rooted wedding photography brand for international couples.

The business is B2C only.
The website is meant to reach couples directly, especially couples coming from abroad who are actively looking for a wedding photographer in Tuscany and are willing to invest in high-end photography.

The brand is built around a real place and a real point of view.

That place is Villa Raffaelli.

Villa Raffaelli is not the main commercial product of this website and must not be framed as a public wedding venue funnel.
It is the private creative home of the brand, the studio’s symbolic and physical origin, a place of art, quiet, hospitality, and atmosphere.
It gives the brand credibility, identity, and emotional depth.
In some rare and specific contexts it may be relevant to mention private celebrations or portrait sessions connected to the villa, but the villa must never dominate the commercial positioning of the website.

The studio must feel rooted, personal, cultivated, and visually literate.
The site must communicate that the work comes from a real artistic world in Tuscany, not from a generic vendor operation.

3. WHAT THE WEBSITE IS FOR

This website must achieve all of the following at the same time:

- create a strong and memorable first impression
- clearly communicate what the studio is, who it is for, and why it is different
- make Tuscany feel real, owned, and credible rather than generic
- turn qualified visitors into inquiries
- support organic search growth
- support paid search and paid social landing experiences
- pre-qualify visitors so premium pricing feels natural and coherent
- make direct contact feel easy and elegant
- give the brand a structured system for future growth without needing a redesign

This website is not just a portfolio.
It is a designed conversion environment.

4. STRATEGIC POSITIONING

This website is not:

- a generic photographer portfolio
- a wedding venue website
- a planner website
- a mass-market lead-generation site
- a template-based luxury brochure

This website is:

- an art-directed digital brand world
- a premium B2C acquisition system
- a search-ready content system
- a trust-building platform for high-value international couples
- a future-ready front-end that can later connect to a CMS without changing the UI layer

5. CORE BRAND PRINCIPLES TRANSLATED INTO THE SITE

The site must always express these ideas:

- rooted in Tuscany, but not clichéd
- premium, but not loud
- editorial, but still clear
- cinematic, but still fast
- atmospheric, but still useful
- artistic, but still commercial enough to convert
- personal, but not oversharing
- high-end, but not fake-luxury

The user experience must feel like entering a carefully designed world.
At the same time, navigation, inquiry, pricing signals, and trust cues must remain easy to understand.

6. EXECUTIVE TECHNICAL DECISIONS

The implementation must follow these decisions:

- Framework: Next.js App Router
- Language: TypeScript
- Package manager: pnpm
- Primary deployment target: Vercel initially
- Deployment portability: architecture must remain portable to Netlify, AWS Amplify, or Dockerized Node hosting without refactoring core logic
- Styling: Tailwind CSS as the main styling layer
- CSS Modules: allowed only for rare highly art-directed components
- State management: React Server Components by default, local component state for isolated interactions, React Context only for global UI concerns
- Content system: local filesystem only for V1
- Data source: typed TypeScript content objects plus MDX for editorial content
- Rendering: static generation for all public pages
- Forms: external form handling service
- Media strategy: pre-optimized local assets served from /public, with next/image used mainly for layout stability, responsive sizing, and lazy loading
- Image optimization mode: lightweight, static-friendly, preferably unoptimized delivery because assets are already prepared
- Consent: custom artistic consent doorway, no external CMP
- Analytics: GA4, Google Ads, and Meta only after active user consent
- Motion: Framer Motion, restrained and performance-aware
- SEO: route-level metadata, structured data, internal linking, sitemap generation from local content
- I18n readiness: English-only launch, but all shared UI strings stored centrally for future localization

7. CORE ARCHITECTURAL PHILOSOPHY

7.1 Static, but template-driven

Even though the site has no CMS in V1, it must be architected exactly like a data-driven front end.

This means:

- route files compose blocks
- route files do not contain raw marketing copy
- route files do not contain hardcoded galleries
- content is passed into reusable blocks as typed props
- the UI layer does not care whether content came from local files or a future CMS

The purpose is to make future scaling clean.
If a CMS is added later, the goal is to replace the content-loading layer only.

7.2 Smart data mapping, dumb presentational blocks

Reusable components must remain presentational and prop-driven.

Examples:

- HeroStatement
- EditorialTextBlock
- ImageGallery
- StoryCardGrid
- FAQBlock
- VillaIdentityBlock
- CTASection

These components should not know whether data came from:

- a local TypeScript object
- an MDX file
- a future CMS
- a future REST or GraphQL response

They only receive validated typed props.

8. WHAT NOT TO BUILD IN V1

Do not build any of the following:

- no database
- no admin dashboard
- no authentication
- no user accounts
- no booking engine
- no venue availability system
- no planner portal
- no custom backend for content
- no internal REST API for site content
- no GraphQL layer
- no headless CMS
- no external consent management platform
- no Vercel-proprietary analytics packages
- no generic gallery plugin system
- no giant UI framework
- no Redux
- no Zustand
- no over-animated interface that hurts clarity or performance

9. RECOMMENDED STACK IN DETAIL

9.1 Core stack

- Next.js 15+
- React 19+
- TypeScript
- Node.js LTS
- pnpm

Why:

- Next.js App Router gives strong static rendering, layouts, metadata support, and a clean architecture
- TypeScript is mandatory because the site depends on reusable data contracts
- pnpm keeps installs fast and deterministic

9.2 Styling stack

Primary:

- Tailwind CSS

Secondary:

- CSS Modules only for selected art-direction-heavy components

Use Tailwind for:

- layout
- spacing
- typography
- grids
- responsive behavior
- touch sizing rules
- drawer positioning
- sticky CTA patterns
- utility-level styling

Use CSS Modules only for:

- highly custom hero typography treatments
- cinematic masks and overlays
- selected gallery overlap systems
- one-off motion surfaces that become messy in utilities

Do not use:

- styled-components
- Emotion
- MUI
- Bootstrap
- Chakra
- large design system libraries

9.3 Utility libraries

Recommended:

- clsx
- tailwind-merge
- zod
- react-hook-form
- framer-motion
- lucide-react
- gray-matter
- next-mdx-remote or another App Router-compatible MDX pipeline
- date-fns or a similarly light utility if needed

Optional:

- sharp only as an offline developer utility if useful for asset checking
- bundle analyzer for optimization checks

10. HOSTING AND PORTABILITY STRATEGY

10.1 Initial deployment target

Deploy to Vercel first for preview URLs and fast iteration.

10.2 Portability requirement

The codebase must not depend on Vercel-only runtime features for core functionality.

Use only standard Next.js features for:

- routing
- metadata
- static generation
- sitemap
- robots
- image layout
- environment variables
- script injection
- form integration

Do not use:

- @vercel/analytics
- @vercel/speed-insights
- Vercel KV
- Vercel Blob
- Edge Config
- platform-specific business logic unless requirements change later

The repository should remain deployable on:

- Vercel
- Netlify
- AWS Amplify
- Dockerized Node hosting

11. CONTENT ARCHITECTURE

Use a hybrid content architecture with two content types.

11.1 Structured marketing content

Stored as typed TypeScript objects.

Use for:

- home page sections
- weddings page sections
- elopements page sections
- experience page sections
- pricing page sections
- about page sections
- contact page content
- testimonials
- FAQs
- navigation
- footer
- SEO landing pages
- ads landing pages
- reusable Villa Raffaelli identity copy
- sticky CTA labels
- global UI strings references

11.2 Long-form editorial content

Stored as MDX files with frontmatter.

Use for:

- journal stories
- real wedding stories
- elopement stories
- Tuscany guides
- planning notes
- stories of place

11.3 Architectural rule

Even local TypeScript content files must be shaped like API payloads.

That means:

- no arbitrary ad hoc objects scattered across page files
- use shared interfaces
- use mapping helpers
- validate all content at build time

12. RECOMMENDED FOLDER STRUCTURE

app/
  (site)/
    layout.tsx
    page.tsx
    weddings/page.tsx
    elopements/page.tsx
    experience/page.tsx
    pricing/page.tsx
    about/page.tsx
    contact/page.tsx
    thank-you/page.tsx
    journal/page.tsx
    journal/[slug]/page.tsx
    tuscany-wedding-photographer/page.tsx
    lucca-wedding-photographer/page.tsx
    florence-wedding-photographer/page.tsx
    val-dorcia-wedding-photographer/page.tsx
    chianti-wedding-photographer/page.tsx
    siena-wedding-photographer/page.tsx
    tuscany-elopement-photographer/page.tsx
    intimate-wedding-in-tuscany/page.tsx
    privacy/page.tsx
    legal/page.tsx
    not-found.tsx
  (ads)/
    ads/google/tuscany-wedding-photographer/page.tsx
    ads/google/lucca-wedding-photographer/page.tsx
    ads/meta/tuscany-wedding-photographer/page.tsx
    ads/meta/elopement-tuscany/page.tsx
  sitemap.ts
  robots.ts
  manifest.ts
  globals.css

components/
  layout/
    Header.tsx
    Footer.tsx
    StickyMobileCTA.tsx
    PageShell.tsx
    SkipLink.tsx
  consent/
    ConsentProvider.tsx
    ConsentDoorway.tsx
    ConsentActions.tsx
    ConsentScriptGate.tsx
  mobile/
    BottomSheetMenu.tsx
    ScrollSnapCarousel.tsx
    StickyBottomBar.tsx
  ui/
    Button.tsx
    LinkButton.tsx
    Section.tsx
    Container.tsx
    Eyebrow.tsx
    Heading.tsx
    RichText.tsx
    Divider.tsx
  blocks/
    HeroStatement.tsx
    EditorialTextBlock.tsx
    IntroBlock.tsx
    SignatureGallery.tsx
    FloatingGallery.tsx
    StoryCardGrid.tsx
    TestimonialsBlock.tsx
    WhyChooseUs.tsx
    GeographyBlock.tsx
    ExperiencePreview.tsx
    InvestmentNote.tsx
    FAQBlock.tsx
    CTASection.tsx
    VillaIdentityBlock.tsx
    LocationLinks.tsx
    RelatedStories.tsx
    ProcessPreviewBlock.tsx
  galleries/
    ImageGallery.tsx
    EditorialGrid.tsx
    StoryGallery.tsx
    GalleryLightbox.tsx
    HeroSequence.tsx
    ImageCard.tsx
  forms/
    InquiryForm.tsx
    FormField.tsx
    BudgetSelect.tsx
  motion/
    Reveal.tsx
    StaggerGroup.tsx
    FloatIn.tsx
    DoorwayReveal.tsx
  seo/
    JsonLd.tsx
    Breadcrumbs.tsx

content/
  dictionaries/
    en.ts
  site/
    settings.ts
    navigation.ts
    footer.ts
    testimonials.ts
    faqs.ts
  pages/
    home.ts
    weddings.ts
    elopements.ts
    experience.ts
    pricing.ts
    about.ts
    contact.ts
  landings/
    tuscany-wedding-photographer.ts
    lucca-wedding-photographer.ts
    florence-wedding-photographer.ts
    val-dorcia-wedding-photographer.ts
    chianti-wedding-photographer.ts
    siena-wedding-photographer.ts
    tuscany-elopement-photographer.ts
    intimate-wedding-in-tuscany.ts
  ads/
    google/
    meta/
  journal/
    real-weddings/
    elopements/
    guides/
    planning-notes/
    stories-of-place/

contexts/
  ConsentContext.tsx
  MobileUIContext.tsx
  LightboxContext.tsx

lib/
  content/
    getPageContent.ts
    getLandingContent.ts
    getJournalEntries.ts
    getEntryBySlug.ts
    parseFrontmatter.ts
    validateContent.ts
    listContentFiles.ts
  seo/
    metadata.ts
    structuredData.ts
    canonical.ts
    sitemap.ts
  analytics/
    ga.ts
    meta.ts
    googleAds.ts
    tracking.ts
    consentedScriptLoader.ts
  forms/
    formSchema.ts
    submitInquiry.ts
    utm.ts
  images/
    imageManifest.ts
    imageConfig.ts
    getBlurData.ts
  i18n/
    getDictionary.ts
    uiStrings.ts
  utils/
    cn.ts
    formatDate.ts
    slugify.ts
    viewport.ts

hooks/
  useInViewOnce.ts
  useReducedMotion.ts
  useUTMParams.ts
  useScrollLock.ts
  useConsent.ts
  useViewportHeight.ts

types/
  content.ts
  page.ts
  gallery.ts
  seo.ts
  forms.ts
  consent.ts
  dictionary.ts

styles/
  tokens.css
  prose.css
  mobile.css

public/
  fonts/
  images/
    home/
    weddings/
    elopements/
    about/
    locations/
    stories/
    journal/
  icons/
  og/

scripts/
  validate-content.ts
  generate-image-manifest.ts
  verify-media.ts
  generate-og-assets.ts

tests/
  e2e/
  unit/

13. ROUTING AND URL STRATEGY

Public URLs should be:

/
 /weddings
 /elopements
 /experience
 /pricing
 /about
 /contact
 /journal
 /journal/[slug]
 /tuscany-wedding-photographer
 /lucca-wedding-photographer
 /florence-wedding-photographer
 /val-dorcia-wedding-photographer
 /chianti-wedding-photographer
 /siena-wedding-photographer
 /tuscany-elopement-photographer
 /intimate-wedding-in-tuscany

Ads URLs should be:

 /ads/google/tuscany-wedding-photographer
 /ads/google/lucca-wedding-photographer
 /ads/meta/tuscany-wedding-photographer
 /ads/meta/elopement-tuscany

Rules:

- ads pages must be noindex
- thank-you should likely be noindex
- journal entries all live under /journal/[slug]
- no localized routing yet
- architecture must be ready for future /it or /fr expansion without rewriting component internals

14. RENDERING STRATEGY

14.1 Page-level rendering

All public pages must be statically generated.

- Home: static
- Weddings: static
- Elopements: static
- Experience: static
- Pricing: static
- About: static
- Contact: static
- Thank-you: static
- Journal index: static
- Journal entries: static
- SEO landing pages: static
- Ads landing pages: static
- Privacy/legal pages: static

14.2 Client-side islands only where needed

Client components should be limited to:

- consent doorway
- consent script gate
- hero image sequence
- scroll-snap carousels
- bottom-sheet navigation
- sticky mobile CTA
- gallery lightbox
- inquiry form
- FAQ accordion if interactive
- motion wrappers
- UTM tracking helpers

Everything else should remain server-rendered and static.

15. CUSTOM CONSENT SYSTEM

15.1 Concept

Do not use a generic bottom cookie banner.
Do not use a third-party CMP.

Build a custom consent experience as an integrated cinematic doorway that appears before the main site experience is revealed.

This is not a compliance afterthought.
It is part of the website choreography.

15.2 UX behavior

On first visit:

- show a full-screen or near full-screen consent doorway
- the user must make an explicit choice before entering the full experience
- choices should include:
  - Essential only
  - Accept analytics and marketing
- no third-party scripts load before the choice
- after the choice, reveal the site with a premium Framer Motion transition

The doorway should feel like entering a private world, not dismissing a legal annoyance.

15.3 Technical behavior

Consent state should be managed with React Context.

Suggested model:

ConsentState:
- hasInteracted: boolean
- analytics: boolean
- marketing: boolean
- timestamp: string

Storage:

- persist preference in localStorage
- use a versioned key so preferences can be reset if the policy changes

Default state:

- no consent granted
- no analytics scripts injected
- no Meta Pixel injected
- no Google Ads scripts injected

15.4 Injection strategy

Do not render GA4, Meta, or Google Ads scripts in the root layout by default.

Instead:

- render a ConsentScriptGate client component
- read consent state from context
- inject vendor scripts only after explicit consent
- scripts must never fire before consent is true

15.5 Accessibility

The doorway must:

- be keyboard navigable
- trap focus while active if it overlays the site
- include accessible headings and button labels
- respect reduced motion preferences

16. STATE MANAGEMENT STRATEGY

Do not install Redux or Zustand.

Use:

- React Server Components for content-heavy sections
- useState and useReducer for local component behavior
- React Context only for true app-wide concerns:
  - consent state
  - mobile navigation state
  - optional global lightbox state

17. API STRATEGY

17.1 V1 reality

There is no backend and no internal API for content.

17.2 Architectural model

Treat local content loading functions as if they were API clients.

Examples:

- getPageContent("home")
- getLandingContent("lucca-wedding-photographer")
- getJournalEntries({ category: "guides" })
- getEntryBySlug(slug)

These functions return typed payloads and isolate the source of truth from the route layer.

17.3 Future-proofing

When a CMS is added later:

- route files should remain unchanged
- presentational components should remain unchanged
- only lib/content data loaders should be swapped or extended

18. DATA MODELS

All content must be typed.

18.1 Site settings

SiteSettings:
- siteName
- siteUrl
- defaultTitle
- titleTemplate
- defaultDescription
- defaultOgImage
- contactEmail
- instagramUrl
- primaryCTA
- footerStatement

18.2 Dictionary model

UIDictionary:
- common
- navigation
- forms
- footer
- consent
- cta
- errors

18.3 Navigation item

NavItem:
- label
- href
- type
- hiddenOnAds
- children optional

18.4 Image asset

ImageAsset:
- id
- src
- alt
- width
- height
- priority optional
- caption optional
- focalPoint optional
- dominantTone optional
- blurDataURL optional

18.5 Gallery item

GalleryItem:
- image
- layoutVariant
- span optional
- caption optional
- theme optional

18.6 Story card

StoryCard:
- slug
- title
- excerpt
- location
- celebrationType
- heroImage
- publishedAt
- updatedAt optional
- tags
- featured
- category

18.7 Testimonial

Testimonial:
- quote
- names
- location optional
- celebrationType optional

18.8 FAQ item

FAQItem:
- question
- answer

18.9 Location landing payload

LocationLanding:
- slug
- title
- hero
- intro
- whyThisPlaceMatters
- whyWeFit
- gallery
- featuredStorySlugs
- testimonial
- faqItems
- investmentNote
- seo
- villaIdentityVariant

18.10 Service page payload

ServicePageContent:
- hero
- intro
- gallery
- valuePoints
- processPreview
- stories
- faqs
- cta
- seo

18.11 Journal entry frontmatter

JournalEntry:
- slug
- title
- excerpt
- category
- location
- serviceType optional
- coverImage
- publishedAt
- updatedAt optional
- seoTitle
- seoDescription
- noindex optional
- relatedSlugs optional

18.12 Consent model

ConsentState:
- hasInteracted
- analytics
- marketing
- timestamp

19. CONTENT VALIDATION

Validate all local content at build time with zod.

Rules:

- required fields must fail the build if missing
- slugs must be unique
- image files must exist
- alt text must exist
- metadata fields must meet constraints
- related story references must resolve
- dictionary keys required by components must exist
- frontmatter dates must parse correctly
- sitemap-relevant entries must contain valid updated or published dates
- featured story references must point to existing entries

20. I18N READINESS

20.1 Launch scope

Launch in English only.

20.2 Architectural requirement

Do not implement localized routing yet.

20.3 Implementation rule

Store all shared UI strings in a central dictionary file rather than hardcoding them into components.

This includes:

- button labels
- form placeholders
- form error messages
- footer text
- sticky CTA copy
- consent copy
- FAQ labels
- reusable microcopy
- empty states

20.4 Why

This allows future /it or /fr expansion with minimal component refactoring.

21. DESIGN SYSTEM FOUNDATIONS

21.1 Design principle

The site should feel editorial, cinematic, premium, and contemporary.
It must not look like a wedding template.

21.2 Grid and layout

Desktop:
- 12-column grid

Tablet:
- 8-column grid

Mobile:
- 4-column layout baseline, but mobile must be intentionally designed rather than being a stacked desktop leftover

21.3 Spacing

Use design tokens and generous vertical rhythm.
Avoid cramped sections.
Large-image layouts need space.

21.4 Color system

Use a restrained palette that supports photography:

- one deep dark neutral
- one warm light neutral
- one muted stone or mineral tone
- one subtle refined accent tone
- pure white and near-black only where necessary

Photography must remain the main color carrier.

Do not build the site around clichéd blush-and-gold wedding styling.

21.5 Typography

Use a maximum of two font families.

Recommended structure:

- Display font: unique licensed font, self-hosted locally if possible
- Body font: clean variable font
- Optional accent style: italic or serif variant from one of the same families, not a third family

Implementation:

- use next/font/local for a self-hosted display font
- use next/font/google or next/font/local for the body font
- use CSS variables such as --font-display and --font-body
- preload only needed weights
- keep hero typography as live HTML text
- do not use remote CSS font imports

21.6 Component styling rules

- use rounded corners sparingly
- avoid shadow-heavy cards
- create hierarchy with spacing, borders, scale, and typography
- buttons must feel premium and clean, not SaaS-like
- large text should be real text, not flattened image assets

21.7 Icon strategy

Preferred:

- lucide-react for interface icons
- custom SVG for brand-specific motifs

Do not use Font Awesome as the main icon system.

Rules:

- icons should support currentColor
- icons should not dominate the interface
- social icons can be Lucide or custom SVG
- do not over-illustrate the UI

22. ELEVATED MOBILE INTERACTION DESIGN

Mobile must feel intentionally designed, not merely responsive.

22.1 Core principle

Design for touch and thumb comfort from the start.

22.2 Required touch rules

- all tap targets must be at least 44x44px
- interactive spacing must prevent accidental taps
- sticky actions should be reachable near the bottom of the screen
- desktop nav patterns should not collapse into awkward mobile menus

22.3 Gallery behavior on mobile

Do not simply stack desktop editorial grids on small screens.

Instead:

- use horizontal swipeable carousels built with native CSS scroll-snap where appropriate
- allow partial next-card visibility where useful
- preserve image rhythm and premium feel
- keep interactions predictable and smooth

22.4 Menu behavior on mobile

Use bottom-sheet drawers for:

- main navigation
- optional category menus

Bottom-sheet requirements:

- opens from bottom
- thumb-friendly
- may use Framer Motion for controlled spring entrance
- supports overlay close
- supports ESC
- manages focus correctly
- respects reduced motion

22.5 Sticky-bottom CTA

For key service and landing pages, implement a sticky-bottom CTA on mobile.

Examples:

- Inquire
- Check availability
- View pricing
- Start your inquiry

Rules:

- visible but not aggressive
- should not block important content
- must respect safe-area insets
- can hide or reduce on pages where readability would suffer

22.6 Dynamic viewport height

Use 100dvh rather than fragile 100vh for immersive mobile sections.

This avoids browser bar clipping and improves hero behavior.

22.7 Mobile performance

Avoid over-engineered JS-heavy gestures.
Prefer native browser behavior where possible:

- scroll-snap
- position: sticky
- overscroll control
- transform-only motion

23. IMAGE AND MEDIA PIPELINE

23.1 Core principle

Images are not decoration.
Images are the product.

The site must treat photography like premium editorial media.

23.2 Asset preparation standard

All images entering the repo should already be:

- web-ready
- compressed appropriately
- resized intentionally
- stripped of EXIF metadata
- exported in the correct dimensions
- named consistently

23.3 Delivery approach

Use next/image mainly for:

- width and height stability
- responsive layout behavior
- lazy loading
- prevention of cumulative layout shift

Because assets are already optimized, do not rely on heavy runtime optimization as the main strategy.

23.4 Unoptimized mode

Use lightweight image delivery.
Prefer images.unoptimized = true in next.config or equivalent selective usage where appropriate.

23.5 Image formats

Preferred:

- WebP
- AVIF where appropriate
- high-quality JPEG fallback when needed

23.6 Media organization

Store assets in structured folders under /public/images by page or content group.
Maintain an image manifest so content references remain typed and predictable.

23.7 Responsive sizing strategy

Prepare web image widths approximately around:

- 640
- 960
- 1280
- 1600
- 2200

Do not serve full-resolution originals to the browser.

23.8 Hero image sequence

For the home hero:

- load only a small image set initially
- 3 to 5 images is enough
- the sequence should hard-cut, not dissolve
- prefetch only the first 1 or 2 frames
- any additional frames can load after idle if needed

The hero must feel bold without damaging LCP.

23.9 Alt text rules

Every meaningful image must have alt text.
Alt text should be descriptive and human, not keyword stuffing.
Only use empty alt when an image is truly decorative.

24. GALLERY IMPLEMENTATION RULES

24.1 Gallery system types

Build reusable gallery variants:

- editorial desktop grid
- scroll-snap mobile carousel
- floating gallery
- story sequence gallery
- compact landing gallery

24.2 Component rule

Use one core ImageGallery API that can render multiple variants:

- editorial
- floating
- story
- mobile-carousel
- compact-strip

This keeps content payloads stable while allowing device-specific rendering.

24.3 Story galleries

For long story pages with roughly 35 to 60 images:

- group images into narrative sections
- mix full-width images, paired images, and smaller clusters
- optionally insert short editorial text blocks between sections
- load lightbox only when needed

24.4 Gallery performance rules

- only above-the-fold images can be priority
- all other gallery images must lazy load
- use correct sizes attributes
- dynamically import lightbox code
- do not build heavy canvas-based galleries
- do not use masonry everywhere

25. MOTION SYSTEM

25.1 Library choice

Use Framer Motion only.
Do not use GSAP in V1.

25.2 Motion principles

Allowed:

- hard-cut hero image changes
- subtle vertical reveals
- staggered entrance for cards
- floating image planes in moderation
- doorway reveal transition after consent
- bottom-sheet entrance motion

Not allowed:

- constant animation noise
- slow sentimental luxury fades everywhere
- motion that blocks reading
- expensive scroll effects that hurt mobile performance

25.3 Reduced motion

Respect prefers-reduced-motion globally.

In reduced motion mode:

- simplify the doorway reveal
- disable non-essential float effects
- reduce stagger and transforms
- use static hero imagery if necessary

26. PAGE TEMPLATE IMPLEMENTATION

Each route should map structured content into reusable blocks.

26.1 Home page purpose

The home page must immediately define the world of the brand.
It should not try to say everything.
It must create desire, clarify positioning, introduce Tuscany as a real context, signal quality, and move users toward inquiry or deeper service pages.

Recommended block order:

- HeroStatement
- EditorialTextBlock
- SignatureGallery or ImageGallery
- WhyChooseUs
- GeographyBlock
- LocationLinks
- StoryCardGrid
- ExperiencePreview
- TestimonialsBlock
- InvestmentNote
- CTASection

Suggested media guidance:

- hero: 3 to 5 strong images in sequence
- signature gallery: 6 to 10 images
- story preview grid: 3 to 6 story cards

26.2 Weddings page purpose

This page sells the main service for full wedding coverage.
It should explain fit, visual approach, wedding-weekend understanding, process, and why the studio is different.

Recommended block order:

- HeroStatement
- EditorialTextBlock
- ImageGallery
- AudienceFitBlock
- WeddingWeekendBlock
- VillaIdentityBlock
- StoryCardGrid
- ProcessPreviewBlock
- InvestmentNote
- FAQBlock
- CTASection

Suggested media guidance:

- featured gallery: 10 to 16 images
- story previews: 3 to 4 relevant weddings

26.3 Elopements page purpose

This page speaks to smaller, more intimate celebrations and couples who want a different rhythm.

Recommended block order:

- HeroStatement
- EditorialTextBlock
- ImageGallery
- BenefitsBlock
- ApproachBlock
- VillaIdentityBlock
- StoryCardGrid
- InvestmentNote
- FAQBlock
- CTASection

Suggested media guidance:

- gallery: 8 to 14 images
- stories: 2 to 4 elopement or intimate wedding examples

26.4 Experience page purpose

This page explains how it feels to work with the studio and what kind of experience couples can expect before, during, and after the wedding.

Recommended block order:

- EditorialTextBlock
- AudienceFitBlock
- ProcessPreviewBlock
- ExperienceQualitiesBlock
- TuscanyKnowledgeBlock
- VillaIdentityBlock
- FAQBlock
- CTASection

26.5 Pricing page purpose

This page should not act like a price sheet.
It should frame investment, signal starting points, explain what is included, and help qualify the right clients.

Recommended block order:

- EditorialTextBlock
- PricingTiersBlock
- PricingFactorsBlock
- IncludedBlock
- FitNoteBlock
- CTASection

26.6 About page purpose

This page explains who the studio is, where it comes from, what it believes in, and why Villa Raffaelli matters without becoming a villa sales page.

Recommended block order:

- PortraitHero or HeroStatement
- WhoWeAreBlock
- VisualPhilosophyBlock
- TuscanyPlaceBlock
- InternationalCouplesBlock
- PersonalWorldBlock
- ImageGallery
- CTASection

Suggested media guidance:

- portraits and atmosphere gallery: 6 to 10 images

26.7 Contact page purpose

This page must remove friction.
It should feel calm, direct, and reassuring.

Recommended block order:

- EditorialTextBlock
- ReassuranceBlock
- InquiryForm
- DirectEmailBlock
- NextStepsBlock

26.8 Journal index purpose

This page acts as proof, SEO support, and editorial depth.

Recommended block order:

- EditorialTextBlock
- FeaturedStoriesRow
- ArticleGrid
- optional category grouping

26.9 SEO landing pages purpose

These pages are for search intent such as Tuscany Wedding Photographer, Lucca Wedding Photographer, and similar.
They must be materially distinct and genuinely useful.

Recommended block order:

- HeroStatement
- LocalIntroBlock
- WhyThisPlaceBlock
- ImageGallery
- FeaturedStoryBlock
- VillaIdentityBlock where relevant
- WhyChooseUs
- Testimonial
- InvestmentNote
- FAQBlock
- CTASection

Suggested media guidance:

- compact gallery: 6 to 10 images
- one featured story
- one testimonial
- one local FAQ cluster

26.10 Ads landing pages purpose

These pages are for Google Ads and Meta Ads.
They should match ad intent more tightly and reduce browsing friction.

Recommended block order:

- simplified header
- direct HeroStatement
- proof block
- compact image gallery
- fit explanation
- pricing signal
- FAQBlock
- visible inquiry form
- repeated CTA

Suggested media guidance:

- gallery: 4 to 8 images maximum

27. VILLA RAFFAELLI BRAND BLOCK

This is a critical reusable component.

Purpose:

- reinforce the origin of the brand
- support distinctiveness
- remind the user that the studio belongs to a real place
- avoid turning the villa into a venue funnel

Rules:

- compact
- atmospheric
- never overly commercial
- never framed like a generic venue sales block
- reusable on Home, Weddings, Elopements, Experience, About, and selected landing pages
- support three visual variants: minimal, editorial, quote-like

28. CONTACT FORM TECHNICAL SPEC

28.1 Fields

- names
- email
- wedding date
- location
- venue
- guest count
- celebration type
- photography budget range
- message
- optional interest in Villa Raffaelli-related portraits or private celebration context

28.2 Hidden fields

- page URL
- referrer
- UTM source
- UTM medium
- UTM campaign
- UTM content
- gclid
- fbclid

28.3 Validation

Use react-hook-form + zod.
Keep validation strict but elegant.
Show inline errors.
Do not over-validate optional fields.

28.4 Spam protection

Use:

- built-in form provider spam controls
- honeypot field
- minimum time-to-submit heuristic if supported
- provider rate limiting if available

28.5 UX rules

- calm visual design
- mobile-friendly field spacing
- 44x44px minimum tap targets
- no aggressive CRM-style look
- budget field should help qualify without sounding cold

29. SEO IMPLEMENTATION

29.1 Metadata

Use the Next.js metadata API for all routes.

Each route should define:

- title
- description
- canonical
- open graph metadata
- Twitter metadata where useful

29.2 Structured data

Use JSON-LD where appropriate:

- Organization
- ProfessionalService or LocalBusiness where correct
- BreadcrumbList
- FAQPage
- Article for journal entries

29.3 Sitemap and robots

Create:

- app/sitemap.ts
- app/robots.ts

Rules:

- index public pages
- noindex ads pages
- noindex thank-you page if desired
- privacy/legal can remain indexable or noindex depending on legal preference

29.4 Internal linking

Important for both SEO and conversion:

- home links to services and core locations
- service pages link to relevant stories and location pages
- location pages link to services and stories
- journal entries link back to locations and services
- footer links to main commercial pages

29.5 Content rules for location pages

Each location page must be materially distinct.
Do not create near-duplicate pages by replacing place names only.

Each location page needs:

- unique local intro
- place-specific angle
- different image selection
- distinct featured story
- distinct FAQ angle
- distinct reasons for fit

30. AUTOMATED SITEMAP GENERATION

30.1 Requirement

Generate an accurate XML sitemap at build time without a CMS.

30.2 Implementation

Use app/sitemap.ts in the App Router.

The sitemap generator should:

- read local content files from /content/pages
- read landing payloads from /content/landings
- read MDX entries from /content/journal/**
- map filenames and slugs to URLs
- read lastModified from frontmatter when available
- fall back to filesystem stats when updatedAt is absent
- exclude noindex routes and ads routes
- return the final URL list on every build

30.3 Expected output categories

Include:

- core pages
- SEO landing pages
- journal index
- journal entries

Exclude:

- ads pages
- thank-you page if noindex
- internal utility pages

31. ANALYTICS, ADS, AND ATTRIBUTION

31.1 Required integrations

Only after consent:

- GA4
- Google Ads conversion tracking
- Meta Pixel

31.2 Event tracking plan

Track at minimum:

- page_view
- view_pricing
- click_contact_cta
- start_inquiry_form
- submit_inquiry_form
- click_email
- click_instagram
- click_story
- click_location_page
- view_ads_landing

31.3 UTM persistence

Persist UTM parameters client-side so attribution survives multi-page browsing before the inquiry form submission.

31.4 Rules

- no third-party scripts before consent
- no vendor scripts injected globally by default
- no Vercel analytics packages
- keep tracking clean and minimal

32. ACCESSIBILITY

Accessibility is mandatory.

Rules:

- semantic landmarks
- one H1 per page
- visible focus states
- sufficient contrast
- real text over media
- keyboard-navigable consent doorway
- keyboard-navigable drawers and lightbox
- skip link
- reduced motion support
- proper form labels
- no content understandable only through animation
- bottom-sheet components must trap and restore focus correctly

33. PERFORMANCE REQUIREMENTS

33.1 Performance goals

- strong LCP on home and service pages
- minimal CLS
- low client bundle size
- excellent mobile experience on modern 4G
- fast repeat visits thanks to static delivery

33.2 Performance rules

- server components by default
- client components only where truly required
- pre-optimized media only
- next/image used in a lightweight mode
- dynamic import for heavy lightbox code
- no unnecessary third-party scripts
- no third-party scripts before consent
- limited hero sequence payload
- no heavy autoplay video in V1 unless strongly justified

33.3 Quality checks

Run before launch:

- Lighthouse
- bundle analyzer
- mobile device testing on real phones if possible
- reduced motion check
- slow-network image loading check
- manual LCP review on home and service pages

34. SECURITY, PRIVACY, AND LEGAL

Implement:

- environment variables for public tracking IDs and form endpoint IDs
- no secrets committed to Git
- privacy page
- legal page
- cookie and consent explanation inside the doorway and policy pages
- security headers where practical through Next config or host config
- strict script blocking until consent
- basic spam prevention for forms

Recommended headers:

- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- X-Frame-Options if applicable
- Content-Security-Policy where feasible

35. GITHUB AND DEPLOYMENT WORKFLOW

35.1 Branching

- main for production
- feature branches for new work

35.2 Deployment flow

- push feature branch
- open PR
- preview deployment is generated
- review on preview URL
- merge to main
- production deploy runs

35.3 Quality gates before merge

- typecheck
- lint
- build success
- content validation
- sitemap generation check
- manual visual review
- mobile QA review for key pages

35.4 Tooling

- ESLint
- Prettier
- TypeScript strict mode
- optional Husky + lint-staged for pre-commit checks

36. TESTING STRATEGY

36.1 Unit tests

Test:

- content loaders
- frontmatter parsing
- validation schemas
- consent helpers
- sitemap utilities
- dictionary accessors
- utility functions

36.2 E2E tests with Playwright

Must cover:

- consent doorway appears on first visit
- rejecting consent does not inject analytics
- accepting consent injects analytics
- home page renders after doorway
- main navigation works
- bottom-sheet navigation works
- mobile sticky CTA appears where intended
- contact form validation works
- contact form submission success flow works
- journal pages render
- location landing pages render
- sitemap route builds correctly
- ads pages hide unnecessary navigation if intended

36.3 Manual QA

Check:

- consent doorway visual quality
- mobile scroll-snap gallery feel
- sticky CTA on iPhone and Android
- dynamic viewport height behavior
- hero cropping with browser bars
- keyboard access
- reduced motion mode
- script behavior before and after consent
- typography on real devices
- image loading on slow networks

37. THIRD-PARTY INTEGRATIONS

Mandatory:

- GitHub
- chosen host such as Vercel initially
- Formspree or Basin
- GA4 after consent
- Google Ads after consent
- Meta Pixel after consent

Useful but optional later:

- Hotjar or Microsoft Clarity only after privacy review and only if clearly justified

Do not integrate at launch:

- Vercel Analytics
- Vercel Speed Insights
- Stripe
- Auth0
- Sanity
- Contentful
- Shopify
- any backend-driven service unless requirements change

38. CONTENT OPERATIONS WORKFLOW

38.1 Adding a journal entry

- add MDX file in the correct directory
- define frontmatter
- add images in the matching public/images path
- reference assets in the content payload
- validate
- preview
- merge

38.2 Adding a landing page

- create a new structured content file
- create route page or map it through a shared page template
- assign unique copy and image selection
- define metadata
- confirm sitemap inclusion
- validate and preview

38.3 Updating global UI strings

- edit content/dictionaries/en.ts
- verify affected components render correctly
- ensure no string is hardcoded in JSX

38.4 Updating core marketing pages

- edit typed content payloads in /content/pages
- update image manifest if needed
- preview changes
- validate and merge

39. REUSABLE BLOCKS THAT MUST EXIST

Required reusable blocks:

- HeroStatement
- EditorialTextBlock
- IntroBlock
- SignatureGallery
- ImageGallery
- FloatingGallery
- StoryCardGrid
- TestimonialsBlock
- WhyChooseUs
- GeographyBlock
- ExperiencePreview
- InvestmentNote
- FAQBlock
- CTASection
- VillaIdentityBlock
- RelatedStories
- LocationLinks
- InquiryForm
- ScrollSnapCarousel
- BottomSheetMenu
- StickyMobileCTA
- ConsentDoorway

Each block should support:

- strict typed props
- optional visual variants
- optional theme variants
- optional CTA slots where relevant
- clean server/client boundaries

40. DEVELOPMENT PHASES

PHASE 0
Foundation
- repo setup
- Next.js App Router setup
- TypeScript strict mode
- Tailwind config
- design tokens
- font loading
- dictionary system
- content models
- content validation
- image manifest
- consent context and doorway
- consented script loader
- form integration
- sitemap generator

PHASE 1
Core commercial experience
- Home
- Weddings
- Elopements
- Experience
- Pricing
- About
- Contact
- Thank-you
- header and footer
- mobile bottom-sheet nav
- sticky mobile CTA
- image gallery system
- initial SEO

PHASE 2
Search growth pages
- Tuscany Wedding Photographer
- Lucca Wedding Photographer
- Florence Wedding Photographer
- Val d’Orcia Wedding Photographer
- Chianti Wedding Photographer
- Siena Wedding Photographer
- Tuscany Elopement Photographer
- Intimate Wedding in Tuscany

PHASE 3
Editorial proof system
- Journal index
- real wedding stories
- elopement stories
- guides
- related content system
- sitemap verification

PHASE 4
Ads and refinement
- Google Ads landing pages
- Meta Ads landing pages
- event tracking refinement
- performance tuning
- accessibility pass
- final mobile polish

41. ACCEPTANCE CRITERIA

The build is successful only if all of the following are true:

- every public page is statically generated
- there is no database
- there is no backend for site content
- no content is hardcoded into route JSX
- presentational blocks are reusable and prop-driven
- local content is validated at build time
- the consent doorway blocks all third-party scripts by default
- analytics and ad scripts inject only after explicit consent
- the doorway transition feels premium and coherent
- mobile galleries use swipeable scroll-snap patterns where appropriate
- bottom-sheet navigation works well on mobile
- tap targets meet minimum size requirements
- sticky-bottom CTAs work cleanly on mobile
- 100dvh hero clipping issues are avoided
- media is served from pre-optimized local assets
- next/image is used in a lightweight static-friendly way
- UI strings are centralized for future localization
- sitemap generation reads from local content automatically on build
- the project does not depend on Vercel-only analytics or platform packages
- home page feels bold and memorable
- service pages remain clear and conversion-friendly
- Villa Raffaelli appears naturally as brand origin, never as a heavy venue funnel
- SEO landing pages are materially distinct
- performance is strong on mobile
- inquiry flow is obvious and elegant

42. FINAL IMPLEMENTATION RECOMMENDATION

This website must be built as a static-first, modular, pre-CMS front-end system using Next.js App Router, TypeScript, Tailwind CSS, prop-driven reusable blocks, local typed content, MDX editorial entries, a cinematic custom consent doorway, premium mobile-native interaction patterns, and a pre-optimized media pipeline that avoids unnecessary runtime compute.

The correct technical stance is:

- Next.js App Router
- TypeScript
- Tailwind CSS first, CSS Modules only when art direction truly requires it
- React Context only for consent and global UI concerns
- no Redux
- no Zustand
- local filesystem content treated like API payloads
- no content hardcoded inside route components
- English-first with centralized UI dictionaries for future i18n
- custom consent doorway instead of a third-party CMP
- strict blocking of GA4, Meta, and Google Ads until active consent
- Framer Motion for controlled cinematic reveal
- mobile-first interaction design using scroll-snap, bottom-sheets, sticky CTAs, and 100dvh handling
- pre-optimized local assets served from /public
- next/image used mainly for layout stability, responsive behavior, and lazy loading
- automated sitemap generation from local content at build time
- no reliance on Vercel-only analytics tooling
- portable deployment architecture

If this document is followed correctly, the result will be a website that feels distinctive, rooted, elegant, privacy-conscious, mobile-premium, search-ready, and operationally light, while remaining future-ready for a later CMS or backend without forcing a redesign of the UI system.