import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@core/api";
import { assignmentFixture } from "@core/catalog/fixtures";

import { TasksPage } from "./TasksPage.js";

vi.mock("@core/api", () => ({
  api: {
    listAssignments: vi.fn(),
  },
}));

describe("TasksPage", () => {
  beforeEach(() => {
    vi.mocked(api.listAssignments).mockReset();
  });

  it("renders the assignment returned by the data hook", async () => {
    vi.mocked(api.listAssignments).mockResolvedValue([assignmentFixture]);

    render(<TasksPage locale="en" />);

    expect(
      await screen.findByRole("heading", { name: assignmentFixture.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("Week 1")).toBeInTheDocument();
    expect(screen.getByText(assignmentFixture.status)).toBeInTheDocument();
    expect(screen.getByText("Architecture")).toBeInTheDocument();
    expect(screen.getByText("Modularity")).toBeInTheDocument();
  });

  it("renders custom labels when provided on the assignment", async () => {
    const customAssignment = {
      ...assignmentFixture,
      labels: ["Frontend", "Design System"],
    };
    vi.mocked(api.listAssignments).mockResolvedValue([customAssignment]);

    render(<TasksPage locale="en" />);

    expect(
      await screen.findByRole("heading", { name: customAssignment.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Design System")).toBeInTheDocument();
  });
});
