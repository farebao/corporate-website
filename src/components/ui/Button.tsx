import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-brand-cta text-white hover:bg-brand-cta-hover shadow-button',
  secondary: 'bg-brand-accent text-white hover:bg-brand-accent/90 shadow-button',
  outline: 'border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white',
  ghost: 'text-brand-accent hover:bg-brand-accent/10',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-button-mobile',
  md: 'px-6 py-3 text-button',
  lg: 'px-8 py-4 text-button md:text-lg',
};

export function Button({ variant = 'primary', size = 'md', href, external, className, children, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-sans transition-all duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
