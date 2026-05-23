'use client';

import { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '@/types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { CHAT_SUGGESTIONS } from '@/lib/constants';

interface ChatWindowProps {
  messages: ChatMessageType[];
  onSend: (message: string) => void;
  onClose: () => void;
  isTyping?: boolean;
}

export function ChatWindow({ messages, onSend, onClose, isTyping }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden w-[380px] h-[520px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-brand-accent text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold">AI 顾问</p>
            <p className="text-xs text-white/70">在线</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors p-1"
          aria-label="关闭对话"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-bg/50">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-brand-muted mb-4">你好！有什么可以帮您？</p>
            <div className="flex flex-col gap-2">
              {CHAT_SUGGESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => onSend(q)}
                  className="text-sm text-brand-cta bg-brand-cta/5 hover:bg-brand-cta/10 rounded-lg px-4 py-2 transition-colors text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}

        {isTyping && (
          <div className="flex gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-cta/20 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-brand-cta">AI</span>
            </div>
            <div className="bg-brand-bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-brand-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-brand-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-brand-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={onSend} disabled={isTyping} />
    </div>
  );
}
