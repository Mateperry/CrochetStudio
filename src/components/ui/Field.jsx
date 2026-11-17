import { cloneElement, useId } from 'react';
import { cn } from '../../lib/cn';

/**
 * Field — label + control + hint/error, wired with aria-describedby and aria-invalid.
 * Used by Input, Select and Textarea.
 */
export default function Field({ id, label, hint, error, required, className, children }) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label htmlFor={controlId} className="block text-sm font-medium text-ink">
          {label}
          {required && (
            <span className="text-accent" aria-hidden="true">
              {' '}*
            </span>
          )}
        </label>
      )}
      {cloneElement(children, {
        id: controlId,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : undefined,
        required,
      })}
      {hint && !error && (
        <p id={hintId} className="text-xs text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
