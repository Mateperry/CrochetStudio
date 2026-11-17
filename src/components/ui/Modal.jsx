import { useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { XIcon } from 'lucide-react';
import { cn } from '../../lib/cn';
import { useFocusTrap } from '../../lib/useFocusTrap';
import { useLockBodyScroll } from '../../lib/useLockBodyScroll';

const PLACEMENTS = {
  center: {
    wrapper: 'items-center justify-center p-4',
    panel: 'w-full max-w-md rounded-lg',
    motion: { initial: { opacity: 0, scale: 0.96, y: 12 }, animate: { opacity: 1, scale: 1, y: 0 } },
  },
  right: {
    wrapper: 'justify-end',
    panel: 'h-full w-full max-w-md rounded-none rounded-l-lg',
    motion: { initial: { x: '100%' }, animate: { x: 0 } },
  },
  bottom: {
    wrapper: 'items-end',
    panel: 'max-h-[85vh] w-full rounded-none rounded-t-lg pb-[env(safe-area-inset-bottom)]',
    motion: { initial: { y: '100%' }, animate: { y: 0 } },
  },
};

/**
 * Modal — glass dialog. Closes with Escape, click on the backdrop or the close button;
 * traps focus while open and returns it to the trigger when closed.
 * `placement`: center (dialog), right (drawer) or bottom (mobile sheet).
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  placement = 'center',
  hideTitle = false,
  className,
  children,
  footer,
}) {
  const panelRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  const reduceMotion = useReducedMotion();
  const config = PLACEMENTS[placement] ?? PLACEMENTS.center;

  useLockBodyScroll(isOpen);
  useFocusTrap(panelRef, isOpen, onClose);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className={cn('fixed inset-0 z-[90] flex', config.wrapper)}>
          <motion.div
            className="absolute inset-0 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            className={cn('glass relative flex flex-col text-ink shadow-md focus:outline-none', config.panel, className)}
            initial={reduceMotion ? { opacity: 0 } : config.motion.initial}
            animate={reduceMotion ? { opacity: 1 } : config.motion.animate}
            exit={reduceMotion ? { opacity: 0 } : config.motion.initial}
            transition={{ type: 'tween', duration: 0.22, ease: 'easeOut' }}
          >
            <div className="flex items-start justify-between gap-4 px-5 pt-5">
              <div>
                <h2 id={titleId} className={cn('font-display text-xl font-semibold', hideTitle && 'sr-only')}>
                  {title}
                </h2>
                {description && (
                  <p id={descriptionId} className="mt-1 text-sm text-ink-muted">
                    {description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="-mr-1 rounded-md p-1.5 text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
                aria-label="Cerrar"
              >
                <XIcon size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
            {footer && <div className="border-t border-line px-5 py-4">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
