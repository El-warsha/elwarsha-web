import type { RouteDescriptor } from "@core/navigation/types";

import { CohortsPage } from "./CohortsPage.js";

export const cohortsRoute: RouteDescriptor = {
  id: "cohorts",
  path: "portal/cohorts",
  public: false,
  capability: "cohorts.read",
  element: CohortsPage,
};
