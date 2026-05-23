import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { newsArticles } from '@/data/news';
import { formatDate } from '@/lib/utils';

const categoryLabels: Record<string, string> = {
  company: '公司新闻',
  industry: '行业洞察',
  tech: '技术文章',
};

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = newsArticles.find((a) => a.slug === params.slug);
  if (!article) return { title: '文章未找到' };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, type: 'article' },
  };
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const article = newsArticles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const related = newsArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="pt-28 pb-20">
      <div className="container-page max-w-4xl">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-caption text-brand-muted hover:text-brand-accent transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          返回新闻列表
        </Link>

        {/* Header */}
        <Badge className="mb-4">{categoryLabels[article.category] || article.category}</Badge>
        <h1 className="text-h1-mobile md:text-h1 text-brand-heading mb-6">{article.title}</h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-5 text-caption text-brand-muted mb-8 pb-8 border-b border-brand-border">
          <span className="flex items-center gap-1.5">
            <User size={16} />
            {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={16} />
            {formatDate(article.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={16} />
            {article.readTime}
          </span>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-16">
          {article.content.split('\n\n').map((block, i) => {
            if (block.startsWith('## ')) {
              return (
                <h2 key={i} className="text-h3 text-brand-heading mt-10 mb-4">
                  {block.replace('## ', '')}
                </h2>
              );
            }
            if (block.startsWith('> ')) {
              return (
                <blockquote key={i} className="border-l-4 border-brand-cta bg-brand-bg-secondary p-6 rounded-r-lg italic text-brand-body my-6">
                  {block.replace('> ', '')}
                </blockquote>
              );
            }
            if (block.startsWith('- ')) {
              const items = block.split('\n').filter((l) => l.startsWith('- '));
              return (
                <ul key={i} className="list-disc pl-6 space-y-1 text-body text-brand-body">
                  {items.map((item, j) => (
                    <li key={j}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-body text-brand-body leading-relaxed mb-4">
                {block}
              </p>
            );
          })}
        </div>

        {/* Share */}
        <div className="flex items-center gap-3 pb-8 border-b border-brand-border mb-12">
          <Share2 size={18} className="text-brand-muted" />
          <span className="text-caption text-brand-muted">分享：</span>
          <button className="text-caption text-brand-accent hover:text-brand-cta transition-colors">复制链接</button>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <h2 className="text-h3 text-brand-heading mb-8">相关文章</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/news/${r.slug}`} className="group">
                  <Card hover padding>
                    <div className="w-full aspect-[16/9] bg-brand-bg-secondary rounded-lg mb-4 flex items-center justify-center text-caption-mobile text-brand-muted">
                      封面图
                    </div>
                    <h3 className="text-h4 text-brand-heading mb-2 group-hover:text-brand-cta transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-caption text-brand-muted line-clamp-2">{r.excerpt}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
