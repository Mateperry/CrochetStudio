import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ImageOffIcon } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import GlassPanel from '../components/ui/GlassPanel';
import Skeleton from '../components/ui/Skeleton';
import Price from '../features/catalog/Price';
import ProductCard from '../features/catalog/ProductCard';
import QuantityStepper from '../features/catalog/QuantityStepper';
import { CatalogError } from '../features/catalog/CatalogStatus';
import { useProducts } from '../features/catalog/hooks/useProducts';
import { useCart } from '../features/cart/useCart';
import { clampQuantity } from '../features/cart/cartReducer';
import { CATEGORIES } from '../constants/categories';
import { formatPrice } from '../lib/formatPrice';
import { getUnitPrice } from '../lib/pricing';
import { cn } from '../lib/cn';
import NotFoundPage from './NotFoundPage';
import PageMeta from '../components/layout/PageMeta';
import { toMetaDescription } from '../lib/seo';

const RELATED_COUNT = 4;

const SPEC_FIELDS = [
  { key: 'personaje', label: 'Personaje' },
  { key: 'tipoLana', label: 'Tipo de lana' },
  { key: 'aguja', label: 'Aguja' },
  { key: 'dificultad', label: 'Dificultad' },
  { key: 'tamaño', label: 'Tamaño' },
  { key: 'tiempoEstimado', label: 'Tiempo estimado' },
  { key: 'detalles', label: 'Detalles' },
];

function getCategoryLink(name) {
  return CATEGORIES.find((category) => category.dbName === name)?.path ?? null;
}

function getRelatedProducts(products, product) {
  const mainCategory = product.categorias.find((name) => getCategoryLink(name)) ?? product.categorias[0];
  if (!mainCategory) return [];
  return products
    .filter((item) => item.id !== product.id && item.categorias.includes(mainCategory))
    .slice(0, RELATED_COUNT);
}

function Gallery({ product }) {
  const images = product.imagenes ?? [];
  // The selection is keyed by product id, so it resets when navigating to another product.
  const [selection, setSelection] = useState({ productId: product.id, index: 0 });
  const index = selection.productId === product.id ? selection.index : 0;
  const current = images[index] ?? images[0];

  return (
    <div className="space-y-3">
      <div className="aspect-[4/5] overflow-hidden rounded-lg border border-line bg-surface-muted">
        {current ? (
          <img
            src={current}
            alt={product.nombre}
            width="800"
            height="1000"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink-muted">
            <ImageOffIcon size={40} aria-hidden="true" />
            <span className="sr-only">Sin imagen</span>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <ul className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, i) => (
            <li key={`${image}-${i}`}>
              <button
                type="button"
                onClick={() => setSelection({ productId: product.id, index: i })}
                aria-label={`Ver imagen ${i + 1}`}
                aria-pressed={i === index}
                className={cn(
                  'h-20 w-16 overflow-hidden rounded-md border-2 transition-colors',
                  i === index ? 'border-accent' : 'border-transparent opacity-80 hover:opacity-100',
                )}
              >
                <img src={image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div role="status" className="grid gap-8 md:grid-cols-2">
      <span className="sr-only">Cargando producto...</span>
      <Skeleton className="aspect-[4/5] w-full rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-11 w-full" />
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const { add } = useCart();
  const { data: products, isPending, isError, refetch, isFetching } = useProducts();
  const [quantityState, setQuantityState] = useState({ id, value: 1 });
  const quantity = quantityState.id === id ? quantityState.value : 1;
  const setQuantity = (value) => setQuantityState({ id, value: clampQuantity(value) });

  const productId = /^\d+$/.test(id ?? '') ? Number(id) : null;
  const product = productId ? products?.find((item) => item.id === productId) : undefined;
  const related = useMemo(() => (product && products ? getRelatedProducts(products, product) : []), [products, product]);

  if (productId && isPending) return <DetailSkeleton />;
  if (productId && isError) return <CatalogError onRetry={() => refetch()} isRetrying={isFetching} />;
  if (!product) {
    return <NotFoundPage title="Producto no encontrado" message="Este producto no existe o ya no está disponible." />;
  }

  const specs = SPEC_FIELDS.filter(({ key }) => {
    const value = product.descripcionDetallada?.[key];
    return value != null && String(value).trim() !== '';
  });
  const handleAdd = () => add(product.id, quantity);

  return (
    <div className="space-y-16">
      <PageMeta
        title={product.nombre}
        description={toMetaDescription(product.descripcion) || undefined}
        image={product.imagenes?.[0]}
        type="product"
      />
      <article className="grid gap-8 md:grid-cols-2 md:gap-12">
        <Gallery product={product} />

        <div className="space-y-6">
          {product.categorias.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Categorías">
              {product.categorias.map((name) => {
                const link = getCategoryLink(name);
                return (
                  <li key={name}>
                    {link ? (
                      <Link to={link} className="rounded-full focus-visible:outline-accent">
                        <Badge variant="accent" className="hover:bg-accent hover:text-on-accent">
                          {name}
                        </Badge>
                      </Link>
                    ) : (
                      <Badge>{name}</Badge>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          <div className="space-y-3">
            <h1 className="font-display text-3xl font-semibold leading-tight md:text-4xl">{product.nombre}</h1>
            <Price product={product} size="lg" />
          </div>

          {product.descripcion && <p className="text-base leading-relaxed text-ink-muted">{product.descripcion}</p>}

          <div className="hidden items-center gap-3 md:flex">
            <QuantityStepper value={quantity} onChange={setQuantity} />
            <Button className="flex-1" onClick={handleAdd}>
              Agregar al carrito
            </Button>
          </div>

          {specs.length > 0 && (
            <section aria-labelledby="ficha-tecnica" className="rounded-lg border border-line bg-surface p-5">
              <h2 id="ficha-tecnica" className="font-display text-lg font-semibold">
                Ficha técnica
              </h2>
              <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {specs.map(({ key, label }) => (
                  <div key={key} className={key === 'detalles' ? 'sm:col-span-2' : undefined}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</dt>
                    <dd className="mt-0.5 text-sm">{product.descripcionDetallada[key]}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="relacionados" className="space-y-4">
          <h2 id="relacionados" className="font-display text-2xl font-semibold">
            También te puede gustar
          </h2>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {related.map((item) => (
              <li key={item.id} className="flex">
                <ProductCard product={item} className="w-full" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Mobile: sticky add-to-cart bar above the bottom navigation. */}
      <div className="h-20 md:hidden" aria-hidden="true" />
      <GlassPanel className="fixed inset-x-3 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-30 flex items-center gap-3 p-3 md:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-ink-muted">{product.nombre}</p>
          <p className="font-semibold">{formatPrice(getUnitPrice(product) * quantity)}</p>
        </div>
        <QuantityStepper value={quantity} onChange={setQuantity} size="sm" />
        <Button size="sm" onClick={handleAdd}>
          Agregar al carrito
        </Button>
      </GlassPanel>
    </div>
  );
}
