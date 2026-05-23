'use client';

import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface AnimateInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  as?: 'div' | 'section' | 'article' | 'li';
}

const getVariants = (direction: string, delay: number): Variants => {
  const offsets: Record<string, { x?: number; y?: number }> = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };
  const offset = offsets[direction] || offsets.up;

  return {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
    },
  };
};

export function AnimateInView({ children, className, delay = 0, direction = 'up', as = 'div' }: AnimateInViewProps) {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const MotionEl = motion[as] as typeof motion.div;

  return (
    <MotionEl
      ref={ref}
      variants={getVariants(direction, delay)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={cn(className)}
    >
      {children}
    </MotionEl>
  );
}
