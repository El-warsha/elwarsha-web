import type { RouteDescriptor } from "@core/navigation/types";

import { FaqPage } from "./FaqPage.js";

export const faqRoute: RouteDescriptor = {
  id: "faq",
  path: "faq",
  public: true,
  element: FaqPage,
};
