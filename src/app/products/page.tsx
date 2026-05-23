import type { Metadata } from 'next';
import { ProductsContent } from './ProductsContent';

export const metadata: Metadata = {
  title: '产品与服务',
  description: '端到端解决方案，满足您的每个业务阶段。涵盖技术研发、品牌营销、数字化转型咨询等服务。',
};

export default function ProductsPage() {
  return <ProductsContent />;
}
