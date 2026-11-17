import Hero from '../features/catalog/Hero';
import PageMeta from '../components/layout/PageMeta';
import ProductSection from '../features/catalog/ProductSection';
import { ProductGridSkeleton } from '../features/catalog/ProductGrid';
import { CatalogError } from '../features/catalog/CatalogStatus';
import { useProducts } from '../features/catalog/hooks/useProducts';
import { CATEGORIES, filterProductsByCategory } from '../constants/categories';

const MAX_PRODUCTS_PER_SECTION = 8;
const FIRST_SECTION_ID = 'coleccion';

export default function HomePage() {
  const { data: products, isPending, isError, refetch, isFetching } = useProducts();

  const sections = (products ? CATEGORIES : [])
    .map((category) => ({
      category,
      products: filterProductsByCategory(products, category).slice(0, MAX_PRODUCTS_PER_SECTION),
    }))
    .filter((section) => section.products.length > 0);

  return (
    <>
      <PageMeta />
      <Hero targetId={FIRST_SECTION_ID} />
      <div id={sections.length === 0 ? FIRST_SECTION_ID : undefined} className="scroll-mt-28 space-y-14 pt-4">
        {isPending && <ProductGridSkeleton />}
        {isError && <CatalogError onRetry={() => refetch()} isRetrying={isFetching} />}
        {products && sections.length === 0 && (
          <p className="py-16 text-center text-ink-muted">Pronto tendremos productos nuevos.</p>
        )}
        {sections.map((section, index) => (
          <ProductSection
            key={section.category.slug}
            id={index === 0 ? FIRST_SECTION_ID : undefined}
            category={section.category}
            products={section.products}
            priorityFirst={index === 0}
          />
        ))}
      </div>
    </>
  );
}
