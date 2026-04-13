"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ConsentActions } from "@/components/consent/ConsentActions";
import { PrivacyDialog } from "@/components/consent/PrivacyDialog";
import { useConsent } from "@/hooks/useConsent";
import { useScrollLock } from "@/hooks/useScrollLock";

export function ConsentDoorway() {
  const { consentPanel, isConsentDialogOpen } = useConsent();
  useScrollLock(isConsentDialogOpen);

  const isPrivacyOpen = consentPanel === "privacy";
  const modalLockProps = isPrivacyOpen ? ({ inert: true } as Record<string, boolean>) : {};

  if (!isConsentDialogOpen) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-[90] overflow-y-auto bg-[linear-gradient(180deg,rgba(16,13,10,0.82),rgba(16,13,10,0.74))] backdrop-blur-md p-3 sm:p-5"
    >
      <div className="flex min-h-full items-center justify-center py-3 sm:py-4">
        <motion.section
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-doorway-title"
          aria-describedby="consent-doorway-description"
          aria-hidden={isPrivacyOpen}
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: 24,
            scale: 0.92,
            filter: "blur(18px)",
          }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-0 w-full max-w-6xl"
          {...modalLockProps}
        >
          <ConsentActions />
        </motion.section>
      </div>
      <AnimatePresence>{isPrivacyOpen ? <PrivacyDialog /> : null}</AnimatePresence>
    </motion.div>
  );
}
