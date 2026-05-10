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
};
