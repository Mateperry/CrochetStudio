import { useMemo, useState } from 'react';
import { PencilIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { formatPrice } from '../../lib/formatPrice';
import { useMediaQuery } from '../../lib/useMediaQuery';

const MAX_BADGES = 3;

function normalize(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function CategoryBadges({ categories = [] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {categories.slice(0, MAX_BADGES).map((name) => (
        <Badge key={name}>{name}</Badge>
      ))}
      {categories.length > MAX_BADGES && <Badge>+{categories.length - MAX_BADGES}</Badge>}
    </div>
  );
}

function Thumbnail({ product }) {
  return (
    <div className="h-14 w-12 shrink-0 overflow-hidden rounded-md bg-surface-muted">
      {product.imagenes?.[0] && <img src={product.imagenes[0]} alt="" loading="lazy" className="h-full w-full object-cover" />}
    </div>
  );
}

function PriceCell({ product }) {
  return (
    <div className="text-sm">
      <p className="font-semibold tabular-nums">{formatPrice(product.precio)}</p>
      {product.precioPromocional != null && (
        <p className="text-xs text-success tabular-nums">Promo {formatPrice(product.precioPromocional)}</p>
      )}
    </div>
  );
}

function RowActions({ product, onEdit, onDelete }) {
  return (
    <div className="flex gap-2">
      <Button variant="secondary" size="sm" onClick={() => onEdit(product)} aria-label={`Editar ${product.nombre}`}>
        <PencilIcon size={14} aria-hidden="true" />
        <span className="hidden sm:inline">Editar</span>
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onDelete(product)} aria-label={`Eliminar ${product.nombre}`}>
        <Trash2Icon size={14} aria-hidden="true" className="text-danger" />
      </Button>
    </div>
  );
}

/**
 * ProductList — searchable list: table on desktop, cards on mobile; delete asks for confirmation in a Modal.
 */
export default function ProductList({ products, onEdit, onDelete, isDeleting }) {
  const [search, setSearch] = useState('');
  const [toDelete, setToDelete] = useState(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const filtered = useMemo(() => {
    const term = normalize(search.trim());
    if (!term) return products;
    return products.filter(
      (product) => normalize(product.nombre).includes(term) || product.categorias?.some((name) => normalize(name).includes(term)),
    );
  }, [products, search]);

  const confirmDelete = async () => {
    if (!toDelete) return;
    const ok = await onDelete(toDelete.id);
    if (ok !== false) setToDelete(null);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <SearchIcon size={18} className="pointer-events-none absolute left-3 top-[2.65rem] text-ink-muted" aria-hidden="true" />
        <Input
          label="Buscar producto"
          type="search"
          placeholder="Nombre o categoría"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="pl-10"
        />
      </div>
      <p className="text-sm text-ink-muted" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
      </p>

      {filtered.length === 0 ? (
        <Card className="px-6 py-12 text-center text-ink-muted">No se encontraron productos.</Card>
      ) : isDesktop ? (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-muted text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Producto</th>
                <th scope="col" className="px-4 py-3 font-semibold">Precio</th>
                <th scope="col" className="px-4 py-3 font-semibold">Categorías</th>
                <th scope="col" className="px-4 py-3 font-semibold"><span className="sr-only">Acciones</span></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-t border-line">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Thumbnail product={product} />
                      <span className="font-medium">{product.nombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><PriceCell product={product} /></td>
                  <td className="px-4 py-3"><CategoryBadges categories={product.categorias} /></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <RowActions product={product} onEdit={onEdit} onDelete={setToDelete} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : (
        <ul className="space-y-3">
          {filtered.map((product) => (
            <li key={product.id}>
              <Card className="flex gap-3 p-3">
                <Thumbnail product={product} />
                <div className="min-w-0 flex-1 space-y-2">
                  <p className="truncate font-medium">{product.nombre}</p>
                  <PriceCell product={product} />
                  <CategoryBadges categories={product.categorias} />
                </div>
                <RowActions product={product} onEdit={onEdit} onDelete={setToDelete} />
              </Card>
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={Boolean(toDelete)}
        onClose={() => !isDeleting && setToDelete(null)}
        title="¿Eliminar producto?"
        description={toDelete ? `Vas a eliminar "${toDelete.nombre}". Esta acción no se puede deshacer.` : undefined}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setToDelete(null)} disabled={isDeleting}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete} loading={isDeleting} loadingText="Eliminando...">
              Sí, eliminar
            </Button>
          </div>
        }
      >
        <p className="text-sm text-ink-muted">También se eliminan sus imágenes y categorías asociadas.</p>
      </Modal>
    </div>
  );
}
