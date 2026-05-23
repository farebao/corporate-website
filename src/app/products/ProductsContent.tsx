'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Megaphone, Rocket, BarChart3, Palette, Headphones } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AnimateInView } from '@/components/ui/AnimateInView';
import { products, productCategories } from '@/data/products';

const iconMap: Record<string, typeof Code2> = {
  Code2, Megaphone, Rocket, BarChart3, Palette, Headphones,
};

export function ProductsContent() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-brand-accent to-brand-accent/90">
        <div className="container-page text-center">
          <h1 className="text-h1-mobile md:text-h1 text-white mb-4">产品与服务</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            端到端解决方案，满足您的每个业务阶段
          </p>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-page">
          {/* Filter badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {productCategories.map((cat) => (
              <Badge
                key={cat.key}
                active={activeCategory === cat.key}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </Badge>
            ))}
          </div>

          {/* Products grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => {
                const IconComponent = iconMap[product.icon] || Code2;
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card hover padding className="h-full flex flex-col">
                      <div className="w-14 h-14 mb-5 bg-brand-cta/10 rounded-xl flex items-center justify-center">
                        <IconComponent size={28} className="text-brand-cta" />
                      </div>
                      <h3 className="text-h3-mobile md:text-h3 text-brand-heading mb-3">{product.title}</h3>
                      <p className="text-body-mobile md:text-body text-brand-body leading-relaxed mb-5 flex-1">
                        {product.summary}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feat) => (
                          <span
                            key={feat}
                            className="text-caption-mobile text-brand-muted bg-brand-bg px-2.5 py-1 rounded-md"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-brand-muted py-20">该分类暂无服务项目</p>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-py bg-brand-bg-secondary">
        <div className="container-page">
          <SectionHeading
            title="为什么选择我们的服务？"
            subtitle="三大差异化优势，为客户创造持久价值"
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <AnimateInView>
              <Card padding className="text-center">
                <div className="text-h3 text-brand-cta font-bold mb-2">前沿技术栈</div>
                <p className="text-caption text-brand-body">采用云原生、AI、大数据等前沿技术，确保解决方案的前瞻性与竞争力。</p>
              </Card>
            </AnimateInView>
            <AnimateInView delay={0.1}>
              <Card padding className="text-center">
                <div className="text-h3 text-brand-cta font-bold mb-2">全程服务</div>
                <p className="text-caption text-brand-body">从咨询规划到交付运营，7×24小时响应，为您的业务全程保驾护航。</p>
              </Card>
            </AnimateInView>
            <AnimateInView delay={0.2}>
              <Card padding className="text-center">
                <div className="text-h3 text-brand-cta font-bold mb-2">深度定制</div>
                <p className="text-caption text-brand-body">拒绝模板化方案，深入理解您的业务场景，提供真正契合需求的定制化服务。</p>
              </Card>
            </AnimateInView>
          </div>
        </div>
      </section>
    </>
  );
}
