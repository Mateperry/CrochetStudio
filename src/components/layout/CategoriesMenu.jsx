import { useCallback, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';
import { CATEGORIES } from '../../constants/categories';
import { useDismiss } from '../../lib/useDismiss';
import { cn } from '../../lib/cn';

/**
 * Desktop "Categorías" dropdown.
 */
export default function CategoriesMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const menuId = useId();
  const { pathname } = useLocation();
  const close = useCallback(() => setOpen(false), []);
  useDismiss(containerRef, open, close);

  const isCategoryRoute = pathname.startsWith('/categoria/');

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={menuId}
        className={cn(
          'inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-muted',
          isCategoryRoute ? 'text-accent' : 'text-ink',
        )}
      >
        Categorías
        <ChevronDownIcon size={16} aria-hidden="true" className={cn('transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <GlassPanel id={menuId} as="ul" className="absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 p-2">
          {CATEGORIES.map((category) => {
            const active = pathname === category.path;
            return (
              <li key={category.slug}>
                <Link
                  to={category.path}
                  onClick={close}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'block rounded-md px-3 py-2 text-sm transition-colors hover:bg-surface-muted',
                    active && 'bg-accent-soft font-medium text-accent',
                  )}
                >
                  {category.title}
                </Link>
              </li>
            );
          })}
        </GlassPanel>
      )}
    </div>
  );
}
