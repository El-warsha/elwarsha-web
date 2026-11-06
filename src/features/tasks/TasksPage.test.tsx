import { render, screen, waitFor } from "@testing-library/react";
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
     global.fetch = vi.fn().mockResolvedValue({
      json: async () => [
        { id: "1", name: "frontend" },
        { id: "2", name: "backend" },
      ],
    }) as any;
  });

  it("renders the assignment returned by the data hook", async () => {
    vi.mocked(api.listAssignments).mockResolvedValue([assignmentFixture]);

    render(<TasksPage locale="en" />);

    expect(
      await screen.findByRole("heading", { name: assignmentFixture.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("Week 1")).toBeInTheDocument();
  });

  it("renders the label picker and verifies accessible interactive controls", async () => {
    vi.mocked(api.listAssignments).mockResolvedValue([assignmentFixture]);

    render(<TasksPage locale="en" />);

     const labelPicker = await screen.findByRole("combobox");
    expect(labelPicker).toBeInTheDocument();
    expect(labelPicker).toHaveAccessibleName();
  });
});