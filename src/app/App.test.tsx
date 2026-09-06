import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { LocaleHome } from "./LocaleHome.js";
import { PublicLayout } from "./PublicLayout.js";

describe("public home", () => {
  it("renders the Arabic workshop title", () => {
    render(
      <MemoryRouter initialEntries={["/ar"]}>
        <Routes>
          <Route path="/:locale" element={<PublicLayout />}>
            <Route index element={<LocaleHome />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("اتعلّم");
    expect(document.documentElement.dir).toBe("rtl");
  });
});
