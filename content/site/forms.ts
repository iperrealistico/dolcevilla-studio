export const inquiryFormContent = {
  directEmailPrompt: "Prefer to write directly?",
  success: {
    eyebrow: "Thank you",
    title: "Your inquiry has been sent.",
    body: "We will read it carefully and aim to reply within two business days with clear next steps.",
  },
  fields: {
    names: "Your names",
    email: "Email",
    weddingDate: "Celebration date",
    location: "Celebration area",
    venue: "Venue or villa",
    guestCount: "Approximate guest count",
    celebrationType: "Celebration format",
    photographyBudgetRange: "Photography budget range",
    message: "What are you planning?",
  },
  celebrationTypeOptions: [
    { value: "", label: "Select one" },
    { value: "wedding-weekend", label: "Wedding weekend" },
    { value: "wedding-day", label: "One-day wedding" },
    { value: "elopement", label: "Elopement" },
    { value: "intimate-wedding", label: "Intimate wedding" },
  ],
  budgetOptions: [
    { value: "", label: "Select a range" },
    { value: "5000-8000", label: "EUR 5,000 to 8,000" },
    { value: "8000-12000", label: "EUR 8,000 to 12,000" },
    { value: "12000-plus", label: "EUR 12,000+" },
  ],
  checkboxes: {
    filmInterest:
      "Film is important to us, including 35mm, 120, or selected large-format frames",
    studioInterest:
      "We want to discuss the Studio for portraits, private vows, or a very intimate wedding",
  },
  submitLabel: "Send inquiry",
  sendingLabel: "Sending...",
  validation: {
    names: "Please share both names or your full name.",
    email: "Please enter a valid email address.",
    weddingDate: "Please share your celebration date.",
    location: "Please share the area or location.",
    celebrationType: "Please select the celebration format.",
    photographyBudgetRange: "Please select a budget range.",
    message: "Please tell us a little more about your plans, locations, or priorities.",
  },
} as const;
