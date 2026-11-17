/**
 * Single source of truth for the storefront categories.
 * - slug: stable identifier used in the URL (/categoria/:slug).
 * - dbName: name as returned by useProducts (the DB stores "Promocion",
 *   which useProducts already maps to "Ofertas").
 * - title: label shown to the user.
 * - path: route of the category page.
 * - legacyPath: old route, kept as a redirect so shared links keep working.
 */
const categoryPath = (slug) => `/categoria/${slug}`;

export const CATEGORIES = [
  { slug: 'novedades', dbName: 'Novedades', title: 'Novedades', legacyPath: '/novedades' },
  { slug: 'ofertas', dbName: 'Ofertas', title: 'Ofertas', legacyPath: '/ofertas' },
  { slug: 'anime', dbName: 'Anime', title: 'Anime', legacyPath: '/animes' },
  { slug: 'peliculas', dbName: 'Películas', title: 'Películas', legacyPath: '/peliculas' },
  { slug: 'series', dbName: 'Series', title: 'Series', legacyPath: '/series' },
  { slug: 'fantasia', dbName: 'Fantasía', title: 'Fantasía', legacyPath: '/fantasia' },
  { slug: 'animales', dbName: 'Animales', title: 'Animales', legacyPath: '/animales' },
  { slug: 'personalizados', dbName: 'Personalizados', title: 'Personalizados', legacyPath: '/personalizados' },
].map((category) => ({ ...category, path: categoryPath(category.slug) }));

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
