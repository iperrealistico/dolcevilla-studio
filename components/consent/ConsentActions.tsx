"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Settings2,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { consentDoorwayContent } from "@/content/site/consent";
import { useConsent } from "@/hooks/useConsent";
import { getImageAsset } from "@/lib/images/imageManifest";

const doorwayImage = getImageAsset("consent.doorway.image");

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
      className="flex w-full items-start justify-between gap-4 rounded-[var(--radius-panel)] border border-white/12 bg-white/8 px-4 py-4 text-left transition hover:bg-white/12"
    >
      <div className="space-y-1">
        <p className="text-sm font-semibold text-[var(--color-paper)]">
          {title}
        </p>
        <p className="text-sm leading-6 text-[rgb(244_235_224_/_0.72)]">
          {description}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="relative mt-1 inline-flex h-7 w-12 shrink-0 rounded-[var(--radius-control)] border border-white/18 bg-white/10 p-1 transition"
      >
        <span
          className="h-5 w-5 rounded-[calc(var(--radius-control)-0.12rem)] bg-[var(--color-paper)] shadow-[0_8px_20px_rgba(10,8,6,0.25)] transition"
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
    essentialOnly,
    openPrivacyManager,
    savePreferences,
  } = useConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: consent.analytics,
    marketing: consent.marketing,
  });

  return (
    <div className="relative grid min-h-[min(82dvh,780px)] overflow-hidden rounded-[var(--radius-frame)] border border-white/12 bg-[linear-gradient(140deg,#120f0d,#221b17_42%,#342a22)] shadow-[0_40px_120px_rgba(17,12,8,0.48)] lg:grid-cols-[1.08fr_0.92fr]">
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
              <p className="text-xs font-semibold tracking-[0.34em] text-[rgb(244_235_224_/_0.72)] uppercase">
                {consentDoorwayContent.eyebrow}
              </p>
              <p
                id="consent-doorway-title"
                className="font-display-face mt-3 max-w-xl text-3xl tracking-[-0.04em] md:text-5xl"
              >
                {consentDoorwayContent.title}
              </p>
            </div>
            {consent.hasInteracted ? (
              <button
                type="button"
                aria-label={consentDoorwayContent.closeSettingsLabel}
                onClick={closeConsentManager}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-control)] border border-white/14 bg-[rgb(18_15_12_/_0.32)] text-[var(--color-paper)] transition hover:bg-[rgb(18_15_12_/_0.5)]"
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
          {consentDoorwayContent.description}
        </div>

        <div className="relative z-10">
          <div className="grid gap-3">
            <button
              type="button"
              onClick={acceptAll}
              className="group w-full cursor-pointer rounded-[var(--radius-frame)] border border-white bg-white px-5 py-5 text-left shadow-[0_26px_60px_rgba(12,8,4,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_70px_rgba(12,8,4,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(34_27_23)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-[rgb(20_15_12)]">
                    {consentDoorwayContent.acceptAll.title}
                  </p>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[rgb(73_61_47)]">
                    {consentDoorwayContent.acceptAll.body}
                  </p>
                </div>
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-control)] bg-[rgb(20_15_12)] text-white transition group-hover:translate-x-0.5">
                  <ArrowUpRight size={18} className="shrink-0" />
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={essentialOnly}
              className="w-full rounded-[var(--radius-panel)] border border-white/12 bg-[rgb(255_255_255_/_0.05)] px-5 py-5 text-left transition hover:bg-[rgb(255_255_255_/_0.08)]"
            >
              <p className="text-base font-semibold text-[var(--color-paper)]">
                {consentDoorwayContent.essentialOnly.title}
              </p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[rgb(244_235_224_/_0.7)]">
                {consentDoorwayContent.essentialOnly.body}
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
              icon={
                <Settings2
                  size={16}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="shrink-0 opacity-85"
                />
              }
            >
              {showPreferences
                ? consentDoorwayContent.hideDetailedChoicesLabel
                : consentDoorwayContent.chooseManuallyLabel}
            </Button>
            <button
              type="button"
              onClick={openPrivacyManager}
              className="inline-flex items-center gap-2 text-sm text-[rgb(244_235_224_/_0.68)] underline underline-offset-4 transition hover:text-[var(--color-paper)]"
            >
              <ShieldCheck size={15} strokeWidth={1.8} aria-hidden="true" />
              {consentDoorwayContent.readPrivacyDetailsLabel}
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
                <div className="space-y-3 rounded-[var(--radius-panel)] border border-white/10 bg-[rgb(255_255_255_/_0.05)] p-4">
                  <PreferenceToggle
                    title={consentDoorwayContent.preferences.analytics.title}
                    description={
                      consentDoorwayContent.preferences.analytics.description
                    }
                    checked={preferences.analytics}
                    onClick={() =>
                      setPreferences((current) => ({
                        ...current,
                        analytics: !current.analytics,
                      }))
                    }
                  />
                  <PreferenceToggle
                    title={consentDoorwayContent.preferences.marketing.title}
                    description={
                      consentDoorwayContent.preferences.marketing.description
                    }
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
                    icon={
                      <ShieldCheck
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className="shrink-0 opacity-85"
                      />
                    }
                  >
                    {consentDoorwayContent.preferences.saveSelectionLabel}
                  </Button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
