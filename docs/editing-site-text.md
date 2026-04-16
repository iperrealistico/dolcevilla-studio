# Editing Site Text

This site now pulls its visible copy from tracked content files instead of burying text inside React components.
If you change the text in the right `content/` file and rebuild or deploy, the live site will show that change without any design work.

## The Simple Rule

- Edit text in `content/`.
- Do not edit copy inside `components/` unless you are changing layout or behavior.
- Keep the object keys, commas, brackets, and quotes intact.
- Change the words on the right-hand side of each field, then build or deploy.

## Which File Controls Which Text

### Core pages

Each main site page has its own text file:

- Home: `content/pages/home.ts`
- Experience page for weddings, elopements, and the full process: `content/pages/experience.ts`
- Film page: `content/pages/film-wedding-photography.ts`
- Villa page: `content/pages/villa-raffaelli.ts`
- About: `content/pages/about.ts`
- Contact: `content/pages/contact.ts`
- Journal index page: `content/pages/journal.ts`
- 404 page: `content/pages/not-found.ts`

### Journal posts

Each article lives in its own MDX file under `content/journal/`.

- Example: `content/journal/guides/tuscany-wedding-guide-for-us-couples.mdx`
- Edit the frontmatter at the top for metadata like title, excerpt, and date.
- Edit the body below for the article itself.
- Shared journal-article shell text such as breadcrumbs and the fallback CTA lives in `content/journal/template.ts`.

## Shared Sitewide Text

Some visible text appears in multiple places across the site. Those strings now live in dedicated shared content files:

- Brand name, site-wide SEO text, main CTA, footer statement:
  `content/site/settings.ts`
- Header navigation labels and footer location links:
  `content/site/navigation.ts`
- Shared UI labels and repeated section headings:
  `content/site/ui.ts`
- Inquiry form field labels, options, button text, and validation messages:
  `content/site/forms.ts`
- Consent doorway copy:
  `content/site/consent.ts`
- Privacy dialog copy:
  `content/site/privacy.ts`
- Shared FAQ entries reused across pages:
  `content/site/faqs.ts`
- Shared testimonials reused across pages:
  `content/site/testimonials.ts`

## How To Edit Safely

1. Find the page or shared area you want to change in the map above.
2. Open that file and change only the text values.
3. Do not rename field names such as `title`, `heading`, `body`, `label`, or `href`.
4. Save the file.
5. Run `pnpm build` locally or trigger your normal deployment.

If the build succeeds, the updated text is ready for the live site.

## Example

If you want to change the main heading on the About page, edit:

- `content/pages/about.ts`

If you want to change the footer statement used across the whole site, edit:

- `content/site/settings.ts`

If you want to change the wording inside the inquiry form, edit:

- `content/site/forms.ts`

## What Not To Change For Copy Edits

Avoid editing these unless you are intentionally changing design or logic:

- `components/`
- `app/`
- `lib/`

Those folders control rendering, layout, and behavior.
For normal copy updates, `content/` is the source of truth.
