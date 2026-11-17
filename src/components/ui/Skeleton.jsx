import { cn } from '../../lib/cn';

/**
 * Skeleton — placeholder block shown while data loads. Decorative: hidden from screen readers;
 * the parent should expose a status message (e.g. "Cargando productos...").
 */
export default function Skeleton({ className }) {
  return <div aria-hidden="true" className={cn('animate-pulse rounded-md bg-surface-muted', className)} />;
}
