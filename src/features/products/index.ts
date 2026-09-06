import type { RouteDescriptor } from "@core/navigation/types";

import { ProductsPage } from "./ProductsPage.js";

export const productsRoute: RouteDescriptor = {
  id: "products",
  path: "portal/products",
  public: false,
  capability: "products.read",
  element: ProductsPage,
};
