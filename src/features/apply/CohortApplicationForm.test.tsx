import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CohortApplicationForm from "./CohortApplicationForm";
import { api } from "@core/api";

vi.mock("@core/api", () => ({
  api: {
    applyCohort: vi.fn(),
  },
}));

describe("CohortApplicationForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const fillValidForm = async () => {
    await userEvent.type(screen.getByLabelText(/Full Name/i), "Razan Azizieh");
    await userEvent.type(screen.getByLabelText(/Email/i), "student@example.com");
    await userEvent.type(screen.getByLabelText(/WhatsApp Number/i), "+963999999999");
    await userEvent.type(screen.getByLabelText(/GitHub Handle/i), "razan");
    await userEvent.type(screen.getByLabelText(/Discord Handle/i), "razan#0000");

    await userEvent.selectOptions(screen.getByLabelText(/Current Status/i), "student");
    await userEvent.type(screen.getByLabelText(/College Major/i), "Math");
    await userEvent.type(screen.getByLabelText(/Programming Experience/i), "1 year");
    await userEvent.type(screen.getByLabelText(/Technologies/i), "React");
    await userEvent.selectOptions(
      screen.getByLabelText(/Git Experience/i),
      "basics only",
    );

    await userEvent.type(
      screen.getByLabelText(/Personal Page URL/i),
      "https://example.com",
    );
    await userEvent.type(
      screen.getByLabelText(/GitHub Repo URL/i),
      "https://github.com/test/repo",
    );
    await userEvent.type(screen.getByLabelText(/How you used AI tools/i), "None");

    await userEvent.type(
      screen.getByLabelText(/Why are you interested in this cohort\?/i),
      "I want to learn advanced web development techniques and enhance my skills significantly.",
    );
  };

  it("renders all sections correctly", () => {
    render(<CohortApplicationForm />);
    expect(screen.getByText(/Personal & Contact Information/i)).toBeInTheDocument();
    expect(screen.getByText(/Technical Background/i)).toBeInTheDocument();
    expect(screen.getByText(/Motivation/i)).toBeInTheDocument();
  });

  it("displays backend 422 validation errors below fields", async () => {
    const error: any = new Error("Validation Failed");
    error.status = 422;
    error.invalidParams = [{ name: "email", reason: "Must be a valid email address" }];
    vi.mocked(api.applyCohort).mockRejectedValueOnce(error);

    render(<CohortApplicationForm />);

    await fillValidForm();
    await userEvent.click(screen.getByRole("button", { name: /Submit Application/i }));

    await waitFor(() => {
      expect(screen.getByText(/Must be a valid email address/i)).toBeInTheDocument();
    });
  });

  it("displays 409 conflict alert on duplicate submission", async () => {
    const error: any = new Error("Conflict");
    error.status = 409;
    vi.mocked(api.applyCohort).mockRejectedValueOnce(error);

    render(<CohortApplicationForm />);

    await fillValidForm();
    await userEvent.click(screen.getByRole("button", { name: /Submit Application/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          /An application with this email or GitHub handle already exists/i,
        ),
      ).toBeInTheDocument();
    });
  });

  it("displays admission receipt on successful submission", async () => {
    vi.mocked(api.applyCohort).mockResolvedValueOnce({
      id: "app_123456",
      email: "student@example.com",
      createdAt: "2026-10-10T12:00:00.000Z",
    });

    render(<CohortApplicationForm />);

    await fillValidForm();
    await userEvent.click(screen.getByRole("button", { name: /Submit Application/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Application Submitted Successfully 🎉/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/app_123456/i)).toBeInTheDocument();
    });
  });
});
