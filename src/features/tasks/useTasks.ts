import { useEffect, useMemo, useState } from "react";

import { api } from "@core/api";
import type { Assignment, Label } from "@entities/assignment";

export function useTasks() {
  const [tasks, setTasks] = useState<Assignment[] | null>(null);
  const [selectedLabelId, setSelectedLabelId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    api
      .listAssignments()
      .then((rows) => {
        if (!cancelled) setTasks(rows);
      })
      .catch(() => {
        if (!cancelled) setTasks([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const labels = useMemo(() => {
    const uniqueLabels = new Map<string, Label>();

    for (const task of tasks ?? []) {
      for (const label of task.labels) {
        uniqueLabels.set(label.id, label);
      }
    }

    return Array.from(uniqueLabels.values());
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (selectedLabelId === null) return tasks;

    return (
      tasks?.filter((task) =>
        task.labels.some((label) => label.id === selectedLabelId),
      ) ?? null
    );
  }, [tasks, selectedLabelId]);

  return { tasks: filteredTasks, labels, selectedLabelId, setSelectedLabelId };
}
