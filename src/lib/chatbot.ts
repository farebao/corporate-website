import type { FAQItem } from '@/types';
import { CHAT_FAQ, CHAT_FALLBACK } from './constants';

export function matchQuestion(input: string, faqData: FAQItem[] = CHAT_FAQ): string {
  const normalized = input.toLowerCase().trim();

  let bestMatch: FAQItem | null = null;
  let bestScore = 0;

  for (const item of faqData) {
    let score = 0;
    for (const keyword of item.keywords) {
      if (normalized.includes(keyword.toLowerCase())) {
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  return bestMatch ? bestMatch.answer : CHAT_FALLBACK;
}
