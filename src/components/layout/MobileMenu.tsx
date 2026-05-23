'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { NavLink } from './NavLink';
import { Button } from '../ui/Button';
import { NAV_ITEMS } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-brand-border">
          <span className="text-h4 text-brand-heading font-bold">XX科技</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-brand-bg transition-colors"
            aria-label="关闭菜单"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col p-6 gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} onClick={onClose} mobile />
          ))}
        </nav>

        <div className="px-6 mt-4">
          <Button href="/contact" className="w-full">
            立即咨询
          </Button>
        </div>
      </div>
    </>
  );
}
