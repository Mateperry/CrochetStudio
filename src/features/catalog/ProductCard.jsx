import { Link } from 'react-router-dom';
import { ImageOffIcon } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Price from './Price';
import { useCart } from '../cart/useCart';
import { cn } from '../../lib/cn';

/**
 * ProductCard — solid card. The whole card links to the detail page;
 * the "Agregar" button adds to the cart without navigating.
 * `priority` loads the image eagerly (use for the first visible card, improves LCP).
 */
export default function ProductCard({ product, priority = false, className }) {
  const { add } = useCart();
  const image = product.imagenes?.[0];
  const detailPath = `/producto/${product.id}`;

  return (
    <Card as="article" className={cn('group relative flex flex-col overflow-hidden transition-shadow hover:shadow-md', className)}>
      <div className="aspect-[4/5] overflow-hidden bg-surface-muted">
        {image ? (
          <img
            src={image}
            alt={product.nombre}
            width="480"
            height="600"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : undefined}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink-muted">
            <ImageOffIcon size={32} aria-hidden="true" />
            <span className="sr-only">Sin imagen</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 md:p-4">
        <h3 className="truncate text-sm font-medium md:text-base">
          {/* Stretched link: the whole card is clickable, the button below stays independent. */}
          <Link to={detailPath} className="after:absolute after:inset-0 focus-visible:outline-none">
            {product.nombre}
          </Link>
        </h3>
        <Price product={product} />
        <Button
          size="sm"
          className="relative z-10 mt-auto w-full"
          onClick={() => add(product.id)}
          aria-label={`Agregar ${product.nombre} al carrito`}
        >
          Agregar
        </Button>
      </div>
    </Card>
  );
}
