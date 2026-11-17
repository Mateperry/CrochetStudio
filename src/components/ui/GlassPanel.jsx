import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

/**
 * GlassPanel — frosted surface for floating layers only
 * (navigation, cart drawer, modals, filter chips).
 */
const GlassPanel = forwardRef(function GlassPanel({ as: Component = 'div', className, children, ...props }, ref) {
  return (
    <Component ref={ref} className={cn('glass rounded-lg text-ink shadow-md', className)} {...props}>
      {children}
    </Component>
  );
});

export default GlassPanel;
