import type { Metadata } from 'next';
import { NewsContent } from './NewsContent';

export const metadata: Metadata = {
  title: '新闻与洞察',
  description: '了解XX科技最新动态、行业洞察与技术分享。',
};

export default function NewsPage() {
  return <NewsContent />;
}
