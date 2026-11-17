import { useParams } from "react-router-dom";
import ProductSection from "../features/catalog/ProductSection";
import { CatalogError, CatalogLoading } from "../features/catalog/CatalogStatus";
import { useProducts } from "../features/catalog/hooks/useProducts";
import { getCategoryBySlug, filterProductsByCategory } from "../constants/categories";
import NotFoundPage from "./NotFoundPage";

const CategoryPage = () => {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);
  const { data: products, isPending, isError, refetch, isFetching } = useProducts();

  if (!category) {
    return <NotFoundPage title="Categoría no encontrada" message="Esa categoría no existe en la tienda." />;
  }

  if (isPending) return <CatalogLoading />;
  if (isError) return <CatalogError onRetry={() => refetch()} isRetrying={isFetching} />;

  const categoryProducts = filterProductsByCategory(products, category);

  return (
    <div className="px-4 py-6 space-y-10 text-[#272321] mt-8">
      {categoryProducts.length === 0 ? (
        <p className="text-center">Todavía no hay productos en {category.title}.</p>
      ) : (
        <ProductSection category={category} productos={categoryProducts} mostrarVerMas={false} />
      )}
    </div>
  );
};

export default CategoryPage;
