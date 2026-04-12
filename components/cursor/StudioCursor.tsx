"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getCursorMode, type CursorMode } from "@/lib/cursor/getCursorMode";

const CLICK_RELEASE_DELAY_MS = 120;
const IDLE_EASE = 0.34;
const INTERACTIVE_EASE = 0.4;
const PRESSED_EASE = 0.56;
const SNAP_DISTANCE_PX = 96;

export function StudioCursor() {
  const reduceMotion = useReducedMotion();
  const cursorRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const releaseTimeoutRef = useRef<number | null>(null);
  const targetRef = useRef({ x: -120, y: -120 });
  const currentRef = useRef({ x: -120, y: -120 });
  const hasPointerRef = useRef(false);
  const visibleRef = useRef(false);
  const modeRef = useRef<CursorMode>("idle");
  const pressedRef = useRef(false);
  const customCursorActiveRef = useRef(false);
  const enabled = !reduceMotion;

  useEffect(() => {
    if (enabled) {
      return;
    }

    delete document.documentElement.dataset.customCursor;
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      visibleRef.current = false;
      modeRef.current = "idle";
      pressedRef.current = false;
      hasPointerRef.current = false;
      customCursorActiveRef.current = false;
      targetRef.current = { x: -120, y: -120 };
      currentRef.current = { x: -120, y: -120 };
      return;
    }

    const syncDataAttributes = () => {
      const cursor = cursorRef.current;

      if (!cursor) {
        return;
      }

      cursor.dataset.visible = String(visibleRef.current);
      cursor.dataset.mode = modeRef.current;
      cursor.dataset.pressed = String(pressedRef.current);
    };

    const updateVisible = (nextVisible: boolean) => {
      if (visibleRef.current === nextVisible) {
        return;
      }

      visibleRef.current = nextVisible;
      syncDataAttributes();
    };

    const updateMode = (nextMode: CursorMode) => {
      if (modeRef.current === nextMode) {
        return;
      }

      modeRef.current = nextMode;
      syncDataAttributes();
    };

    const updatePressed = (nextPressed: boolean) => {
      if (pressedRef.current === nextPressed) {
        return;
      }

      pressedRef.current = nextPressed;
      syncDataAttributes();
    };

    const setCustomCursorActive = (nextActive: boolean) => {
      if (customCursorActiveRef.current === nextActive) {
        return;
      }

      customCursorActiveRef.current = nextActive;

      if (nextActive) {
        document.documentElement.dataset.customCursor = "enabled";
        return;
      }

      delete document.documentElement.dataset.customCursor;
    };

    const clearReleaseTimer = () => {
      if (releaseTimeoutRef.current !== null) {
        window.clearTimeout(releaseTimeoutRef.current);
        releaseTimeoutRef.current = null;
      }
    };

    const releasePress = () => {
      clearReleaseTimer();
      releaseTimeoutRef.current = window.setTimeout(() => {
        updatePressed(false);
        releaseTimeoutRef.current = null;
      }, CLICK_RELEASE_DELAY_MS);
    };

    const syncPointer = (event: PointerEvent) => {
      targetRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      const deltaX = event.clientX - currentRef.current.x;
      const deltaY = event.clientY - currentRef.current.y;
      const distance = Math.hypot(deltaX, deltaY);

      if (!hasPointerRef.current || distance > SNAP_DISTANCE_PX) {
        currentRef.current = {
          x: event.clientX,
          y: event.clientY,
        };
        hasPointerRef.current = true;
      }

      setCustomCursorActive(true);
      updateVisible(true);
      updateMode(getCursorMode(event.target));
    };

    const animateBurst = () => {
      burstRef.current?.animate(
        [
          {
            opacity: 0,
            transform: "translate(-50%, -50%) scale(0.72)",
          },
          {
            opacity: 0.24,
            transform: "translate(-50%, -50%) scale(1.06)",
            offset: 0.35,
          },
          {
            opacity: 0,
            transform: "translate(-50%, -50%) scale(1.9)",
          },
        ],
        {
          duration: 420,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        },
      );
    };

    const deactivateCustomCursor = () => {
      setCustomCursorActive(false);
      updateVisible(false);
      updateMode("idle");
      clearReleaseTimer();
      updatePressed(false);
    };

    const step = () => {
      const cursor = cursorRef.current;

      if (cursor) {
        const ease =
          pressedRef.current
            ? PRESSED_EASE
            : modeRef.current === "interactive"
              ? INTERACTIVE_EASE
              : IDLE_EASE;

        currentRef.current.x += (targetRef.current.x - currentRef.current.x) * ease;
        currentRef.current.y += (targetRef.current.y - currentRef.current.y) * ease;

        cursor.style.setProperty("--cursor-x", `${currentRef.current.x.toFixed(2)}px`);
        cursor.style.setProperty("--cursor-y", `${currentRef.current.y.toFixed(2)}px`);
      }

      frameRef.current = window.requestAnimationFrame(step);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        deactivateCustomCursor();
        return;
      }

      syncPointer(event);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        deactivateCustomCursor();
        return;
      }

      syncPointer(event);
      clearReleaseTimer();
      updatePressed(true);
      animateBurst();
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        deactivateCustomCursor();
        return;
      }

      syncPointer(event);
      releasePress();
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget === null) {
        deactivateCustomCursor();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        deactivateCustomCursor();
      }
    };

    frameRef.current = window.requestAnimationFrame(step);
    syncDataAttributes();

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.addEventListener("pointercancel", deactivateCustomCursor);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", deactivateCustomCursor);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      clearReleaseTimer();
      deactivateCustomCursor();
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointercancel", deactivateCustomCursor);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", deactivateCustomCursor);
    };
  }, [enabled]);

  if (!enabled || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="studio-cursor"
      data-mode="idle"
      data-pressed="false"
      data-visible="false"
    >
      <div ref={burstRef} className="studio-cursor__burst" />
      <div className="studio-cursor__pulse" />
      <div className="studio-cursor__core" />
    </div>,
    document.body,
  );
}
