import { useAuth } from '../../features/auth/useAuth';
import ProductsAdmin from '../../features/admin/ProductsAdmin';

/**
 * Admin panel entry point (route protected by ProtectedRoute).
 */
export default function AdminDashboardPage() {
  const { userProfile } = useAuth();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold md:text-4xl">Panel de administración</h1>
        <p className="mt-1 text-sm text-ink-muted">Hola, {userProfile?.display_name || 'administrador'}.</p>
      </header>
      <ProductsAdmin />
    </div>
  );
}
