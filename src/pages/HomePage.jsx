import ProductSection from "../features/catalog/ProductSection";
import Hero from "../features/catalog/Hero";
import { CatalogError, CatalogLoading } from "../features/catalog/CatalogStatus";
import { useProducts } from "../features/catalog/hooks/useProducts";
import { CATEGORIES, filterProductsByCategory } from "../constants/categories";

const MAX_PRODUCTS_PER_SECTION = 8;

const HomePage = () => {
  const { data: products, isPending, isError, refetch, isFetching } = useProducts();

  return (
    <>
      <Hero />
      <div className="px-4 py-6 space-y-10 text-[#272321] mt-8">
        {isPending && <CatalogLoading />}
        {isError && <CatalogError onRetry={() => refetch()} isRetrying={isFetching} />}
        {products &&
          CATEGORIES.map((category) => (
            <ProductSection
              key={category.slug}
              category={category}
              productos={filterProductsByCategory(products, category).slice(0, MAX_PRODUCTS_PER_SECTION)}
            />
          ))}
      </div>
    </>
  );
};

export default HomePage;
