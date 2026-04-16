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
    title: "Hybrid wedding photography for couples who want film to mean something real.",
    subtitle:
      "Place still matters to us, but so does the physical truth of an image. One photographer always works with film alongside digital coverage, moving between 35mm, 120 medium format, and in selected moments large format.",
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
    eyebrow: "Why we do both",
    heading: "We believe traditional tools still tell the truth differently, but we also believe weddings deserve complete coverage.",
    body: [
      "Film is not there to imitate the past. It is there because its grain, pace, highlight behavior, and physical process still create something digital cannot honestly counterfeit.",
      "Digital is not the lesser medium in our eyes. It is the reason the coverage remains reliable under pressure. The strength of the work comes from knowing exactly where each tool belongs.",
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
      title: "Film is part of the coverage",
      description: "One photographer always works with film. It is built into the studio’s visual language rather than offered as a novelty add-on.",
    },
    {
      title: "Digital keeps the story whole",
      description: "Ceremonies, weather shifts, fast family movement, and low light still need the speed and dependability of digital.",
    },
    {
      title: "The darkroom is real",
      description: "Our analog practice is grounded in proof sheets, negatives, and darkroom literacy, not just camera styling and film rhetoric.",
    },
  ],
  craft: {
    variant: "editorial",
    eyebrow: "The hybrid method",
    title: "35mm, 120, large format, and digital each solve a different part of the wedding day.",
    body:
      "This is why the work feels both tactile and dependable. We are not trying to force one ideology over the whole day. We are trying to make the strongest pictures possible with the right pace, the right tool, and the right amount of pressure for each moment.",
    imageId: "page.film-wedding-photography.craft.image",
    points: [
      {
        title: "35mm",
        description: "Quick, instinctive, and documentary for movement, dinners, laughter, and direct-flash energy.",
      },
      {
        title: "120 medium format",
        description: "Richer, slower, and more dimensional for portraits, details, architecture, and visual calm.",
      },
      {
        title: "Large format",
        description: "Rare and demanding, used only when a frame deserves ceremony, patience, and true stillness.",
      },
      {
        title: "Digital",
        description: "The operational backbone for speed, reliability, redundancy, and full narrative coverage.",
      },
    ],
  },
  stories: [],
  testimonials: testimonials.services,
  investmentNote: {
    eyebrow: "What to expect",
    heading: "Hybrid coverage is part of our baseline. More film ambition can shape the scope.",
    body: [
      "We already build film into the way we work. Some couples also want more stock, more medium format, or selected large-format portraits, and that can be discussed as part of a bespoke proposal.",
    ],
  },
  cta: {
    eyebrow: "Film inquiries",
    title: "If analog craft matters to you, let’s talk about where it belongs in the day.",
    body: "Tell us your date, your place, and whether you are drawn to 35mm candor, medium-format portrait depth, or the ceremony of selected large-format frames.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
    secondaryCta: { label: "See wedding stories", href: "/journal", variant: "secondary" },
  },
  seo: {
    title: "Film Wedding Photography In Tuscany",
    description:
      "Discover Dolcevilla Studio’s hybrid approach to film wedding photography in Tuscany, combining 35mm, 120 medium format, large format, and digital coverage with real craft and real reliability.",
    path: "/film-wedding-photography",
    keywords: [
      "film wedding photography tuscany",
      "35mm wedding photographer italy",
      "medium format wedding photography tuscany",
      "large format wedding portraits",
    ],
  },
});

export const filmWeddingPhotographyDetails = {
  reasonsIntro: richSectionSchema.parse({
    eyebrow: "Why film",
    heading: "Ten reasons film gives something digital cannot fully replace.",
    body: [
      "This is not about romanticizing imperfection. It is about understanding the specific visual and emotional qualities film still gives to wedding photography when it is used with intent.",
    ],
  }),
  reasons: [
    {
      title: "Tonal roll-off",
      description: "Film handles highlights and transitions with a softness that often feels more natural and less aggressively clinical than digital capture.",
    },
    {
      title: "Real grain",
      description: "Grain is part of the material itself, not a texture added afterwards. It changes the emotional temperature of a frame in a way presets rarely do convincingly.",
    },
    {
      title: "Pace",
      description: "Film slows the photographer just enough to make decisions with more care. That shift in attention changes the pictures before the shutter is even pressed.",
    },
    {
      title: "Color depth",
      description: "Film color often separates tones with a subtlety that feels lived-in, especially in skin, stone, fabric, and evening light.",
    },
    {
      title: "Physical truth",
      description: "A negative is a physical object. That matters psychologically and visually. It changes the relationship to permanence and authorship.",
    },
    {
      title: "Portrait presence",
      description: "Medium and large formats in particular give portraits a weight and stillness that can feel more sculptural and less fleeting.",
    },
    {
      title: "Documentary energy",
      description: "35mm carries movement, flash, spontaneity, and imperfection with a kind of life that is difficult to fake without becoming self-conscious.",
    },
    {
      title: "Heirloom value",
      description: "Film frames often feel less disposable from the beginning. They arrive with a built-in sense of rarity and consequence.",
    },
    {
      title: "Editing discipline",
      description: "Because every frame costs attention, stock, and time, film encourages a stronger instinct for selection and sequencing across the whole day.",
    },
    {
      title: "Unfakeable character",
      description: "You can imitate the idea of film digitally, but the real interaction of stock, light, lens, and process still carries a character that is hard to counterfeit honestly.",
    },
  ].map((item) => pointSchema.parse(item)),
  whyBothIntro: richSectionSchema.parse({
    eyebrow: "Why not film only",
    heading: "Why digital is still essential to a wedding day.",
    body: [
      "A wedding is not a studio project. The emotional and logistical complexity of the day means film alone would be too rigid. Doing both well is what makes the coverage both beautiful and trustworthy.",
    ],
  }),
  whyBoth: [
    {
      title: "Ceremonies move too fast",
      description: "There are moments you do not get twice. Digital protects speed, sequence, and responsiveness when the pressure is highest.",
    },
    {
      title: "Low light changes everything",
      description: "Even the most beautiful candlelit dinner needs a tool that can respond quickly and cleanly when the light falls away.",
    },
    {
      title: "Family rhythm is unpredictable",
      description: "Groups, hugs, greetings, and emotional overlaps need the flexibility of digital so nothing important is sacrificed to slowness.",
    },
    {
      title: "Coverage must be complete",
      description: "Film gives distinction. Digital makes sure the final story is not missing structural moments the couple will later care deeply about.",
    },
    {
      title: "Redundancy matters",
      description: "Professional wedding coverage needs operational safety, consistency, and a workflow that can handle the unexpected without compromise.",
    },
  ].map((item) => pointSchema.parse(item)),
  formatsIntro: richSectionSchema.parse({
    eyebrow: "The formats",
    heading: "35mm, 120, and large format are not interchangeable.",
    body: [
      "Each format carries a different rhythm and should be used for different reasons. The point is not to use every tool all the time. The point is to know when each one becomes meaningful.",
    ],
  }),
  formats: [
    {
      title: "35mm photography",
      description: "35mm is where film becomes quick, loose, and documentary. It belongs to movement, guest interaction, direct flash, arrivals, dinners, dancing, and the human unpredictability of a real celebration.",
    },
    {
      title: "120 medium format",
      description: "120 is slower and more dimensional. It is ideal for portraits, details, interiors, and moments that need more shape, more depth, and a stronger sense of visual weight.",
    },
    {
      title: "Large format",
      description: "Large format is rare by design. It asks for patience, precise focus, and collaboration. When it works, it produces heirloom frames with an extraordinary sense of stillness and ceremony.",
    },
  ].map((item) => pointSchema.parse(item)),
  skillsIntro: richSectionSchema.parse({
    eyebrow: "Why few do it well",
    heading: "Not everybody is able to work this way under wedding pressure.",
    body: [
      "It is one thing to admire film. It is another to meter it accurately, move between formats, direct people calmly, keep pace with a wedding, and still deliver a complete story. That combination is uncommon for a reason.",
    ],
  }),
  skills: [
    {
      title: "Exposure judgment",
      description: "Film demands stronger metering discipline and a deeper understanding of light than a purely reactive digital workflow.",
    },
    {
      title: "Format discipline",
      description: "35mm, 120, and large format each ask for different pacing, loading habits, and compositional decisions in real time.",
    },
    {
      title: "Workflow restraint",
      description: "Knowing when not to use film is part of the expertise. Good hybrid work depends on judgment, not enthusiasm alone.",
    },
    {
      title: "Analog literacy",
      description: "Darkroom, proofing, negatives, archival thinking, and print sensitivity all shape the final result, even before the gallery is delivered.",
    },
  ].map((item) => pointSchema.parse(item)),
  darkroom: richSectionSchema.parse({
    eyebrow: "The darkroom",
    heading: "We have a darkroom because the analog side of the studio is meant to be real, not decorative.",
    body: [
      "The darkroom keeps the film promise honest. It ties the work back to proof sheets, negatives, exposure judgment, and a physical relationship with the image that goes far beyond buying a camera with the right look.",
      "That darkroom thinking also influences the whole studio: how we edit, how we sequence, how we think about print, and how we protect the difference between genuine analog craft and digital imitation.",
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
        "Only in selected moments, and that is exactly the point. Large format is not for everything. It is for a few quiet frames where patience and stillness can genuinely exist.",
    },
    {
      question: "Does the darkroom mean everything is processed in-house?",
      answer:
        "What matters is that the analog side of the studio is grounded in real darkroom and proofing practice. That knowledge shapes how we expose, edit, sequence, and protect the integrity of the film work.",
    },
  ].map((item) => faqItemSchema.parse(item)),
} as const;
