import { Zap, Shield, TrendingUp } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { AnimateInView } from '@/components/ui/AnimateInView';

const valueProps = [
  {
    icon: Zap,
    title: '敏捷交付',
    description: '采用敏捷开发方法论，快速迭代、持续交付。平均项目交付周期缩短40%，让您的业务需求第一时间得到响应。',
  },
  {
    icon: Shield,
    title: '安全可靠',
    description: '企业级安全防护体系，通过ISO 27001认证。全链路数据加密，多层访问控制，确保您的业务数据安全无忧。',
  },
  {
    icon: TrendingUp,
    title: '数据驱动',
    description: '以数据为决策依据，构建智能化分析平台。从用户行为到业务指标，全方位洞察驱动持续增长。',
  },
];

export function ValuePropsSection() {
  return (
    <section className="section-py bg-white">
      <div className="container-page">
        <SectionHeading
          title="从策略到交付，全流程保障业务成功"
          subtitle="三大核心能力，为企业数字化转型提供坚实支撑"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {valueProps.map((prop, i) => (
            <AnimateInView key={prop.title} delay={i * 0.15}>
              <Card hover padding className="text-center">
                <div className="w-14 h-14 mx-auto mb-5 bg-brand-accent/10 rounded-xl flex items-center justify-center">
                  <prop.icon size={28} className="text-brand-accent" />
                </div>
                <h3 className="text-h3-mobile md:text-h3 text-brand-heading mb-3">{prop.title}</h3>
                <p className="text-body-mobile md:text-body text-brand-body leading-relaxed">{prop.description}</p>
              </Card>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
