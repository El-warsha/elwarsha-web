import { screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@core/api";
import { renderWithQueryClient } from "@test/query-wrapper";
import { WeeksPage } from "./WeeksPage.js";
import type { Week } from "./weeks.schema.js";

vi.mock("@core/api", () => ({
  api: {
    listCohortWeeks: vi.fn(),
  },
}));

describe("WeeksPage", () => {
  const sampleWeeks: Week[] = [
    {
      weekNumber: 1,
      title: "Navigate the codebase",
      tagline: "Find boundaries",
      concept: "Architecture",
      guidingQuestion: "How does a request travel?",
      startDate: "2026-10-01",
      endDate: "2026-10-07",
      status: "completed",
      isCurrent: false,
      isLocked: false,
      cohort: {
        id: "cohort-1",
        slug: "cohort-01",
        name: "Cohort 01",
        currentWeekNumber: 2,
        startsOn: "2026-10-01",
        endsOn: "2026-11-26",
      },
      bigIdea: "Trace a complete vertical slice.",
      outcomes: [],
      coreConcepts: [],
      appliedThroughTheStack: [],
      assignment: null,
      resources: { required: [], assignment: [], alternative: [] },
      reflectionQuestion: "Which boundary?",
      prerequisites: [],
    },
  ];

  beforeEach(() => {
    vi.mocked(api.listCohortWeeks).mockReset();
  });

  it("renders cohort header and week titles successfully", async () => {
    vi.mocked(api.listCohortWeeks).mockResolvedValue(sampleWeeks);

    renderWithQueryClient(
      <MemoryRouter initialEntries={["/en/portal/cohorts/cohort-01/weeks"]}>
        <Routes>
          <Route
            path="/:locale/portal/cohorts/:cohortSlug/weeks"
            element={<WeeksPage locale="en" />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText("Cohort 01")).toBeInTheDocument();
    expect(screen.getByText(/Navigate the codebase/i)).toBeInTheDocument();
  });

  it("renders error state when fetching weeks fails", async () => {
    vi.mocked(api.listCohortWeeks).mockRejectedValue(new Error("Failed to load weeks"));

    renderWithQueryClient(
      <MemoryRouter initialEntries={["/en/portal/cohorts/cohort-01/weeks"]}>
        <Routes>
          <Route
            path="/:locale/portal/cohorts/:cohortSlug/weeks"
            element={<WeeksPage locale="en" />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText(/Error loading weeks/i)).toBeInTheDocument();
  });
});
