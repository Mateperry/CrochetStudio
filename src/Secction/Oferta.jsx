import React from "react";
import SeccionProductos from "./SeccionProductos";

const Ofertas = ({ productos, agregarAlCarrito }) => {
  if (!productos) return <p className="text-red-500 text-center mt-20">No hay productos disponibles.</p>;

  // Traemos todos los productos que tengan un precio promocional O estén en la categoría Ofertas
  const productosOfertas = productos.filter(producto =>
    producto.precioPromocional !== null || producto.categorias.includes("Ofertas")
  );

  return (
    <div className="px-9 py-6 space-y-10 text-[#272321] mt-8">
      <SeccionProductos
        titulo="Ofertas"
        productos={productosOfertas}
        agregarAlCarrito={agregarAlCarrito}
        mostrarVerMas={false} 
      />
    </div>
  );
};

export default Ofertas;