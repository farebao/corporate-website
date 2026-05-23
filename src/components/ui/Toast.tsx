'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import type { ToastItem, ToastType } from '@/types';
import { generateId } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const iconMap: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const colorMap: Record<ToastType, string> = {
  success: 'border-brand-success text-brand-success',
  error: 'border-brand-error text-brand-error',
  info: 'border-brand-accent text-brand-accent',
};

function ToastItemComponent({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: string) => void }) {
  const Icon = iconMap[toast.type];
  return (
    <div
      className={cn(
        'flex items-center gap-3 bg-white border-l-4 rounded-lg shadow-card px-5 py-4 min-w-[320px] max-w-md animate-[slideIn_0.3s_ease-out]',
        colorMap[toast.type]
      )}
    >
      <Icon size={20} className="shrink-0" />
      <p className="text-sm text-brand-heading flex-1">{toast.message}</p>
      <button onClick={() => onDismiss(toast.id)} className="text-brand-muted hover:text-brand-heading transition-colors">
        <X size={16} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = generateId();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-6 right-6 z-[60] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItemComponent toast={toast} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
