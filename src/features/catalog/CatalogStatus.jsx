/**
 * Loading and error states for pages that depend on the product catalog.
 */
export function CatalogLoading({ label = 'Cargando productos...' }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center py-24">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#71675d]" aria-hidden="true"></div>
      <p className="mt-4 text-[#272321]">{label}</p>
    </div>
  );
}

export function CatalogError({ onRetry, isRetrying = false }) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center py-24 text-center">
      <h2 className="text-2xl font-bold text-[#272321] mb-2">No pudimos cargar los productos</h2>
      <p className="text-[#272321] mb-4">Revisa tu conexión e inténtalo de nuevo.</p>
      <button
        type="button"
        onClick={onRetry}
        disabled={isRetrying}
        className="px-6 py-2 bg-[#71675d] text-white rounded-full hover:bg-[#5a5148] transition-colors disabled:opacity-60"
      >
        {isRetrying ? 'Reintentando...' : 'Reintentar'}
      </button>
    </div>
  );
}
