import React from "react";
import SeccionProductos from "./SeccionProductos";

const Series = ({ productos, agregarAlCarrito }) => {
  if (!productos) return <p className="text-red-500 text-center mt-20">No hay productos disponibles.</p>;

  const productosNovedades = productos.filter(producto =>
    producto.categorias.includes("Series")
  );

  return (
    <div className="px-4 py-6 space-y-10 text-[#272321] mt-8">
      <SeccionProductos
        titulo="Series"
        productos={productosNovedades}
        agregarAlCarrito={agregarAlCarrito}
        mostrarVerMas={false} 
      />
    </div>
  );
};

export default Series;