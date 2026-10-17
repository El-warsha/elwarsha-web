  export type ApplyCohortInput = {
  fullName: string;
  email: string;
  whatsappNumber: string;
  githubHandle: string;
  discordHandle: string;
  currentStatus:
    "student" | "graduate" | "working_in_tech" | "switching_career" | "other";
  collegeMajor: string;
  programmingExperience: string;
  technologies: string;
  gitExperience: "never" | "basics_only" | "comfortable";
  personalPageUrl: string;
  githubRepoUrl: string;
  aiUsage: string;
  motivation: string;
};