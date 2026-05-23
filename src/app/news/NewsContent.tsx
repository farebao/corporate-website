'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, User } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AnimateInView } from '@/components/ui/AnimateInView';
import { newsArticles, newsCategories } from '@/data/news';
import { formatDate } from '@/lib/utils';

const categoryLabels: Record<string, string> = {
  company: '公司新闻',
  industry: '行业洞察',
  tech: '技术文章',
};

export function NewsContent() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? newsArticles
    : newsArticles.filter((a) => a.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-brand-accent to-brand-accent/90">
        <div className="container-page text-center">
          <h1 className="text-h1-mobile md:text-h1 text-white mb-4">新闻与洞察</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            了解我们的最新动态与行业思考
          </p>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-page">
          {/* Filter badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {newsCategories.map((cat) => (
              <Badge
                key={cat.key}
                active={activeCategory === cat.key}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </Badge>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-brand-muted py-20">暂无相关文章</p>
          ) : (
            <>
              {/* Featured article */}
              {featured && (
                <AnimateInView>
                  <Link href={`/news/${featured.slug}`} className="block group mb-12">
                    <Card padding className="grid md:grid-cols-2 gap-8 overflow-hidden">
                      <div className="w-full aspect-[16/9] md:aspect-auto bg-brand-bg-secondary rounded-lg flex items-center justify-center text-brand-muted text-caption">
                        封面图
                      </div>
                      <div className="flex flex-col justify-center">
                        <Badge className="mb-3 self-start">
                          {categoryLabels[featured.category] || featured.category}
                        </Badge>
                        <h2 className="text-h3 text-brand-heading mb-3 group-hover:text-brand-cta transition-colors">
                          {featured.title}
                        </h2>
                        <p className="text-body text-brand-body mb-4">{featured.excerpt}</p>
                        <div className="flex items-center gap-4 text-caption text-brand-muted">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {formatDate(featured.date)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {featured.readTime}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </AnimateInView>
              )}

              {/* Article grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rest.map((article, i) => (
                  <AnimateInView key={article.slug} delay={i * 0.1}>
                    <Link href={`/news/${article.slug}`} className="block group">
                      <Card hover padding className="h-full flex flex-col">
                        <div className="w-full aspect-[16/9] bg-brand-bg-secondary rounded-lg mb-4 flex items-center justify-center text-brand-muted text-caption">
                          封面图
                        </div>
                        <Badge className="mb-3 self-start">
                          {categoryLabels[article.category] || article.category}
                        </Badge>
                        <h3 className="text-h4 text-brand-heading mb-2 group-hover:text-brand-cta transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-caption text-brand-muted mb-4 flex-1 line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center gap-3 text-caption-mobile text-brand-muted pt-3 border-t border-brand-border">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(article.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {article.readTime}
                          </span>
                        </div>
                      </Card>
                    </Link>
                  </AnimateInView>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
