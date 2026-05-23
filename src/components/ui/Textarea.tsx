'use client';

import { cn } from '@/lib/utils';
import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-caption font-medium text-brand-heading">
        {label}
      </label>
      <textarea
        id={inputId}
        rows={5}
        className={cn(
          'rounded-lg border border-brand-border bg-white px-4 py-3 text-body text-brand-heading placeholder:text-brand-muted transition-colors duration-200 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20 resize-y',
          error && 'border-brand-error focus:border-brand-error focus:ring-brand-error/20',
          className
        )}
        {...props}
      />
      {error && <p className="text-caption-mobile text-brand-error">{error}</p>}
    </div>
  );
}
