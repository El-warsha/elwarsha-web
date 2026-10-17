import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";

import { CohortApplicationForm } from "./CohortApplicationForm.js";
import { api, ElWarshaApiError, type ApiError } from "@core/api";
import { Toaster } from "@ui/components/Toast/index.js";
import { useToastStore } from "@core/toast";

vi.mock("@core/api", () => {
  class MockElWarshaApiError extends Error {
    constructor(
      public status: number,
      public body: ApiError | null,
    ) {
      super(body?.detail ?? `Request failed with ${status}`);
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
    vi.clearAllMocks();
    useToastStore.getState().clearToasts();
  });

  it("renders all 4 sections and key form fields", () => {
    render(<CohortApplicationForm locale="en" cohortSlug="cohort-2" />);

    expect(screen.getByText("Personal & Contact Information")).toBeInTheDocument();
    expect(screen.getByText("Technical Background")).toBeInTheDocument();
    expect(screen.getByText("Personal Page Task")).toBeInTheDocument();
    expect(screen.getAllByText("Motivation").length).toBeGreaterThanOrEqual(1);

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/WhatsApp Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/GitHub Handle/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Discord Handle/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Current Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Git Experience/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/College & Major/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Programming Experience/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Technologies Used/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Published Personal Page Link/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/GitHub Repository Link/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/AI Usage/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Motivation/i)).toBeInTheDocument();
  });

  it("displays 422 validation errors directly below invalid fields", async () => {
    const user = userEvent.setup();
    vi.mocked(api.applyCohort).mockRejectedValueOnce(
      new ElWarshaApiError(422, {
        status: 422,
        invalidParams: [
          { name: "email", reason: "Must be a valid email address" },
          { name: "motivation", reason: "Must be at least 50 characters" },
        ],
      }),
    );

    render(<CohortApplicationForm locale="en" />);

    const submitBtn = screen.getByRole("button", { name: /Submit Application/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("Must be a valid email address")).toBeInTheDocument();
      expect(screen.getByText("Must be at least 50 characters")).toBeInTheDocument();
    });

    const emailInput = screen.getByLabelText(/Email Address/i);
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput).toHaveAttribute("aria-describedby", "email-error");

    // Clearing error on change
    await user.type(emailInput, "a");
    expect(screen.queryByText("Must be a valid email address")).not.toBeInTheDocument();
    expect(emailInput).toHaveAttribute("aria-invalid", "false");
  });

  it("displays conflict toaster on 409 Conflict", async () => {
    const user = userEvent.setup();
    vi.mocked(api.applyCohort).mockRejectedValueOnce(
      new ElWarshaApiError(409, {
        status: 409,
        detail:
          "An application with this email or GitHub handle already exists for Cohort 2",
      }),
    );

    render(
      <>
        <Toaster />
        <CohortApplicationForm locale="en" />
      </>,
    );

    await user.click(screen.getByRole("button", { name: /Submit Application/i }));

    await waitFor(() => {
      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent(
        "An application with this email or GitHub handle already exists for Cohort 2",
      );
    });
  });

  it("displays admission receipt on successful submission", async () => {
    const user = userEvent.setup();
    vi.mocked(api.applyCohort).mockResolvedValueOnce({
      id: "app_123456",
      cohortSlug: "cohort-2",
      email: "applicant@example.com",
      status: "received",
      createdAt: "2026-10-10T12:00:00.000Z",
    });

    render(<CohortApplicationForm locale="en" cohortSlug="cohort-2" />);

    await user.type(screen.getByLabelText(/Full Name/i), "Mohamed Ali");
    await user.type(screen.getByLabelText(/Email Address/i), "applicant@example.com");
    await user.click(screen.getByRole("button", { name: /Submit Application/i }));

    await waitFor(() => {
      expect(screen.getByText(/Application Received Successfully!/i)).toBeInTheDocument();
      expect(screen.getByText("app_123456")).toBeInTheDocument();
      expect(screen.getByText("cohort-2")).toBeInTheDocument();
      expect(screen.getByText("applicant@example.com")).toBeInTheDocument();
      expect(screen.getByText("received")).toBeInTheDocument();
    });
  });

  it("supports adding and removing technology tags", async () => {
    const user = userEvent.setup();
    render(<CohortApplicationForm locale="en" />);

    const techInput = screen.getByLabelText(/Technologies Used/i);
    const addBtn = screen.getByRole("button", { name: /\+ Add/i });

    // Add tag using button
    await user.type(techInput, "React");
    await user.click(addBtn);

    expect(screen.getByText("React")).toBeInTheDocument();

    // Add tag using Enter key
    await user.type(techInput, "TypeScript{Enter}");
    expect(screen.getByText("TypeScript")).toBeInTheDocument();

    // Remove React tag
    const removeReactBtn = screen.getByRole("button", { name: /Remove React/i });
    await user.click(removeReactBtn);

    expect(screen.queryByText("React")).not.toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});
