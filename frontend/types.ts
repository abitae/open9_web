
export type View = 'home' | 'servicios' | 'portafolio' | 'nosotros' | 'contacto' | 'empezar' | 'mobile' | 'login' | 'admin';

export interface Project {
  id: number;
  title: string;
  category: string;
  desc: string;
  img: string;
  tech: string[];
  impact: string;
}

export interface ClientLogo {
  id: number;
  name: string;
  url: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  company: string;
  subject: string;
  body: string;
  date: string;
}

export interface ProjectInquiry {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  company: string;
  projectType: string;
  budget: string;
  description: string;
  date: string;
}
