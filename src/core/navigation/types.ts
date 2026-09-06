import type { ComponentType } from "react";

import type { Capability } from "@elwarsha/api-client";
import type { Locale } from "@core/i18n";

export type RouteDescriptor = {
  id: string;
  path: string;
  public: boolean;
  capability?: Capability;
  element: ComponentType<{ locale: Locale }>;
};
