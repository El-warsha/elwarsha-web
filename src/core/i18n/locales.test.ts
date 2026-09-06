import { describe, expect, it } from "vitest";

import { localeDirection, messages } from "./locales.js";

describe("locales", () => {
  it("uses RTL for Arabic and LTR for English", () => {
    expect(localeDirection("ar")).toBe("rtl");
    expect(localeDirection("en")).toBe("ltr");
  });

  it("keeps public copy in both languages", () => {
    expect(messages.ar.brand).toBe("الورشة");
    expect(messages.en.nav.portal).toBe("Portal");
  });
});
