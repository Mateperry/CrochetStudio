import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * ProtectedRoute — Wrapper for admin-only routes.
 * Responsibilities:
 *   - Show loading spinner while auth state is resolving.
 *   - If no session → trigger login modal via onRequireAuth callback.
 *   - If session but not admin → redirect to home.
 *   - If admin → render children.
 */
export default function ProtectedRoute({ children, onRequireAuth }) {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#71675d]"></div>
        <p className="mt-4 text-[#71675d] font-medium animate-pulse">
          Verificando acceso...
        </p>
      </div>
    );
  }

  if (!user) {
    // Trigger login modal and redirect to home
    if (onRequireAuth) {
      onRequireAuth();
    }
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-yellow-50 p-4 text-center">
        <div className="text-yellow-500 text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-yellow-700 mb-2">
          Acceso restringido
        </h2>
        <p className="text-yellow-600 mb-4">
          No tienes permisos para acceder a esta sección.
        </p>
        <a
          href="/"
          className="px-6 py-2 bg-[#71675d] text-white rounded-full hover:bg-[#5a5148] transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    );
  }

  return children;
}
