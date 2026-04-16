export const consentDoorwayContent = {
  eyebrow: "Welcome",
  title:
    "A Tuscan studio where film, light, and modern restraint still belong together.",
  closeSettingsLabel: "Close consent settings",
  description:
    "Choose whether optional analytics and marketing should be enabled before browsing the site further.",
  acceptAll: {
    title: "Allow the full studio experience",
    body: "Enable analytics and marketing so we can understand how visitors arrive, which pages matter, and how to refine the experience over time.",
  },
  essentialOnly: {
    title: "Continue with essential only",
    body: "Browse the site and contact us with only the functionality required to make the experience work.",
  },
  chooseManuallyLabel: "Choose manually",
  hideDetailedChoicesLabel: "Hide detailed choices",
  readPrivacyDetailsLabel: "Read privacy details",
  preferences: {
    analytics: {
      title: "Site analytics",
      description:
        "Anonymous measurement that helps us understand visits, popular pages, and overall site performance.",
    },
    marketing: {
      title: "Marketing measurement",
      description:
        "Ad campaign measurement that helps us understand whether our introductions to new couples are working.",
    },
    saveSelectionLabel: "Save my selection",
  },
} as const;
