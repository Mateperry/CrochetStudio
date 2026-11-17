import { useState, useMemo } from 'react';
import { PlusIcon, PackageIcon, TagIcon, LogOutIcon } from 'lucide-react';
import { useProducts } from '../../features/catalog/hooks/useProducts';
import { useAuth } from '../../features/auth/useAuth';
import { useCategories } from '../../features/catalog/hooks/useCategories';
import {
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from '../../features/admin/hooks/useAdminProducts';
import ProductList from '../../features/admin/ProductList';
import ProductForm from '../../features/admin/ProductForm';

/**
 * AdminDashboard — Main admin panel entry point.
 * Responsibilities:
 *   - Display quick stats (total products, active offers).
 *   - Render ProductList and ProductForm.
 *   - Orchestrate CRUD operations.
 */
export default function AdminDashboardPage() {
  const { userProfile, signOut } = useAuth();
  const { data: products = [], isLoading, error, refetch } = useProducts();
  const { data: allCategories = [] } = useCategories();

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const [view, setView] = useState('list'); // 'list' | 'create' | 'edit'
  const [editingProduct, setEditingProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // --- Stats ---
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const activeOffers = products.filter((p) => p.precioPromocional).length;
    return { totalProducts, activeOffers };
  }, [products]);

  // --- Helpers to map category names to IDs for editing ---
  const enrichProductForEdit = (product) => {
    const categoryIds = [];
    if (product.categorias && allCategories.length > 0) {
      product.categorias.forEach((catName) => {
        const found = allCategories.find((c) => c.nombre === catName);
        if (found) categoryIds.push(found.id);
      });
    }
    return { ...product, categoryIds };
  };

  // --- Handlers ---
  const handleCreate = async (data) => {
    try {
      await createMutation.mutateAsync(data);
      setSuccessMessage('✅ Producto creado exitosamente.');
      setView('list');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error('Create error:', err);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateMutation.mutateAsync(data);
      setSuccessMessage('✅ Producto actualizado exitosamente.');
      setView('list');
      setEditingProduct(null);
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteMutation.mutateAsync(productId);
      setSuccessMessage('✅ Producto eliminado exitosamente.');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(enrichProductForEdit(product));
    setView('edit');
  };

  const handleCancel = () => {
    setView('list');
    setEditingProduct(null);
  };

  // --- Loading state ---
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#71675d]"></div>
        <p className="mt-4 text-[#71675d] font-medium animate-pulse">
          Cargando panel de administración...
        </p>
      </div>
    );
  }

  // --- Error state ---
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-50 p-4 text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-red-700 mb-2">Error al cargar productos</h2>
        <p className="text-red-600 mb-4">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#272321]">Panel de Administración</h1>
          <p className="text-gray-500 text-sm mt-1">
            Bienvenido/a, {userProfile?.display_name || 'Administrador'}
          </p>
        </div>

        <div className="flex gap-2">
          {view === 'list' && (
            <button
              onClick={() => setView('create')}
              className="flex items-center gap-2 px-4 py-2 bg-[#71675d] hover:bg-[#5a5148] text-white font-semibold rounded-xl transition-colors"
            >
              <PlusIcon size={18} />
              Nuevo producto
            </button>
          )}
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-red-500 border border-gray-200 rounded-xl transition-colors"
            title="Cerrar sesión"
          >
            <LogOutIcon size={18} />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium">
          {successMessage}
        </div>
      )}

      {/* Mutation error */}
      {(createMutation.error || updateMutation.error || deleteMutation.error) && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {createMutation.error?.message || updateMutation.error?.message || deleteMutation.error?.message}
        </div>
      )}

      {/* Stats */}
      {view === 'list' && (
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
            <div className="bg-[#71675d]/10 p-3 rounded-xl">
              <PackageIcon className="text-[#71675d]" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#272321]">{stats.totalProducts}</p>
              <p className="text-sm text-gray-500">Productos totales</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
            <div className="bg-green-50 p-3 rounded-xl">
              <TagIcon className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#272321]">{stats.activeOffers}</p>
              <p className="text-sm text-gray-500">Ofertas activas</p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {view === 'list' && (
        <ProductList
          products={products}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}

      {view === 'create' && (
        <ProductForm
          onSubmit={handleCreate}
          onCancel={handleCancel}
          isSubmitting={createMutation.isPending}
        />
      )}

      {view === 'edit' && editingProduct && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleUpdate}
          onCancel={handleCancel}
          isSubmitting={updateMutation.isPending}
        />
      )}
    </div>
  );
}
