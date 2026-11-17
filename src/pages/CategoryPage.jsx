import ProductSection from "../features/catalog/ProductSection";
import { getCategoryBySlug, filterProductsByCategory } from "../constants/categories";

const CategoryPage = ({ slug, productos, agregarAlCarrito }) => {
  const category = getCategoryBySlug(slug);

  if (!category || !productos) {
    return <p className="text-red-500 text-center mt-20">No hay productos disponibles.</p>;
  }

  return (
    <div className="px-4 py-6 space-y-10 text-[#272321] mt-8">
      <ProductSection
        category={category}
        productos={filterProductsByCategory(productos, category)}
        agregarAlCarrito={agregarAlCarrito}
        mostrarVerMas={false}
      />
    </div>
  );
};

export default CategoryPage;
