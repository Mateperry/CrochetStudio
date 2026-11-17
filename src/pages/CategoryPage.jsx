import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductGrid, { ProductGridSkeleton } from '../features/catalog/ProductGrid';
import { CatalogError } from '../features/catalog/CatalogStatus';
import { useProducts } from '../features/catalog/hooks/useProducts';
import { filterBySubcategory, getSubcategories, SORT_OPTIONS, sortProducts } from '../features/catalog/catalogFilters';
import { getCategoryBySlug, filterProductsByCategory } from '../constants/categories';
import Select from '../components/ui/Select';
import { buttonClasses } from '../components/ui/classes';
import { cn } from '../lib/cn';
import NotFoundPage from './NotFoundPage';

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'glass shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
        active ? 'ring-2 ring-accent text-accent' : 'text-ink hover:text-accent',
      )}
    >
      {children}
    </button>
  );
}

export default function CategoryPage() {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);
  const { data: products, isPending, isError, refetch, isFetching } = useProducts();
  const [filterState, setFilterState] = useState({ slug, subcategory: null, sort: 'featured' });

  // Reset filters when navigating to another category.
  const { subcategory, sort } = filterState.slug === slug ? filterState : { subcategory: null, sort: 'featured' };
  const update = (changes) => setFilterState({ slug, subcategory, sort, ...changes });

  const categoryProducts = useMemo(() => filterProductsByCategory(products, category), [products, category]);
  const subcategories = useMemo(() => getSubcategories(categoryProducts), [categoryProducts]);
  const visibleProducts = useMemo(
    () => sortProducts(filterBySubcategory(categoryProducts, subcategory), sort),
    [categoryProducts, subcategory, sort],
  );

  if (!category) {
    return <NotFoundPage title="Categoría no encontrada" message="Esa categoría no existe en la tienda." />;
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold md:text-4xl">{category.title}</h1>
          {products && (
            <p className="mt-1 text-sm text-ink-muted" aria-live="polite">
              {visibleProducts.length} {visibleProducts.length === 1 ? 'producto' : 'productos'}
            </p>
          )}
        </div>
        {categoryProducts.length > 1 && (
          <Select
            label="Ordenar por"
            value={sort}
            onChange={(event) => update({ sort: event.target.value })}
            fieldClassName="sm:w-48"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        )}
      </header>

      {subcategories.length > 0 && (
        <div
          role="group"
          aria-label="Filtrar por subcategoría"
          className="sticky top-20 z-30 -mx-4 flex gap-2 overflow-x-auto px-4 py-2 md:top-24 md:mx-0 md:px-0"
        >
          <FilterChip active={!subcategory} onClick={() => update({ subcategory: null })}>
            Todos
          </FilterChip>
          {subcategories.map((name) => (
            <FilterChip key={name} active={subcategory === name} onClick={() => update({ subcategory: name })}>
              {name}
            </FilterChip>
          ))}
        </div>
      )}

      {isPending && <ProductGridSkeleton />}
      {isError && <CatalogError onRetry={() => refetch()} isRetrying={isFetching} />}

      {products && visibleProducts.length === 0 && (
        <div className="rounded-lg border border-line bg-surface px-6 py-16 text-center">
          <p className="font-display text-xl font-semibold">Aún no hay productos aquí</p>
          <p className="mt-2 text-sm text-ink-muted">Estamos tejiendo cosas nuevas. Mientras tanto, mira el resto de la tienda.</p>
          <Link to="/" className={buttonClasses({ className: 'mt-6' })}>
            Volver al inicio
          </Link>
        </div>
      )}

      {visibleProducts.length > 0 && <ProductGrid products={visibleProducts} priorityFirst />}
    </div>
  );
}
