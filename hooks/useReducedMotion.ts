"use client";

import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function readReducedMotionSnapshot() {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return false;
  }

  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function subscribeToReducedMotion(onStoreChange: () => void) {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", onStoreChange);

    return () => mediaQuery.removeEventListener("change", onStoreChange);
  }

  mediaQuery.addListener(onStoreChange);

  return () => mediaQuery.removeListener(onStoreChange);
}

function readServerReducedMotionSnapshot() {
  return false;
}

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    readReducedMotionSnapshot,
    readServerReducedMotionSnapshot,
  );
}
