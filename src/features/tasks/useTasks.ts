import { useEffect, useMemo, useState } from "react";

import { api } from "@core/api";
import type { Assignment, Label } from "@entities/assignment";

export function useTasks() {
  const [tasks, setTasks] = useState<Assignment[] | null>(null);
  const [labels, setLabels] = useState<Label[]>([]);
  const [selectedLabelId, setSelectedLabelId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([api.listAssignments(), api.listLabels()])
      .then(([assignmentRows, labelRows]) => {
        if (cancelled) return;
        setTasks(assignmentRows);
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

  const visibleTasks = useMemo(() => {
    if (!tasks || selectedLabelId === null) return tasks;
    return tasks.filter((task) => task.labels.some((label) => label.id === selectedLabelId));
  }, [tasks, selectedLabelId]);

  return { tasks: visibleTasks, labels, selectedLabelId, selectLabel: setSelectedLabelId };
}