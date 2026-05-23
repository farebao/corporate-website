import type { Metadata } from 'next';
import { ContactContent } from './ContactContent';

export const metadata: Metadata = {
  title: '联系我们',
  description: '与我们的解决方案专家沟通您的需求。填写表单或直接联系我们。',
};

export default function ContactPage() {
  return <ContactContent />;
}
