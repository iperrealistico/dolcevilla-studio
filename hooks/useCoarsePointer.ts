"use client";

import { useSyncExternalStore } from "react";

const COARSE_POINTER_QUERY = "(pointer: coarse), (hover: none)";

function readCoarsePointerSnapshot() {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return false;
  }

  return window.matchMedia(COARSE_POINTER_QUERY).matches;
}

function subscribeToCoarsePointer(onStoreChange: () => void) {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia(COARSE_POINTER_QUERY);

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", onStoreChange);

    return () => mediaQuery.removeEventListener("change", onStoreChange);
  }

  mediaQuery.addListener(onStoreChange);

  return () => mediaQuery.removeListener(onStoreChange);
}

function readServerCoarsePointerSnapshot() {
  return false;
}

export function useCoarsePointer() {
  return useSyncExternalStore(
    subscribeToCoarsePointer,
    readCoarsePointerSnapshot,
    readServerCoarsePointerSnapshot,
  );
}
