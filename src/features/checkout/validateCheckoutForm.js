const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MAX_NOTES_LENGTH = 1000;

/** Keeps only digits: "300 123 4567" -> "3001234567". */
export function normalizePhone(value) {
  return String(value ?? '').replace(/\D/g, '');
}

/**
 * Validates the checkout form (same rules as create_order in the database).
 * Colombian phone numbers have 10 digits (mobile 3xx and landline 60x).
 */
export function validateCheckoutForm(values) {
  const errors = {};
  if (values.customerName.trim().length < 2) errors.customerName = 'Escribe tu nombre completo.';
  if (!values.email.trim()) errors.email = 'Escribe tu correo electrónico.';
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'El formato del correo no es válido.';
  if (!/^\d{10}$/.test(normalizePhone(values.phone))) errors.phone = 'El teléfono debe tener 10 dígitos, por ejemplo 3001234567.';
  if (!values.city.trim()) errors.city = 'Escribe tu ciudad.';
  if (values.address.trim().length < 5) errors.address = 'Escribe la dirección de entrega.';
  if (values.notes.length > MAX_NOTES_LENGTH) errors.notes = `Las notas no pueden pasar de ${MAX_NOTES_LENGTH} caracteres.`;
  return errors;
}

export function toOrderPayload(values, cartItems) {
  return {
    customer_name: values.customerName.trim(),
    email: values.email.trim(),
    phone: normalizePhone(values.phone),
    city: values.city.trim(),
    address: values.address.trim(),
    notes: values.notes.trim() || null,
    // Only ids and quantities: the database sets the prices.
    items: cartItems.map(({ productId, quantity }) => ({ product_id: productId, quantity })),
  };
}
