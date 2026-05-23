import type { ChatMessage as ChatMessageType } from '@/types';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'bot';

  return (
    <div className={cn('flex gap-2.5', isBot ? 'justify-start' : 'justify-end')}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-brand-cta/20 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-xs font-bold text-brand-cta">AI</span>
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isBot
            ? 'bg-brand-bg-secondary text-brand-heading rounded-tl-sm'
            : 'bg-brand-cta text-white rounded-tr-sm'
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
