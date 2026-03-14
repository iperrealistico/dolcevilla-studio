"use client";

import { useEffect } from "react";
import { APP_HEIGHT_CSS_VAR } from "@/lib/utils/viewport";

export function useViewportHeight() {
  useEffect(() => {
    const setHeight = () => {
      document.documentElement.style.setProperty(APP_HEIGHT_CSS_VAR, `${window.innerHeight}px`);
    };

    setHeight();
    window.addEventListener("resize", setHeight);

    return () => {
      window.removeEventListener("resize", setHeight);
    };
  }, []);
}
