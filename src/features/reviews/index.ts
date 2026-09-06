import type { RouteDescriptor } from "@core/navigation/types";

import { ReviewsPage } from "./ReviewsPage.js";

export const reviewsRoute: RouteDescriptor = {
  id: "reviews",
  path: "portal/reviews",
  public: false,
  capability: "reviews.read",
  element: ReviewsPage,
};
