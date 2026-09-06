import type { RouteDescriptor } from "@core/navigation/types";

import { AssignmentsPage } from "./AssignmentsPage.js";

export const assignmentsRoute: RouteDescriptor = {
  id: "assignments",
  path: "portal/assignments",
  public: false,
  capability: "assignments.read",
  element: AssignmentsPage,
};
