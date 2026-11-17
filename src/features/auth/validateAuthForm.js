const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 6;

/**
 * Validates the login / register form. Returns a map of field -> message (empty when valid).
 */
export function validateAuthForm(values, mode) {
  const errors = {};
  if (mode === 'register' && !values.displayName.trim()) errors.displayName = 'Por favor ingresa tu nombre.';
  if (!values.email.trim()) errors.email = 'Por favor ingresa tu correo electrónico.';
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'El formato del correo no es válido.';
  if (!values.password) errors.password = 'Por favor ingresa tu contraseña.';
  else if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }
  return errors;
}
