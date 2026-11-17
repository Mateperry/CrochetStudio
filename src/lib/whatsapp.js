/**
 * WhatsApp helpers. The number comes from VITE_WHATSAPP_NUMBER in international format
 * without "+" or spaces (e.g. 573001234567).
 */
export function getWhatsAppNumber() {
  const raw = import.meta.env.VITE_WHATSAPP_NUMBER ?? '';
  const digits = String(raw).replace(/\D/g, '');
  return digits.length >= 8 ? digits : null;
}

export function buildWhatsAppUrl(number, text = '') {
  const base = `https://wa.me/${number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
