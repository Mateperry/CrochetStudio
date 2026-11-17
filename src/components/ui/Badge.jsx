import { cn } from '../../lib/cn';

const VARIANTS = {
  neutral: 'bg-surface-muted text-ink-muted',
  accent: 'bg-accent-soft text-accent',
  success: 'bg-success/15 text-success',
};

export default function Badge({ variant = 'neutral', className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        VARIANTS[variant] ?? VARIANTS.neutral,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
