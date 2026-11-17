import { cn } from '../../lib/cn';

/**
 * Card — solid surface for products, forms and panels (never glass).
 */
export default function Card({ as: Component = 'div', className, children, ...props }) {
  return (
    <Component className={cn('rounded-lg border border-line bg-surface text-ink shadow-sm', className)} {...props}>
      {children}
    </Component>
  );
}
