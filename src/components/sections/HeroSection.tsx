'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AnimateInView } from '@/components/ui/AnimateInView';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-brand-accent via-brand-accent/95 to-brand-accent/90 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-cta/10 rounded-full translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white/20 rounded-full float-animation" />
        <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-brand-cta/30 rounded-full float-animation-delayed" />
      </div>

      <div className="container-page relative z-10 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-h1-mobile md:text-h1 text-white mb-6"
            >
              智领未来，构建企业数字化基石
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed"
            >
              我们为成长型企业提供一体化的技术解决方案与品牌策略，从策略到交付，全流程保障业务成功。
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-wrap gap-4"
            >
              <Button href="/products" size="lg">
                探索服务
                <ArrowRight size={20} />
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-brand-accent">
                联系我们
                <MessageCircle size={20} />
              </Button>
            </motion.div>
          </div>

          {/* Hero visual */}
          <AnimateInView direction="left" delay={0.2} className="hidden lg:block">
            <div className="relative">
              <div className="w-full aspect-[4/3] bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                {/* Abstract geometric illustration */}
                <div className="relative w-64 h-64">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-0 left-0 w-32 h-32 bg-brand-cta/40 rounded-3xl"
                  />
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-0 right-0 w-40 h-40 bg-white/20 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/30 rounded-2xl rotate-45"
                  />
                </div>
              </div>
            </div>
          </AnimateInView>
        </div>
      </div>
    </section>
  );
}
