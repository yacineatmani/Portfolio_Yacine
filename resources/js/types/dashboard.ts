export interface User {
  id: number;
  name: string;
  email: string;
  photo?: string;
  cv_path?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  github_link?: string;
  demo_link?: string;
  image?: string;
}

export interface Skill {
  id: number;
  name: string;
  level: 'débutant' | 'confirmé' | 'expert';
  category: string;
}

export interface DashboardData {
  user: User;
  projects: Project[];
  skills: Skill[];
}
