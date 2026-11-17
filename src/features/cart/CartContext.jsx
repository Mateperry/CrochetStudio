import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { CartContext } from './cartContextValue';
import { cartReducer, clampQuantity, MAX_QUANTITY } from './cartReducer';
import { loadCart, saveCart } from './cartStorage';
import { useProducts } from '../catalog/hooks/useProducts';
import { useToast } from '../../components/ui/Toast/useToast';
import { getUnitPrice } from '../../lib/pricing';

/**
 * CartProvider — owns the cart state.
 * - Persists only { productId, quantity } in localStorage.
 * - Resolves name, price and images from the live catalog (useProducts).
 * - Removes products that no longer exist and tells the user.
 */
export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, () => loadCart());
  const { data: products, isSuccess } = useProducts();
  const toast = useToast();
  const itemsRef = useRef(items);

  useEffect(() => {
    itemsRef.current = items;
    saveCart(items);
  }, [items]);

  const productsById = useMemo(() => {
    const map = new Map();
    (products ?? []).forEach((product) => map.set(product.id, product));
    return map;
  }, [products]);

  // Drop products that are no longer in the catalog (only once the catalog loaded successfully).
  useEffect(() => {
    if (!isSuccess) return;
    const missing = items.filter((item) => !productsById.has(item.productId)).map((item) => item.productId);
    if (missing.length === 0) return;
    dispatch({ type: 'removeMany', productIds: missing });
    toast.info(
      missing.length === 1
        ? 'Un producto de tu carrito ya no está disponible y se quitó.'
        : `${missing.length} productos de tu carrito ya no están disponibles y se quitaron.`,
    );
  }, [isSuccess, items, productsById, toast]);

  const add = useCallback(
    (productId, quantity = 1) => {
      const current = itemsRef.current.find((item) => item.productId === productId);
      const requested = clampQuantity(quantity);
      if (current && current.quantity >= MAX_QUANTITY) {
        toast.info(`Ya tienes el máximo de ${MAX_QUANTITY} unidades de este producto.`);
        return;
      }
      dispatch({ type: 'add', productId, quantity: requested });
      if (current && current.quantity + requested > MAX_QUANTITY) {
        toast.info(`Ajustamos la cantidad al máximo de ${MAX_QUANTITY} unidades.`);
      } else {
        toast.success('Producto agregado al carrito.');
      }
    },
    [toast],
  );

  const updateQuantity = useCallback((productId, quantity) => {
    dispatch({ type: 'updateQuantity', productId, quantity });
  }, []);

  const remove = useCallback((productId) => {
    dispatch({ type: 'remove', productId });
  }, []);

  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const value = useMemo(() => {
    const lines = items
      .map((item) => {
        const product = productsById.get(item.productId);
        if (!product) return null;
        const unitPrice = getUnitPrice(product);
        return { ...item, product, unitPrice, lineTotal: unitPrice * item.quantity };
      })
      .filter(Boolean);

    return {
      items,
      lines,
      count: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: lines.reduce((total, line) => total + line.lineTotal, 0),
      isCatalogReady: isSuccess,
      add,
      updateQuantity,
      remove,
      clear,
    };
  }, [items, productsById, isSuccess, add, updateQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
