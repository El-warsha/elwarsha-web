export type Assignment = {
  id: string;
  weekNumber: number;
  title: string;
  status: "draft" | "published" | "closed";
  engagementId: string;
};
