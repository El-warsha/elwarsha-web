import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";

import { AppRoutes } from "@app/App";

export function renderPath(path: string): string {
  return renderToString(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}
