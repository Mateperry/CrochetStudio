import { describe, expect, it } from 'vitest';
import { cartReducer, clampQuantity, initialCartState, MAX_QUANTITY } from './cartReducer';

describe('cartReducer', () => {
  it('agrega un producto nuevo con cantidad 1 por defecto', () => {
    expect(cartReducer(initialCartState, { type: 'add', productId: 1 })).toEqual([{ productId: 1, quantity: 1 }]);
  });

  it('agregar un producto repetido suma la cantidad', () => {
    const state = [{ productId: 1, quantity: 2 }];
    expect(cartReducer(state, { type: 'add', productId: 1, quantity: 3 })).toEqual([{ productId: 1, quantity: 5 }]);
  });

  it('no pasa de 10 unidades al sumar', () => {
    const state = [{ productId: 1, quantity: 9 }];
    expect(cartReducer(state, { type: 'add', productId: 1, quantity: 5 })).toEqual([{ productId: 1, quantity: MAX_QUANTITY }]);
  });

  it('limita updateQuantity entre 1 y 10', () => {
    const state = [{ productId: 1, quantity: 3 }];
    expect(cartReducer(state, { type: 'updateQuantity', productId: 1, quantity: 0 })[0].quantity).toBe(1);
    expect(cartReducer(state, { type: 'updateQuantity', productId: 1, quantity: 99 })[0].quantity).toBe(10);
  });

  it('ignora ids inválidos', () => {
    expect(cartReducer(initialCartState, { type: 'add', productId: 'abc' })).toBe(initialCartState);
    expect(cartReducer(initialCartState, { type: 'add', productId: -1 })).toBe(initialCartState);
  });

  it('quita un producto por id', () => {
    const state = [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 2 },
    ];
    expect(cartReducer(state, { type: 'remove', productId: 1 })).toEqual([{ productId: 2, quantity: 2 }]);
  });

  it('quita varios productos con removeMany', () => {
    const state = [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 2 },
      { productId: 3, quantity: 1 },
    ];
    expect(cartReducer(state, { type: 'removeMany', productIds: [1, 3] })).toEqual([{ productId: 2, quantity: 2 }]);
  });

  it('limpia el carrito', () => {
    expect(cartReducer([{ productId: 1, quantity: 1 }], { type: 'clear' })).toEqual([]);
  });

  it('no muta el estado anterior', () => {
    const state = Object.freeze([Object.freeze({ productId: 1, quantity: 1 })]);
    expect(() => cartReducer(state, { type: 'add', productId: 1 })).not.toThrow();
    expect(state[0].quantity).toBe(1);
  });

  it('clampQuantity maneja valores no numéricos', () => {
    expect(clampQuantity('x')).toBe(1);
    expect(clampQuantity(3.7)).toBe(3);
  });
});
