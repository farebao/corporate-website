'use client';

import { MessageCircle, X } from 'lucide-react';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatButton({ isOpen, onClick }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? '关闭对话' : '打开AI客服'}
      className="relative w-14 h-14 rounded-full bg-brand-cta text-white shadow-lg hover:bg-brand-cta-hover transition-all duration-300 flex items-center justify-center animate-[pulse-glow_2s_ease-in-out_infinite]"
    >
      {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
    </button>
  );
}
