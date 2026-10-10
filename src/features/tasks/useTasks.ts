import { useEffect, useState } from "react";
import { api } from "@core/api";

export interface Label {
  id: string;
  name: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedLabelId, setSelectedLabelId] = useState<string | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);

        const [fetchedTasks, labelList] = await Promise.all([
          api.listAssignments().catch(() => []),
          fetch("http://localhost:3001/api/v1/labels", { credentials: "include" })
            .then((res) => res.json())
            .catch(() => []),
        ]);

        if (isMounted) {
          setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []);
          setLabels(Array.isArray(labelList) ? labelList : []);
        }
      } catch (error) {
        console.error("Error loading tasks/labels:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // الفلترة الصحيحة: إما أن تتطابق مع التصنيف المختار، أو تكون مهمة عامة ليس لها labelId محدد فتبقى ظاهرة للجميع
  const filteredTasks = selectedLabelId
    ? tasks.filter((task) => !task.labelId || task.labelId === selectedLabelId)
    : tasks;

  return {
    tasks: filteredTasks,
    labels,
    isLoading,
    selectedLabelId,
    setSelectedLabelId,
  };
}