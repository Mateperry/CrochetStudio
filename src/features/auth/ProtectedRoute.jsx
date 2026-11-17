import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ShieldAlertIcon } from 'lucide-react';
import { useAuth } from './useAuth';
import { buttonClasses } from '../../components/ui/classes';

/**
 * ProtectedRoute — admin-only routes.
 * - Loading: shows a status message.
 * - No session: asks the parent to open the login modal (in an effect) and redirects home.
 * - Session without admin role: restricted access message.
 * - Admin: renders children.
 */
export default function ProtectedRoute({ children, onRequireAuth }) {
  const { user, isAdmin, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) onRequireAuth?.();
  }, [isLoading, user, onRequireAuth]);

  if (isLoading) {
    return (
      <div role="status" className="flex flex-col items-center justify-center py-24">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" aria-hidden="true" />
        <p className="mt-4 text-sm text-ink-muted">Verificando acceso...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;

  if (!isAdmin) {
    return (
      <section className="flex flex-col items-center py-24 text-center">
        <ShieldAlertIcon size={48} className="text-accent" aria-hidden="true" />
        <h1 className="mt-4 font-display text-2xl font-semibold">Acceso restringido</h1>
        <p className="mt-2 text-ink-muted">No tienes permisos para acceder a esta sección.</p>
        <Link to="/" className={buttonClasses({ className: 'mt-8' })}>
          Volver al inicio
        </Link>
      </section>
    );
  }

  return children;
}
