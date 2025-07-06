// Project data types for CMS
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  year: string;
  image: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface DetailedProject extends Project {
  images: string[];
  client: string;
  industry: string;
  objective: string;
  engineeringInsight: string;
  scopeOfWork: string[];
  challenges: string[];
  deliverables: string[];
  tags: string[];
}

export interface ProjectFormData {
  title: string;
  category: string;
  description: string;
  year: string;
  client: string;
  industry: string;
  objective: string;
  engineeringInsight: string;
  scopeOfWork: string;
  challenges: string;
  deliverables: string;
  tags: string;
  status: 'draft' | 'published';
}

export interface ProjectsData {
  projects: DetailedProject[];
  categories: string[];
  lastUpdated: string;
}

export const DEFAULT_CATEGORIES = [
  'Product Design & Simulation',
  'Precision Manufacturing & Fabrication',
  'Prototype Development',
  'Structural & Civil Engineering',
  'Digital Platforms & Applications',
  'Engineering Consulting & Feasibility',
  'R&D and Innovation'
]; 