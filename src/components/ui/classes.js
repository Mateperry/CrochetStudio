import { cn } from '../../lib/cn';

/**
 * Class builders shared by UI components and by links that must look like buttons.
 */
const BUTTON_VARIANTS = {
  primary: 'bg-accent text-on-accent hover:bg-accent/90 shadow-sm',
  secondary: 'bg-surface text-ink border border-line hover:bg-surface-muted',
  ghost: 'bg-transparent text-ink hover:bg-surface-muted',
  danger: 'bg-danger text-white hover:bg-danger/90 dark:text-bg',
};

const BUTTON_SIZES = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  icon: 'h-10 w-10 p-0',
};

export const buttonClasses = ({ variant = 'primary', size = 'md', className } = {}) =>
  cn(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
    'disabled:cursor-not-allowed disabled:opacity-60',
    BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.primary,
    BUTTON_SIZES[size] ?? BUTTON_SIZES.md,
    className,
  );

export const controlClasses = (hasError, className) =>
  cn(
    'block w-full rounded-md border bg-surface-muted px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted',
    'transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent',
    'disabled:cursor-not-allowed disabled:opacity-60',
    hasError ? 'border-danger' : 'border-line focus:border-accent',
    className,
  );
