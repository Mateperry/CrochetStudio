import { useMemo, useState } from 'react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Modal from '../../../components/ui/Modal';
import Skeleton from '../../../components/ui/Skeleton';
import { useToast } from '../../../components/ui/Toast/useToast';
import { formatPrice } from '../../../lib/formatPrice';
import { ORDER_STATUSES, getOrderStatus } from './orderStatus';
import { useAdminOrders, useUpdateOrderStatus } from './useAdminOrders';

const dateFormatter = new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short' });

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : dateFormatter.format(date);
}

function OrderDetail({ order, onClose }) {
  const toast = useToast();
  const updateStatus = useUpdateOrderStatus();
  const [status, setStatus] = useState(order.status);

  const save = async () => {
    try {
      await updateStatus.mutateAsync({ id: order.id, status });
      toast.success(`Pedido #${order.id}: ${getOrderStatus(status).label.toLowerCase()}.`);
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={`Pedido #${order.id}`}
      description={formatDate(order.createdAt)}
      footer={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <Select label="Estado" value={status} onChange={(event) => setStatus(event.target.value)} fieldClassName="sm:w-48">
            {ORDER_STATUSES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Button onClick={save} loading={updateStatus.isPending} loadingText="Guardando..." disabled={status === order.status}>
            Guardar estado
          </Button>
        </div>
      }
    >
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
        <dt className="text-ink-muted">Cliente</dt>
        <dd>{order.customerName}</dd>
        <dt className="text-ink-muted">Correo</dt>
        <dd className="break-all">
          <a href={`mailto:${order.email}`} className="text-accent hover:underline">
            {order.email}
          </a>
        </dd>
        <dt className="text-ink-muted">Teléfono</dt>
        <dd>
          <a href={`tel:${order.phone}`} className="text-accent hover:underline">
            {order.phone}
          </a>
        </dd>
        <dt className="text-ink-muted">Ciudad</dt>
        <dd>{order.city}</dd>
        <dt className="text-ink-muted">Dirección</dt>
        <dd>{order.address}</dd>
        {order.notes && (
          <>
            <dt className="text-ink-muted">Notas</dt>
            <dd className="whitespace-pre-line">{order.notes}</dd>
          </>
        )}
      </dl>

      <ul className="mt-5 divide-y divide-line border-y border-line text-sm">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between gap-3 py-2">
            <span>
              {item.quantity} × {item.name}
            </span>
            <span className="tabular-nums">{formatPrice(item.unitPrice * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex justify-between text-base">
        <span>Total</span>
        <strong className="tabular-nums">{formatPrice(order.total)}</strong>
      </p>
    </Modal>
  );
}

/**
 * Orders tab: list with status filter, detail and status change.
 */
export default function OrdersAdmin() {
  const { data: orders = [], isPending, isError, error, refetch, isFetching } = useAdminOrders();
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);

  const visible = useMemo(() => (filter === 'all' ? orders : orders.filter((order) => order.status === filter)), [orders, filter]);
  const selected = orders.find((order) => order.id === selectedId) ?? null;

  if (isPending) {
    return (
      <div role="status" className="space-y-3">
        <span className="sr-only">Cargando pedidos...</span>
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Card role="alert" className="px-6 py-12 text-center">
        <p className="font-medium">{error.message}</p>
        <Button className="mt-4" onClick={() => refetch()} loading={isFetching} loadingText="Reintentando...">
          Reintentar
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <Select label="Filtrar por estado" value={filter} onChange={(event) => setFilter(event.target.value)} fieldClassName="sm:w-56">
          <option value="all">Todos</option>
          {ORDER_STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </Select>
        <p className="text-sm text-ink-muted" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'pedido' : 'pedidos'}
        </p>
      </div>

      {visible.length === 0 ? (
        <Card className="px-6 py-12 text-center text-ink-muted">No hay pedidos con este filtro.</Card>
      ) : (
        <ul className="space-y-3">
          {visible.map((order) => {
            const status = getOrderStatus(order.status);
            return (
              <li key={order.id}>
                <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-medium">
                      #{order.id} · {order.customerName}
                    </p>
                    <p className="text-sm text-ink-muted">
                      {formatDate(order.createdAt)} · {order.city} · {order.items.length}{' '}
                      {order.items.length === 1 ? 'producto' : 'productos'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={status.badge}>{status.label}</Badge>
                    <span className="font-semibold tabular-nums">{formatPrice(order.total)}</span>
                    <Button variant="secondary" size="sm" onClick={() => setSelectedId(order.id)}>
                      Ver detalle
                    </Button>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}

      {selected && <OrderDetail key={selected.id} order={selected} onClose={() => setSelectedId(null)} />}
    </div>
  );
}
