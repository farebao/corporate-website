'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  mobile?: boolean;
}

export function NavLink({ href, label, onClick, mobile }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'relative transition-colors duration-200 hover:text-brand-cta',
        mobile
          ? 'block py-3 text-lg font-medium text-brand-heading'
          : 'text-caption font-medium',
        isActive ? 'text-brand-cta' : ''
      )}
    >
      {label}
      {isActive && !mobile && (
        <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-brand-cta" />
      )}
    </Link>
  );
}
