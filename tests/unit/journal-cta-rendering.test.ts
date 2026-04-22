import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { JournalStickyBannerCTA } from "@/components/journal/JournalStickyBannerCTA";
import { createJournalMdxComponents } from "@/components/journal/journalMdxComponents";
import {
  ConsentContext,
  type ConsentContextValue,
} from "@/contexts/ConsentContext";
import type { CTASection } from "@/types/content";

const stickySection: CTASection = {
  eyebrow: "San Casciano photographer",
  title: "Planning a San Casciano wedding and need the right photographer?",
  body: "Tell us how your Chianti villa day should feel and we will tell you how we would photograph it.",
  primaryCta: {
    label: "Ask about your San Casciano wedding",
    href: "/contact",
    variant: "primary",
  },
};

const segueSection: CTASection = {
  eyebrow: "See the wider studio",
  title: "See how Dolcevilla approaches classic Chianti weddings.",
  body: "If San Casciano feels close to your world, start with the studio approach behind the photographs.",
  primaryCta: {
    label: "Explore the Dolcevilla approach",
    href: "/",
    variant: "secondary",
  },
};

function buildConsentValue(isConsentDialogOpen: boolean): ConsentContextValue {
  return {
    consent: {
      hasInteracted: true,
      analytics: false,
      marketing: false,
      timestamp: null,
    },
    isConsentDialogOpen,
    consentPanel: "choices",
    acceptAll: () => {},
    essentialOnly: () => {},
    savePreferences: () => {},
    openConsentManager: () => {},
    openPrivacyManager: () => {},
    showConsentChoices: () => {},
    closeConsentManager: () => {},
    resetConsent: () => {},
    setConsent: () => {},
  };
}

describe("journal CTA rendering", () => {
  it("renders the photographer segue with article-specific frontmatter copy", () => {
    const components = createJournalMdxComponents({
      photographerSegue: segueSection,
    });
    const PhotographerSegue = components.JournalPhotographerSegue;

    render(createElement(PhotographerSegue));

    expect(
      screen.getByRole("heading", {
        name: segueSection.title,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: segueSection.primaryCta.label,
      }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByText(segueSection.body)).toBeInTheDocument();
  });

  it("renders the sticky CTA banner with article-specific copy when consent is closed", () => {
    render(
      createElement(
        ConsentContext.Provider,
        { value: buildConsentValue(false) },
        createElement(JournalStickyBannerCTA, { section: stickySection }),
      ),
    );

    expect(screen.getAllByText(stickySection.title)).toHaveLength(2);
    expect(
      screen.getAllByRole("link", {
        name: stickySection.primaryCta.label,
      }),
    ).toHaveLength(2);
  });

  it("hides the sticky CTA banner while the consent dialog is open", () => {
    render(
      createElement(
        ConsentContext.Provider,
        { value: buildConsentValue(true) },
        createElement(JournalStickyBannerCTA, { section: stickySection }),
      ),
    );

    expect(screen.queryAllByText(stickySection.title)).toHaveLength(0);
    expect(
      screen.queryByRole("link", {
        name: stickySection.primaryCta.label,
      }),
    ).not.toBeInTheDocument();
  });
});
