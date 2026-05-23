'use client';

import { cn } from '@/lib/utils';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-caption font-medium text-brand-heading">
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          'rounded-lg border border-brand-border bg-white px-4 py-3 text-body text-brand-heading placeholder:text-brand-muted transition-colors duration-200 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20',
          error && 'border-brand-error focus:border-brand-error focus:ring-brand-error/20',
          className
        )}
        {...props}
      />
      {error && <p className="text-caption-mobile text-brand-error">{error}</p>}
    </div>
  );
}
