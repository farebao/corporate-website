import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FAFAFA',
          'bg-secondary': '#F2F0EC',
          heading: '#1E1E1E',
          body: '#555555',
          muted: '#8A8A8A',
          accent: '#2C3E50',
          cta: '#B68B40',
          'cta-hover': '#9E7535',
          success: '#2E7D32',
          error: '#C0392B',
          border: '#E0E0E0',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'SF Pro Text',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      fontSize: {
        h1: ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1-mobile': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        h2: ['2.625rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h2-mobile': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        h3: ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3-mobile': ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        h4: ['1.375rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h4-mobile': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['1.0625rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-mobile': ['0.9375rem', { lineHeight: '1.6', fontWeight: '400' }],
        caption: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption-mobile': ['0.8125rem', { lineHeight: '1.5', fontWeight: '400' }],
        button: ['0.9375rem', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '500' }],
        'button-mobile': ['0.875rem', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '500' }],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)',
        button: '0 2px 8px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
export default config;
