const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MAX_MESSAGE_LENGTH = 2000;

/**
 * Validates the contact form. Returns a map of field -> message (empty when valid).
 */
export function validateContactForm({ name = '', email = '', message = '' }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Escribe tu nombre.';
  if (!email.trim()) errors.email = 'Escribe tu correo electrónico.';
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'El formato del correo no es válido.';
  if (message.trim().length < 10) errors.message = 'Cuéntanos un poco más (mínimo 10 caracteres).';
  else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `El mensaje no puede pasar de ${MAX_MESSAGE_LENGTH} caracteres.`;
  }
  return errors;
}
