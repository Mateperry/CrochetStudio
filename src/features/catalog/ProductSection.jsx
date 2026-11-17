import { Link, useLocation } from "react-router-dom";
import ProductGrid from "./ProductGrid";

const ProductSection = ({
  category,
  productos,
  agregarAlCarrito,
  mostrarVerMas = true
}) => {
  const location = useLocation();

  if (productos.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#272321] border-b-2 border-yellow-400 inline-block">
          {category.title}
        </h2>

        {/* Botón "Ver más" solo si está habilitado y no estamos ya en esa ruta */}
        {mostrarVerMas && location.pathname !== category.path && (
          <Link
            to={category.path}
            className="text-sm bg-yellow-400 text-[#272321] px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Ver más
          </Link>
        )}
      </div>

      <ProductGrid
        productos={productos}
        agregarAlCarrito={agregarAlCarrito}
      />
    </section>
  );
};

export default ProductSection;
