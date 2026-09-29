import { useEffect, useState } from "react";

import { api } from "@core/api";
import type { Assignment } from "@elwarsha/api-client";

export function useTasks() {
  const [tasks, setTasks] = useState<Assignment[] | null>(null);

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

  return { tasks };
}
