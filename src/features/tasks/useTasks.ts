import { useEffect, useMemo, useState } from "react";

import { api } from "@core/api";
import type { Assignment } from "@entities/assignment";
import { Label } from "@entities/label";

export function useTasks() {
  const [tasks, setTasks] = useState<Assignment[] | null>(null);
  const [labels, setLabels] = useState<Label[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    Promise.all([api.listAssignments(), api.listLabels()])
      .then(([rows, labelRows]) => {
        if (cancelled) return;
        setTasks(rows);
        setLabels(labelRows);
      })
      .catch(() => {
        if (cancelled) return;
        setTasks([]);
        setLabels([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredTasks = useMemo(() => {
    if (!tasks) return null;
    if (selectedLabels.length === 0) return tasks;
    return tasks.filter((task) =>
      task.labels.some((label) => selectedLabels.includes(label.id)),
    );
  }, [tasks, selectedLabels]);

  return {
    tasks: filteredTasks,
    labels,
    selectedLabels,
    setSelectedLabels,
  };
}
