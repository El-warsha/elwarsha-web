import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DashboardPage } from "./DashboardPage.js";

describe("DashboardPage", () => {
  it("renders the fixture assignment and an unavailable seam", () => {
    render(<DashboardPage locale="en" />);
    expect(screen.getByText(/Navigate the codebase/)).toBeInTheDocument();
    expect(screen.getByText(/intentionally incomplete/)).toBeInTheDocument();
  });
});
