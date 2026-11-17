/**
 * Pure cart reducer. State is a list of { productId, quantity }.
 * Prices, names and images are never stored here: they are resolved from the catalog.
 */
export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 10;

export const initialCartState = [];

export function clampQuantity(value) {
  const number = Math.trunc(Number(value));
  if (!Number.isFinite(number)) return MIN_QUANTITY;
  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, number));
}

function isValidProductId(productId) {
  return Number.isInteger(productId) && productId > 0;
}

export function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { productId } = action;
      if (!isValidProductId(productId)) return state;
      const quantity = clampQuantity(action.quantity ?? 1);
      const existing = state.find((item) => item.productId === productId);
      if (existing) {
        return state.map((item) =>
          item.productId === productId
            ? { ...item, quantity: clampQuantity(item.quantity + quantity) }
            : item,
        );
      }
      return [...state, { productId, quantity }];
    }

    case 'updateQuantity': {
      const { productId } = action;
      if (!state.some((item) => item.productId === productId)) return state;
      const quantity = clampQuantity(action.quantity);
      return state.map((item) => (item.productId === productId ? { ...item, quantity } : item));
    }

    case 'remove':
      return state.filter((item) => item.productId !== action.productId);

    case 'removeMany': {
      const ids = new Set(action.productIds ?? []);
      if (ids.size === 0) return state;
      return state.filter((item) => !ids.has(item.productId));
    }

    case 'clear':
      return initialCartState;

    default:
      return state;
  }
}
