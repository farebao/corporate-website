import type { Metadata } from 'next';
import { CasesContent } from './CasesContent';

export const metadata: Metadata = {
  title: '精选案例',
  description: '用结果说话，与客户共同成长。浏览我们的精选案例，了解各行业数字化转型实践。',
};

export default function CasesPage() {
  return <CasesContent />;
}
