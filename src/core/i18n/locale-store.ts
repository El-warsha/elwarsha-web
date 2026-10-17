import { create } from "zustand";

import { isLocale, type Locale } from "./locales.js";

const STORAGE_KEY = "elwarsha.locale";

function readStoredLocale(): Locale | null {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) ?? undefined;
    return isLocale(stored) ? stored : null;
  } catch {
    return null;
  }
}

function browserLocale(): Locale {
  if (typeof navigator === "undefined") {
    return "ar";
  }
  return navigator.language.toLowerCase().startsWith("ar") ? "ar" : "en";
}

export const useLocaleStore = create<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
}>((set) => ({
  locale: readStoredLocale() ?? browserLocale(),
  setLocale: (locale) => {
    try {
      window.localStorage?.setItem(STORAGE_KEY, locale);
    } catch {
      // ignore storage errors in environments without storage
    }
    set({ locale });
  },
}));
