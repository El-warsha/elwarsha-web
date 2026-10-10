import { Assignment, Label } from "@entities/assignment";

export const getAvailableLabels = (tasks: Assignment[] | null): Label[] => {
    if (!tasks || tasks.length === 0) {
        return [];
    }
   const uniqueLabels = new Map<string, Label>();
    tasks.forEach((task) => {
        if (task.labels) {
            task.labels.forEach((label) => {
                uniqueLabels.set(label.id, label);
            });
        }
    });  
    return Array.from(uniqueLabels.values());
}

export const filterdTasksBySelectedLabels = (tasks: Assignment[] | null, selectedLabelIDs: string[]): Assignment[] => {
    if (!tasks || tasks.length === 0) {
        return [];
    }
    if (selectedLabelIDs.length === 0) {
        return tasks;
    }
    return tasks.filter((task) => {
        if (!task.labels || task.labels.length === 0) {
            return false;
        }
        return task.labels.some((label) => selectedLabelIDs.includes(label.id));
    });
}