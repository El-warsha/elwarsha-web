import { render, screen, waitFor } from "@testing-library/react";
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

const labelsFixture = [
{ id: "label-1", name: "frontend" },
{ id: "label-2", name: "backend" },
{ id: "label-3", name: "review" },
];

const frontendTaskFixture = {
...assignmentFixture,
id: "assignment-frontend",
title: "Frontend Task",
};

const backendTaskFixture = {
...assignmentFixture,
id: "assignment-backend",
title: "Backend Task",
};

describe("TasksPage", () => {
beforeEach(() => {
vi.mocked(api.listAssignments).mockReset();
vi.mocked(api.listLabels).mockReset();


vi.mocked(api.listLabels).mockResolvedValue(labelsFixture);

vi.mocked(api.listAssignments).mockResolvedValue([
  assignmentFixture,
]);


});

it("renders the assignment returned by the data hook", async () => {
render(<TasksPage locale="en" />);


expect(
  await screen.findByRole("heading", {
    name: assignmentFixture.title,
  }),
).toBeInTheDocument();

expect(screen.getByText("Week 1")).toBeInTheDocument();


});

it("renders all label chips as accessible buttons", async () => {
render(<TasksPage locale="en" />);


expect(
  await screen.findByRole("button", { name: "frontend" }),
).toBeInTheDocument();

expect(
  screen.getByRole("button", { name: "backend" }),
).toBeInTheDocument();

expect(
  screen.getByRole("button", { name: "review" }),
).toBeInTheDocument();

expect(
  screen.getByRole("button", { name: "All" }),
).toBeInTheDocument();


});

it("provides an accessible name for the label filter group", async () => {
render(<TasksPage locale="en" />);


expect(
  await screen.findByRole("group", {
    name: "Filter assignments by label",
  }),
).toBeInTheDocument();


});

it("filters assignments when a label is selected", async () => {
const user = userEvent.setup();


render(<TasksPage locale="en" />);

const frontendButton = await screen.findByRole("button", {
  name: "frontend",
});

await user.click(frontendButton);

await waitFor(() => {
  expect(api.listAssignments).toHaveBeenLastCalledWith({
    label: "frontend",
  });
});

expect(frontendButton).toHaveAttribute("aria-pressed", "true");


});

it("requests all assignments when All is selected", async () => {
const user = userEvent.setup();


render(<TasksPage locale="en" />);

const allButton = await screen.findByRole("button", {
  name: "All",
});

const frontendButton = await screen.findByRole("button", {
  name: "frontend",
});

await user.click(frontendButton);

await waitFor(() => {
  expect(api.listAssignments).toHaveBeenLastCalledWith({
    label: "frontend",
  });
});

await user.click(allButton);

await waitFor(() => {
  expect(api.listAssignments).toHaveBeenLastCalledWith(undefined);
});

expect(allButton).toHaveAttribute("aria-pressed", "true");


});

it("displays assignments returned for the selected label", async () => {
const user = userEvent.setup();


vi.mocked(api.listAssignments).mockImplementation(async (params) => {
  if (params?.label === "frontend") {
    return [frontendTaskFixture];
  }

  if (params?.label === "backend") {
    return [backendTaskFixture];
  }

  return [frontendTaskFixture, backendTaskFixture];
});

render(<TasksPage locale="en" />);

expect(
  await screen.findByRole("heading", {
    name: "Frontend Task",
  }),
).toBeInTheDocument();

expect(
  screen.getByRole("heading", {
    name: "Backend Task",
  }),
).toBeInTheDocument();

await user.click(
  screen.getByRole("button", {
    name: "frontend",
  }),
);

expect(
  await screen.findByRole("heading", {
    name: "Frontend Task",
  }),
).toBeInTheDocument();

await waitFor(() => {
  expect(
    screen.queryByRole("heading", {
      name: "Backend Task",
    }),
  ).not.toBeInTheDocument();
});

});
});
