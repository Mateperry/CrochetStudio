import React from "react";
import SeccionProductos from "./SeccionProductos";

const Animales = ({ productos, agregarAlCarrito }) => {
  if (!productos) return <p className="text-red-500 text-center mt-20">No hay productos disponibles.</p>;

  const productosNovedades = productos.filter(producto =>
    producto.categorias.includes("Animales")
  );

  return (
    <div className="px-4 py-6 space-y-10 text-[#272321] mt-8">
      <SeccionProductos
        titulo="Animales"
        productos={productosNovedades}
        agregarAlCarrito={agregarAlCarrito}
        mostrarVerMas={false} 
      />
    </div>
  );
};

export default Animales;