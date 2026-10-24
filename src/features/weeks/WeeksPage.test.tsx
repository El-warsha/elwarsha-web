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
  const sampleCohort = {
    id: "cohort-1",
    slug: "cohort-01",
    name: "Cohort 01",
    nameAr: "الدفعة الأولى",
    currentWeekNumber: 2,
    startsOn: "2026-10-01",
    endsOn: "2026-11-26",
  };

  const sampleWeeks: Week[] = [
    {
      weekNumber: 1,
      title: "Architecture & Modularity",
      tagline: "Find boundaries before changing code",
      concept: "Architecture and modularity",
      guidingQuestion: "How does a request travel without breaking boundaries?",
      startDate: "2026-10-01",
      endDate: "2026-10-07",
      isCurrent: false,
      status: "completed",
      isLocked: false,
      cohort: sampleCohort,
      bigIdea: "Trace a complete vertical slice through the architecture.",
      outcomes: ["Trace a request from HTTP entry to module"],
      coreConcepts: ["Separation of concerns"],
      appliedThroughTheStack: [
        { layer: "React", details: "Feature folders and state hooks" },
      ],
      assignment: {
        id: "assignment-1",
        title: "Navigate the codebase and open a focused PR",
        summary: "Understand boundaries and open PR",
        status: "published",
        labels: ["frontend", "backend"],
        detailsMd: "### Deliverables\n- Open PR on GitHub",
      },
      resources: {
        required: [],
        assignment: [],
        alternative: [],
      },
      reflectionQuestion: "Why is modularity important?",
      prerequisites: ["Node 22"],
    },
    {
      weekNumber: 2,
      title: "Data Modeling & Contracts",
      tagline: "Extend Prisma and API contract",
      concept: "Data modeling",
      guidingQuestion: "How do schemas evolve safely?",
      startDate: "2026-10-08",
      endDate: "2026-10-14",
      isCurrent: true,
      status: "active",
      isLocked: false,
      cohort: sampleCohort,
      bigIdea: "Model relational state cleanly.",
      outcomes: ["Extend Prisma models"],
      coreConcepts: ["ORM migrations"],
      appliedThroughTheStack: [
        { layer: "Prisma", details: "PostgreSQL migrations" },
      ],
      assignment: {
        id: "assignment-2",
        title: "State and data modeling",
        summary: "Extend Prisma schema",
        status: "published",
        labels: ["backend"],
        detailsMd: "### Deliverables\n- Add schema migrations",
      },
      resources: {
        required: [],
        assignment: [],
        alternative: [],
      },
      reflectionQuestion: "How do migrations prevent data loss?",
      prerequisites: ["PostgreSQL"],
    },
    {
      weekNumber: 3,
      title: "Asynchronous Flow",
      tagline: "Webhooks and background queues",
      concept: "Background processing",
      guidingQuestion: "How do background jobs recover safely?",
      startDate: "2026-10-15",
      endDate: "2026-10-21",
      isCurrent: false,
      status: "upcoming",
      isLocked: true,
      cohort: sampleCohort,
      bigIdea: "",
      outcomes: [],
      coreConcepts: [],
      appliedThroughTheStack: [],
      assignment: null,
      resources: {
        required: [],
        assignment: [],
        alternative: [],
      },
      reflectionQuestion: "",
      prerequisites: [],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders cohort header bar, unlocked cards, and locked cards in English", async () => {
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

    expect(screen.getByTestId("cohort-header-bar")).toBeInTheDocument();
    expect(screen.getByText("Cohort 01")).toBeInTheDocument();
    expect(screen.getByText(/Current Week: 2 \/ 8/)).toBeInTheDocument();

    expect(screen.getByTestId("week-card-1")).toBeInTheDocument();
    expect(screen.getByText("Architecture & Modularity")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();

    expect(screen.getByTestId("week-card-2")).toBeInTheDocument();
    expect(screen.getByText("Data Modeling & Contracts")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();

    expect(screen.getByTestId("locked-week-card-3")).toBeInTheDocument();
    expect(screen.getByText("Asynchronous Flow")).toBeInTheDocument();
    expect(screen.getByText("Locked until week begins")).toBeInTheDocument();
  });

  it("renders cohort header bar and weeks in Arabic", async () => {
    vi.mocked(api.listCohortWeeks).mockResolvedValue(sampleWeeks);

    renderWithQueryClient(
      <MemoryRouter initialEntries={["/ar/portal/cohorts/cohort-01/weeks"]}>
        <Routes>
          <Route
            path="/:locale/portal/cohorts/:cohortSlug/weeks"
            element={<WeeksPage locale="ar" />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: "نظرة عامة على أسابيع الدفعة" }),
    ).toBeInTheDocument();

    expect(screen.getByText("الدفعة الأولى")).toBeInTheDocument();
    expect(screen.getByText(/الأسبوع الحالي: 2 \/ 8/)).toBeInTheDocument();
    expect(screen.getByText("شغّال حالياً")).toBeInTheDocument();
    expect(screen.getByText("مكتمل")).toBeInTheDocument();
    expect(screen.getByText("مغلق حتى موعد بدء الأسبوع")).toBeInTheDocument();
  });

  it("renders weekNotFound panel when API fails", async () => {
    vi.mocked(api.listCohortWeeks).mockRejectedValue(
      new Error("Failed to fetch cohort weeks"),
    );

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
      await screen.findByRole("heading", { name: "Week Not Found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Failed to fetch cohort weeks"),
    ).toBeInTheDocument();
  });
});

