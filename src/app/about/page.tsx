import type { Metadata } from 'next';
import { Users, Lightbulb, Handshake, Shield } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { AnimateInView } from '@/components/ui/AnimateInView';
import { coreValues } from '@/data/values';
import { timelineEvents } from '@/data/timeline';
import { teamMembers } from '@/data/team';

export const metadata: Metadata = {
  title: '关于我们',
  description: '了解XX科技的发展历程、核心价值观与核心团队。我们是一家以技术为驱动的企业服务公司。',
};

const iconMap: Record<string, typeof Users> = {
  Users, Lightbulb, Handshake, Shield,
};

const honors = [
  '国家高新技术企业认证',
  'ISO 27001 信息安全管理体系',
  '2023年度最佳企业服务商',
  '中国软件行业协会会员',
  'AAA级信用企业',
];

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-brand-accent to-brand-accent/90">
        <div className="container-page text-center">
          <AnimateInView>
            <h1 className="text-h1-mobile md:text-h1 text-white mb-4">关于我们</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              以技术为驱动，以创新为引擎，助力企业实现可持续的数字化增长
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* Company Intro */}
      <section className="section-py bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimateInView direction="left">
              <div>
                <h2 className="text-h2-mobile md:text-h2 text-brand-heading mb-6">我们的故事</h2>
                <div className="space-y-4 text-body text-brand-body leading-relaxed">
                  <p>
                    XX科技成立于2018年，是一家以技术为驱动的企业服务公司。创始团队来自一线互联网企业，
                    怀揣"让技术真正服务于商业增长"的初心，我们踏上了企业服务的创业之路。
                  </p>
                  <p>
                    六年来，我们始终坚信专业与创新是商业进化的原动力。从最初的技术外包团队，
                    发展为如今覆盖技术研发、品牌营销、数字化转型咨询的全方位企业服务商。
                  </p>
                  <p>
                    截至目前，我们已累计服务超过500家企业客户，涵盖金融、医疗、零售、教育、制造等多个行业领域。
                    用专业赢得信赖，用结果回报托付，是我们不变的信条。
                  </p>
                </div>
              </div>
            </AnimateInView>

            <AnimateInView direction="right">
              <div className="w-full aspect-[4/3] bg-brand-bg-secondary rounded-2xl flex items-center justify-center">
                <span className="text-brand-muted text-caption">团队协作图片</span>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-py bg-brand-bg-secondary">
        <div className="container-page">
          <SectionHeading title="核心价值观" subtitle="指引我们前行的信念与准则" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, i) => {
              const IconComponent = iconMap[value.icon] || Users;
              return (
                <AnimateInView key={value.title} delay={i * 0.1}>
                  <Card hover padding className="text-center h-full">
                    <div className="w-14 h-14 mx-auto mb-5 bg-brand-cta/10 rounded-xl flex items-center justify-center">
                      <IconComponent size={28} className="text-brand-cta" />
                    </div>
                    <h3 className="text-h4 text-brand-heading mb-3">{value.title}</h3>
                    <p className="text-caption text-brand-body leading-relaxed">{value.description}</p>
                  </Card>
                </AnimateInView>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-py bg-white">
        <div className="container-page">
          <SectionHeading title="发展历程" subtitle="从起步到成长，每一步都算数" />

          <div className="max-w-3xl mx-auto">
            {timelineEvents.map((event, i) => (
              <AnimateInView key={event.year} delay={i * 0.1}>
                <div className="flex gap-6 pb-10 last:pb-0">
                  {/* Year marker */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-brand-accent text-white rounded-xl flex items-center justify-center font-bold text-lg shrink-0">
                      {event.year}
                    </div>
                    {i < timelineEvents.length - 1 && (
                      <div className="w-0.5 flex-1 bg-brand-border mt-3" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pt-2">
                    <h3 className="text-h4 text-brand-heading mb-2">{event.title}</h3>
                    <p className="text-body text-brand-body leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-py bg-brand-bg-secondary">
        <div className="container-page">
          <SectionHeading title="核心团队" subtitle="汇聚行业精英，共创卓越未来" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, i) => (
              <AnimateInView key={member.name} delay={i * 0.1}>
                <Card padding className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-brand-bg-secondary rounded-full flex items-center justify-center">
                    <Users size={36} className="text-brand-muted" />
                  </div>
                  <h3 className="text-h4 text-brand-heading mb-1">{member.name}</h3>
                  <p className="text-caption text-brand-muted">{member.role}</p>
                </Card>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* Honors */}
      <section className="section-py bg-white">
        <div className="container-page">
          <SectionHeading title="资质荣誉" subtitle="专业认证与行业认可" />

          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {honors.map((honor, i) => (
              <AnimateInView key={honor} delay={i * 0.1}>
                <div className="flex items-center gap-3 bg-brand-bg-secondary rounded-xl px-6 py-4">
                  <Shield size={20} className="text-brand-cta shrink-0" />
                  <span className="text-body font-medium text-brand-heading">{honor}</span>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
