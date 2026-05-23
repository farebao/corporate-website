export interface NavItem {
  label: string;
  href: string;
}

export interface ValueProp {
  icon: string;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  summary: string;
  category: string;
  features: string[];
}

export interface CaseItem {
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  image: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  testimonial?: { quote: string; author: string; role: string };
  date: string;
}

export interface NewsArticle {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
  content: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  linkedin?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface CoreValue {
  icon: string;
  title: string;
  description: string;
}

export interface FAQItem {
  keywords: string[];
  answer: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}
