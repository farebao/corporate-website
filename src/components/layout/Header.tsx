'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { NavLink } from './NavLink';
import { MobileMenu } from './MobileMenu';
import { Button } from '../ui/Button';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollPosition();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isScrolled = !isHome || scrollY > 10;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-30 transition-all duration-400',
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-page flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className={cn(
              'text-h4 font-bold transition-colors duration-400',
              isScrolled ? 'text-brand-heading' : 'text-white'
            )}
          >
            XX科技
          </a>

          {/* Desktop Nav */}
          <nav className={cn(
            'hidden lg:flex items-center gap-8',
            isScrolled ? 'text-brand-body' : 'text-white/80'
          )}>
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button href="/contact" size="sm">
              立即咨询
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="打开菜单"
          >
            <Menu size={24} className={isScrolled ? 'text-brand-heading' : 'text-white'} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
