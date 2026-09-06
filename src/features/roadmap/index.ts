import type { RouteDescriptor } from "@core/navigation/types";

import { RoadmapPage } from "./RoadmapPage.js";

export const roadmapRoute: RouteDescriptor = {
  id: "roadmap",
  path: "roadmap",
  public: true,
  element: RoadmapPage,
};
