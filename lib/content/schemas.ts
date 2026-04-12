import { z } from "zod";

export const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  variant: z.enum(["primary", "secondary", "ghost", "inline"]).default("primary"),
});

export const seoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(50),
  path: z.string().min(1),
  image: z.string().optional(),
  noindex: z.boolean().optional(),
  keywords: z.array(z.string()).default([]),
});

export const imageAssetSchema = z.object({
  id: z.string().min(1),
  src: z.string().startsWith("/"),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  priority: z.boolean().optional(),
  caption: z.string().optional(),
  focalPoint: z.string().optional(),
  dominantTone: z.string().optional(),
  blurDataURL: z.string().optional(),
});

export const galleryItemSchema = z.object({
  image: imageAssetSchema,
  layoutVariant: z
    .enum(["portrait", "landscape", "square", "full", "paired", "panorama"])
    .default("portrait"),
  span: z.enum(["sm", "md", "lg"]).optional(),
  caption: z.string().optional(),
  theme: z.enum(["light", "dark"]).optional(),
});

export const richSectionSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  body: z.array(z.string().min(1)).min(1),
});

export const pointSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const processStepSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const testimonialSchema = z.object({
  quote: z.string().min(1),
  names: z.string().min(1),
  location: z.string().optional(),
  celebrationType: z.string().optional(),
});

export const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const ctaSectionSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  body: z.string().min(1),
  primaryCta: linkSchema,
  secondaryCta: linkSchema.optional(),
});

export const heroSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().optional(),
  primaryCta: linkSchema,
  secondaryCta: linkSchema.optional(),
  imageIds: z.array(z.string().min(1)).min(1),
  variant: z.enum(["home", "service", "editorial", "landing", "ads"]).default("service"),
});

export const geographySchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  body: z.array(z.string().min(1)).min(1),
  places: z.array(z.string().min(1)).min(1),
});

export const villaIdentitySchema = z.object({
  variant: z.enum(["minimal", "editorial", "quote"]).default("minimal"),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  body: z.string().min(1),
});

export const craftIdentitySchema = z.object({
  variant: z.enum(["minimal", "editorial"]).default("minimal"),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  body: z.string().min(1),
  points: z.array(pointSchema).default([]),
});

export const storyCardSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  location: z.string().min(1),
  celebrationType: z.string().min(1),
  heroImage: imageAssetSchema,
  publishedAt: z.string().min(1),
  updatedAt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  category: z.string().min(1),
});

export const siteSettingsSchema = z.object({
  siteName: z.string().min(1),
  siteUrl: z.string().url(),
  defaultTitle: z.string().min(1),
  titleTemplate: z.string().min(1),
  defaultDescription: z.string().min(1),
  defaultOgImage: z.string().startsWith("/"),
  contactEmail: z.string().email(),
  instagramUrl: z.string().url(),
  primaryCTA: linkSchema,
  footerStatement: z.string().min(1),
});

export const uiDictionarySchema = z.object({
  common: z.record(z.string(), z.string()),
  navigation: z.record(z.string(), z.string()),
  forms: z.record(z.string(), z.string()),
  footer: z.record(z.string(), z.string()),
  consent: z.record(z.string(), z.string()),
  cta: z.record(z.string(), z.string()),
  errors: z.record(z.string(), z.string()),
});

export const consentStateSchema = z.object({
  hasInteracted: z.boolean(),
  analytics: z.boolean(),
  marketing: z.boolean(),
  timestamp: z.string().nullable(),
});

export const servicePageContentSchema = z.object({
  slug: z.string().min(1),
  pageType: z.enum(["home", "service", "experience", "pricing", "about", "contact", "utility"]),
  hero: heroSchema.optional(),
  intro: richSectionSchema,
  gallery: z.array(galleryItemSchema).default([]),
  highlights: z.array(pointSchema).default([]),
  craft: craftIdentitySchema.optional(),
  geography: geographySchema.optional(),
  locationLinks: z.array(linkSchema).default([]),
  stories: z.array(z.string()).default([]),
  testimonials: z.array(testimonialSchema).default([]),
  process: z.array(processStepSchema).default([]),
  investmentNote: richSectionSchema.optional(),
  faqs: z.array(faqItemSchema).default([]),
  villa: villaIdentitySchema.optional(),
  cta: ctaSectionSchema,
  seo: seoSchema,
  formIntro: richSectionSchema.optional(),
  directEmail: z.string().email().optional(),
  nextSteps: z.array(z.string()).default([]),
});

export const locationLandingSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  hero: heroSchema,
  intro: richSectionSchema,
  whyThisPlaceMatters: z.array(pointSchema).min(2),
  whyWeFit: z.array(pointSchema).min(2),
  gallery: z.array(galleryItemSchema).min(4),
  featuredStorySlugs: z.array(z.string()).min(1),
  testimonial: testimonialSchema,
  faqItems: z.array(faqItemSchema).min(3),
  investmentNote: richSectionSchema,
  seo: seoSchema,
  villaIdentityVariant: z.enum(["minimal", "editorial", "quote"]).default("minimal"),
  cta: ctaSectionSchema,
});

export const adsLandingSchema = z.object({
  slug: z.string().min(1),
  channel: z.enum(["google", "meta"]),
  hero: heroSchema,
  proof: z.array(pointSchema).min(2),
  gallery: z.array(galleryItemSchema).min(2),
  caseStudySlug: z.string().min(1),
  pricingSignal: z.string().min(1),
  faqItems: z.array(faqItemSchema).min(2),
  seo: seoSchema,
  cta: ctaSectionSchema,
});

export const journalEntryFrontmatterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  category: z.enum([
    "real-weddings",
    "elopements",
    "guides",
    "planning-notes",
    "stories-of-place",
  ]),
  location: z.string().min(1),
  celebrationType: z.string().optional(),
  serviceType: z.string().optional(),
  coverImage: z.string().min(1),
  galleryImageIds: z.array(z.string()).min(3),
  publishedAt: z.string().min(1),
  updatedAt: z.string().optional(),
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1),
  noindex: z.boolean().optional(),
  relatedSlugs: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type Link = z.infer<typeof linkSchema>;
export type SEOFields = z.infer<typeof seoSchema>;
export type ImageAsset = z.infer<typeof imageAssetSchema>;
export type GalleryItem = z.infer<typeof galleryItemSchema>;
export type RichSection = z.infer<typeof richSectionSchema>;
export type Point = z.infer<typeof pointSchema>;
export type ProcessStep = z.infer<typeof processStepSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type FAQItem = z.infer<typeof faqItemSchema>;
export type CTASection = z.infer<typeof ctaSectionSchema>;
export type HeroContent = z.infer<typeof heroSchema>;
export type CraftIdentity = z.infer<typeof craftIdentitySchema>;
export type StoryCard = z.infer<typeof storyCardSchema>;
export type SiteSettings = z.infer<typeof siteSettingsSchema>;
export type UIDictionary = z.infer<typeof uiDictionarySchema>;
export type ConsentState = z.infer<typeof consentStateSchema>;
export type ServicePageContent = z.infer<typeof servicePageContentSchema>;
export type LocationLanding = z.infer<typeof locationLandingSchema>;
export type AdsLanding = z.infer<typeof adsLandingSchema>;
export type JournalEntryFrontmatter = z.infer<typeof journalEntryFrontmatterSchema>;
