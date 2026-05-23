'use client';

import { useState, type KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 border-t border-brand-border">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="输入您的问题..."
        disabled={disabled}
        className="flex-1 rounded-lg border border-brand-border bg-white px-4 py-2.5 text-sm text-brand-heading placeholder:text-brand-muted focus:border-brand-cta focus:outline-none focus:ring-2 focus:ring-brand-cta/20 transition-colors"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="w-10 h-10 rounded-lg bg-brand-cta text-white flex items-center justify-center hover:bg-brand-cta-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="发送"
      >
        <Send size={16} />
      </button>
    </div>
  );
}
