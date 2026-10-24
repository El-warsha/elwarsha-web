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
      title: "Architecture and modularity",
      tagline: "Find boundaries before changing code",
      concept: "Architecture",
      guidingQuestion: "How do we structure apps?",
      startDate: "2026-10-01",
      endDate: "2026-10-07",
      isCurrent: true,
      status: "active",
      isLocked: false,
      cohort: {
        id: "cohort-1",
        slug: "cohort-01",
        name: "Cohort 01",
        currentWeekNumber: 1,
        startsOn: "2026-10-01",
        endsOn: "2026-11-26",
      },
      bigIdea: "",
      outcomes: [],
      coreConcepts: ["Modules"],
      appliedThroughTheStack: [],
      assignment: {
        id: "assign-1",
        title: "Build the folder structure",
        summary: "",
        status: "published",
        labels: ["core"],
        detailsMd: "",
      },
      resources: { required: [], assignment: [], alternative: [] },
      reflectionQuestion: "",
      prerequisites: [],
    },
    {
      weekNumber: 2,
      title: "Data modeling",
      tagline: "Design your tables",
      concept: "",
      guidingQuestion: "",
      startDate: "2026-10-08",
      endDate: "2026-10-14",
      isCurrent: false,
      status: "upcoming",
      isLocked: true,
      cohort: {
        id: "cohort-1",
        slug: "cohort-01",
        name: "Cohort 01",
        currentWeekNumber: 1,
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
    },
  ];

  beforeEach(() => {
    vi.mocked(api.listCohortWeeks).mockReset();
  });

  it("renders cohort header, unlocked week, and locked week successfully", async () => {
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

    expect(
      await screen.findByRole("heading", { name: "Cohort Weeks Overview" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Cohort 01")).toBeInTheDocument();

    expect(screen.getByText("Architecture and modularity")).toBeInTheDocument();
    expect(screen.getByText("Build the folder structure")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Architecture and modularity/i })).toHaveAttribute(
      "href",
      "/en/portal/cohorts/cohort-01/weeks/1"
    );

    expect(screen.getByText("Data modeling")).toBeInTheDocument();
    expect(screen.getByText(/This week is currently locked/)).toBeInTheDocument();
  });

  it("renders error state when week query fails", async () => {
    vi.mocked(api.listCohortWeeks).mockRejectedValue(new Error("Failed to load"));

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

    expect(
      await screen.findByRole("heading", { name: /Something broke in the workshop/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Failed to load")).toBeInTheDocument();
    
    const backLink = screen.getByRole("link", { name: /Cohorts/i });
    expect(backLink).toHaveAttribute("href", "/en/portal/cohorts");
  });
});