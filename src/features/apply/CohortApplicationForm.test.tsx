import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CohortApplicationForm } from "./CohortApplicationForm";
import { api, ElWarshaApiError } from "@core/api";

vi.mock("@core/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@core/api")>();
  return {
    ...actual,
    api: {
      ...actual.api,
      applyCohort: vi.fn(),
    },
  };
});

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Full Name/i), "Eman Mohamed");
  await user.type(screen.getByLabelText(/Email Address/i), "eman@example.com");
  await user.type(screen.getByLabelText(/WhatsApp Number/i), "01000000000");
  await user.type(screen.getByLabelText(/GitHub Handle/i), "emangithub");
  await user.type(screen.getByLabelText(/Discord Handle/i), "eman1234");

  await user.selectOptions(screen.getByLabelText(/Current Status/i), "student");
  await user.type(screen.getByLabelText(/College & Major/i), "Computer Science");
  await user.type(screen.getByLabelText(/Programming Experience/i), "2 years");
  await user.type(screen.getByLabelText(/Technologies Used/i), "React");
  await user.selectOptions(screen.getByLabelText(/Git Experience/i), "comfortable");

  await user.type(
    screen.getByLabelText(/Published Personal Page/i),
    "https://google.com",
  );
  await user.type(
    screen.getByLabelText(/GitHub Repository Link/i),
    "https://github.com/example/repo",
  );
  await user.type(screen.getByLabelText(/AI Usage/i), "No AI used");

  await user.type(
    screen.getByLabelText(/Motivation/i),
    "I am very motivated to join this cohort to learn how to build real products and improve my React and Next.js skills significantly.",
  );
}

describe("CohortApplicationForm", () => {
  const mockLocale = "en";

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders all form sections correctly", () => {
    render(<CohortApplicationForm locale={mockLocale} cohortSlug="test-cohort" />);
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
  });

  it("displays 422 validation errors directly below invalid fields", async () => {
    const user = userEvent.setup();
    const mock422Error = new ElWarshaApiError(422, {
      invalidParams: [{ name: "githubHandle", reason: "Invalid GitHub URL format" }],
    });
    vi.mocked(api.applyCohort).mockRejectedValueOnce(mock422Error);

    render(<CohortApplicationForm locale={mockLocale} cohortSlug="test-cohort" />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid GitHub URL format")).toBeInTheDocument();
    });
  });

  it("shows an alert when a 409 conflict error occurs", async () => {
    const user = userEvent.setup();
    const mock409Error = new ElWarshaApiError(409, {
      detail: "Application already exists",
    });
    vi.mocked(api.applyCohort).mockRejectedValueOnce(mock409Error);

    render(<CohortApplicationForm locale={mockLocale} cohortSlug="test-cohort" />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Application already exists")).toBeInTheDocument();
    });
  });

  it("displays the admission receipt on successful submission (201 Created)", async () => {
    const user = userEvent.setup();
    vi.mocked(api.applyCohort).mockResolvedValueOnce({} as never);

    render(<CohortApplicationForm locale={mockLocale} cohortSlug="test-cohort" />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Application Submitted/i)).toBeInTheDocument();
    });
  });
});
