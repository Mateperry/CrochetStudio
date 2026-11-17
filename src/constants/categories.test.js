import { describe, expect, it } from 'vitest';
import { filterProductsByCategory, getCategoryBySlug } from './categories';
import { getSubcategories, sortProducts } from '../features/catalog/catalogFilters';

const products = [
  { id: 1, precio: 40000, precioPromocional: null, categorias: ['Películas', 'Disney'] },
  { id: 2, precio: 50000, precioPromocional: 45000, categorias: ['Fantasía'] },
  { id: 3, precio: 30000, precioPromocional: null, categorias: ['Ofertas', 'Animales'] },
  { id: 4, precio: 20000, precioPromocional: null, categorias: ['Anime', 'Pokémon'] },
];

describe('filterProductsByCategory', () => {
  it('encuentra Películas y Fantasía con tilde', () => {
    expect(filterProductsByCategory(products, getCategoryBySlug('peliculas')).map((p) => p.id)).toEqual([1]);
    expect(filterProductsByCategory(products, getCategoryBySlug('fantasia')).map((p) => p.id)).toEqual([2]);
  });

  it('Ofertas incluye precio promocional o la categoría Ofertas', () => {
    expect(filterProductsByCategory(products, getCategoryBySlug('ofertas')).map((p) => p.id)).toEqual([2, 3]);
  });

  it('slug desconocido no devuelve categoría', () => {
    expect(getCategoryBySlug('no-existe')).toBeNull();
    expect(filterProductsByCategory(products, null)).toEqual([]);
  });

  it('tolera productos sin categorías o una lista nula', () => {
    expect(filterProductsByCategory([{ id: 9 }], getCategoryBySlug('anime'))).toEqual([]);
    expect(filterProductsByCategory(undefined, getCategoryBySlug('anime'))).toEqual([]);
  });
});

describe('catalogFilters', () => {
  it('lista subcategorías sin las 8 principales', () => {
    expect(getSubcategories(products)).toEqual(['Disney', 'Pokémon']);
  });

  it('ordena por precio efectivo', () => {
    expect(sortProducts(products, 'price-asc').map((p) => p.id)).toEqual([4, 3, 1, 2]);
    expect(sortProducts(products, 'price-desc').map((p) => p.id)).toEqual([2, 1, 3, 4]);
    expect(sortProducts(products, 'featured').map((p) => p.id)).toEqual([1, 2, 3, 4]);
  });
});
