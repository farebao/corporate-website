import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-h1-mobile md:text-h1 text-brand-heading mb-4">404</h1>
      <p className="text-body text-brand-muted mb-8">抱歉，您访问的页面不存在。</p>
      <Button href="/">返回首页</Button>
    </div>
  );
}
