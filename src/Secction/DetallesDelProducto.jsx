import React, { useState } from "react";
import { useParams } from "react-router-dom";

const DetalleProducto = ({ productos, agregarAlCarrito }) => {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === parseInt(id));
  const [imagenPrincipal, setImagenPrincipal] = useState(producto?.imagenes[0]);
  const [cantidad, setCantidad] = useState(1);

  if (!producto) {
    return (
      <h2 className="mt-20 text-center text-red-500">Producto no encontrado</h2>
    );
  }

  const calcularDescuento = () => {
    if (!producto.precioPromocional) return null;
    const porcentaje =
      ((producto.precio - producto.precioPromocional) / producto.precio) * 100;
    return Math.round(porcentaje);
  };

  const handleAgregar = () => {
    agregarAlCarrito({ ...producto, cantidad: parseInt(cantidad) });
  };

  return (
    <div className="max-w-5xl mx-auto mt-5 p-4 bg-[#aba599] rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Galería de imágenes */}
        <div className="w-full md:w-1/2">
          <img
            src={imagenPrincipal}
            alt={producto.nombre}
            className="w-full h-90 object-cover rounded"
          />

          <div className="flex gap-2 mt-4 overflow-x-auto">
            {producto.imagenes.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Miniatura ${i + 1}`}
                onClick={() => setImagenPrincipal(img)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  img === imagenPrincipal
                    ? "border-gray-500"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Detalles del producto */}
        <div className="flex-1 text-[#272321] space-y-4">
          <h1 className="text-3xl font-bold">{producto.nombre}</h1>
          <p className="text-gray-700">{producto.descripcion}</p>

          {/* Precio */}
          {producto.precioPromocional ? (
            <div className="space-x-2 flex items-center">
              <span className="text-xl text-gray-500 line-through">
                ${producto.precio.toLocaleString()}
              </span>
              <span className="text-2xl font-bold text-[#272321]">
                ${producto.precioPromocional.toLocaleString()}
              </span>
              <span className="text-sm text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">
                {calcularDescuento()}% OFF
              </span>
            </div>
          ) : (
            <p className="text-2xl font-bold text-[#272321]">
              ${producto.precio.toLocaleString()}
            </p>
          )}

          {/* Cantidad */}
{/* Cantidad */}
<div className="mt-4 w-full max-w-[150px]">
  <label htmlFor="cantidad" className="block text-sm font-medium text-[#272321] mb-1">
    Cantidad:
  </label>
  <select
    id="cantidad"
    value={cantidad}
    onChange={(e) => setCantidad(e.target.value)}
    className="block w-full px-3 py-2 text-sm border border-[#7a7266] rounded-md bg-[#f2ede7] text-[#272321] focus:ring-yellow-500 focus:border-yellow-500"
  >
    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
      <option key={num} value={num}>
        {num}
      </option>
    ))}
  </select>
</div>



          {/* Información detallada */}
          {producto.descripcionDetallada && (
            <div className="mt-4 space-y-1 text-sm text-gray-800">
              <p><strong>Personaje:</strong> {producto.descripcionDetallada.personaje}</p>
              <p><strong>Tipo de lana:</strong> {producto.descripcionDetallada.tipoLana}</p>
              <p><strong>Aguja utilizada:</strong> {producto.descripcionDetallada.aguja}</p>
              <p><strong>Dificultad:</strong> {producto.descripcionDetallada.dificultad}</p>
              <p><strong>Tamaño:</strong> {producto.descripcionDetallada.tamaño}</p>
              <p><strong>Tiempo estimado:</strong> {producto.descripcionDetallada.tiempoEstimado}</p>
              <p><strong>Detalles:</strong> {producto.descripcionDetallada.detalles}</p>
            </div>
          )}

          {/* Categorías */}
          {producto.categorias && producto.categorias.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              <strong>Categorías:</strong> {producto.categorias.join(", ")}
            </div>
          )}

          <button
            onClick={handleAgregar}
            className="bg-[#71675d] hover:bg-[#8b8272] text-white px-6 py-2 rounded mt-4"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;


