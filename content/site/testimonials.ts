import { testimonialSchema } from "@/lib/content/schemas";

export const testimonials = {
  home: [
    {
      quote:
        "They gave Tuscany back to us in our photographs. The work felt elegant, deeply emotional, and impossibly grounded in the place itself.",
      names: "Amelia & Julian",
      location: "Lucca",
      celebrationType: "Wedding weekend",
    },
    {
      quote:
        "Everything felt calm and beautifully led. We never felt managed, only understood.",
      names: "Nora & Elias",
      location: "Upper Tuscany",
      celebrationType: "Intimate wedding",
    },
  ].map((entry) => testimonialSchema.parse(entry)),
  services: [
    {
      quote:
        "The gallery had atmosphere, rhythm, and honesty. It felt like our weekend rather than a performance.",
      names: "Sophie & Marc",
      location: "Florence",
      celebrationType: "Destination wedding",
    },
  ].map((entry) => testimonialSchema.parse(entry)),
};
