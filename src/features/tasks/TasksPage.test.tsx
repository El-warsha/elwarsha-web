import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@core/api";
import { assignmentFixture } from "@core/catalog/fixtures";

import { TasksPage } from "./TasksPage.js";

vi.mock("@core/api", () => ({
  api: {
    listAssignments: vi.fn(),
    listLabels: vi.fn(),
  },
}));

const labels = [
  { id: "label-1", name: "frontend" },
  { id: "label-2", name: "backend" },
];

const backendOnly = {
  ...assignmentFixture,
  id: "assignment-2",
  weekNumber: 2,
  title: "Backend task",
  labels: [labels[1]!],
};

describe("TasksPage", () => {
  beforeEach(() => {
    vi.mocked(api.listAssignments).mockReset();
    vi.mocked(api.listLabels).mockReset();
    vi.mocked(api.listAssignments).mockResolvedValue([assignmentFixture, backendOnly]);
    vi.mocked(api.listLabels).mockResolvedValue(labels);
  });

  it("renders assignments with their label chips", async () => {
    render(<TasksPage locale="en" />);

    expect(
      await screen.findByRole("heading", { name: assignmentFixture.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("Week 1")).toBeInTheDocument();
    expect(screen.getAllByText("frontend").length).toBeGreaterThan(0);
  });

  it("filters assignments with the label picker", async () => {
    const user = userEvent.setup();
    render(<TasksPage locale="en" />);

    await screen.findByRole("heading", { name: assignmentFixture.title });
    await user.click(screen.getByRole("button", { name: "backend" }));

    expect(screen.queryByRole("heading", { name: assignmentFixture.title })).toBeNull();
    expect(screen.getByRole("heading", { name: "Backend task" })).toBeInTheDocument();
  });

  it("gives every interactive control an accessible name", async () => {
    render(<TasksPage locale="en" />);

    await screen.findByRole("heading", { name: assignmentFixture.title });

    expect(screen.getByRole("group", { name: "Filter by label" })).toBeInTheDocument();
    for (const button of screen.getAllByRole("button")) {
      expect(button).toHaveAccessibleName();
    }
  });
});