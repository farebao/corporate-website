import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AnimateInView } from '@/components/ui/AnimateInView';
import { cases } from '@/data/cases';

const featuredCases = cases.slice(0, 3);

const categoryLabels: Record<string, string> = {
  finance: '金融',
  healthcare: '医疗',
  retail: '零售',
  education: '教育',
  manufacturing: '制造',
  logistics: '物流',
};

export function HomeCasesSection() {
  return (
    <section className="section-py bg-white">
      <div className="container-page">
        <SectionHeading
          title="用结果说话，与客户共同成长"
          subtitle="每一个案例都是我们专业能力的最佳见证"
        />

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredCases.map((item, i) => (
            <AnimateInView key={item.slug} delay={i * 0.15}>
              <Link href={`/cases/${item.slug}`} className="block group">
                <Card hover padding className="h-full flex flex-col">
                  {/* Placeholder image area */}
                  <div className="w-full aspect-video bg-brand-bg-secondary rounded-lg mb-5 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-brand-muted text-caption">
                      案例图片
                    </div>
                  </div>

                  <Badge className="mb-3 self-start">
                    {categoryLabels[item.category] || item.category}
                  </Badge>

                  <h3 className="text-h3-mobile md:text-h4 text-brand-heading mb-2 group-hover:text-brand-cta transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-caption text-brand-muted mb-4 flex-1">{item.summary}</p>

                  {/* Key results */}
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
            </AnimateInView>
          ))}
        </div>

        <div className="text-center">
          <Button href="/cases" variant="outline">
            查看更多案例
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
