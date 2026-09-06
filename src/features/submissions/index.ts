import type { RouteDescriptor } from "@core/navigation/types";

import { SubmissionsPage } from "./SubmissionsPage.js";

export const submissionsRoute: RouteDescriptor = {
  id: "submissions",
  path: "portal/submissions",
  public: false,
  capability: "submissions.read",
  element: SubmissionsPage,
};
