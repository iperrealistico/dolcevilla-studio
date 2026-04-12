export type CursorMode = "idle" | "interactive";

export const CURSOR_INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  "[role='button']",
  "input:not([type='hidden'])",
  "select",
  "textarea",
  "summary",
  "label[for]",
  "[data-cursor='interactive']",
].join(", ");

export function getCursorMode(target: EventTarget | null): CursorMode {
  if (!(target instanceof Element)) {
    return "idle";
  }

  return target.closest(CURSOR_INTERACTIVE_SELECTOR) ? "interactive" : "idle";
}
