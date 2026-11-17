import { ShoppingBagIcon } from 'lucide-react';
import { useCart } from '../../features/cart/useCart';
import { cn } from '../../lib/cn';

/**
 * Cart icon with item counter. Opens the cart drawer.
 */
export default function CartButton({ onClick, className, showLabel = false }) {
  const { count } = useCart();
  const label = count === 0 ? 'Carrito vacío' : `Carrito, ${count} ${count === 1 ? 'producto' : 'productos'}`;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'relative inline-flex items-center justify-center gap-1 rounded-md text-ink transition-colors hover:bg-surface-muted',
        showLabel ? 'h-14 flex-col px-3 text-[11px] font-medium' : 'h-10 w-10',
        className,
      )}
    >
      <span className="relative">
        <ShoppingBagIcon size={22} aria-hidden="true" />
        {count > 0 && (
          <span
            aria-hidden="true"
            className="absolute -right-2 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-on-accent"
          >
            {count > 99 ? '99+' : count}
          </span>
        )}
      </span>
      {showLabel && <span aria-hidden="true">Carrito</span>}
    </button>
  );
}
