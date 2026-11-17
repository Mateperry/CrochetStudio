import { describe, expect, it } from 'vitest';
import { CART_STORAGE_KEY, LEGACY_CART_STORAGE_KEY, loadCart, saveCart } from './cartStorage';

describe('cartStorage', () => {
  it('devuelve un carrito vacío si no hay nada guardado', () => {
    expect(loadCart(localStorage)).toEqual([]);
  });

  it('guarda solo productId y quantity', () => {
    saveCart([{ productId: 1, quantity: 2, product: { precio: 999 } }], localStorage);
    expect(JSON.parse(localStorage.getItem(CART_STORAGE_KEY))).toEqual({
      version: 1,
      items: [{ productId: 1, quantity: 2 }],
    });
  });

  it('lee lo que guardó', () => {
    saveCart([{ productId: 4, quantity: 3 }], localStorage);
    expect(loadCart(localStorage)).toEqual([{ productId: 4, quantity: 3 }]);
  });

  it('JSON corrupto -> carrito vacío', () => {
    localStorage.setItem(CART_STORAGE_KEY, '{no es json');
    expect(loadCart(localStorage)).toEqual([]);
  });

  it('versión distinta -> carrito vacío', () => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ version: 99, items: [{ productId: 1, quantity: 1 }] }));
    expect(loadCart(localStorage)).toEqual([]);
  });

  it('descarta ítems inválidos y limita cantidades', () => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({ version: 1, items: [{ productId: 'x', quantity: 1 }, { productId: 2, quantity: 50 }] }),
    );
    expect(loadCart(localStorage)).toEqual([{ productId: 2, quantity: 10 }]);
  });

  it('migra la clave vieja "carrito" una sola vez', () => {
    localStorage.setItem(
      LEGACY_CART_STORAGE_KEY,
      JSON.stringify([
        { id: 1, nombre: 'Pikachu', precio: 42000, cantidad: 2 },
        { id: 3, nombre: 'Bulbasaur', precio: 43000, cantidad: 1 },
      ]),
    );

    expect(loadCart(localStorage)).toEqual([
      { productId: 1, quantity: 2 },
      { productId: 3, quantity: 1 },
    ]);
    expect(localStorage.getItem(LEGACY_CART_STORAGE_KEY)).toBeNull();
    expect(JSON.parse(localStorage.getItem(CART_STORAGE_KEY)).items).toHaveLength(2);
  });

  it('una clave vieja corrupta se descarta', () => {
    localStorage.setItem(LEGACY_CART_STORAGE_KEY, 'basura');
    expect(loadCart(localStorage)).toEqual([]);
    expect(localStorage.getItem(LEGACY_CART_STORAGE_KEY)).toBeNull();
  });
});
