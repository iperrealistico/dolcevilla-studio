export const inquiryFormContent = {
  directEmailPrompt: "Prefer email?",
  fields: {
    names: "Names",
    email: "Email",
    weddingDate: "Wedding date",
    location: "Location",
    venue: "Venue",
    guestCount: "Guest count",
    celebrationType: "Celebration type",
    photographyBudgetRange: "Photography budget",
    message: "Message",
  },
  celebrationTypeOptions: [
    { value: "", label: "Select one" },
    { value: "wedding-weekend", label: "Wedding weekend" },
    { value: "wedding-day", label: "Wedding day" },
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
      "Interested in hybrid film coverage, including 35mm, 120, or selected large-format frames",
    villaInterest:
      "Curious about portraits or a very private Villa Raffaelli-related context",
  },
  submitLabel: "Send inquiry",
  sendingLabel: "Sending...",
  validation: {
    names: "Please share both names or a full name.",
    email: "Please enter a valid email address.",
    weddingDate: "Please share your celebration date.",
    location: "Please share your location.",
    celebrationType: "Please select the celebration type.",
    photographyBudgetRange: "Please select a budget range.",
    message: "Please tell us a little more about your plans.",
  },
} as const;
