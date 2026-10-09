
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { useTasks } from "./useTasks.js";
import { TasksPage } from "./TasksPage.js";

vi.mock("./useTasks.js", () => ({
  useTasks: vi.fn(),
}));

const mockLoadMore = vi.fn();

const mockTask = {
  id: "task-1",
  weekNumber: 1,
  title: "Build an API",
  status: "published" as const,
  engagementId: "engagement-1",
  labels: [{ id: "label-1", name: "Backend" }],
};

const mockData = {
  tasks: [mockTask],
  labels: [{ id: "label-1", name: "Backend" }],
  nextCursor: null as string | null,
  loading: false,
  loadMore: mockLoadMore,
};

describe("TasksPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTasks).mockReturnValue(mockData);
  });

  it("renders tasks and their labels", () => {
    render(<TasksPage locale="en" />);

    expect(
      screen.getByRole("heading", { name: "Build an API" }),
    ).toBeTruthy();

    expect(screen.getAllByText("Backend")).toHaveLength(2);
  });

  it("filters tasks when a label is selected", () => {
    render(<TasksPage locale="en" />);

    fireEvent.click(
      screen.getByRole("button", { name: "Backend" }),
    );

    expect(useTasks).toHaveBeenLastCalledWith("label-1");
  });

  it("loads more tasks when the button is clicked", () => {
    vi.mocked(useTasks).mockReturnValue({
      ...mockData,
      nextCursor: "next-page",
    });

    render(<TasksPage locale="en" />);

    fireEvent.click(
      screen.getByRole("button", { name: "Load more" }),
    );

    expect(mockLoadMore).toHaveBeenCalledTimes(1);
  });
});