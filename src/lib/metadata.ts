import type { Metadata } from 'next';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from './constants';

interface SEOProps {
  title: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function generatePageMeta({ title, description, ogImage, noIndex }: SEOProps): Metadata {
  const pageTitle = `${title} | ${SITE_NAME}`;
  const pageDescription = description || SITE_DESCRIPTION;

  return {
    title: pageTitle,
    description: pageDescription,
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: 'zh_CN',
      type: 'website',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: ogImage ? [ogImage] : [],
    },
  };
}
