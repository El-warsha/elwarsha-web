import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, beforeEach } from "vitest";

import { Toaster } from "./Toaster.js";
import { toast, useToastStore } from "@core/toast";

describe("Toaster component", () => {
  beforeEach(() => {
    useToastStore.getState().clearToasts();
  });

  it("renders toast notifications and removes them on close click", async () => {
    const user = userEvent.setup();
    render(<Toaster />);

    toast.error("Operation failed");
    expect(await screen.findByText("Operation failed")).toBeInTheDocument();

    const closeBtn = screen.getByRole("button", { name: /close notification/i });
    await user.click(closeBtn);

    expect(screen.queryByText("Operation failed")).not.toBeInTheDocument();
  });

  it("renders success, warning, and info toasts", async () => {
    render(<Toaster />);

    toast.success("Saved successfully");
    toast.warning("Check your connection");
    toast.info("Did you know?");

    expect(await screen.findByText("Saved successfully")).toBeInTheDocument();
    expect(screen.getByText("Check your connection")).toBeInTheDocument();
    expect(screen.getByText("Did you know?")).toBeInTheDocument();
  });
});

