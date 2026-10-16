
type ErrorMessages = {
  required: string;
  fullName: string;
  email: string;
  whatsappNumber: string;
  githubHandle: string;
  currentStatus: string;
  gitExperience: string;
  personalPageUrl: string;
  githubRepoUrl: string;
  motivation: string;
};

export type FormValues = {
  fullName: string;
  email: string;
  whatsappNumber: string;
  githubHandle: string;
  discordHandle: string;
  currentStatus: string;
  collegeMajor: string;
  programmingExperience: string;
  technologies: string;
  gitExperience: string;
  personalPageUrl: string;
  githubRepoUrl: string;
  aiUsage: string;
  motivation: string;
};

export type Errors = Partial<Record<keyof FormValues, string>>;

export const initialValues: FormValues = {
  fullName: "",
  email: "",
  whatsappNumber: "",
  githubHandle: "",
  discordHandle: "",
  currentStatus: "",
  collegeMajor: "",
  programmingExperience: "",
  technologies: "",
  gitExperience: "",
  personalPageUrl: "",
  githubRepoUrl: "",
  aiUsage: "",
  motivation: "",
};

export function validate(v: FormValues, msg: ErrorMessages): Errors {
  const errors: Errors = {};

  if (v.fullName.trim().length < 3) errors.fullName = msg.fullName;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) errors.email = msg.email;

  const phone = v.whatsappNumber.replace(/[\s-]/g, "");
  if (!/^\+?\d{10,15}$/.test(phone)) errors.whatsappNumber = msg.whatsappNumber;

  if (!/^[a-zA-Z0-9-]+$/.test(v.githubHandle.trim())) errors.githubHandle = msg.githubHandle;

  if (!v.discordHandle.trim()) errors.discordHandle = msg.required;
  if (!v.currentStatus) errors.currentStatus = msg.currentStatus;
  if (!v.collegeMajor.trim()) errors.collegeMajor = msg.required;
  if (!v.programmingExperience.trim()) errors.programmingExperience = msg.required;
  if (!v.technologies.trim()) errors.technologies = msg.required;
  if (!v.gitExperience) errors.gitExperience = msg.gitExperience;

  if (!/^https?:\/\/\S+$/i.test(v.personalPageUrl.trim())) errors.personalPageUrl = msg.personalPageUrl;

  if (!/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/i.test(v.githubRepoUrl.trim()))
    errors.githubRepoUrl = msg.githubRepoUrl;

  if (!v.aiUsage.trim()) errors.aiUsage = msg.required;
  if (v.motivation.trim().length < 50) errors.motivation = msg.motivation;

  return errors;
}