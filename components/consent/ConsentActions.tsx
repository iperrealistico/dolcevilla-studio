"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Aperture, ChartNoAxesColumnIncreasing, ShieldCheck, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useConsent } from "@/hooks/useConsent";
import { getImageAsset } from "@/lib/images/imageManifest";

const doorwayImage = getImageAsset("villaLibraryPortrait");
const insetImage = getImageAsset("filmHasselbladGroundGlassOliveCeremony");

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
    essentialOnly,
    savePreferences,
  } = useConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: consent.analytics,
    marketing: consent.marketing,
  });

  return (
    <div className="grid min-h-[min(88dvh,820px)] overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(140deg,#171311,#2d241e_42%,#43362d)] shadow-[0_40px_120px_rgba(17,12,8,0.48)] lg:grid-cols-[1.08fr_0.92fr]">
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,10,0.18),rgba(14,12,10,0.76))]" />
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
              <p className="mt-3 font-display-face text-3xl tracking-[-0.04em] md:text-5xl">
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

          <div className="space-y-5">
            <p className="max-w-xl text-sm leading-7 text-[rgb(244_235_224_/_0.82)] md:text-base">
              Before the site opens fully, we invite you into the atmosphere behind the work: intimate places, analog discipline, and a contemporary editorial eye shaped by Tuscany.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.35rem] border border-white/10 bg-[rgb(18_15_12_/_0.28)] p-4 backdrop-blur-sm">
                <Aperture size={18} className="text-[rgb(236_215_181_/_0.92)]" />
                <p className="mt-3 text-sm font-semibold">Hybrid film craft</p>
                <p className="mt-2 text-sm leading-6 text-[rgb(244_235_224_/_0.68)]">
                  35mm, medium format, and digital each play a different role in the story.
                </p>
              </div>
              <div className="rounded-[1.35rem] border border-white/10 bg-[rgb(18_15_12_/_0.28)] p-4 backdrop-blur-sm">
                <Sparkles size={18} className="text-[rgb(236_215_181_/_0.92)]" />
                <p className="mt-3 text-sm font-semibold">A contemporary eye</p>
                <p className="mt-2 text-sm leading-6 text-[rgb(244_235_224_/_0.68)]">
                  Quiet luxury, strong atmosphere, and no generic wedding visual language.
                </p>
              </div>
              <div className="rounded-[1.35rem] border border-white/10 bg-[rgb(18_15_12_/_0.28)] p-4 backdrop-blur-sm">
                <ShieldCheck size={18} className="text-[rgb(236_215_181_/_0.92)]" />
                <p className="mt-3 text-sm font-semibold">Consent before tracking</p>
                <p className="mt-2 text-sm leading-6 text-[rgb(244_235_224_/_0.68)]">
                  Optional analytics and marketing stay off until you clearly say yes.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 26 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="relative flex flex-col justify-between gap-6 p-6 text-[var(--color-paper)] md:p-8 lg:p-10"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.32),transparent)] lg:left-0 lg:right-auto lg:top-10 lg:h-[calc(100%-5rem)] lg:w-px" />
        <div className="relative z-10">
          <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-[rgb(255_255_255_/_0.05)] p-4 shadow-[0_20px_50px_rgba(8,6,5,0.22)]">
            <div className="flex gap-4">
              <div className="relative hidden h-20 w-24 shrink-0 overflow-hidden rounded-[1rem] sm:block">
                <Image
                  src={insetImage.src}
                  alt={insetImage.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={insetImage.blurDataURL}
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgb(244_235_224_/_0.62)]">
                  Your choice
                </p>
                <p className="mt-2 font-display-face text-3xl tracking-[-0.04em] md:text-4xl">
                  Choose how the site should accompany you.
                </p>
                <p className="mt-3 text-sm leading-7 text-[rgb(244_235_224_/_0.74)]">
                  Allowing optional analytics and campaign measurement helps us understand which stories resonate and keep our marketing relevant. Refusing them changes nothing essential about browsing or inquiring.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <button
              type="button"
              onClick={acceptAll}
              className="w-full rounded-[1.5rem] border border-[rgb(236_215_181_/_0.32)] bg-[linear-gradient(135deg,rgba(236,215,181,0.18),rgba(255,255,255,0.08))] px-5 py-5 text-left transition hover:bg-[linear-gradient(135deg,rgba(236,215,181,0.24),rgba(255,255,255,0.11))]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-[var(--color-paper)]">
                    Allow the full studio experience
                  </p>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[rgb(244_235_224_/_0.74)]">
                    Enable analytics and marketing so we can understand how visitors arrive, which pages matter, and how to refine the experience over time.
                  </p>
                </div>
                <ChartNoAxesColumnIncreasing
                  size={18}
                  className="mt-1 shrink-0 text-[rgb(236_215_181_/_0.92)]"
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
            <Link
              href="/privacy"
              className="text-sm text-[rgb(244_235_224_/_0.68)] underline underline-offset-4 hover:text-[var(--color-paper)]"
            >
              Read privacy details
            </Link>
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

        <p className="relative z-10 text-xs leading-6 text-[rgb(244_235_224_/_0.6)]">
          EU-style consent notice: optional analytics and marketing scripts are blocked until you opt in. Refusing is available here with the same immediacy as accepting, and you can revisit your choice later through Privacy &amp; Cookie Settings.
        </p>
      </motion.div>
    </div>
  );
}
