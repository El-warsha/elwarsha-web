import type { RouteDescriptor } from "@core/navigation/types";

import { WeekDetailPage } from "./WeekDetailPage.js";
import { WeeksPage } from "./WeeksPage.js";

export const cohortWeeksRoute: RouteDescriptor = {
  id: "cohort-weeks",
  path: "portal/cohorts/:cohortSlug/weeks",
  public: false,
  element: WeeksPage,
};

export const cohortWeekDetailRoute: RouteDescriptor = {
  id: "cohort-week-detail",
  path: "portal/cohorts/:cohortSlug/weeks/:weekNumber",
  public: false,
  element: WeekDetailPage,
};

export const weeksRoute: RouteDescriptor = {
  id: "weeks-overview",
  path: "portal/weeks",
  public: false,
  element: WeeksPage,
};

export { WeekDetailPage, WeeksPage };
