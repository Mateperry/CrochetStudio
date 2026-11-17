const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

/**
 * Formats a price in Colombian pesos, e.g. 42000 -> "$ 42.000".
 * Invalid values render as "$ 0" instead of "NaN".
 */
export function formatPrice(value) {
  const number = Number(value);
  return formatter.format(Number.isFinite(number) ? number : 0);
}
