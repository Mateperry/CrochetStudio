import { clampQuantity } from './cartReducer';

export const CART_STORAGE_KEY = 'crochet-cart:v1';
export const LEGACY_CART_STORAGE_KEY = 'carrito';
const CART_VERSION = 1;

function sanitizeItems(items) {
  if (!Array.isArray(items)) return [];
  const seen = new Map();
  for (const item of items) {
    const productId = Number(item?.productId);
    if (!Number.isInteger(productId) || productId <= 0) continue;
    const previous = seen.get(productId) ?? 0;
    seen.set(productId, clampQuantity(previous + clampQuantity(item?.quantity)));
  }
  return [...seen.entries()].map(([productId, quantity]) => ({ productId, quantity }));
}

/**
 * Reads the old "carrito" key (full product objects with "cantidad") once.
 */
function readLegacyCart(storage) {
  const raw = storage.getItem(LEGACY_CART_STORAGE_KEY);
  if (raw == null) return null;
  storage.removeItem(LEGACY_CART_STORAGE_KEY);
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return sanitizeItems(parsed.map((product) => ({ productId: product?.id, quantity: product?.cantidad })));
  } catch {
    return [];
  }
}

/**
 * Loads the cart. Corrupted JSON or an unknown version returns an empty cart.
 */
export function loadCart(storage = globalThis.localStorage) {
  if (!storage) return [];
  try {
    const raw = storage.getItem(CART_STORAGE_KEY);
    if (raw == null) {
      const legacy = readLegacyCart(storage);
      if (legacy) saveCart(legacy, storage);
      return legacy ?? [];
    }
    const parsed = JSON.parse(raw);
    if (parsed?.version !== CART_VERSION) return [];
    return sanitizeItems(parsed.items);
  } catch {
    return [];
  }
}

export function saveCart(items, storage = globalThis.localStorage) {
  if (!storage) return;
  try {
    storage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({
        version: CART_VERSION,
        items: items.map(({ productId, quantity }) => ({ productId, quantity })),
      }),
    );
  } catch {
    // Storage full or blocked (private mode): the cart keeps working in memory.
  }
}
