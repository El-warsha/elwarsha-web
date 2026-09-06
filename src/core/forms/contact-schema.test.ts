import { describe, expect, it } from "vitest";

import { contactSchema } from "./contact-schema.js";

describe("contactSchema", () => {
  it("accepts a valid email", () => {
    expect(contactSchema.parse({ email: "hello@elwarsha.dev" }).email).toContain("@");
  });
});
