import type { ReactNode } from "react";

import { Badge } from "@ui/components/Badge/Badge";

type LabelChipProps = {
  children: ReactNode;
};

export function LabelChip({ children }: LabelChipProps) {
  return <Badge>{children}</Badge>;
}