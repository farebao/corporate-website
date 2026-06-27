'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ChatMessage as ChatMessageType } from '@/types';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';
import { matchQuestion } from '@/lib/chatbot';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080/api';

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sid = sessionStorage.getItem('chat_session_id');
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem('chat_session_id', sid);
  }
  return sid;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const sessionIdRef = useRef<string>('');

  useEffect(() => {
    sessionIdRef.current = getSessionId();
  }, []);

  const handleSend = useCallback(async (content: string) => {
    const userMsg: ChatMessageType = { role: 'user', content };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch(`${API_BASE}/chat/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          content,
        }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const botMsg: ChatMessageType = { role: 'bot', content: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      // 后端不可用时降级到本地关键词匹配
      const answer = matchQuestion(content);
      const botMsg: ChatMessageType = { role: 'bot', content: answer };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <ChatWindow
              messages={messages}
              onSend={handleSend}
              onClose={() => setIsOpen(false)}
              isTyping={isTyping}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ChatButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
    </div>
  );
}
