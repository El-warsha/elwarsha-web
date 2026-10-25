import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  });

  it("shows labels and filters assignments with the accessible label picker", async () => {
    const user = userEvent.setup();
    const frontend = { id: "label-frontend", name: "frontend" };
    const backend = { id: "label-backend", name: "backend" };

    vi.mocked(api.listAssignments).mockResolvedValue([
      {
        ...assignmentFixture,
        id: "assignment-frontend",
        title: "Frontend assignment",
        labels: [frontend],
      },
      {
        ...assignmentFixture,
        id: "assignment-backend",
        weekNumber: 2,
        title: "Backend assignment",
        labels: [backend],
      },
    ]);

    render(<TasksPage locale="en" />);

    expect(
      await screen.findByRole("heading", { name: "Frontend assignment" }),
    ).toBeInTheDocument();
    expect(screen.getByText("frontend", { selector: "span" })).toBeInTheDocument();

    const picker = screen.getByRole("combobox", { name: "Labels" });
    expect(picker).toBeInTheDocument();

    await user.selectOptions(picker, "label-backend");

    expect(
      await screen.findByRole("heading", { name: "Backend assignment" }),
    ).toBeInTheDocument();
    expect(screen.getByText("backend", { selector: "span" })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Frontend assignment" }),
    ).not.toBeInTheDocument();
  });
});
