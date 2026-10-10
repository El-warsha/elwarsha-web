import { useEffect, useState } from "react";

import { api } from "@core/api";
import type { Assignment, Label } from "@entities/assignment";

export function useTasks() {
  const [tasks, setTasks] = useState<Assignment[] | null>(null);
  const [labels, setLabels] = useState<Label[] | null>(null);
  const [selectedLabelId, setSelectedLabelId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      api.listAssignments().catch(() => [] as Assignment[]),
      api.listLabels
        ? api.listLabels().catch(() => [] as Label[])
        : Promise.resolve([] as Label[]),
    ]).then(([assignmentRows, labelRows]) => {
      if (!cancelled) {
        setTasks(assignmentRows);
        setLabels(labelRows);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredTasks = tasks
    ? selectedLabelId
      ? tasks.filter((task) => task.labels?.some((label) => label.id === selectedLabelId))
      : tasks
    : null;

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    labels,
    selectedLabelId,
    setSelectedLabelId,
  };
}
