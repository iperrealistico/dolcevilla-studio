import { faqItemSchema } from "@/lib/content/schemas";

export const faqs = {
  weddings: [
    {
      question: "Do you photograph full wedding weekends?",
      answer:
        "Yes. Multi-day celebrations are central to the way we work because they reveal the atmosphere, family rhythm, and landscape around the wedding itself.",
    },
    {
      question: "Do you shoot film at weddings?",
      answer:
        "Yes. One photographer always works with film alongside digital coverage. We move between 35mm for energy, 120 medium format for depth, and in selected moments large format for rare, deliberate portraiture.",
    },
    {
      question: "Why not photograph the whole wedding on film only?",
      answer:
        "Because weddings move too quickly for ideology. Film gives texture, pace, and an unfakeable physical character, while digital protects speed, changing light, low-light reliability, and the completeness of the final story.",
    },
    {
      question: "Do you help with timelines and visual flow?",
      answer:
        "Absolutely. We guide where timing affects light, movement, and emotional pace so the experience stays calm and visually coherent.",
    },
  ].map((item) => faqItemSchema.parse(item)),
  elopements: [
    {
      question: "Can film be part of an intimate Tuscany elopement?",
      answer:
        "Very much so. Smaller days often give film more room to breathe, especially for portraits, movement through landscape, and quiet transitional moments.",
    },
    {
      question: "Do you offer 120 or large format for elopements?",
      answer:
        "Yes, when the rhythm of the day supports it. Medium format is a natural fit for intimate portraiture, and large format can work beautifully for a few rare, slow frames that deserve real stillness.",
    },
    {
      question: "Is Villa Raffaelli available as a public venue?",
      answer:
        "No. It is our private creative home. In selected circumstances it may become part of a couple’s imagery or story, but never as a public venue funnel.",
    },
  ].map((item) => faqItemSchema.parse(item)),
  experience: [
    {
      question: "How does hybrid film-and-digital coverage work in practice?",
      answer:
        "One photographer always carries film while the broader coverage remains digitally dependable. That lets us use film where its pace and tonal character matter most without sacrificing responsiveness, speed, or delivery completeness.",
    },
    {
      question: "Do you travel across Tuscany?",
      answer:
        "Yes. Our work moves naturally across Lucca, Florence, Chianti, Val d’Orcia, the coast, and quieter corners of Upper Tuscany.",
    },
    {
      question: "What does support look like before the wedding?",
      answer:
        "We help shape flow, light, portrait rhythm, and the moments where film genuinely makes sense, so the day feels clear and spacious rather than forced around gear.",
    },
  ].map((item) => faqItemSchema.parse(item)),
  pricing: [
    {
      question: "Is film included in your proposals?",
      answer:
        "Yes. Hybrid film-and-digital coverage is part of the studio point of view rather than an optional gimmick. Some celebrations may also add more film stock or selected large-format work depending on the plan.",
    },
    {
      question: "Can we request more film or specific formats?",
      answer:
        "Absolutely. If 35mm, medium format, or selected large-format portraits matter to you, we can shape the proposal around that intention and the pace of the day.",
    },
  ].map((item) => faqItemSchema.parse(item)),
};
