import type { Label } from "@entities/assignment";
import { Badge } from "@ui/components/Badge/Badge";

export function LabelChip({ label }: { label: Label }) {
  return <Badge>{label.name}</Badge>;
}
