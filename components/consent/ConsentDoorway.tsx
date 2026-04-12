"use client";

import { motion } from "framer-motion";
import { ConsentActions } from "@/components/consent/ConsentActions";
import { useConsent } from "@/hooks/useConsent";
import { useScrollLock } from "@/hooks/useScrollLock";

export function ConsentDoorway() {
  const { isConsentDialogOpen } = useConsent();
  useScrollLock(isConsentDialogOpen);

  if (!isConsentDialogOpen) {
    return null;
  }

  return (
    <motion.div
      aria-modal="true"
      role="dialog"
      aria-labelledby="consent-doorway-title"
      aria-describedby="consent-doorway-description"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.24, ease: "easeOut" } }}
      className="fixed inset-0 z-[90] overflow-y-auto bg-[linear-gradient(180deg,rgba(16,13,10,0.82),rgba(16,13,10,0.74))] backdrop-blur-md p-3 sm:p-5"
    >
      <div className="flex min-h-full items-center justify-center py-3 sm:py-4">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.985 }}
          transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-6xl"
        >
          <div id="consent-doorway-description" className="sr-only">
            Choose whether optional analytics and marketing should be enabled before browsing the site further.
          </div>
          <div id="consent-doorway-title" className="sr-only">
            Welcome and privacy choices
          </div>
          <ConsentActions />
        </motion.div>
      </div>
    </motion.div>
  );
}
