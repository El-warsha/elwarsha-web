import { HomePage } from "./HomePage.js";
import type { RouteDescriptor } from "@core/navigation/types";

export const homeRoute: RouteDescriptor = {
  id: "home",
  path: "",
  public: true,
  element: HomePage,
};
