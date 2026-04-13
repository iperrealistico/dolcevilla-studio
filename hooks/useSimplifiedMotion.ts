"use client";

import { useEffect, useState } from "react";

const MOBILE_MOTION_MEDIA_QUERY = "(max-width: 767px), (pointer: coarse)";

export function useSimplifiedMotion() {
  const [simplifiedMotion, setSimplifiedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MOTION_MEDIA_QUERY);
    const update = () => {
      setSimplifiedMotion(mediaQuery.matches);
    };

    update();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", update);

      return () => mediaQuery.removeEventListener("change", update);
    }

    mediaQuery.addListener(update);

    return () => mediaQuery.removeListener(update);
  }, []);

  return simplifiedMotion;
}
