import {
  faqItemSchema,
  pointSchema,
  richSectionSchema,
  servicePageContentSchema,
} from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";
import { testimonials } from "@/content/site/testimonials";

export const filmWeddingPhotographyPage = servicePageContentSchema.parse({
  slug: "film-wedding-photography",
  pageType: "service",
  hero: {
    eyebrow: "Film wedding photography in Tuscany",
    title: "Film wedding photography in Tuscany, with digital coverage that keeps the day secure.",
    subtitle:
      "Dolcevilla Studio works from a private villa studio near Lucca, using 35mm, medium format, selected large-format frames, and dependable digital backup for couples who want film to be a real part of the coverage.",
    primaryCta: { label: "Ask about film coverage", href: "/contact" },
    secondaryCta: { label: "Read the journal", href: "/journal", variant: "secondary" },
    imageIds: [
      "page.film-wedding-photography.hero.primary",
      "page.film-wedding-photography.hero.secondary",
      "page.film-wedding-photography.hero.tertiary",
      "page.film-wedding-photography.hero.quaternary",
    ],
    variant: "service",
  },
  intro: {
    eyebrow: "Why film still matters",
    heading: "Because film changes the photographs, and digital protects the wedding day.",
    body: [
      "Film gives weddings something digital does not: different highlight handling, real grain, a slower pace, and a physical negative behind the image. That difference is why we keep it in the work.",
      "But a wedding is not a controlled studio set. Ceremonies move quickly, light changes fast, and family moments do not repeat. That is why digital backup is built into the coverage from the beginning.",
    ],
  },
  gallery: buildGallery([
    { id: "page.film-wedding-photography.gallery.1", layoutVariant: "portrait" },
    { id: "page.film-wedding-photography.gallery.2", layoutVariant: "portrait" },
    { id: "page.film-wedding-photography.gallery.3", layoutVariant: "portrait" },
    { id: "page.film-wedding-photography.gallery.4", layoutVariant: "portrait" },
    { id: "page.film-wedding-photography.gallery.5", layoutVariant: "portrait" },
    { id: "page.film-wedding-photography.gallery.6", layoutVariant: "portrait" },
    { id: "page.film-wedding-photography.gallery.7", layoutVariant: "landscape" },
    { id: "page.film-wedding-photography.gallery.8", layoutVariant: "portrait" },
    { id: "page.film-wedding-photography.gallery.9", layoutVariant: "portrait" },
    { id: "page.film-wedding-photography.gallery.10", layoutVariant: "landscape" },
    { id: "page.film-wedding-photography.gallery.11", layoutVariant: "landscape" },
    { id: "page.film-wedding-photography.gallery.12", layoutVariant: "landscape" },
    { id: "page.film-wedding-photography.gallery.13", layoutVariant: "landscape" },
    { id: "page.film-wedding-photography.gallery.14", layoutVariant: "landscape" },
    { id: "page.film-wedding-photography.gallery.15", layoutVariant: "landscape" },
  ]),
  highlights: [
    {
      title: "Film is already part of the job",
      description: "One photographer always works with film during the wedding. It is not an upgrade invented for the brochure after the fact.",
    },
    {
      title: "Digital backup protects the day",
      description: "Ceremonies, changing weather, low light, and fast family movement still need the speed, flexibility, and reliability of digital coverage.",
    },
    {
      title: "The darkroom changes how we work",
      description: "Proof sheets, negatives, scanning, and print-minded editing shape the way we expose, select, and finish the film work.",
    },
  ],
  craft: {
    variant: "editorial",
    eyebrow: "How the hybrid method works",
    title: "Each format has a job. None of them is there for show.",
    body:
      "35mm, medium format, large format, and digital do different things well. Good hybrid coverage is not about using every camera all day. It is about choosing the right tool for the moment and keeping the whole story coherent.",
    imageId: "page.film-wedding-photography.craft.image",
    points: [
      {
        title: "35mm for movement and flash",
        description: "Fast, flexible, and ideal for arrivals, dinners, dancing, quick reactions, and the direct-flash energy many couples ask us for.",
      },
      {
        title: "120 for portraits and detail",
        description: "Slower and richer for faces, fabrics, interiors, architecture, florals, and the frames that need more depth and shape.",
      },
      {
        title: "Large format for selected heirloom frames",
        description: "Reserved for a few quiet images that deserve more time, more stillness, and a stronger sense of permanence.",
      },
      {
        title: "Digital for pace and redundancy",
        description: "The backbone for ceremonies, fast transitions, difficult light, coverage security, and the parts of the story that cannot be repeated.",
      },
    ],
  },
  stories: [],
  testimonials: testimonials.services,
  investmentNote: {
    eyebrow: "What to expect",
    heading: "Film is already built into the way we work. More of it can shape the proposal.",
    body: [
      "Some couples are happy with our usual hybrid balance. Others want more rolls, more medium format, or a few large-format portraits, and we can build the proposal around that.",
    ],
  },
  cta: {
    eyebrow: "Film inquiries",
    title: "If film is a real priority for you, tell us where you want it to matter most.",
    body: "Tell us your date, your venue, and whether you care most about 35mm candor, medium-format portraits, a few large-format frames, or simply a strong film-and-digital balance.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
    secondaryCta: { label: "Read the journal", href: "/journal", variant: "secondary" },
  },
  seo: {
    title: "Film Wedding Photographer in Tuscany | Dolcevilla Studio",
    description:
      "Dolcevilla Studio is a film wedding photographer in Tuscany, combining 35mm, medium format, selected large-format frames, digital backup, and real darkroom knowledge for full wedding coverage.",
    path: "/film-wedding-photography",
    keywords: [
      "film wedding photographer tuscany",
      "hybrid film and digital wedding photographer",
      "35mm wedding photographer italy",
      "medium format wedding photographer italy",
      "tuscany film wedding photography",
    ],
  },
});

export const filmWeddingPhotographyDetails = {
  reasonsIntro: richSectionSchema.parse({
    eyebrow: "Why couples ask for film",
    heading: "Ten reasons film still earns its place in wedding photography.",
    body: [
      "This is not about nostalgia for old tools. It is about the real visual and practical differences film brings when it is used with experience.",
    ],
  }),
  reasons: [
    {
      title: "Highlight handling",
      description: "Film usually carries bright dresses, skin, candles, and window light with a softer transition than digital capture.",
    },
    {
      title: "Real grain",
      description: "The grain is in the material itself, not added later in editing, and it changes the texture of the image in a way presets do not fully reproduce.",
    },
    {
      title: "Pace",
      description: "Film forces slower, more deliberate decisions, and that shift in attention changes the photograph before the shutter is even pressed.",
    },
    {
      title: "Color separation",
      description: "Skin, stone, fabric, greenery, and evening light often separate with a depth that feels different from digital color alone.",
    },
    {
      title: "A physical negative",
      description: "There is a real piece of film behind the image, and that changes the way many couples think about permanence, authorship, and archive value.",
    },
    {
      title: "Portrait depth",
      description: "Medium and large format can give portraits more weight, more stillness, and a stronger sense of presence.",
    },
    {
      title: "Flash energy",
      description: "35mm film and direct flash together can carry dinners, dancing, movement, and spontaneity with a look many couples want specifically because it does not feel too polished.",
    },
    {
      title: "A stronger sense of occasion",
      description: "Because each frame costs time and stock, film naturally makes certain moments feel more considered from the beginning.",
    },
    {
      title: "Editing discipline",
      description: "A film workflow encourages tighter selection and stronger sequencing across the final gallery.",
    },
    {
      title: "Character you do not fully fake",
      description: "You can borrow part of the palette digitally, but not the exact way stock, light, lens, and process interact.",
    },
  ].map((item) => pointSchema.parse(item)),
  whyBothIntro: richSectionSchema.parse({
    eyebrow: "Why not film only",
    heading: "Why we do not promise film-only wedding coverage.",
    body: [
      "A wedding is too fast, too emotional, and too unpredictable to treat like a studio exercise. Doing both well is what makes the coverage beautiful and trustworthy at the same time.",
    ],
  }),
  whyBoth: [
    {
      title: "Ceremonies are unforgiving",
      description: "There are moments you do not get twice. Digital protects speed, sequence, and responsiveness when the pressure is highest.",
    },
    {
      title: "Low light changes the equation",
      description: "Even a beautiful candlelit dinner still needs a tool that can respond quickly and cleanly when light falls away.",
    },
    {
      title: "Family rhythm is unpredictable",
      description: "Groups, hugs, greetings, and overlapping reactions need the flexibility of digital so nothing important is lost to slowness.",
    },
    {
      title: "The story still has to be complete",
      description: "Film gives distinction. Digital makes sure the final gallery is not missing the structural moments the couple will later care deeply about.",
    },
    {
      title: "Backup matters",
      description: "Professional wedding coverage needs redundancy, consistency, and a workflow that can absorb the unexpected without compromise.",
    },
  ].map((item) => pointSchema.parse(item)),
  formatsIntro: richSectionSchema.parse({
    eyebrow: "The formats",
    heading: "35mm, medium format, and large format belong to different moments.",
    body: [
      "Each format has a different pace and a different visual effect. The point is not to use every tool all the time. The point is to know when each one becomes useful.",
    ],
  }),
  formats: [
    {
      title: "35mm photography",
      description: "35mm is the quickest film format we use. It belongs to movement, guest interaction, direct flash, arrivals, dinners, dancing, and the unpredictability of a real wedding.",
    },
    {
      title: "Medium format",
      description: "Medium format is slower and richer. It works best for portraits, details, interiors, and the frames that need more shape, depth, and visual weight.",
    },
    {
      title: "Large format",
      description: "Large format is rare by design. It asks for patience, precision, and collaboration, and it is best kept for a few quiet heirloom frames.",
    },
  ].map((item) => pointSchema.parse(item)),
  skillsIntro: richSectionSchema.parse({
    eyebrow: "Why few do it well",
    heading: "Hybrid film coverage only works when the photographer can manage it under pressure.",
    body: [
      "It is one thing to like film. It is another to meter it accurately, switch formats quickly, direct people calmly, and still keep a wedding day moving without gaps in coverage.",
    ],
  }),
  skills: [
    {
      title: "Metering under pressure",
      description: "Film demands stronger exposure judgment and a deeper understanding of light than a fully reactive digital workflow.",
    },
    {
      title: "Switching formats without losing pace",
      description: "35mm, medium format, large format, and digital each ask for different handling, loading habits, and timing decisions in real time.",
    },
    {
      title: "Knowing when to move to digital",
      description: "Good hybrid work depends on judgment. Part of the expertise is knowing when film adds value and when digital is the better choice.",
    },
    {
      title: "Handling the analog side properly",
      description: "Negatives, proofing, scanning, archiving, and print sensitivity all shape the final result long before the gallery is delivered.",
    },
  ].map((item) => pointSchema.parse(item)),
  darkroom: richSectionSchema.parse({
    eyebrow: "The darkroom",
    heading: "The darkroom matters because it keeps the film promise honest.",
    body: [
      "The analog side of the studio is not decorative. The darkroom ties the work back to proof sheets, negatives, exposure judgment, scanning discipline, and a physical relationship with the image that goes beyond simply buying film cameras.",
      "That knowledge shapes the whole workflow. It influences how we expose, how we edit, how we sequence, how we think about print, and how we protect the difference between real film work and a digital imitation of it.",
    ],
  }),
  faqs: [
    {
      question: "Do you always shoot film?",
      answer:
        "Yes. One photographer always works with film as part of the coverage. The balance between film and digital changes with the day, but hybrid craft is part of the studio from the beginning.",
    },
    {
      question: "Can we ask for more film or more specific formats?",
      answer:
        "Absolutely. Some couples care especially about 35mm candor, others about medium-format portraits, and some want a few large-format heirloom frames. We can shape the proposal around that.",
    },
    {
      question: "Is large format realistic on a wedding day?",
      answer:
        "Yes, but only in selected moments. Large format is not for everything. It is for a few quiet frames where patience and stillness can genuinely exist.",
    },
    {
      question: "Does the darkroom mean everything is processed in-house?",
      answer:
        "What matters most is that the analog side of the studio is grounded in real darkroom and proofing practice. That knowledge shapes how we expose, edit, sequence, scan, and protect the integrity of the film work.",
    },
  ].map((item) => faqItemSchema.parse(item)),
} as const;
