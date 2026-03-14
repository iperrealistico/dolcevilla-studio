import { faqItemSchema } from "@/lib/content/schemas";

export const faqs = {
  weddings: [
    {
      question: "Do you photograph full wedding weekends?",
      answer:
        "Yes. Multi-day celebrations are central to the way we work because they reveal the atmosphere, family rhythm, and landscape around the wedding itself.",
    },
    {
      question: "Do you help with timelines and visual flow?",
      answer:
        "Absolutely. We guide where timing affects light, movement, and emotional pace so the experience stays calm and visually coherent.",
    },
    {
      question: "Are you best suited to destination weddings?",
      answer:
        "Yes. Most of our couples are planning from abroad and want clear communication, local knowledge, and a premium but human process.",
    },
  ].map((item) => faqItemSchema.parse(item)),
  elopements: [
    {
      question: "Can you help shape an intimate Tuscany elopement plan?",
      answer:
        "Yes. We support couples who want a quieter structure with real place, freedom, and visual honesty rather than a generic luxury formula.",
    },
    {
      question: "Do you photograph only official elopements?",
      answer:
        "No. We also photograph intimate celebrations, private vows, and portrait-driven days built around atmosphere and time together.",
    },
    {
      question: "Is Villa Raffaelli available as a public venue?",
      answer:
        "No. It is our private creative home. In selected circumstances it may become part of a couple’s imagery or story, but never as a public venue funnel.",
    },
  ].map((item) => faqItemSchema.parse(item)),
  experience: [
    {
      question: "How quickly do you reply?",
      answer:
        "We aim to respond within two business days with a thoughtful next step rather than an automated sales sequence.",
    },
    {
      question: "Do you travel across Tuscany?",
      answer:
        "Yes. Our work moves naturally across Lucca, Florence, Chianti, Val d’Orcia, the coast, and quieter corners of Upper Tuscany.",
    },
    {
      question: "What does support look like before the wedding?",
      answer:
        "We help shape flow, light, portrait rhythm, and practical timing so the day feels clear and spacious rather than rushed.",
    },
  ].map((item) => faqItemSchema.parse(item)),
  pricing: [
    {
      question: "What do most couples invest?",
      answer:
        "Most couples invest from the high four figures upward depending on coverage, travel, structure, and the rhythm of the celebration.",
    },
    {
      question: "Do you offer bespoke proposals?",
      answer:
        "Yes. We tailor proposals around days of coverage, locations, and how the celebration actually unfolds.",
    },
  ].map((item) => faqItemSchema.parse(item)),
};
