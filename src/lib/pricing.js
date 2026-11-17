/**
 * Price helpers shared by catalog, cart and checkout.
 */
export function getUnitPrice(product) {
  if (!product) return 0;
  return product.precioPromocional ?? product.precio ?? 0;
}

export function hasDiscount(product) {
  return product?.precioPromocional != null && product.precioPromocional < product.precio;
}

export function getDiscountPercent(product) {
  if (!hasDiscount(product)) return null;
  return Math.round(((product.precio - product.precioPromocional) / product.precio) * 100);
}
