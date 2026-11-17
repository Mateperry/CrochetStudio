import { Link } from "react-router-dom";
import { useCart } from "../features/cart/useCart";
import { MAX_QUANTITY } from "../features/cart/cartReducer";

const QUANTITY_OPTIONS = Array.from({ length: MAX_QUANTITY }, (_, i) => i + 1);

const CartPage = () => {
  const { lines, subtotal, updateQuantity, remove } = useCart();

  return (
    <div className="max-w-5xl mx-auto p-4 text-[#272321]">
      <h1 className="text-3xl font-bold mb-6 text-center">Carrito de compras</h1>

      {lines.length === 0 ? (
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
          {lines.map(({ productId, quantity, product, unitPrice, lineTotal }) => (
            <div
              key={productId}
              className="flex flex-col sm:flex-row justify-between gap-4 bg-white shadow p-4 rounded-md"
            >
              <div className="flex gap-4">
                <img
                  src={product.imagenes[0]}
                  alt={product.nombre}
                  className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{product.nombre}</h3>
                    <p className="text-sm text-gray-700">
                      {product.precioPromocional != null && (
                        <span className="line-through mr-2 text-gray-500">
                          ${product.precio.toLocaleString()}
                        </span>
                      )}
                      <span className="text-[#272321] font-bold">${unitPrice.toLocaleString()}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <label htmlFor={`cantidad-${productId}`} className="text-sm">Cantidad:</label>
                    <select
                      id={`cantidad-${productId}`}
                      value={quantity}
                      onChange={(e) => updateQuantity(productId, Number(e.target.value))}
                      className="w-20 border rounded px-2 py-1 text-sm"
                    >
                      {QUANTITY_OPTIONS.map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>

                  <p className="text-sm font-semibold text-[#272321] mt-1">
                    Subtotal: ${lineTotal.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="sm:self-center">
                <button
                  onClick={() => remove(productId)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm w-full sm:w-auto mt-2 sm:mt-0"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 border-t pt-4 gap-4 text-center sm:text-left">
            <div className="text-xl font-bold">
              Total: <span className="text-[#272321]">${subtotal.toLocaleString()}</span>
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

export default CartPage;
