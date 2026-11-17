export const SITE_NAME = 'Crochet Studio';
export const DEFAULT_DESCRIPTION =
  'Amigurumis tejidos a mano, uno por uno: anime, películas, series, animales y diseños personalizados.';

export function buildPageTitle(title) {
  return title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} · Amigurumis tejidos a mano`;
}

/** Shortens a description to ~155 characters for meta tags, cutting at a word boundary. */
export function toMetaDescription(text, maxLength = 155) {
  const clean = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength) return clean;
  const cut = clean.slice(0, maxLength - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), 0)) || cut}…`;
}
