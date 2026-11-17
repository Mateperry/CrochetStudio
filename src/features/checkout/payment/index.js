import { whatsappPayment } from './whatsappPayment';

/**
 * Payment methods. Each one implements:
 *   { id, label, description, isAvailable(): boolean, getUrl(order): string|null, start(order): boolean }
 * To add a gateway (Wompi, Mercado Pago, ePayco), create a file with that shape and add it here.
 */
export const PAYMENT_METHODS = [whatsappPayment];

export function getDefaultPaymentMethod() {
  return PAYMENT_METHODS.find((method) => method.isAvailable()) ?? null;
}
