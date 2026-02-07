import React, { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export type ToastType = 'success' | 'error';

export interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const AUTO_DISMISS_MS = 5000;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type: 'success', message }]);
    setTimeout(() => remove(id), AUTO_DISMISS_MS);
  }, [remove]);

  const error = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type: 'error', message }]);
    setTimeout(() => remove(id), AUTO_DISMISS_MS);
  }, [remove]);

  const value: ToastContextValue = { success, error };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 max-w-sm w-full pointer-events-none"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-xl animate-in fade-in duration-300 ${
              t.type === 'success'
                ? 'bg-white border-green-200 text-slate-900'
                : 'bg-white border-red-200 text-slate-900'
            }`}
          >
            {t.type === 'success' ? (
              <CheckCircle2 className="shrink-0 text-green-600" size={22} />
            ) : (
              <XCircle className="shrink-0 text-red-500" size={22} />
            )}
            <p className="font-bold text-sm flex-1">{t.message}</p>
            <button
              type="button"
              onClick={() => remove(t.id)}
              className="shrink-0 text-slate-400 hover:text-slate-600 font-black text-lg leading-none"
              aria-label="Cerrar notificación"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
