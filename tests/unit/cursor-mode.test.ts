import { describe, expect, it } from "vitest";
import { getCursorMode } from "@/lib/cursor/getCursorMode";

describe("getCursorMode", () => {
  it("treats nested content inside links as interactive", () => {
    const link = document.createElement("a");
    link.href = "/contact";
    const child = document.createElement("span");
    link.append(child);

    expect(getCursorMode(child)).toBe("interactive");
  });

  it("treats labels and form controls as interactive", () => {
    const label = document.createElement("label");
    label.setAttribute("for", "email");

    expect(getCursorMode(label)).toBe("interactive");
  });

  it("leaves ordinary content in the idle mode", () => {
    const block = document.createElement("div");

    expect(getCursorMode(block)).toBe("idle");
    expect(getCursorMode(null)).toBe("idle");
  });
});
