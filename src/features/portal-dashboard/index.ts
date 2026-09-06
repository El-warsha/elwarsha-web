import type { RouteDescriptor } from "@core/navigation/types";

import { DashboardPage } from "./DashboardPage.js";

export const dashboardRoute: RouteDescriptor = {
  id: "dashboard",
  path: "portal",
  public: false,
  capability: "portal.view",
  element: DashboardPage,
};
