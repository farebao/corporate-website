import { SectionHeading } from '@/components/ui/SectionHeading';
import { CountUp } from '@/components/ui/CountUp';
import { AnimateInView } from '@/components/ui/AnimateInView';

const partnerLogos = ['科技前沿', '创新中国', '数字时代', '智慧企业', '未来伙伴', '卓越联盟'];

export function TrustSection() {
  return (
    <section className="section-py bg-brand-bg-secondary">
      <div className="container-page">
        <SectionHeading
          title="深受500+企业信赖"
          subtitle="与优秀企业同行，用专业赢得信任"
        />

        {/* Partner logos */}
        <div className="mb-16 overflow-hidden">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-50">
            {partnerLogos.map((name) => (
              <div
                key={name}
                className="h-10 px-6 bg-brand-border/50 rounded flex items-center justify-center text-caption text-brand-muted font-medium"
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Stats counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <AnimateInView>
            <div className="text-center">
              <div className="text-h1-mobile md:text-h1 text-brand-accent font-bold mb-2">
                <CountUp end={500} suffix="+" />
              </div>
              <p className="text-caption text-brand-muted">服务企业</p>
            </div>
          </AnimateInView>

          <AnimateInView delay={0.1}>
            <div className="text-center">
              <div className="text-h1-mobile md:text-h1 text-brand-accent font-bold mb-2">
                <CountUp end={98} suffix="%" />
              </div>
              <p className="text-caption text-brand-muted">项目交付率</p>
            </div>
          </AnimateInView>

          <AnimateInView delay={0.2}>
            <div className="text-center">
              <div className="text-h1-mobile md:text-h1 text-brand-accent font-bold mb-2">
                4.9/5
              </div>
              <p className="text-caption text-brand-muted">客户满意度</p>
            </div>
          </AnimateInView>
        </div>
      </div>
    </section>
  );
}
