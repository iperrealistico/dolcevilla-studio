"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChartNoAxesColumnIncreasing, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useConsent } from "@/hooks/useConsent";
import { getImageAsset } from "@/lib/images/imageManifest";
import { privacyDetails } from "@/content/site/privacy";

const doorwayImage = getImageAsset("villaLibraryPortrait");

function PreferenceToggle({
  title,
  description,
  checked,
  onClick,
}: {
  title: string;
  description: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onClick}
      className="flex w-full items-start justify-between gap-4 rounded-[1.5rem] border border-white/12 bg-white/8 px-4 py-4 text-left transition hover:bg-white/12"
    >
      <div className="space-y-1">
        <p className="text-sm font-semibold text-[var(--color-paper)]">{title}</p>
        <p className="text-sm leading-6 text-[rgb(244_235_224_/_0.72)]">{description}</p>
      </div>
      <span
        aria-hidden="true"
        className="relative mt-1 inline-flex h-7 w-12 shrink-0 rounded-full border border-white/18 bg-white/10 p-1 transition"
      >
        <span
          className="h-5 w-5 rounded-full bg-[var(--color-paper)] shadow-[0_8px_20px_rgba(10,8,6,0.25)] transition"
          style={{
            transform: checked ? "translateX(20px)" : "translateX(0px)",
            backgroundColor: checked ? "rgb(236 215 181)" : "rgb(244 235 224)",
          }}
        />
      </span>
    </button>
  );
}

export function ConsentActions() {
  const {
    acceptAll,
    closeConsentManager,
    consent,
    consentPanel,
    essentialOnly,
    openPrivacyManager,
    savePreferences,
    showConsentChoices,
  } = useConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: consent.analytics,
    marketing: consent.marketing,
  });

  return (
    <div className="relative grid min-h-[min(82dvh,780px)] overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(140deg,#171311,#2d241e_42%,#43362d)] shadow-[0_40px_120px_rgba(17,12,8,0.48)] lg:grid-cols-[1.08fr_0.92fr]">
      <div className="relative min-h-[18rem] overflow-hidden">
        <Image
          src={doorwayImage.src}
          alt={doorwayImage.alt}
          fill
          priority
          placeholder="blur"
          blurDataURL={doorwayImage.blurDataURL}
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,10,0.22),rgba(14,12,10,0.8))]" />
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-full flex-col justify-between p-6 text-[var(--color-paper)] md:p-8 lg:p-10"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[rgb(244_235_224_/_0.72)]">
                Welcome
              </p>
              <p
                id="consent-doorway-title"
                className="mt-3 max-w-xl font-display-face text-3xl tracking-[-0.04em] md:text-5xl"
              >
                A Tuscan studio where film, light, and modern restraint still belong together.
              </p>
            </div>
            {consent.hasInteracted ? (
              <button
                type="button"
                aria-label="Close consent settings"
                onClick={closeConsentManager}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/14 bg-[rgb(18_15_12_/_0.32)] text-[var(--color-paper)] transition hover:bg-[rgb(18_15_12_/_0.5)]"
              >
                <X size={18} />
              </button>
            ) : null}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 26 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="relative flex flex-col justify-center p-6 text-[var(--color-paper)] md:p-8 lg:p-10"
      >
        <div id="consent-doorway-description" className="sr-only">
          Choose whether optional analytics and marketing should be enabled before browsing the site further.
        </div>

        <div className="relative z-10">
          <div className="grid gap-3">
            <button
              type="button"
              onClick={acceptAll}
              className="w-full rounded-[1.6rem] border border-[rgb(248_236_211_/_0.9)] bg-[linear-gradient(135deg,rgb(246_233_205),rgb(232_214_179))] px-5 py-5 text-left text-[var(--color-ink)] shadow-[0_26px_60px_rgba(12,8,4,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_70px_rgba(12,8,4,0.28)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-base font-semibold">Allow the full studio experience</p>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[rgb(44_34_24_/_0.82)]">
                    Enable analytics and marketing so we can understand how visitors arrive, which pages matter, and how to refine the experience over time.
                  </p>
                </div>
                <ChartNoAxesColumnIncreasing
                  size={18}
                  className="mt-1 shrink-0 text-[rgb(56_43_31_/_0.9)]"
                />
              </div>
            </button>

            <button
              type="button"
              onClick={essentialOnly}
              className="w-full rounded-[1.5rem] border border-white/12 bg-[rgb(255_255_255_/_0.05)] px-5 py-5 text-left transition hover:bg-[rgb(255_255_255_/_0.08)]"
            >
              <p className="text-base font-semibold text-[var(--color-paper)]">
                Continue with essential only
              </p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[rgb(244_235_224_/_0.7)]">
                Browse the site and contact us with only the functionality required to make the experience work.
              </p>
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              className="border border-white/12 bg-[rgb(255_255_255_/_0.04)] px-4 hover:bg-[rgb(255_255_255_/_0.08)]"
              style={{ color: "var(--color-paper)" }}
              onClick={() => setShowPreferences((current) => !current)}
            >
              {showPreferences ? "Hide detailed choices" : "Choose manually"}
            </Button>
            <button
              type="button"
              onClick={openPrivacyManager}
              className="text-sm text-[rgb(244_235_224_/_0.68)] underline underline-offset-4 transition hover:text-[var(--color-paper)]"
            >
              Read privacy details
            </button>
          </div>

          <AnimatePresence initial={false}>
            {showPreferences ? (
              <motion.div
                key="preferences"
                initial={{ opacity: 0, y: 18, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 overflow-hidden"
              >
                <div className="space-y-3 rounded-[1.5rem] border border-white/10 bg-[rgb(255_255_255_/_0.05)] p-4">
                  <PreferenceToggle
                    title="Site analytics"
                    description="Anonymous measurement that helps us understand visits, popular pages, and overall site performance."
                    checked={preferences.analytics}
                    onClick={() =>
                      setPreferences((current) => ({
                        ...current,
                        analytics: !current.analytics,
                      }))
                    }
                  />
                  <PreferenceToggle
                    title="Marketing measurement"
                    description="Ad campaign measurement that helps us understand whether our introductions to new couples are working."
                    checked={preferences.marketing}
                    onClick={() =>
                      setPreferences((current) => ({
                        ...current,
                        marketing: !current.marketing,
                      }))
                    }
                  />
                  <Button
                    type="button"
                    onClick={() => savePreferences(preferences)}
                    className="mt-2 w-full"
                  >
                    Save my selection
                  </Button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {consentPanel === "privacy" ? (
          <motion.div
            key="privacy-overlay"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-[rgb(13_10_8_/_0.38)] p-4 md:p-6"
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-label={privacyDetails.title}
              initial={{ opacity: 0, y: 26, scale: 0.94, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 22, scale: 0.95, filter: "blur(16px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl rounded-[1.8rem] border border-white/14 bg-[linear-gradient(145deg,rgba(28,22,18,0.96),rgba(44,34,28,0.94))] p-6 text-[var(--color-paper)] shadow-[0_30px_90px_rgba(7,5,4,0.4)] md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgb(244_235_224_/_0.6)]">
                    Privacy
                  </p>
                  <h2 className="mt-3 font-display-face text-3xl tracking-[-0.04em] md:text-4xl">
                    {privacyDetails.title}
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label={
                    consent.hasInteracted
                      ? "Close privacy details"
                      : "Back to consent choices"
                  }
                  onClick={consent.hasInteracted ? closeConsentManager : showConsentChoices}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/14 bg-[rgb(255_255_255_/_0.05)] transition hover:bg-[rgb(255_255_255_/_0.08)]"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[rgb(244_235_224_/_0.78)] md:text-base">
                {privacyDetails.introduction}
              </p>

              <div className="mt-6 grid gap-3">
                {privacyDetails.points.map((point) => (
                  <div
                    key={point.title}
                    className="rounded-[1.3rem] border border-white/10 bg-[rgb(255_255_255_/_0.05)] p-4"
                  >
                    <p className="text-sm font-semibold text-[var(--color-paper)]">{point.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[rgb(244_235_224_/_0.72)]">
                      {point.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="text-sm leading-6 text-[rgb(244_235_224_/_0.72)]">
                  <p className="font-semibold text-[var(--color-paper)]">{privacyDetails.contactLabel}</p>
                  <p>{privacyDetails.contactBody}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={showConsentChoices}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-white/12 px-5 py-3 text-sm font-semibold transition hover:bg-[rgb(255_255_255_/_0.08)]"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                  <a
                    href={`mailto:${privacyDetails.contactEmail}`}
                    className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-pill)] bg-[rgb(255_255_255_/_0.92)] px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-white"
                  >
                    {privacyDetails.contactEmail}
                  </a>
                </div>
              </div>
            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
