import { servicePageContentSchema } from "@/lib/content/schemas";
import { buildGallery } from "@/lib/images/imageManifest";

export const aboutPage = servicePageContentSchema.parse({
  slug: "about",
  pageType: "about",
  hero: {
    eyebrow: "About",
    title: "A Tuscany-rooted studio shaped by art, place, film craft, and emotional restraint.",
    subtitle:
      "Dolcevilla Studio was formed around Villa Raffaelli, Upper Tuscany, and a belief that traditional photographic tools still tell the truth differently when they are used with real skill.",
    primaryCta: { label: "Get in touch", href: "/contact" },
    imageIds: ["villaLibraryPortrait", "homeCoupleQuiet", "villaCourtyard"],
    variant: "editorial",
  },
  intro: {
    eyebrow: "Who we are",
    heading: "We believe weddings are best photographed with taste, clarity, and a real relationship to both place and process.",
    body: [
      "This is not a long biography page. It is a compact portrait of the visual world, the geography, and the hybrid craft behind the work.",
      "We care deeply about Tuscany, but also about the authenticity of traditional tools. One photographer always works with film during a wedding, and the studio’s analog practice continues through proofing, darkroom thinking, and a slower relationship to the image.",
    ],
  },
  team: {
    eyebrow: "The studio",
    heading: "Four principal leads, with a wider studio behind the work.",
    body: [
      "The visible direction of the studio sits with four people, but the work is carried by a wider circle of producers, photographers, film hands, and finishers shaped by the same taste.",
      "That shared culture keeps the experience calm for the couple while the execution stays exacting from the first call to the final delivery.",
    ],
    groupNote:
      "Beyond the four visible leads is a larger working studio moving with the same eye for light, restraint, hospitality, film handling, and finish.",
    supportingRoles: [],
    members: [
      {
        name: "Lisa Mazzei",
        role: "Creative Director + Lead Photographer",
        quote: "A wedding should feel observed from the inside, not styled from the outside.",
        imageId: "teamLisaMazzei",
      },
      {
        name: "Alberto Pellegrinetti",
        role: "Managing Director / Executive Producer & Photographer",
        quote: "The most luxurious production is the one the couple barely notices.",
        imageId: "teamAlbertoPellegrinetti",
      },
      {
        name: "Leonardo Fiori",
        role: "Head of Film Lab + Archive Curator & Photographer",
        quote: "Film matters because it is physical judgment, not an effect added later.",
        imageId: "teamLeonardoFiori",
      },
      {
        name: "Francesco Tarantino",
        role: "Head of Postproduction + Digital Imaging Director & Photographer",
        quote: "Finishing should preserve atmosphere and skin, not polish the life out of it.",
        imageId: "teamFrancescoTarantino",
      },
    ],
  },
  gallery: buildGallery([
    { id: "film35mmRollStillLife", layoutVariant: "portrait" },
    { id: "film120RollStyling", layoutVariant: "portrait" },
    { id: "film4x5SheetHolder", layoutVariant: "landscape" },
    { id: "filmCameraCollectionStudioTable", layoutVariant: "landscape" },
    { id: "darkroomFilmShelvesTools", layoutVariant: "landscape" },
    { id: "darkroomSinkPrintsPortrait", layoutVariant: "portrait" },
  ]),
  highlights: [
    {
      title: "Visual philosophy",
      description: "Emotion matters most when it is held inside strong composition, rhythm, and lived atmosphere.",
    },
    {
      title: "Analog craft matters",
      description: "Film is not there to cosplay the past. It is there because grain, pace, and the physical negative still create something digital cannot honestly imitate.",
    },
    {
      title: "Upper Tuscany still matters",
      description: "This quieter geography gives the brand its texture and distinction without becoming the whole identity.",
    },
  ],
  craft: {
    variant: "editorial",
    eyebrow: "The craft",
    title: "35mm, 120, large format, and the judgment to know when each belongs.",
    body:
      "Not everybody can work this way well. Each format asks for a different pace, different exposure judgment, and different discipline under real wedding pressure. That is exactly why it matters to us.",
    imageId: "filmCameraCollectionStudioTable",
    points: [
      {
        title: "35mm",
        description: "Fast, instinctive, and alive. It belongs to gesture, documentary movement, and the electricity of a real wedding day.",
      },
      {
        title: "120 medium format",
        description: "Slower and more dimensional. It gives portraits, details, and architectural space a richer sense of weight.",
      },
      {
        title: "Large format",
        description: "Rare, deliberate, and demanding. It is for very selected frames where time, stillness, and craft all line up.",
      },
      {
        title: "Darkroom literacy",
        description: "The analog side of the studio is real. We work with proof sheets, negatives, and darkroom thinking rather than treating film as surface decoration.",
      },
    ],
  },
  stories: ["inside-our-darkroom", "villa-raffaelli-mornings"],
  villa: {
    variant: "editorial",
    title: "Villa Raffaelli is part of the origin, not the total identity.",
    body: "It is where the brand’s taste, stillness, and point of view were formed, but the studio is equally defined by how it photographs: hybrid, tactile, and technically intentional.",
    imageId: "homeHeroVilla",
  },
  cta: {
    title: "If this world feels close to yours, let’s talk.",
    body: "We’d love to hear about the place, the feeling, and the photographic language you want the day to hold.",
    primaryCta: { label: "Start your inquiry", href: "/contact" },
  },
  seo: {
    title: "About Dolcevilla Studio",
    description:
      "Learn more about Dolcevilla Studio, a Tuscany wedding photography brand shaped by art, place, Villa Raffaelli, and a hybrid film-plus-digital craft.",
    path: "/about",
  },
});
