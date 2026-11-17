import { buildOrderSummary } from './orderSummary';
import { buildWhatsAppUrl, getWhatsAppNumber } from '../../../lib/whatsapp';

/**
 * "Pago por WhatsApp": opens a chat with the store with the order summary.
 * Payment and shipping are then arranged by hand.
 */
export const whatsappPayment = {
  id: 'whatsapp',
  label: 'Coordinar pago por WhatsApp',
  description: 'Te abrimos WhatsApp con el resumen del pedido para acordar el pago y el envío.',
  isAvailable: () => Boolean(getWhatsAppNumber()),
  getUrl(order) {
    const number = getWhatsAppNumber();
    return number ? buildWhatsAppUrl(number, buildOrderSummary(order)) : null;
  },
  start(order) {
    const url = this.getUrl(order);
    if (!url) return false;
    window.open(url, '_blank', 'noopener,noreferrer');
    return true;
  },
};
