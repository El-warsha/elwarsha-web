import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { api, ElWarshaApiError } from "@core/api";
import { clearSessionCache } from "@core/session";
import { DashboardPage } from "./DashboardPage.js";

vi.mock("@core/api", () => ({
  api: {
    me: vi.fn(),
    loginUrl: vi.fn(
      (params?: { locale?: string }) =>
        `http://localhost:3001/api/v1/auth/login${params?.locale ? `?locale=${params.locale}` : ""}`,
    ),
    logout: vi.fn(),
  },
  ElWarshaApiError: class extends Error {
    constructor(
      readonly status: number,
      readonly body: unknown = null,
    ) {
      super();
    }
  },
}));

describe("DashboardPage", () => {
  beforeEach(() => {
    clearSessionCache();
    vi.mocked(api.me).mockReset();
    vi.mocked(api.logout).mockReset();
  });

  it("renders the sign-in screen when unauthenticated", async () => {
    vi.mocked(api.me).mockRejectedValue(new ElWarshaApiError(401, null));

    render(
      <MemoryRouter initialEntries={["/en/portal"]}>
        <DashboardPage locale="en" />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: "Sign in to see this week" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Participant portal")).toBeInTheDocument();

    const cta = screen.getByRole("link", { name: "Log in" });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute(
      "href",
      "http://localhost:3001/api/v1/auth/login?locale=en",
    );
    expect(screen.queryByText(/Navigate the codebase/)).not.toBeInTheDocument();
  });

  it("renders an error notice when auth failed query param is present", async () => {
    vi.mocked(api.me).mockRejectedValue(new ElWarshaApiError(401, null));

    render(
      <MemoryRouter initialEntries={["/en/portal?auth=failed"]}>
        <DashboardPage locale="en" />
      </MemoryRouter>,
    );

    expect(await screen.findByText("Authentication failed")).toBeInTheDocument();
    expect(
      screen.getByText("Could not complete sign in. Please try again."),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Log in" })).toBeInTheDocument();
  });

  it("renders the user dashboard when authenticated", async () => {
    vi.mocked(api.me).mockResolvedValue({
      user: {
        id: "user-1",
        displayName: "Test Participant",
        email: "participant@elwarsha.dev",
        locale: "en",
      },
      roles: ["participant"],
      capabilities: ["portal.view"],
      memberships: [],
    });

    render(
      <MemoryRouter initialEntries={["/en/portal"]}>
        <DashboardPage locale="en" />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("heading", { name: "This week" })).toBeInTheDocument();
    expect(screen.getByText("Test Participant")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign out" })).toBeInTheDocument();
    const assignmentsLink = screen.getByRole("link", { name: "Assignments" });
    expect(assignmentsLink).toBeInTheDocument();
    expect(assignmentsLink).toHaveAttribute("href", "/en/portal/assignments");
  });

  it("calls api.logout when sign out button is clicked", async () => {
    vi.mocked(api.me).mockResolvedValue({
      user: {
        id: "user-1",
        displayName: "Test Participant",
        email: "participant@elwarsha.dev",
        locale: "en",
      },
      roles: ["participant"],
      capabilities: ["portal.view"],
      memberships: [],
    });
    vi.mocked(api.logout).mockResolvedValue({ ok: true });

    render(
      <MemoryRouter initialEntries={["/en/portal"]}>
        <DashboardPage locale="en" />
      </MemoryRouter>,
    );

    const signOutBtn = await screen.findByRole("button", { name: "Sign out" });
    await userEvent.click(signOutBtn);

    expect(api.logout).toHaveBeenCalledTimes(1);
  });
});
