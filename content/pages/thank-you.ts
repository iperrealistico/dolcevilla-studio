import { servicePageContentSchema } from "@/lib/content/schemas";

export const thankYouPage = servicePageContentSchema.parse({
  slug: "thank-you",
  pageType: "utility",
  intro: {
    heading: "Thank you.",
    body: ["Your message is with us. We will reply with care as soon as we can."],
  },
  cta: {
    title: "In the meantime",
    body: "You can explore the journal while we review your inquiry.",
    primaryCta: { label: "Open the journal", href: "/journal" },
  },
  seo: {
    title: "Thank You",
    description:
      "Inquiry confirmation for Dolcevilla Studio after a message has been submitted through the contact form.",
    path: "/thank-you",
    noindex: true,
  },
});
