export type Assignment = {
  id: string;
  weekNumber: number;
  title: string;
  status: "draft" | "published" | "closed";
  engagementId: string;
  labels: Label[];
};

export type Label = {
  id: string;
  name: string;
};