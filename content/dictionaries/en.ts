import { uiDictionarySchema } from "@/lib/content/schemas";

export const dictionary = uiDictionarySchema.parse({
  common: {
    studioLabel: "Dolcevilla Studio",
    readStory: "Read the story",
    exploreJournal: "Explore the journal",
    viewPricing: "View pricing",
  },
  navigation: {
    home: "Home",
    weddings: "Weddings",
    elopements: "Elopements",
    experience: "Experience",
    film: "Film",
    pricing: "Pricing",
    journal: "Journal",
    about: "About",
    contact: "Contact",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
  },
  forms: {
    submit: "Send inquiry",
    sending: "Sending...",
    names: "Names",
    email: "Email",
    weddingDate: "Wedding date",
    location: "Location",
    venue: "Venue",
    guestCount: "Guest count",
    celebrationType: "Celebration type",
    photographyBudgetRange: "Photography budget range",
    message: "Message",
    filmInterest: "Interested in hybrid film coverage",
    villaInterest: "Curious about portraits or a very private Villa Raffaelli context",
    success: "Your inquiry is on its way. We will reply with care.",
  },
  footer: {
    contact: "Contact",
    instagram: "Instagram",
    privacy: "Privacy",
    legal: "Legal",
  },
  consent: {
    title: "Step quietly into our world",
    body: "Choose the experience you want. We only activate analytics and advertising after explicit permission.",
    essentialOnly: "Essential only",
    acceptAll: "Accept analytics and marketing",
  },
  cta: {
    inquire: "Start your inquiry",
    stories: "See selected stories",
    availability: "Check availability",
  },
  errors: {
    generic: "Something went wrong. Please try again in a moment.",
  },
});
