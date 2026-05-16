"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type ThemeName = "light" | "dark";

const THEME_STORAGE_KEY = "dolcevilla-theme";
const DEFAULT_THEME: ThemeName = "dark";
const THEME_EVENT = "dolcevilla-theme-change";
const THEME_TRANSITION_CLASS = "theme-transitioning";
const THEME_TRANSITION_DURATION_MS = 460;

let themeTransitionTimer: number | null = null;

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: ThemeName) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

function queueThemeTransition() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const root = document.documentElement;
  root.classList.add(THEME_TRANSITION_CLASS);

  if (themeTransitionTimer !== null) {
    window.clearTimeout(themeTransitionTimer);
  }

  themeTransitionTimer = window.setTimeout(() => {
    root.classList.remove(THEME_TRANSITION_CLASS);
    themeTransitionTimer = null;
  }, THEME_TRANSITION_DURATION_MS);
}

function readStoredTheme(): ThemeName | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(THEME_STORAGE_KEY);

  return value === "light" || value === "dark" ? value : null;
}

function readThemeSnapshot(): ThemeName {
  return resolveInitialTheme();
}

function readServerThemeSnapshot(): ThemeName {
  return DEFAULT_THEME;
}

function subscribeToThemeStore(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleChange = () => onStoreChange();
  window.addEventListener("storage", handleChange);
  window.addEventListener(THEME_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(THEME_EVENT, handleChange);
  };
}

function resolveInitialTheme(): ThemeName {
  if (typeof document !== "undefined") {
    const currentTheme = document.documentElement.dataset.theme;

    if (currentTheme === "light" || currentTheme === "dark") {
      return currentTheme;
    }
  }

  return readStoredTheme() ?? DEFAULT_THEME;
}

export function ThemeScript() {
  const script = `
    (() => {
      try {
        const key = "${THEME_STORAGE_KEY}";
        const stored = window.localStorage.getItem(key);
        const theme = stored === "light" || stored === "dark" ? stored : "${DEFAULT_THEME}";
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
      } catch (error) {
        document.documentElement.dataset.theme = "${DEFAULT_THEME}";
        document.documentElement.style.colorScheme = "${DEFAULT_THEME}";
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToThemeStore,
    readThemeSnapshot,
    readServerThemeSnapshot,
  );

  const setTheme = useCallback((nextTheme: ThemeName) => {
    if (resolveInitialTheme() === nextTheme) {
      return;
    }

    queueThemeTransition();
    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider.");
  }

  return context;
}
