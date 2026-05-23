import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Badge({ children, active, onClick, className }: BadgeProps) {
  const Component = onClick ? 'button' : 'span';
  return (
    <Component
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-full px-4 py-1.5 text-caption font-medium transition-all duration-300',
        active
          ? 'bg-brand-accent text-white'
          : 'bg-white text-brand-body border border-brand-border hover:border-brand-accent hover:text-brand-accent',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </Component>
  );
}
