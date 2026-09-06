import type { RouteDescriptor } from "@core/navigation/types";

import { InitiativePage } from "./InitiativePage.js";

export const initiativeRoute: RouteDescriptor = {
  id: "initiative",
  path: "initiative",
  public: true,
  element: InitiativePage,
};
