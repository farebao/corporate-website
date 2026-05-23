import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

const footerLinks = {
  services: [
    { label: '技术研发', href: '/products' },
    { label: '品牌营销', href: '/products' },
    { label: '数字化转型', href: '/products' },
    { label: '运营支持', href: '/products' },
  ],
  support: [
    { label: '关于我们', href: '/about' },
    { label: '案例展示', href: '/cases' },
    { label: '新闻资讯', href: '/news' },
    { label: '隐私政策', href: '/privacy' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-accent text-white">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-h4 text-white font-bold mb-4">XX科技</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              专注企业级解决方案，以技术创新驱动商业增长，为成长型企业提供一站式数字化转型服务。
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">产品服务</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-brand-cta transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">快捷链接</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-brand-cta transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">联系我们</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Phone size={16} className="shrink-0" />
                <span>{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Mail size={16} className="shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} XX科技. All rights reserved.
          </p>
          <p className="text-sm text-white/50">
            <Link href="/privacy" className="hover:text-white/80 transition-colors">隐私政策</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
