import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { XIcon } from 'lucide-react';
import { ToastContext } from './toastContextValue';
import { cn } from '../../../lib/cn';

const TOAST_DURATION_MS = 4000;
const MAX_VISIBLE_TOASTS = 3;

const VARIANT_CLASSES = {
  success: 'border-l-4 border-l-success',
  error: 'border-l-4 border-l-accent',
  info: 'border-l-4 border-l-line',
};

/**
 * Lightweight accessible toast system (no external dependencies).
 * Toasts are announced politely and close themselves after 4 seconds.
 */
export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());
  const nextId = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const show = useCallback(
    (message, variant = 'info') => {
      if (!message) return;
      nextId.current += 1;
      const id = nextId.current;
      setToasts((current) => [...current, { id, message, variant }].slice(-MAX_VISIBLE_TOASTS));
      timers.current.set(id, setTimeout(() => dismiss(id), TOAST_DURATION_MS));
    },
    [dismiss],
  );

  useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      activeTimers.forEach((timer) => clearTimeout(timer));
      activeTimers.clear();
    };
  }, []);

  const value = useMemo(
    () => ({
      show,
      success: (message) => show(message, 'success'),
      error: (message) => show(message, 'error'),
      info: (message) => show(message, 'info'),
      dismiss,
    }),
    [show, dismiss],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-24 z-[100] flex flex-col items-center gap-2 px-4 md:bottom-6 md:items-end"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              'glass pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-md px-4 py-3 text-sm text-ink shadow-md',
              VARIANT_CLASSES[toast.variant] ?? VARIANT_CLASSES.info,
            )}
          >
            <p className="flex-1">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              className="rounded text-ink-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Cerrar aviso"
            >
              <XIcon size={16} aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
