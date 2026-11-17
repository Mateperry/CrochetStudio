import { useContext } from 'react';
import { ToastContext } from './toastContextValue';

/**
 * Returns { show, success, error, info }. Each call shows a toast that closes after 4 s.
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider.');
  }
  return context;
}
