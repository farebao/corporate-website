import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { cases } from '@/data/cases';
import { newsArticles } from '@/data/news';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/products`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/cases`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/news`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const casePages = cases.map((c) => ({
    url: `${SITE_URL}/cases/${c.slug}`,
    lastModified: new Date(c.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const newsPages = newsArticles.map((a) => ({
    url: `${SITE_URL}/news/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...casePages, ...newsPages];
}
