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
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: 24,
            scale: 0.92,
            filter: "blur(18px)",
          }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-6xl"
        >
          <ConsentActions />
        </motion.div>
      </div>
    </motion.div>
  );
}
