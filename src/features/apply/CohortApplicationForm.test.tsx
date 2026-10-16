import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CohortApplicationForm } from "./CohortApplicationForm.js";

const applyCohortMock = vi.fn();

vi.mock("@core/api", () => ({
  api: {
    applyCohort: (...args: unknown[]) => applyCohortMock(...args),
  },
  ElWarshaApiError: class ElWarshaApiError extends Error {
    status: number;
    body: unknown;
    constructor(status: number, body: unknown) {
      super("api-error");
      this.name = "ElWarshaApiError";
      this.status = status;
      this.body = body;
    }
  },
}));

import { ElWarshaApiError } from "@core/api";

/**
 * Fast fill: uses fireEvent.change so we don't fire a full keyboard event
 * per character. userEvent.type on 14 fields with a long motivation string
 * was burning ~4.5s per test and causing timeouts.
 *
 * userEvent is reserved for tests that specifically exercise typing/blur.
 */
function fillRequiredFields() {
  const set = (label: RegExp, value: string) => {
    const el = screen.getByLabelText(label) as HTMLInputElement | HTMLTextAreaElement;
    fireEvent.change(el, { target: { value } });
  };

  set(/الاسم بالكامل|Full Name/i, "Ahmed Mohamed");
  set(/البريد الإلكتروني|Email Address/i, "ahmed@example.com");
  set(/رقم واتساب|WhatsApp Number/i, "+201012345678");
  set(/اسم الحساب على GitHub|GitHub Handle/i, "ahmed-dev");
  set(/اسم الحساب على Discord|Discord Handle/i, "ahmed#1234");

  fireEvent.change(screen.getByLabelText(/وضعك الحالي|Current Status/i), {
    target: { value: "student" },
  });

  set(/الكلية والتخصص|College & Major/i, "Engineering");
  set(/من إمتى وانت بتتعلم برمجة|Programming Experience/i, "1 year");
  set(/اللغات والتقنيات|Technologies Used/i, "JavaScript");

  fireEvent.change(screen.getByLabelText(/استخدمت Git|Git Experience/i), {
    target: { value: "comfortable" },
  });

  set(/رابط الصفحة الشخصية|Personal Page Link/i, "https://ahmed.dev");
  set(/لينك الريبو|GitHub Repository Link/i, "https://github.com/ahmed-dev/page");
  set(/الذكاء الاصطناعي|AI Usage/i, "Used for proofreading");
  set(
    /ليه عايز تدخل|Motivation/i,
    "I want to build real products with a team and grow as an engineer working on a living codebase.",
  );
}

describe("CohortApplicationForm", () => {
  beforeEach(() => {
    applyCohortMock.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders all four sections and required inputs", () => {
    render(<CohortApplicationForm locale="en" cohortSlug="cohort-2" />);

    expect(
      screen.getByRole("group", { name: /Personal & Contact Information/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: /Technical Background/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: /Personal Page Task/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("group", { name: /Motivation/i })).toBeInTheDocument();

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/WhatsApp Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/GitHub Handle/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Discord Handle/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Current Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/College & Major/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Programming Experience/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Technologies Used/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Git Experience/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Personal Page Link/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/GitHub Repository Link/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/AI Usage/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Motivation/i)).toBeInTheDocument();
  });

  it("shows 422 errors directly under the invalid fields", async () => {
    const user = userEvent.setup();
    render(<CohortApplicationForm locale="en" cohortSlug="cohort-2" />);

    applyCohortMock.mockRejectedValueOnce(
      new ElWarshaApiError(422, {
        invalidParams: [
          { name: "email", reason: "Must be a valid email address" },
          { name: "motivation", reason: "Must be at least 50 characters" },
        ],
      }),
    );

    fillRequiredFields();
    await user.click(screen.getByRole("button", { name: /Submit Application/i }));

    expect(await screen.findByText(/Must be a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Must be at least 50 characters/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Email Address/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByLabelText(/Motivation/i)).toHaveAttribute("aria-invalid", "true");
  });

  it("clears a field error when the user edits it", async () => {
    const user = userEvent.setup();
    render(<CohortApplicationForm locale="en" cohortSlug="cohort-2" />);

    applyCohortMock.mockRejectedValueOnce(
      new ElWarshaApiError(422, {
        invalidParams: [{ name: "email", reason: "Must be a valid email address" }],
      }),
    );

    fillRequiredFields();
    await user.click(screen.getByRole("button", { name: /Submit Application/i }));

    expect(await screen.findByText(/Must be a valid email address/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/Email Address/i), "x");

    await waitFor(() => {
      expect(
        screen.queryByText(/Must be a valid email address/i),
      ).not.toBeInTheDocument();
    });
  });

  it("shows a conflict alert on 409", async () => {
    const user = userEvent.setup();
    render(<CohortApplicationForm locale="en" cohortSlug="cohort-2" />);

    applyCohortMock.mockRejectedValueOnce(
      new ElWarshaApiError(409, {
        detail: "An application with this email or GitHub handle already exists",
      }),
    );

    fillRequiredFields();
    await user.click(screen.getByRole("button", { name: /Submit Application/i }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/already exists for this cohort/i);
  });

  it("shows the admission receipt on 201", async () => {
    const user = userEvent.setup();
    render(<CohortApplicationForm locale="en" cohortSlug="cohort-2" />);

    applyCohortMock.mockResolvedValueOnce({
      id: "app_123",
      cohortSlug: "cohort-2",
      email: "ahmed@example.com",
      status: "received",
      createdAt: "2026-10-16T12:00:00.000Z",
    });

    fillRequiredFields();
    await user.click(screen.getByRole("button", { name: /Submit Application/i }));

    expect(await screen.findByText(/Application received/i)).toBeInTheDocument();
    expect(screen.getByText(/app_123/i)).toBeInTheDocument();
    expect(screen.getByText(/ahmed@example.com/i)).toBeInTheDocument();
    expect(screen.getByText("received")).toBeInTheDocument();
  });

  it("shows a live character counter that turns valid at 50 chars", async () => {
    const user = userEvent.setup();
    render(<CohortApplicationForm locale="en" cohortSlug="cohort-2" />);

    expect(screen.getByText(/0 \/ 50/)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/Motivation/i), "a".repeat(50));
    expect(screen.getByText(/50 \/ 50/)).toBeInTheDocument();
  });

  it("disables the submit button while submitting", async () => {
    const user = userEvent.setup();
    render(<CohortApplicationForm locale="en" cohortSlug="cohort-2" />);

    let resolveIt: (v: unknown) => void = () => {};
    applyCohortMock.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveIt = resolve;
        }),
    );

    fillRequiredFields();
    const button = screen.getByRole("button", { name: /Submit Application/i });
    await user.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/Submitting/);

    resolveIt({
      id: "app_x",
      cohortSlug: "cohort-2",
      email: "ahmed@example.com",
      status: "received",
      createdAt: new Date().toISOString(),
    });
  });

  // ---------- Real-time validation ----------

  it("does not show an error while typing the first time (before blur)", async () => {
    const user = userEvent.setup();
    render(<CohortApplicationForm locale="en" cohortSlug="cohort-2" />);

    const email = screen.getByLabelText(/Email Address/i);
    await user.type(email, "not-an-email");

    expect(screen.queryByText(/valid email/i)).not.toBeInTheDocument();
  });

  it("shows the error on blur, then updates live on subsequent edits", async () => {
    const user = userEvent.setup();
    render(<CohortApplicationForm locale="en" cohortSlug="cohort-2" />);

    const email = screen.getByLabelText(/Email Address/i);
    await user.type(email, "not-an-email");

    // Blur → error appears.
    await user.tab();
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();

    // Fix it → error clears live (before second blur).
    await user.clear(email);
    await user.type(email, "ahmed@example.com");
    await waitFor(() => {
      expect(screen.queryByText(/valid email/i)).not.toBeInTheDocument();
    });
  });

  it("blocks submission and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<CohortApplicationForm locale="en" cohortSlug="cohort-2" />);

    await user.click(screen.getByRole("button", { name: /Submit Application/i }));

    // No network call.
    expect(applyCohortMock).not.toHaveBeenCalled();

    // First invalid field is fullName — focus should be there.
    const fullName = screen.getByLabelText(/Full Name/i);
    await waitFor(() => expect(fullName).toHaveFocus());
    expect(fullName).toHaveAttribute("aria-invalid", "true");
  });
});
