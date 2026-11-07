import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { api, ElWarshaApiError } from "@core/api";
import { CohortApplicationForm } from "./CohortApplicationForm.js";
import userEvent from "@testing-library/user-event";

vi.mock("@core/api", () => {
  class MockElWarshaApiError extends Error {
    constructor(
      readonly status: number,
      readonly body: {
        detail?: string;
        invalidParams?: Array<{ name: string; reason: string }>;
      } | null,
    ) {
      super(body?.detail ?? "Mock error");
    }
  }

  return {
    api: {
      applyCohort: vi.fn(),
    },
    ElWarshaApiError: MockElWarshaApiError,
  };
});

describe("CohortApplicationForm", () => {
  beforeEach(() => {
    vi.mocked(api.applyCohort).mockReset();
  });

  it("renders all four sections and the submit button", () => {
    render(<CohortApplicationForm locale="en" />);

    expect(
      screen.getByRole("group", { name: /Personal & Contact Information/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: /Academic & Technical Background/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: /Personal Page Task/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: /Motivation & Commitment/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Submit Application/i }),
    ).toBeInTheDocument();
  });

  it("displays structured validation errors (422) below problematic inputs", async () => {
    const error422 = new ElWarshaApiError(422, {
      type: "https://elwarsha.dev/errors/validation-failed",
      title: "Validation Failed",
      status: 422,
      detail: "Validation failed",
      invalidParams: [
        { name: "email", reason: "Must be a valid email address" },
        { name: "motivation", reason: "Motivation must be at least 50 characters" },
      ],
    });

    const user = userEvent.setup();

    vi.mocked(api.applyCohort).mockRejectedValueOnce(error422);

    render(<CohortApplicationForm locale="en" />);

    await user.click(screen.getByRole("button", { name: /Submit Application/i }));

    expect(await screen.findByText("Must be a valid email address")).toBeInTheDocument();
    expect(
      screen.getByText("Motivation must be at least 50 characters"),
    ).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/Email Address/i);
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput).toHaveAccessibleDescription(/valid email/i);
    // expect(emailInput).toHaveAttribute("aria-describedby", "email-error");
  });

  it("displays duplicate submission conflict (409) in a global alert", async () => {
    const error409 = new ElWarshaApiError(409, {
      type: "https://elwarsha.dev/errors/duplicate-application",
      status: 409,
      detail:
        "An application with this email or GitHub handle already exists for cohort-2",
    });
    const user = userEvent.setup();

    vi.mocked(api.applyCohort).mockRejectedValueOnce(error409);

    render(<CohortApplicationForm locale="en" />);

    await user.click(screen.getByRole("button", { name: /Submit Application/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(/already exists/i);
  });

  it("displays a confirmation receipt card upon 201 Created", async () => {
    vi.mocked(api.applyCohort).mockResolvedValueOnce({
      id: "app_7b2f1e9a",
      cohortSlug: "cohort-2",
      email: "sara@example.com",
      status: "received",
      createdAt: new Date().toISOString(),
    });

    const user = userEvent.setup();
    render(<CohortApplicationForm locale="en" />);

    await user.type(screen.getByLabelText(/Full Name/i), "Sara Mahmoud");
    // fireEvent.change(screen.getByLabelText(/Full Name/i), {
    //   target: { value: "Sara Mahmoud" },
    // });
    await user.type(screen.getByLabelText(/Email Address/i), "sara@example.com");
    // fireEvent.change(screen.getByLabelText(/Email Address/i), {
    //   target: { value: "sara@example.com" },
    // });

    await user.click(screen.getByRole("button", { name: /Submit Application/i }));

    expect(
      await screen.findByRole("heading", { name: /Application Received!/i }),
    ).toBeVisible();
    expect(
      screen.queryByRole("button", { name: /Submit Application/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("app_7b2f1e9a")).toBeInTheDocument();
  });
});
