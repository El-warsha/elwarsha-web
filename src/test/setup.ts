import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

if (
  typeof window !== "undefined" &&
  (!window.localStorage || typeof window.localStorage.getItem !== "function")
) {
  const store = new Map<string, string>();
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, String(value)),
      removeItem: (key: string) => store.delete(key),
      clear: () => store.clear(),
      get length() {
        return store.size;
      },
      key: (index: number) => Array.from(store.keys())[index] ?? null,
    },
    writable: true,
  });
}

afterEach(async () => {
  cleanup();
  const { clearSessionCache } = await import("@core/session");
  clearSessionCache();
});
