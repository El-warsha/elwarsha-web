import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { WeeksPage } from "./WeeksPage.js";

const listCohortWeeksMock = vi.fn();

vi.mock("@core/api", () => ({
  api: {
    listCohortWeeks: (...args: unknown[]) => listCohortWeeksMock(...args),
  },
}));

function makeWeek(overrides: Record<string, unknown> = {}) {
  return {
    weekNumber: 1,
    title: "Architecture and Modularity",
    tagline: "Week 1 tagline",
    concept: "Modularity",
    guidingQuestion: "How do we structure?",
    startDate: "2026-10-01",
    endDate: "2026-10-07",
    status: "completed" as const,
    isCurrent: false,
    isLocked: false,
    cohort: {
      id: "cohort-1",
      slug: "cohort-01",
      name: "Cohort 01",
      currentWeekNumber: 3,
      startsOn: "2026-10-01",
      endsOn: "2026-11-26",
    },
    bigIdea: "",
    outcomes: [],
    coreConcepts: [],
    appliedThroughTheStack: [],
    assignment: null,
    resources: { required: [], assignment: [], alternative: [] },
    reflectionQuestion: "",
    prerequisites: [],
    ...overrides,
  };
}

function renderPage(path = "/en/weeks/cohort-01") {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/:locale/weeks/:cohortSlug" element={<WeeksPage locale="en" />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("WeeksPage", () => {
  beforeEach(() => {
    listCohortWeeksMock.mockReset();
  });

  it("shows loading state while fetching", () => {
    listCohortWeeksMock.mockReturnValue(new Promise(() => {}));
    renderPage();

    expect(screen.getByText(/Preparing the workshop/i)).toBeInTheDocument();
  });

  it("shows an error when the request fails", async () => {
    listCohortWeeksMock.mockRejectedValue(new Error("boom"));
    renderPage();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /Something broke in the workshop/i,
    );
  });

  it("renders the cohort header and the current week badge", async () => {
    listCohortWeeksMock.mockResolvedValue([makeWeek()]);
    renderPage();

    expect(await screen.findByText("Cohort 01")).toBeInTheDocument();
    expect(screen.getByText(/Current Week/i)).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders unlocked weeks as cards with a link", async () => {
    listCohortWeeksMock.mockResolvedValue([
      makeWeek({ weekNumber: 1, status: "completed" }),
      makeWeek({ weekNumber: 2, status: "completed" }),
      makeWeek({ weekNumber: 3, status: "active", isCurrent: true }),
      makeWeek({ weekNumber: 4, status: "upcoming", isLocked: true }),
    ]);
    renderPage();

    // Active week shows "In Progress"
    expect(await screen.findByText(/In Progress/i)).toBeInTheDocument();

    // Unlocked weeks have "View Week Details" links
    const links = screen.getAllByRole("link", { name: /View Week Details/i });
    expect(links).toHaveLength(3);

    // Locked week shows padlock and disabled label
    const lockedCard = screen.getByLabelText(/Locked: Week 4/i);
    expect(lockedCard).toBeInTheDocument();
  });

  it("only renders the lock on locked weeks", async () => {
    listCohortWeeksMock.mockResolvedValue([
      makeWeek({ weekNumber: 1, status: "completed" }),
      makeWeek({ weekNumber: 4, status: "upcoming", isLocked: true }),
    ]);
    renderPage();

    await screen.findByText(/Completed/i);

    // Exactly one padlock
    const padlocks = screen.getAllByText("🔒");
    expect(padlocks).toHaveLength(1);
  });
});
