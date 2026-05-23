import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AnimateInView } from '@/components/ui/AnimateInView';

export function CTASection() {
  return (
    <section className="section-py bg-brand-accent">
      <div className="container-page text-center">
        <AnimateInView>
          <h2 className="text-h2-mobile md:text-h2 text-white mb-4">
            准备好开启合作？
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
            立即预约免费咨询，我们的解决方案专家将为您量身定制专属方案。
          </p>
          <Button href="/contact" size="lg">
            获取您的专属方案
            <ArrowRight size={20} />
          </Button>
        </AnimateInView>
      </div>
    </section>
  );
}
