import { render, screen, within } from "@testing-library/react";
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

const frontendLabel = { id: "label-frontend", name: "frontend" };
const backendLabel = { id: "label-backend", name: "backend" };

const withLabels = {
  ...assignmentFixture,
  labels: [frontendLabel, backendLabel],
};

describe("TasksPage", () => {
  beforeEach(() => {
    vi.mocked(api.listAssignments).mockReset();
    vi.mocked(api.listLabels).mockReset();
  });

  it("renders the assignment returned by the data hook", async () => {
    vi.mocked(api.listAssignments).mockResolvedValue([withLabels]);
    vi.mocked(api.listLabels).mockResolvedValue([frontendLabel, backendLabel]);

    render(<TasksPage locale="en" />);

    expect(
      await screen.findByRole("heading", { name: assignmentFixture.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("Week 1")).toBeInTheDocument();
  });

  it("renders a chip for each label on the assignment", async () => {
    vi.mocked(api.listAssignments).mockResolvedValue([withLabels]);
    vi.mocked(api.listLabels).mockResolvedValue([frontendLabel, backendLabel]);

    render(<TasksPage locale="en" />);

    expect(await screen.findByLabelText("Label: frontend")).toBeInTheDocument();
    expect(screen.getByLabelText("Label: backend")).toBeInTheDocument();
  });

  it("filters the task list when a label is picked", async () => {
    const user = userEvent.setup();

    const frontendTask = {
      ...assignmentFixture,
      id: "assignment-frontend",
      title: "Frontend task",
      labels: [frontendLabel],
    };
    const backendTask = {
      ...assignmentFixture,
      id: "assignment-backend",
      title: "Backend task",
      labels: [backendLabel],
    };

    vi.mocked(api.listAssignments).mockResolvedValue([frontendTask, backendTask]);
    vi.mocked(api.listLabels).mockResolvedValue([frontendLabel, backendLabel]);

    render(<TasksPage locale="en" />);

    expect(
      await screen.findByRole("heading", { name: "Frontend task" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Backend task" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Filter by label: frontend/i }));

    expect(screen.getByRole("heading", { name: "Frontend task" })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Backend task" }),
    ).not.toBeInTheDocument();
  });

  it("gives every interactive control an accessible name", async () => {
    vi.mocked(api.listAssignments).mockResolvedValue([withLabels]);
    vi.mocked(api.listLabels).mockResolvedValue([frontendLabel, backendLabel]);

    render(<TasksPage locale="en" />);

    const picker = await screen.findByRole("group", {
      name: /Filter by labels/i,
    });

    const buttons = within(picker).getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);

    for (const button of buttons) {
      const name = button.getAttribute("aria-label") ?? button.textContent?.trim() ?? "";
      expect(name.length).toBeGreaterThan(0);
    }

    expect(screen.getByLabelText("Label: frontend")).toBeInTheDocument();
    expect(screen.getByLabelText("Label: backend")).toBeInTheDocument();
  });
});
