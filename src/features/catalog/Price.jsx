import Badge from '../../components/ui/Badge';
import { formatPrice } from '../../lib/formatPrice';
import { getDiscountPercent, getUnitPrice, hasDiscount } from '../../lib/pricing';
import { cn } from '../../lib/cn';

/**
 * Product price: current price, and when on sale the old price struck through plus a -X% badge.
 */
export default function Price({ product, size = 'md', className }) {
  const discounted = hasDiscount(product);
  const sizes = {
    md: 'text-base',
    lg: 'text-3xl',
  };

  return (
    <div className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-1', className)}>
      <span className={cn('font-semibold text-ink', sizes[size] ?? sizes.md)}>{formatPrice(getUnitPrice(product))}</span>
      {discounted && (
        <>
          <span className="text-sm text-ink-muted line-through">
            <span className="sr-only">Antes </span>
            {formatPrice(product.precio)}
          </span>
          <Badge variant="success">-{getDiscountPercent(product)}%</Badge>
        </>
      )}
    </div>
  );
}
