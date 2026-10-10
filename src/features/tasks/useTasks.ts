import { useEffect, useMemo, useState } from "react";

import { api } from "@core/api";
import type { Assignment, Label } from "@entities/assignment";

export function useTasks() {
  const [allTasks, setAllTasks] = useState<Assignment[] | null>(null);
  const [selectedLabelId, setSelectedLabelId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    api
      .listAssignments()
      .then((rows) => {
        if (!cancelled) setAllTasks(rows);
      })
      .catch(() => {
        if (!cancelled) setAllTasks([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const labels = useMemo<Label[]>(() => {
    const byId = new Map<string, Label>();
    for (const task of allTasks ?? []) {
      for (const label of task.labels) byId.set(label.id, label);
    }
    return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [allTasks]);

  const tasks = useMemo(() => {
    if (allTasks === null || selectedLabelId === null) return allTasks;
    return allTasks.filter((task) =>
      task.labels.some((label) => label.id === selectedLabelId),
    );
  }, [allTasks, selectedLabelId]);

  return { tasks, labels, selectedLabelId, selectLabel: setSelectedLabelId };
}
