import React from "react";
import { Link } from "react-router-dom";

const Carrito = ({ carrito, setCarrito, eliminarDelCarrito }) => {
  const actualizarCantidad = (index, nuevaCantidad) => {
    const cantidad = parseInt(nuevaCantidad);
    if (cantidad >= 1 && cantidad <= 10) {
      const copia = [...carrito];
      copia[index].cantidad = cantidad;
      setCarrito(copia);
    } else {
      alert("⚠️ La cantidad debe estar entre 1 y 10 unidades.");
    }
  };

  const total = carrito.reduce((acc, prod) => {
    const precio = prod.precioPromocional || prod.precio;
    return acc + precio * prod.cantidad;
  }, 0);

  return (
    <div className="max-w-5xl mx-auto p-4 text-[#272321]">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Carrito de compras</h1>

      {carrito.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Tu carrito está vacío.</p>
          <Link
            to="/"
            className="mt-4 inline-block bg-yellow-400 hover:bg-yellow-600 text-[#272321] px-4 py-2 rounded"
          >
            Volver a la tienda
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {carrito.map((producto, index) => {
            const precio = producto.precioPromocional || producto.precio;
            const subtotal = precio * producto.cantidad;

            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between gap-4 bg-white shadow p-4 rounded-md"
              >
                <div className="flex gap-4">
                  <img
                    src={producto.imagenes[0]}
                    alt={producto.nombre}
                    className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded"
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                      <p className="text-sm text-gray-700">
                        {producto.precioPromocional ? (
                          <>
                            <span className="line-through mr-2 text-gray-500">
                              ${producto.precio.toLocaleString()}
                            </span>
                            <span className="text-[#272321] font-bold">
                              ${producto.precioPromocional.toLocaleString()}
                            </span>
                          </>
                        ) : (
                          <span className="text-[#272321] font-bold">
                            ${producto.precio.toLocaleString()}
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <label className="text-sm">Cantidad:</label>
                      <select
                        value={producto.cantidad}
                        onChange={(e) => actualizarCantidad(index, e.target.value)}
                        className="w-20 border rounded px-2 py-1 text-sm"
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>

                    <p className="text-sm font-semibold text-[#272321] mt-1">
                      Subtotal: ${subtotal.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="sm:self-center">
                  <button
                    onClick={() => eliminarDelCarrito(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm w-full sm:w-auto mt-2 sm:mt-0"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}

          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 border-t pt-4 gap-4 text-center sm:text-left">
            <div className="text-xl font-bold">
              Total: <span className="text-[#272321]">${total.toLocaleString()}</span>
            </div>

            <Link
              to="/checkout"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-sm font-medium"
            >
              Finalizar compra
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
