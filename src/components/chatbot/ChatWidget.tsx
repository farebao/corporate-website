'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ChatMessage as ChatMessageType } from '@/types';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';
import { matchQuestion } from '@/lib/chatbot';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = useCallback((content: string) => {
    const userMsg: ChatMessageType = { role: 'user', content };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const answer = matchQuestion(content);
      const botMsg: ChatMessageType = { role: 'bot', content: answer };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 600);
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
