import type { RouteDescriptor } from "@core/navigation/types";

import { ParticipationPage } from "./ParticipationPage.js";

export const participationRoute: RouteDescriptor = {
  id: "participation",
  path: "participation",
  public: true,
  element: ParticipationPage,
};
