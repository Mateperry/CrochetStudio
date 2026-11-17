import { CATEGORIES } from '../../constants/categories';
import { getUnitPrice } from '../../lib/pricing';

const TOP_LEVEL_NAMES = new Set(CATEGORIES.map((category) => category.dbName));

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Destacados' },
  { value: 'price-asc', label: 'Precio menor' },
  { value: 'price-desc', label: 'Precio mayor' },
];

/**
 * Sub-categories present in a list of products (e.g. "Pokémon", "Naruto"), excluding the
 * 8 storefront categories. Sorted alphabetically in Spanish.
 */
export function getSubcategories(products) {
  const names = new Set();
  (products ?? []).forEach((product) =>
    (product.categorias ?? []).forEach((name) => {
      if (name && !TOP_LEVEL_NAMES.has(name)) names.add(name);
    }),
  );
  return [...names].sort((a, b) => a.localeCompare(b, 'es'));
}

export function filterBySubcategory(products, subcategory) {
  if (!subcategory) return products;
  return products.filter((product) => (product.categorias ?? []).includes(subcategory));
}

export function sortProducts(products, sort) {
  const copy = [...products];
  if (sort === 'price-asc') return copy.sort((a, b) => getUnitPrice(a) - getUnitPrice(b));
  if (sort === 'price-desc') return copy.sort((a, b) => getUnitPrice(b) - getUnitPrice(a));
  return copy;
}
