export interface FileData {
  type: string;
  base64: string;
}

export interface OCRAnalysisResponse {
  aiResponse: string;
}

export interface CvAnalysisResponse {
  name?: string;
  title?: string;
  contact?: {
    email?: string;
    linkedin?: string;
    slack?: string;
    github?: string;
    phone?: string;
    others?: string[];
  };
  skills?: string[];
  softSkills?: string[];
  languages?: {
    lang?: string;
    level?: string;
  }[];
  profile?: string;
  education?: {
    institution?: string;
    degree?: string;
    date?: string;
    description?: string;
  }[];
  courses?: {
    name?: string;
    date?: string;
    description?: string;
  }[];
  employmentStory?: {
    company?: string;
    position?: string;
    date?: string;
    description?: string;
  }[];
  projects?: {
    name?: string;
    description?: string;
  }[];
  achievements?: {
    title?: string;
    date?: string;
    description?: string;
  }[];
  references?: {
    name?: string;
    position?: string;
    company?: string;
    email?: string;
    number?: string;
  }[];
  otherInformation?: {
    title?: string;
    description?: string;
  }[];
  analysis?: string;
}
