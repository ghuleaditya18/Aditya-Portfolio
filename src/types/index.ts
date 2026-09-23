export type Profile = {
  name: string;
  title: string;
  headline: string;
  bio?: string;
  location?: string;
  email?: string;
  phone?: string;
  phoneTel?: string;
  githubUrl: string;
  linkedinUrl: string;
  coreTechnologies: string[];
};

export type KeyFeatureDetail = {
  title: string;
  description: string;
};

export type TechnicalChallenge = {
  challenge: string;
  solution: string;
};

export type ProjectScreenshot = {
  url: string;
  caption: string;
  alt: string;
  aspectRatio?: "wide" | "portrait" | "standard";
};

export type CaseStudy = {
  overview: string;
  problem: string;
  solution: string;
  myContribution?: string[];
  architecture: string[];
  keyFeatures: KeyFeatureDetail[];
  challenges?: TechnicalChallenge[];
  whatILearned: string[];
  screenshots?: ProjectScreenshot[];
};

export type Project = {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  coreTechnologies?: string[];
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  thumbnail?: string;
  category: "Full Stack" | "AI & Full Stack";
  isFeatured?: boolean;
  featuredLayout?: "hero" | "standard";
  caseStudy?: CaseStudy;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  description?: string;
  achievements?: string[];
  technologies?: string[];
};

export type Education = {
  id: string;
  degree: string;
  institution?: string;
  location?: string;
  period?: string;
  grade?: string;
};

export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Database / Data"
  | "AI / LLM"
  | "Tools";

export type Skill = {
  name: string;
  category: SkillCategory;
  iconName?: string;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issueDate?: string;
  url?: string;
  image?: string;
};

export type Publication = {
  id: string;
  title: string;
  type: string;
  publisher?: string;
  issueDate?: string;
  url?: string;
  documentUrl?: string;
};

export type SocialLink = {
  platform: string;
  label: string;
  url: string;
  iconName?: string;
};
