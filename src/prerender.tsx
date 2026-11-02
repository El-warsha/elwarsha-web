import { QueryClientProvider } from "@tanstack/react-query";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";

import { AppRoutes } from "@app/App";
import { createQueryClient } from "./core/query/client.js";

export function renderPath(path: string): string {
  const client = createQueryClient();
  return renderToString(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}
