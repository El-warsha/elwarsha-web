import type { ApplyCohortInput as ApplicationDto } from "@elwarsha/api-client";

import type { ApplyCohortInput as ApplicationDomain } from "./CohortApplication";


const currentStatusMap = {
  student: "student",
  graduate: "recent_graduate",
  working_in_tech: "employed_tech",
  switching_career: "career_switcher",
  other: "other",
} as const;

const gitExperienceMap = {
  never: "none",
  basics_only: "basics",
  comfortable: "comfortable",
} as const;

export function mapCohortApply(
  application: ApplicationDomain,
): ApplicationDto 
 { return {
  fullName: application.fullName,
  email: application.email,
  whatsappNumber: application.whatsappNumber,
  githubHandle: application.githubHandle,
  discordHandle: application.discordHandle,
currentStatus: currentStatusMap[application.currentStatus],
gitExperience: gitExperienceMap[application.gitExperience],   
  collegeMajor: application.collegeMajor,
  programmingExperience: application.programmingExperience,
  technologies: application.technologies,
  personalPageUrl: application.personalPageUrl,
  githubRepoUrl: application.githubRepoUrl,
  aiUsage: application.aiUsage,
  motivation: application.motivation,
}
 }