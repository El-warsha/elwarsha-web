import type { RouteDescriptor } from "@core/navigation/types";

import { WeekDetailPage } from "./WeekDetailPage.js";
import { WeeksPage } from "./WeeksPage.js";

export const cohortWeeksRoute: RouteDescriptor = {
  id: "cohort-weeks",
  path: "portal/cohorts/:cohortSlug/weeks",
  public: true,
  element: WeeksPage,
};

export const cohortWeekDetailRoute: RouteDescriptor = {
  id: "cohort-week-detail",
  path: "portal/cohorts/:cohortSlug/weeks/:weekNumber",
  public: true,
  element: WeekDetailPage,
};

export const weeksRoute: RouteDescriptor = {
  id: "weeks-overview",
  path: "portal/weeks",
  public: true,
  element: WeeksPage,
};

export { WeekDetailPage, WeeksPage };
