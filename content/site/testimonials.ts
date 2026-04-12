import { testimonialSchema } from "@/lib/content/schemas";

export const testimonials = {
  home: [
    {
      quote:
        "They gave Tuscany back to us in our photographs. The film frames had a depth we could feel instantly, and the full gallery still felt complete, calm, and incredibly well covered.",
      names: "Amelia & Julian",
      location: "Lucca",
      celebrationType: "Wedding weekend",
    },
    {
      quote:
        "Everything felt calm and beautifully led. We never felt managed, only understood, and the mix of film and digital made the gallery feel tactile in a way we had hoped for but could not describe.",
      names: "Nora & Elias",
      location: "Upper Tuscany",
      celebrationType: "Intimate wedding",
    },
  ].map((entry) => testimonialSchema.parse(entry)),
  services: [
    {
      quote:
        "The gallery had atmosphere, rhythm, and honesty. The film moments felt impossible to fake, and the digital coverage meant nothing important was ever missed.",
      names: "Sophie & Marc",
      location: "Florence",
      celebrationType: "Destination wedding",
    },
  ].map((entry) => testimonialSchema.parse(entry)),
};
