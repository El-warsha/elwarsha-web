import { useEffect, useState } from "react";

import { api } from "@core/api";
import { mapAssignmentDtoEntity, type Assignment } from "@entities/assignment";

export function useTasks() {
  const [tasks, setTasks] = useState<Assignment[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    api
      .listAssignments()
      .then((rows) => {
          const mappedTasks = rows.map(mapAssignmentDtoEntity);
          setTasks(mappedTasks);
        }
      )
      .catch(() => {
        if (!cancelled) setTasks([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { tasks };
}
