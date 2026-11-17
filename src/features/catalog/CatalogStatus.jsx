import Button from '../../components/ui/Button';

/**
 * Generic loading state with an accessible status message.
 */
export function CatalogLoading({ label = 'Cargando productos...' }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center py-24">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" aria-hidden="true" />
      <p className="mt-4 text-sm text-ink-muted">{label}</p>
    </div>
  );
}

/**
 * Error state for pages that depend on the product catalog. "Reintentar" calls refetch().
 */
export function CatalogError({ onRetry, isRetrying = false }) {
  return (
    <div role="alert" className="rounded-lg border border-line bg-surface px-6 py-16 text-center">
      <h2 className="font-display text-2xl font-semibold">No pudimos cargar los productos</h2>
      <p className="mt-2 text-ink-muted">Revisa tu conexión e inténtalo de nuevo.</p>
      <Button className="mt-6" onClick={onRetry} loading={isRetrying} loadingText="Reintentando...">
        Reintentar
      </Button>
    </div>
  );
}
