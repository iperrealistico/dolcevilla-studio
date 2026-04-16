import { uiDictionarySchema } from "@/lib/content/schemas";

export const dictionary = uiDictionarySchema.parse({
  common: {
    studioLabel: "Dolcevilla Studio",
    readStory: "Read the story",
    exploreJournal: "Explore the journal",
  },
  navigation: {
    home: "Home",
    weddings: "Weddings",
    elopements: "Elopements",
    experience: "Experience",
    film: "Film",
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
    villaInterest:
      "Curious about portraits or a very private Villa Raffaelli context",
    success: "Your inquiry is on its way. We will reply with care.",
  },
  footer: {
    contact: "Contact",
    instagram: "Instagram",
    privacy: "Privacy",
  },
  consent: {
    title: "Choose how the site should accompany you",
    body: "Optional analytics and marketing remain off until you explicitly allow them.",
    essentialOnly: "Continue with essential only",
    acceptAll: "Allow the full studio experience",
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
