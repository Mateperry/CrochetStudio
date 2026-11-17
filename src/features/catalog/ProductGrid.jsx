import ProductCard from './ProductCard';
import Skeleton from '../../components/ui/Skeleton';
import { cn } from '../../lib/cn';

const GRID_CLASSES = 'grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-4';

/**
 * Responsive product grid. `priorityFirst` loads the first image eagerly.
 */
export default function ProductGrid({ products, priorityFirst = false, className }) {
  return (
    <ul className={cn(GRID_CLASSES, className)}>
      {products.map((product, index) => (
        <li key={product.id} className="flex">
          <ProductCard product={product} priority={priorityFirst && index === 0} className="w-full" />
        </li>
      ))}
    </ul>
  );
}

export function ProductGridSkeleton({ count = 8, className }) {
  return (
    <div role="status" className={cn(GRID_CLASSES, className)}>
      <span className="sr-only">Cargando productos...</span>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="aspect-[4/5] w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
}
