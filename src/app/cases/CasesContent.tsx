'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AnimateInView } from '@/components/ui/AnimateInView';
import { cases, caseCategories } from '@/data/cases';

const categoryLabels: Record<string, string> = {
  finance: '金融',
  healthcare: '医疗',
  retail: '零售',
  education: '教育',
  manufacturing: '制造',
  logistics: '物流',
};

export function CasesContent() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? cases
    : cases.filter((c) => c.category === activeCategory);

  return (
    <>
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-brand-accent to-brand-accent/90">
        <div className="container-page text-center">
          <h1 className="text-h1-mobile md:text-h1 text-white mb-4">精选案例</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            用结果说话，与客户共同成长
          </p>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-page">
          {/* Filter badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {caseCategories.map((cat) => (
              <Badge
                key={cat.key}
                active={activeCategory === cat.key}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </Badge>
            ))}
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/cases/${item.slug}`} className="block group">
                    <Card hover padding className="h-full flex flex-col">
                      <div className="w-full aspect-video bg-brand-bg-secondary rounded-lg mb-5 flex items-center justify-center text-brand-muted text-caption">
                        案例图片
                      </div>
                      <Badge className="mb-3 self-start">
                        {categoryLabels[item.category] || item.category}
                      </Badge>
                      <h3 className="text-h3-mobile md:text-h4 text-brand-heading mb-2 group-hover:text-brand-cta transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-caption text-brand-muted mb-4 flex-1">{item.summary}</p>
                      <div className="flex gap-4 py-3 border-t border-brand-border">
                        {item.results.slice(0, 2).map((r) => (
                          <div key={r.label}>
                            <div className="text-h4 text-brand-cta font-bold">{r.value}</div>
                            <div className="text-caption-mobile text-brand-muted">{r.label}</div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
