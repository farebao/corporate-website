import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cases } from '@/data/cases';

const categoryLabels: Record<string, string> = {
  finance: '金融',
  healthcare: '医疗',
  retail: '零售',
  education: '教育',
  manufacturing: '制造',
  logistics: '物流',
};

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = cases.find((c) => c.slug === params.slug);
  if (!item) return { title: '案例未找到' };
  return {
    title: item.title,
    description: item.summary,
  };
}

export default function CaseDetailPage({ params }: { params: { slug: string } }) {
  const item = cases.find((c) => c.slug === params.slug);
  if (!item) notFound();

  const related = cases.filter((c) => c.category === item.category && c.slug !== item.slug).slice(0, 3);

  return (
    <div className="pt-28 pb-20">
      <div className="container-page max-w-4xl">
        {/* Back link */}
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 text-caption text-brand-muted hover:text-brand-accent transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          返回案例列表
        </Link>

        {/* Header */}
        <Badge className="mb-4">{categoryLabels[item.category] || item.category}</Badge>
        <h1 className="text-h1-mobile md:text-h1 text-brand-heading mb-4">{item.title}</h1>
        <p className="text-body text-brand-muted mb-8">{item.summary}</p>

        {/* Placeholder image */}
        <div className="w-full aspect-[21/9] bg-brand-bg-secondary rounded-xl mb-12 flex items-center justify-center text-brand-muted">
          案例主图
        </div>

        {/* Content sections */}
        <div className="grid lg:grid-cols-3 gap-10 mb-16">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-h3 text-brand-heading mb-4">项目背景</h2>
              <p className="text-body text-brand-body leading-relaxed">
                {item.client}，{item.challenge.slice(0, 50)}...
              </p>
            </section>

            <section>
              <h2 className="text-h3 text-brand-heading mb-4">面临挑战</h2>
              <p className="text-body text-brand-body leading-relaxed">{item.challenge}</p>
            </section>

            <section>
              <h2 className="text-h3 text-brand-heading mb-4">解决方案</h2>
              <p className="text-body text-brand-body leading-relaxed">{item.solution}</p>
            </section>
          </div>

          {/* Results sidebar */}
          <div>
            <Card padding className="sticky top-28">
              <h3 className="text-h4 text-brand-heading mb-6">关键成果</h3>
              <div className="space-y-5">
                {item.results.map((r) => (
                  <div key={r.label}>
                    <div className="text-h2 text-brand-cta font-bold">{r.value}</div>
                    <div className="text-caption text-brand-muted">{r.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Testimonial */}
        {item.testimonial && (
          <div className="bg-brand-bg-secondary rounded-2xl p-8 md:p-10 mb-16">
            <blockquote className="text-h4 italic text-brand-heading mb-4">
              &ldquo;{item.testimonial.quote}&rdquo;
            </blockquote>
            <p className="text-caption text-brand-muted">
              — {item.testimonial.author}, {item.testimonial.role}
            </p>
          </div>
        )}

        {/* Related cases */}
        {related.length > 0 && (
          <section>
            <h2 className="text-h3 text-brand-heading mb-8">相关案例</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/cases/${r.slug}`} className="group">
                  <Card hover padding>
                    <div className="w-full aspect-video bg-brand-bg-secondary rounded-lg mb-4 flex items-center justify-center text-caption-mobile text-brand-muted">
                      案例图片
                    </div>
                    <h3 className="text-h4 text-brand-heading mb-2 group-hover:text-brand-cta transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-caption text-brand-muted line-clamp-2">{r.summary}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-16 text-center bg-brand-accent rounded-2xl p-10">
          <h2 className="text-h3 text-white mb-4">让您的业务成为下一个成功案例</h2>
          <p className="text-body text-white/70 mb-8 max-w-lg mx-auto">
            立即联系我们，与解决方案专家一对一沟通您的需求。
          </p>
          <Button href="/contact" size="lg">
            立即咨询
          </Button>
        </div>
      </div>
    </div>
  );
}
