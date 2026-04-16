import { faqItemSchema } from "@/lib/content/schemas";

export const faqs = {
  villa: [
    {
      question: "Is Villa Raffaelli a public venue?",
      answer:
        "No. It remains a private creative base, not a public venue with an open booking calendar.",
    },
    {
      question: "Can we get married there?",
      answer:
        "In selected circumstances, yes, but only for very intimate weddings where the scale, privacy, and atmosphere truly suit the place.",
    },
    {
      question: "Can we use it for portraits if our wedding is elsewhere?",
      answer:
        "Yes. Some couples are interested in Villa Raffaelli for portraits, a first look, or a private editorial chapter around a larger celebration elsewhere in Tuscany.",
    },
    {
      question: "Where is Villa Raffaelli?",
      answer:
        "It is in Garfagnana in north Tuscany, within practical reach of Lucca and Pisa and connected to the greener mountain side that leads toward the Cinque Terre.",
    },
  ].map((item) => faqItemSchema.parse(item)),
  experience: [
    {
      question: "Do you photograph both full wedding weekends and elopements?",
      answer:
        "Yes. The page now brings both formats together because we handle multi-day weddings, intimate wedding days, and elopements through one consistent experience rather than as separate philosophies.",
    },
    {
      question: "How does hybrid film-and-digital coverage work in practice?",
      answer:
        "One photographer always carries film while the broader coverage remains digitally dependable. That lets us use film where its pace and tonal character matter most without sacrificing responsiveness, speed, or delivery completeness.",
    },
    {
      question: "How do you adapt the approach between a larger wedding and a quieter celebration?",
      answer:
        "The scale changes, but the core approach does not. Larger weddings need stronger rhythm and logistics coverage, while elopements often create more room for stillness, portraits, and slower film work.",
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
};
