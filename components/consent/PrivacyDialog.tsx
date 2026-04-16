"use client";

import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { privacyDetails } from "@/content/site/privacy";
import { useConsent } from "@/hooks/useConsent";

export function PrivacyDialog() {
  const { closeConsentManager, consent, showConsentChoices } = useConsent();

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-10 overflow-y-auto bg-[rgb(13_10_8_/_0.38)] p-3 sm:p-5"
    >
      <div className="flex min-h-full items-center justify-center py-3 sm:py-4">
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
              <p className="text-xs font-semibold tracking-[0.3em] text-[rgb(244_235_224_/_0.6)] uppercase">
                {privacyDetails.eyebrow}
              </p>
              <h2 className="font-display-face mt-3 text-3xl tracking-[-0.04em] md:text-4xl">
                {privacyDetails.title}
              </h2>
            </div>
            <button
              type="button"
              aria-label={
                consent.hasInteracted
                  ? privacyDetails.closeLabel
                  : privacyDetails.backToChoicesLabel
              }
              onClick={
                consent.hasInteracted ? closeConsentManager : showConsentChoices
              }
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
                <p className="text-sm font-semibold text-[var(--color-paper)]">
                  {point.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[rgb(244_235_224_/_0.72)]">
                  {point.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm leading-6 text-[rgb(244_235_224_/_0.72)]">
              <p className="font-semibold text-[var(--color-paper)]">
                {privacyDetails.contactLabel}
              </p>
              <p>{privacyDetails.contactBody}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={showConsentChoices}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-white/12 px-5 py-3 text-sm font-semibold transition hover:bg-[rgb(255_255_255_/_0.08)]"
              >
                <ArrowLeft size={16} />
                {privacyDetails.backButtonLabel}
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
      </div>
    </motion.div>
  );
}
