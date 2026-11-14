import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@core/api";
import { assignmentFixture } from "@core/catalog/fixtures";

import { TasksPage } from "./TasksPage.js";

vi.mock("@core/api", () => ({
  api: {
    listAssignments: vi.fn(),
    getAssignmentSubmissions: vi.fn(),
  },
}));

function renderPage() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <TasksPage locale="en" />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("TasksPage", () => {
  beforeEach(() => {
    vi.mocked(api.listAssignments).mockReset();
    vi.mocked(api.getAssignmentSubmissions).mockReset();
  });

  it("renders the assignment returned by the data hook", async () => {
    vi.mocked(api.listAssignments).mockResolvedValue([assignmentFixture]);
    vi.mocked(api.getAssignmentSubmissions).mockResolvedValue({
      assignmentId: "a1",
      weekNumber: 1,
      submissions: [],
    });

    renderPage();

    expect(
      await screen.findByRole("heading", { name: assignmentFixture.title }),
    ).toBeInTheDocument();
    expect(await screen.findByText("Week 1")).toBeInTheDocument();
  });

  it("mounts the submission progress card", async () => {
    vi.mocked(api.listAssignments).mockResolvedValue([assignmentFixture]);
    vi.mocked(api.getAssignmentSubmissions).mockResolvedValue({
      assignmentId: "a1",
      weekNumber: 1,
      submissions: [],
    });

    renderPage();

    expect(
      await screen.findByRole("region", { name: /submission progress/i }),
    ).toBeInTheDocument();
  });
});