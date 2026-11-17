import { formatPrice } from '../../../lib/formatPrice';

/**
 * Plain-text order summary used by payment methods (e.g. the WhatsApp message).
 * `order`: { id, customerName, phone, city, address, notes, lines: [{ name, quantity, unitPrice }], total }.
 */
export function buildOrderSummary(order) {
  const lines = order.lines.map(
    (line) => `• ${line.quantity} x ${line.name} — ${formatPrice(line.unitPrice * line.quantity)}`,
  );

  return [
    `Hola, acabo de hacer el pedido #${order.id} en Crochet Studio.`,
    '',
    ...lines,
    '',
    `Total estimado: ${formatPrice(order.total)}`,
    '',
    `Nombre: ${order.customerName}`,
    `Teléfono: ${order.phone}`,
    `Ciudad: ${order.city}`,
    `Dirección: ${order.address}`,
    ...(order.notes ? [`Notas: ${order.notes}`] : []),
  ].join('\n');
}
