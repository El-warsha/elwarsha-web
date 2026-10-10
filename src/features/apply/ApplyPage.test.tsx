import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ApplyPage } from "./ApplyPage.js";

vi.mock("@core/api", () => ({
  api: {
    applyCohort: vi.fn(),
  },
  ElWarshaApiError: class MockError extends Error {},
}));

describe("ApplyPage", () => {
  it("renders Arabic heading, metadata badges, and form", () => {
    render(<ApplyPage locale="ar" />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /استمارة التقديم — الدفعة الثانية/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/الدفعة القادمة \/ Cohort 02/i)).toBeInTheDocument();
    expect(screen.getByText(/٨ أسابيع كاملة/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /إرسال طلب التقديم/i }),
    ).toBeInTheDocument();
  });

  it("renders English heading, metadata badges, and form", () => {
    render(<ApplyPage locale="en" />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Cohort 02 Application/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Upcoming Cohort \/ Cohort 02/i)).toBeInTheDocument();
    expect(screen.getByText(/8 Full Weeks/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Submit Application/i }),
    ).toBeInTheDocument();
  });
});
