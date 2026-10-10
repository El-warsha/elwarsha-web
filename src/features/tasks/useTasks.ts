import { useEffect, useState } from "react";

import { api } from "@core/api";
import type { Assignment } from "@entities/assignment";

export function useTasks() {
  const [tasks, setTasks] = useState<Assignment[] | null>(null);
  console.log(tasks);

  useEffect(() => {
    let cancelled = false;

    api
      .listAssignments()
      .then((rows) => {
        if (!cancelled) setTasks(rows as Assignment[]);
      })
      .catch(() => {
        if (!cancelled) setTasks([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { tasks };
}