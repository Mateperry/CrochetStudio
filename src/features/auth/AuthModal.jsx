import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from './useAuth';
import { MIN_PASSWORD_LENGTH, validateAuthForm } from './validateAuthForm';

const EMPTY_FORM = { displayName: '', email: '', password: '' };

// Official Google "G" logo. These brand hex colors are the only allowed exception to the token rule.
function GoogleLogo() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

/**
 * AuthModal — login / register with email and password, or Google.
 * Field errors appear under each field; server errors appear above the form.
 */
export default function AuthModal({ isOpen, onClose }) {
  const { signIn, signUp, signInWithGoogle, authError, clearError } = useAuth();
  const [mode, setMode] = useState('login');
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(null); // 'form' | 'google' | null
  const [successMessage, setSuccessMessage] = useState('');
  const [unexpectedError, setUnexpectedError] = useState('');

  const isLogin = mode === 'login';

  const reset = () => {
    setValues(EMPTY_FORM);
    setErrors({});
    setSuccessMessage('');
    setUnexpectedError('');
    clearError();
  };

  const handleClose = () => {
    reset();
    setMode('login');
    onClose();
  };

  const switchMode = () => {
    reset();
    setMode(isLogin ? 'register' : 'login');
  };

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearError();
    setUnexpectedError('');
    const nextErrors = validateAuthForm(values, mode);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setPending('form');
    try {
      if (isLogin) {
        const result = await signIn(values.email.trim(), values.password);
        if (result.success) handleClose();
      } else {
        const result = await signUp(values.email.trim(), values.password, values.displayName.trim());
        if (result.success) {
          setValues(EMPTY_FORM);
          setSuccessMessage('¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.');
        }
      }
    } catch {
      setUnexpectedError('Ocurrió un error inesperado. Inténtalo de nuevo.');
    } finally {
      setPending(null);
    }
  };

  const handleGoogle = async () => {
    clearError();
    setUnexpectedError('');
    setPending('google');
    const result = await signInWithGoogle();
    // On success the browser is redirected to Google; only reset the button on failure.
    if (!result?.success) setPending(null);
  };

  const serverError = unexpectedError || authError;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
      description={isLogin ? 'Ingresa a tu cuenta de Crochet Studio' : 'Regístrate para seguir tus pedidos'}
    >
      <div className="space-y-4">
        {successMessage && (
          <p role="status" className="rounded-md bg-success/10 px-4 py-3 text-sm text-success">
            {successMessage}
          </p>
        )}
        {serverError && !successMessage && (
          <p role="alert" className="rounded-md bg-danger/10 px-4 py-3 text-sm text-danger">
            {serverError}
          </p>
        )}

        <Button
          variant="secondary"
          className="w-full"
          onClick={handleGoogle}
          loading={pending === 'google'}
          loadingText="Conectando con Google..."
          disabled={pending === 'form'}
        >
          <GoogleLogo />
          Continuar con Google
        </Button>

        <div className="flex items-center gap-3 text-xs text-ink-muted" aria-hidden="true">
          <span className="h-px flex-1 bg-line" />o<span className="h-px flex-1 bg-line" />
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-3">
          {!isLogin && (
            <Input
              label="Nombre"
              autoComplete="name"
              value={values.displayName}
              onChange={handleChange('displayName')}
              error={errors.displayName}
              required
            />
          )}
          <Input
            label="Correo electrónico"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={handleChange('email')}
            error={errors.email}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            value={values.password}
            onChange={handleChange('password')}
            error={errors.password}
            hint={isLogin ? undefined : `Mínimo ${MIN_PASSWORD_LENGTH} caracteres.`}
            required
          />
          <Button
            type="submit"
            className="w-full"
            loading={pending === 'form'}
            loadingText="Procesando..."
            disabled={pending === 'google'}
          >
            {isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </Button>
        </form>

        <p className="text-center text-sm text-ink-muted">
          {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <button type="button" onClick={switchMode} className="font-semibold text-accent hover:underline">
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </Modal>
  );
}
