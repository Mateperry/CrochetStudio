import { Link } from "react-router-dom";

function TarjetasInicio({ productos, agregarAlCarrito }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {productos.map((producto) => {
        const descuento = producto.precioPromocional
          ? Math.round(((producto.precio - producto.precioPromocional) / producto.precio) * 100)
          : null;

        return (
          <div
            key={producto.id}
            className="border p-4 rounded-lg shadow-md text-center bg-[#aba599]"
          >
            <Link to={`/producto/${producto.id}`}>
              <img
                src={producto.imagenes[0]}
                alt={producto.nombre}
                className="w-full h-60 object-cover mb-2 rounded hover:opacity-90 transition"
              />
            </Link>

            <h3 className="text-lg font-semibold">{producto.nombre}</h3>
            <p className="text-[#272321]">{producto.descripcion}</p>

            {producto.precioPromocional ? (
              <div className="text-center mt-2 space-y-1">
                <span className="text-sm text-gray line-through block">
                  ${producto.precio.toLocaleString()}
                </span>
                <span className="text-lg font-bold text-grayblock">
                  ${producto.precioPromocional.toLocaleString()}
                </span>
                <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-0.5 rounded">
                  {descuento}% OFF
                </span>
              </div>
            ) : (
              <p className="text-lg font-bold text-gray- mt-2">
                ${producto.precio.toLocaleString()}
              </p>
            )}

            <button
              onClick={() => agregarAlCarrito(producto)}
              className="mt-3 bg-[#938a7c] hover:bg-[#71675d] text-[#272321] px-4 py-2 rounded w-full"
            >
              Agregar al carrito
            </button>

            <Link
              to={`/producto/${producto.id}`}
              className="mt-2 inline-block bg-white hover:bg-[#ddd3c4] text-[#272321] px-4 py-2 rounded w-full text-center"
            >
              Ver detalle
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default TarjetasInicio;
