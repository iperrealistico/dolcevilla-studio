import { faqItemSchema } from "@/lib/content/schemas";

export const faqs = {
  villa: [
    {
      question: "Is Villa Raffaelli a public wedding venue?",
      answer:
        "No. Villa Raffaelli is a private villa in Garfagnana, near Lucca, and it is not run as a public venue with an open calendar.",
    },
    {
      question: "Can we have a wedding at Villa Raffaelli?",
      answer:
        "Sometimes, yes. We only consider weddings that remain very intimate and compatible with the privacy, scale, and practical limits of the property.",
    },
    {
      question: "Can we use the villa just for portraits or private vows?",
      answer:
        "Yes. Many inquiries are not about a full wedding day at the villa. Some couples want portraits, a first look, or a private exchange of vows as part of a wider Tuscany celebration.",
    },
    {
      question: "Where is the villa and why choose this part of Tuscany?",
      answer:
        "Villa Raffaelli is in Garfagnana, the greener mountain side of north Tuscany. Couples choose it for privacy, cooler air, old architecture, and easy connections to Lucca and Pisa.",
    },
  ].map((item) => faqItemSchema.parse(item)),
  experience: [
    {
      question: "Do you photograph both wedding weekends and elopements in Tuscany?",
      answer:
        "Yes. We photograph multi-day destination weddings, one-day intimate celebrations, and elopements through one consistent approach rather than treating them as unrelated services.",
    },
    {
      question: "How does planning support work if we are organizing from abroad?",
      answer:
        "We help with timeline shape, travel flow, portrait timing, light, weather alternatives, and the parts of the day where film will genuinely add something without making the schedule harder.",
    },
    {
      question: "How does film fit into the overall coverage?",
      answer:
        "Film is used where its pace, grain, and tonal character improve the photographs, while digital covers ceremonies, fast transitions, low light, and the parts of the story that need maximum reliability.",
    },
    {
      question: "How do you adapt between a larger wedding weekend and a quieter celebration?",
      answer:
        "The scale changes, but the standard does not. Larger weekends need stronger logistics and pacing coverage, while smaller days often create more room for portraits, movement, and slower film work.",
    },
    {
      question: "Do you travel across Tuscany?",
      answer:
        "Yes. We work across Lucca, Florence, Chianti, Val d'Orcia, Versilia, Pisa, and quieter parts of Tuscany when the location suits the celebration.",
    },
  ].map((item) => faqItemSchema.parse(item)),
};
