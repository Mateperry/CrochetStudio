/**
 * Single source of truth for the storefront categories.
 * - slug: stable identifier used in URLs.
 * - dbName: name as returned by useProducts (the DB stores "Promocion",
 *   which useProducts already maps to "Ofertas").
 * - title: label shown to the user.
 * - path: route of the category page.
 */
export const CATEGORIES = [
  { slug: 'novedades', dbName: 'Novedades', title: 'Novedades', path: '/novedades' },
  { slug: 'ofertas', dbName: 'Ofertas', title: 'Ofertas', path: '/ofertas' },
  { slug: 'anime', dbName: 'Anime', title: 'Anime', path: '/animes' },
  { slug: 'peliculas', dbName: 'Películas', title: 'Películas', path: '/peliculas' },
  { slug: 'series', dbName: 'Series', title: 'Series', path: '/series' },
  { slug: 'fantasia', dbName: 'Fantasía', title: 'Fantasía', path: '/fantasia' },
  { slug: 'animales', dbName: 'Animales', title: 'Animales', path: '/animales' },
  { slug: 'personalizados', dbName: 'Personalizados', title: 'Personalizados', path: '/personalizados' },
];

export const OFFERS_SLUG = 'ofertas';

export function getCategoryBySlug(slug) {
  return CATEGORIES.find((category) => category.slug === slug) ?? null;
}

/**
 * Returns the products that belong to a category.
 * Offers include products with a promotional price or tagged "Ofertas".
 */
export function filterProductsByCategory(products, category) {
  if (!Array.isArray(products) || !category) return [];

  return products.filter((product) => {
    const categories = product.categorias ?? [];
    if (category.slug === OFFERS_SLUG) {
      return product.precioPromocional != null || categories.includes(category.dbName);
    }
    return categories.includes(category.dbName);
  });
}
