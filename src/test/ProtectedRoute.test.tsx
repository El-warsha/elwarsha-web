import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProtectedRoute } from "../app/routes/ProtectedRoute.js";
import { useSession } from "@core/session";

vi.mock("@core/session", () => ({
  useSession: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useOutletContext: () => "en", 
});

describe("ProtectedRoute Component", () => {
  it("renders signed-out screen when user is unauthenticated", () => {
    (useSession as any).mockReturnValue({
      status: "unauthenticated",
      user: null,
    });

    render(
      <ProtectedRoute>
        <div>Protected Portal Content</div>
      </ProtectedRoute>,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.queryByText("Protected Portal Content")).not.toBeInTheDocument();
  });

  it("renders protected content when user is authenticated", () => {
    (useSession as any).mockReturnValue({
      status: "authenticated",
      user: { id: "1", name: "Test User" },
    });

    render(
      <ProtectedRoute>
        <div>Protected Portal Content</div>
      </ProtectedRoute>,
    );

    expect(screen.getByText("Protected Portal Content")).toBeInTheDocument();
  });
});
