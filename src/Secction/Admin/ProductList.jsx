import { useState } from 'react';
import { EditIcon, TrashIcon, SearchIcon, AlertTriangleIcon } from 'lucide-react';

/**
 * ProductList — Admin product management table.
 * Responsibilities:
 *   - Display all products in a searchable table.
 *   - Actions: Edit and Delete (with confirmation).
 *   - Responsive: card layout on mobile, table on desktop.
 */
export default function ProductList({ products, onEdit, onDelete, isDeleting }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filteredProducts = products.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (product) => {
    setDeleteConfirm(product);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm) {
      onDelete(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          id="admin-product-search"
          type="text"
          placeholder="Buscar producto por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#71675d] focus:outline-none transition-colors"
        />
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500">
        {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
      </p>

      {/* Product list */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No se encontraron productos.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {product.imagenes && product.imagenes[0] ? (
                  <img
                    src={product.imagenes[0]}
                    alt={product.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                    Sin img
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#272321] truncate">{product.nombre}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm font-bold text-[#272321]">
                    ${product.precio?.toLocaleString()}
                  </span>
                  {product.precioPromocional && (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
                      Promo: ${product.precioPromocional.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {product.categorias?.slice(0, 3).map((cat, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                  {product.categorias?.length > 3 && (
                    <span className="text-xs text-gray-400">
                      +{product.categorias.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 self-end sm:self-center">
                <button
                  onClick={() => onEdit(product)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-[#71675d] hover:bg-[#71675d] hover:text-white border border-[#71675d] rounded-lg transition-colors"
                  aria-label={`Editar ${product.nombre}`}
                >
                  <EditIcon size={14} />
                  <span className="hidden sm:inline">Editar</span>
                </button>
                <button
                  onClick={() => handleDeleteClick(product)}
                  disabled={isDeleting}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-red-500 hover:bg-red-500 hover:text-white border border-red-300 rounded-lg transition-colors disabled:opacity-50"
                  aria-label={`Eliminar ${product.nombre}`}
                >
                  <TrashIcon size={14} />
                  <span className="hidden sm:inline">Eliminar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <>
          <div className="fixed inset-0 bg-black/40 z-[80]" onClick={handleCancelDelete} />
          <div className="fixed inset-0 flex items-center justify-center z-[90] p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
              <AlertTriangleIcon className="mx-auto text-red-500 mb-3" size={48} />
              <h3 className="text-lg font-bold text-[#272321] mb-2">¿Eliminar producto?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Vas a eliminar <strong>{deleteConfirm.nombre}</strong>. Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Eliminando...' : 'Sí, eliminar'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
