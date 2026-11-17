import { useMemo, useState } from 'react';
import { PackageIcon, PlusIcon, TagIcon } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import { useToast } from '../../components/ui/Toast/useToast';
import { CatalogError } from '../catalog/CatalogStatus';
import { useProducts } from '../catalog/hooks/useProducts';
import { useCategories } from '../catalog/hooks/useCategories';
import { useCreateProduct, useDeleteProduct, useUpdateProduct } from './hooks/useAdminProducts';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

function StatCard({ icon: Icon, label, value }) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <span className="rounded-md bg-accent-soft p-3 text-accent">
        <Icon size={22} aria-hidden="true" />
      </span>
      <div>
        <p className="font-display text-2xl font-semibold tabular-nums">{value}</p>
        <p className="text-sm text-ink-muted">{label}</p>
      </div>
    </Card>
  );
}

/**
 * Products tab of the admin panel: stats, list and create / edit form.
 */
export default function ProductsAdmin() {
  const toast = useToast();
  const { data: products = [], isPending, isError, refetch, isFetching } = useProducts();
  const { data: categories = [] } = useCategories();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();
  const [editor, setEditor] = useState(null); // null | { product?: object }

  const stats = useMemo(
    () => ({ total: products.length, offers: products.filter((product) => product.precioPromocional != null).length }),
    [products],
  );

  const categoryIdsFor = (product) =>
    (product?.categorias ?? [])
      .map((name) => categories.find((category) => category.nombre === name)?.id)
      .filter(Boolean);

  const handleSave = async (data) => {
    const mutation = data.id ? updateMutation : createMutation;
    try {
      await mutation.mutateAsync(data);
      toast.success(data.id ? 'Producto actualizado.' : 'Producto creado.');
      setEditor(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteMutation.mutateAsync(productId);
      toast.success('Producto eliminado.');
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  if (isPending) {
    return (
      <div role="status" className="space-y-4">
        <span className="sr-only">Cargando productos...</span>
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }
  if (isError) return <CatalogError onRetry={() => refetch()} isRetrying={isFetching} />;

  if (editor) {
    return (
      <ProductForm
        // Remount once categories arrive so an edited product shows its selected categories.
        key={`${editor.product?.id ?? 'new'}-${categories.length > 0}`}
        product={editor.product}
        categoryIds={categoryIdsFor(editor.product)}
        onSubmit={handleSave}
        onCancel={() => setEditor(null)}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard icon={PackageIcon} label="Productos totales" value={stats.total} />
        <StatCard icon={TagIcon} label="Ofertas activas" value={stats.offers} />
      </div>
      <div className="flex justify-end">
        <Button onClick={() => setEditor({})}>
          <PlusIcon size={18} aria-hidden="true" />
          Nuevo producto
        </Button>
      </div>
      <ProductList
        products={products}
        onEdit={(product) => setEditor({ product })}
        onDelete={handleDelete}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
