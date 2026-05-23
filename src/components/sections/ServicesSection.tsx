import { Code2, Megaphone, Rocket } from 'lucide-react';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AnimateInView } from '@/components/ui/AnimateInView';

const homeServices = [
  {
    icon: Code2,
    title: '技术研发',
    summary: '云原生全栈开发，从Web应用到移动端，构建高性能、可扩展的技术产品。',
    tags: ['微服务', '全栈开发', 'DevOps'],
    href: '/products',
  },
  {
    icon: Megaphone,
    title: '品牌营销',
    summary: '数据驱动的整合营销方案，从策略到执行，让品牌声音精准触达目标受众。',
    tags: ['品牌策略', '内容营销', 'SEM/SEO'],
    href: '/products',
  },
  {
    icon: Rocket,
    title: '数字化转型',
    summary: '为企业量身定制数字化路线图，从咨询到落地，全程陪伴式服务加速转型。',
    tags: ['战略规划', '架构设计', '落地陪跑'],
    href: '/products',
  },
];

export function ServicesSection() {
  return (
    <section className="section-py bg-brand-bg-secondary">
      <div className="container-page">
        <SectionHeading
          title="端到端解决方案，满足每个业务阶段"
          subtitle="覆盖技术、营销、运营的全方位服务体系"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {homeServices.map((service, i) => (
            <AnimateInView key={service.title} delay={i * 0.15}>
              <Card hover padding className="flex flex-col h-full">
                <div className="w-14 h-14 mb-5 bg-brand-cta/10 rounded-xl flex items-center justify-center">
                  <service.icon size={28} className="text-brand-cta" />
                </div>
                <h3 className="text-h3-mobile md:text-h3 text-brand-heading mb-3">{service.title}</h3>
                <p className="text-body-mobile md:text-body text-brand-body leading-relaxed mb-5 flex-1">
                  {service.summary}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {service.tags.map((tag) => (
                    <span key={tag} className="text-caption-mobile text-brand-muted bg-brand-bg px-2.5 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={service.href}
                  className="text-caption font-medium text-brand-cta hover:text-brand-cta-hover transition-colors inline-flex items-center gap-1"
                >
                  了解更多 →
                </Link>
              </Card>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
