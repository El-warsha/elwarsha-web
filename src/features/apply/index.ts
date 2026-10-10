import type { RouteDescriptor } from "@core/navigation/types";

import { ApplyPage } from "./ApplyPage.js";

export const applyRoute: RouteDescriptor = {
  id: "apply",
  path: "apply",
  public: true,
  element: ApplyPage,
};

export { ApplyPage } from "./ApplyPage.js";
export { CohortApplicationForm } from "./CohortApplicationForm.js";
