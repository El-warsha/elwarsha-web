import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@core/api";
import { assignmentFixture } from "@core/catalog/fixtures";

import { TasksPage } from "./TasksPage.js";
import userEvent from "@testing-library/user-event";
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
  it("filters by label and shows everything again with All", async () => {
    const reviewOnly = {
      ...assignmentFixture,
      id: "assignment-2",
      title: "Review only task",
      labels: assignmentFixture.labels.filter((l) => l.name === "review"),
    };
    vi.mocked(api.listAssignments).mockResolvedValue([reviewOnly, assignmentFixture]);
    const user = userEvent.setup();
    render(<TasksPage locale="en" />);

    await screen.findByRole("heading", { name: reviewOnly.title });
    expect(
      screen.getByRole("heading", { name: assignmentFixture.title }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "backend" }));
    expect(
      screen.queryByRole("heading", { name: reviewOnly.title }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: assignmentFixture.title }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getByRole("heading", { name: reviewOnly.title })).toBeInTheDocument();
  });
});
