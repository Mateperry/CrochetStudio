import { useState } from 'react';
import { useAuth } from '../../features/auth/useAuth';
import ProductsAdmin from '../../features/admin/ProductsAdmin';
import OrdersAdmin from '../../features/admin/orders/OrdersAdmin';
import { cn } from '../../lib/cn';
import PageMeta from '../../components/layout/PageMeta';

const TABS = [
  { id: 'products', label: 'Productos', Component: ProductsAdmin },
  { id: 'orders', label: 'Pedidos', Component: OrdersAdmin },
];

/**
 * Admin panel entry point (route protected by ProtectedRoute).
 */
export default function AdminDashboardPage() {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const ActivePanel = TABS.find((tab) => tab.id === activeTab).Component;

  const handleKeyDown = (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const index = TABS.findIndex((tab) => tab.id === activeTab);
    const next = TABS[(index + (event.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length];
    setActiveTab(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <div className="space-y-6">
      <PageMeta title="Panel admin" />
      <header>
        <h1 className="font-display text-3xl font-semibold md:text-4xl">Panel de administración</h1>
        <p className="mt-1 text-sm text-ink-muted">Hola, {userProfile?.display_name || 'administrador'}.</p>
      </header>

      <div role="tablist" aria-label="Secciones del panel" className="flex gap-2 border-b border-line">
        {TABS.map((tab) => {
          const selected = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={handleKeyDown}
              className={cn(
                '-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors',
                selected ? 'border-accent text-accent' : 'border-transparent text-ink-muted hover:text-ink',
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        <ActivePanel />
      </div>
    </div>
  );
}
