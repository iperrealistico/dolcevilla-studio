# Dolcevilla Studio System Overview

This tracked document gives a repo-oriented overview of the workspace.
It intentionally stays lighter and less sensitive than the local-only dossier.

## Scope And Source Of Truth

- Use this file for the high-level architecture of the tracked codebase.
- Use `docs/reference/` for historical intent and archived context.
- Use `START-HERE-AI.local.md` and `documents-local/platform-dossier/` for current live-state, migration notes, incident history, and sensitive operational details.
- When this file and the local dossier differ, trust the local dossier for operational truth and record the divergence.

## Product/System Summary

Dolcevilla Studio is a static-first Next.js marketing site for a premium Tuscany wedding photography brand. It combines:

- a public editorial marketing site;
- journal content rendered from local MDX files;
- typed local content for the core site pages and shared UI;
- consent-gated analytics and ad tracking;
- an inquiry form that posts JSON to an external public endpoint.

## Repository Map

- `app/`
  - App Router routes for public pages, journal entries, and metadata endpoints.
- `components/`
  - reusable UI blocks, layout primitives, motion wrappers, galleries, forms, consent surfaces, and templates.
- `content/`
  - typed page payloads, site settings, shared copy, and MDX journal entries.
- `lib/`
  - content loaders, analytics helpers, form submission utilities, SEO helpers, image manifest, and shared utilities.
- `public/`
  - static assets including AI placeholder imagery, film-focused generated imagery, OG assets, and team portraits.
- `scripts/`
  - content validation and image manifest output helpers.
- `tests/`
  - unit tests plus Playwright end-to-end coverage.
- `docs/reference/`
  - tracked original brief material plus archived historical AI memory.
- `documents-local/`
  - local-only operational control plane and dossier.

## Main Components In The Current Workspace

- Next.js 16.1.6 App Router frontend using React 19 and TypeScript.
- Tailwind CSS 4 styling plus shared tokens and art-direction-heavy components.
- Local typed content objects for core pages, settings, FAQs, and shared UI copy.
- Frontend-only image placement via a local slot map in `content/site/image-slots.json`, resolved against the curated asset library in `lib/images/imageLibrary.ts`.
- Local MDX journal pipeline for stories, guides, and planning content.
- Consent-gated analytics integrations for GA4, Google Ads, and Meta Pixel.
- External inquiry submission path configured through `NEXT_PUBLIC_INQUIRY_ENDPOINT`.

## Known Live Or Runtime Divergence

- Vercel production deployment metadata and public `*.vercel.app` aliases were verified on 2026-04-13.
- The site metadata uses `https://dolcevilla.studio` as the canonical URL.
- A direct DNS/HTTP check from this workspace could not resolve `dolcevilla.studio` on 2026-04-13, so the custom-domain status should be treated as unresolved until re-verified.
- No shell-level access to the deployed runtime or Vercel environment variables was used during the first control-plane bootstrap.

## Developer Entry Points

1. `README.md`
2. `docs/system-overview.md`
3. `START-HERE-AI.local.md`
4. `documents-local/platform-dossier/00-indice-maestro.md`
5. `package.json`
6. `content/site/settings.ts`
7. `lib/content/validateContent.ts`

## Related Documentation

- `README.md`
- `editing-site-text.md`
- `docs/reference/README.md`
- `../START-HERE-AI.local.md`
- `../documents-local/platform-dossier/`
