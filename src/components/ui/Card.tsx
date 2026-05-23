import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: boolean;
}

export function Card({ children, className, hover = false, padding = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-brand-border/60',
        padding && 'p-6 md:p-8',
        hover && 'transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-card-hover',
        className
      )}
    >
      {children}
    </div>
  );
}
