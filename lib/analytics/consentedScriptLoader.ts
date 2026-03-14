const loadedScriptIds = new Set<string>();

export const CONSENT_STORAGE_KEY = "dolcevilla-consent-v1";

export function loadScriptOnce(id: string, src: string) {
  if (typeof document === "undefined" || loadedScriptIds.has(id)) {
    return;
  }

  const existing = document.getElementById(id);
  if (existing) {
    loadedScriptIds.add(id);
    return;
  }

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
  loadedScriptIds.add(id);
}

export function injectInlineScript(id: string, content: string) {
  if (typeof document === "undefined" || loadedScriptIds.has(id)) {
    return;
  }

  const existing = document.getElementById(id);
  if (existing) {
    loadedScriptIds.add(id);
    return;
  }

  const script = document.createElement("script");
  script.id = id;
  script.textContent = content;
  document.head.appendChild(script);
  loadedScriptIds.add(id);
}
