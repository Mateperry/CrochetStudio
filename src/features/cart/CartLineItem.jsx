import { Link } from 'react-router-dom';
import { ImageOffIcon, Trash2Icon } from 'lucide-react';
import QuantityStepper from '../catalog/QuantityStepper';
import { useCart } from './useCart';
import { formatPrice } from '../../lib/formatPrice';
import { cn } from '../../lib/cn';

/**
 * One cart line: thumbnail, name, unit price, − / + quantity, remove and line total.
 */
export default function CartLineItem({ line, compact = false, onNavigate }) {
  const { updateQuantity, remove } = useCart();
  const { product, productId, quantity, unitPrice, lineTotal } = line;
  const image = product.imagenes?.[0];

  return (
    <li className={cn('flex gap-3', compact ? 'py-3' : 'py-4')}>
      <Link
        to={`/producto/${productId}`}
        onClick={onNavigate}
        className={cn('shrink-0 overflow-hidden rounded-md bg-surface-muted', compact ? 'h-20 w-16' : 'h-28 w-24')}
      >
        {image ? (
          <img src={image} alt={product.nombre} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full items-center justify-center text-ink-muted">
            <ImageOffIcon size={20} aria-hidden="true" />
          </span>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              to={`/producto/${productId}`}
              onClick={onNavigate}
              className="line-clamp-2 text-sm font-medium hover:text-accent"
            >
              {product.nombre}
            </Link>
            <p className="text-xs text-ink-muted">{formatPrice(unitPrice)} c/u</p>
          </div>
          <button
            type="button"
            onClick={() => remove(productId)}
            aria-label={`Quitar ${product.nombre} del carrito`}
            className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-surface-muted hover:text-danger"
          >
            <Trash2Icon size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2">
          <QuantityStepper
            value={quantity}
            onChange={(value) => updateQuantity(productId, value)}
            size="sm"
            label={`Cantidad de ${product.nombre}`}
          />
          <span className="text-sm font-semibold tabular-nums">{formatPrice(lineTotal)}</span>
        </div>
      </div>
    </li>
  );
}
