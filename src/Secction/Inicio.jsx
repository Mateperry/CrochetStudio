import SeccionProductos from "./SeccionProductos";
import LampDemo from "./Lamp";
import { CATEGORIES, filterProductsByCategory } from "../constants/categories";

const MAX_PRODUCTS_PER_SECTION = 8;

const Inicio = ({ productos, agregarAlCarrito }) => {
  return (
    <>
      <LampDemo />
      <div className="px-4 py-6 space-y-10 text-[#272321] mt-8">
        {CATEGORIES.map((category) => (
          <SeccionProductos
            key={category.slug}
            category={category}
            productos={filterProductsByCategory(productos, category).slice(0, MAX_PRODUCTS_PER_SECTION)}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>
    </>
  );
};

export default Inicio;
