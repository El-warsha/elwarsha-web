import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@core/api";
import { assignmentFixture, labelFixtures } from "@core/catalog/fixtures";

import { TasksPage } from "./TasksPage.js";

vi.mock("@core/api", () => ({
  api: {
    listAssignments: vi.fn(),
    listLabels: vi.fn(),
  },
}));

describe("TasksPage", () => {
  beforeEach(() => {
    vi.mocked(api.listAssignments).mockReset();
    vi.mocked(api.listLabels).mockReset();
  });

  it("renders the assignment returned by the data hook and its label chips", async () => {
    vi.mocked(api.listAssignments).mockResolvedValue([assignmentFixture]);
    vi.mocked(api.listLabels).mockResolvedValue(labelFixtures);

    render(<TasksPage locale="en" />);

    expect(
      await screen.findByRole("heading", { name: assignmentFixture.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("Week 1")).toBeInTheDocument();

    const taskLabelsContainer = screen.getByLabelText("Task labels");
    for (const label of assignmentFixture.labels) {
      expect(within(taskLabelsContainer).getByText(label.name)).toBeInTheDocument();
    }
  });

  it("renders the label picker and filters assignments when a label is clicked", async () => {
    const user = userEvent.setup();
    const taskFrontend = {
      ...assignmentFixture,
      id: "task-frontend",
      title: "Frontend Task",
      labels: [{ id: "label-1", name: "frontend" }],
    };
    const taskBackend = {
      ...assignmentFixture,
      id: "task-backend",
      title: "Backend Task",
      labels: [{ id: "label-2", name: "backend" }],
    };

    vi.mocked(api.listAssignments).mockResolvedValue([taskFrontend, taskBackend]);
    vi.mocked(api.listLabels).mockResolvedValue(labelFixtures);

    render(<TasksPage locale="en" />);

    expect(
      await screen.findByRole("heading", { name: "Frontend Task" }),
    ).toBeInTheDocument();

    const backendFilter = screen.getByRole("button", {
      name: "Filter by backend",
    });
    await user.click(backendFilter);

    expect(
      await screen.findByRole("heading", { name: "Backend Task" }),
    ).toBeInTheDocument();

    const allFilter = screen.getByRole("button", { name: "All labels" });
    await user.click(allFilter);

    expect(
      await screen.findByRole("heading", { name: "Frontend Task" }),
    ).toBeInTheDocument();
  });

  it("ensures all interactive controls have accessible names", async () => {
    vi.mocked(api.listAssignments).mockResolvedValue([assignmentFixture]);
    vi.mocked(api.listLabels).mockResolvedValue(labelFixtures);

    render(<TasksPage locale="en" />);

    await screen.findByRole("heading", { name: assignmentFixture.title });

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
    for (const button of buttons) {
      expect(button).toHaveAccessibleName();
    }
  });
});
