import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@core/api";

import { SubmissionStatusCard } from "./SubmissionStatusCard.js";

vi.mock("@core/api", () => ({
  api: { getAssignmentSubmissions: vi.fn() },
}));

function renderCard() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <SubmissionStatusCard locale="en" cohortSlug="cohort-01" weekNumber={6} />
    </QueryClientProvider>,
  );
}

function item(repo: string, status: "draft" | "in_review" | "merged") {
  const open = status !== "draft";
  const url = `https://github.com/El-warsha/${repo}/pull/42`;
  return {
    id: null,
    assignmentId: "a1",
    weekNumber: 6,
    githubOwner: "El-warsha",
    githubRepo: repo,
    status,
    prUrl: open ? url : null,
    pullRequest: open
      ? { number: 42, state: status === "merged" ? "merged" : "open", htmlUrl: url }
      : null,
    updatedAt: null,
  };
}

function response(...items: ReturnType<typeof item>[]) {
  return { assignmentId: "a1", weekNumber: 6, submissions: items } as never;
}

describe("SubmissionStatusCard", () => {
  beforeEach(() => {
    vi.mocked(api.getAssignmentSubmissions).mockReset();
  });

  it("shows loading first", () => {
    vi.mocked(api.getAssignmentSubmissions).mockReturnValue(new Promise(() => {}));
    renderCard();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows draft instructions with the week tag", async () => {
    vi.mocked(api.getAssignmentSubmissions).mockResolvedValue(
      response(item("elwarsha-api", "draft")),
    );
    renderCard();
    expect(await screen.findByText(/\[week-06\]/)).toBeInTheDocument();
  });

  it("shows an open PR with its link", async () => {
    vi.mocked(api.getAssignmentSubmissions).mockResolvedValue(
      response(item("elwarsha-api", "in_review")),
    );
    renderCard();
    expect(await screen.findByRole("link", { name: /#42/ })).toHaveAttribute(
      "href",
      "https://github.com/El-warsha/elwarsha-api/pull/42",
    );
  });

  it("shows a merged PR", async () => {
    vi.mocked(api.getAssignmentSubmissions).mockResolvedValue(
      response(item("elwarsha-api", "merged")),
    );
    renderCard();
    expect(await screen.findByText(/Merged Successfully/i)).toBeInTheDocument();
  });

  it("renders one article per repository", async () => {
    vi.mocked(api.getAssignmentSubmissions).mockResolvedValue(
      response(item("elwarsha-api", "draft"), item("elwarsha-web", "merged")),
    );
    renderCard();
    expect(await screen.findAllByRole("article")).toHaveLength(2);
  });

  it("refetches when refresh is clicked", async () => {
    const user = userEvent.setup();
    vi.mocked(api.getAssignmentSubmissions).mockResolvedValue(
      response(item("elwarsha-api", "draft")),
    );
    renderCard();
    await screen.findByText(/\[week-06\]/);

    await user.click(screen.getByRole("button", { name: /refresh/i }));

    expect(api.getAssignmentSubmissions).toHaveBeenCalledTimes(2);
  });
});