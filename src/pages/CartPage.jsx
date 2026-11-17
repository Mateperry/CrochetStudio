import { Link } from 'react-router-dom';
import { ShoppingBagIcon } from 'lucide-react';
import Card from '../components/ui/Card';
import { buttonClasses } from '../components/ui/classes';
import CartLineItem from '../features/cart/CartLineItem';
import { useCart } from '../features/cart/useCart';
import { CatalogLoading } from '../features/catalog/CatalogStatus';
import { formatPrice } from '../lib/formatPrice';
import PageMeta from '../components/layout/PageMeta';

export default function CartPage() {
  const { items, lines, count, subtotal, isCatalogReady } = useCart();

  // Cart has items but the catalog (prices, names) is still loading.
  if (items.length > 0 && !isCatalogReady && lines.length === 0) {
    return <CatalogLoading label="Cargando tu carrito..." />;
  }

  if (lines.length === 0) {
    return (
      <section className="flex flex-col items-center py-20 text-center">
        <PageMeta title="Carrito" />
        <ShoppingBagIcon size={48} className="text-ink-muted" aria-hidden="true" />
        <h1 className="mt-4 font-display text-3xl font-semibold">Tu carrito está vacío</h1>
        <p className="mt-2 text-ink-muted">Encuentra tu próximo amigurumi favorito.</p>
        <Link to="/" className={buttonClasses({ className: 'mt-8' })}>
          Explorar la tienda
        </Link>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <PageMeta title="Carrito" />
      <h1 className="font-display text-3xl font-semibold md:text-4xl">Carrito</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
        <Card className="px-4 md:px-6">
          <ul className="divide-y divide-line">
            {lines.map((line) => (
              <CartLineItem key={line.productId} line={line} />
            ))}
          </ul>
        </Card>

        <Card as="aside" aria-labelledby="resumen-pedido" className="space-y-4 p-5 lg:sticky lg:top-28">
          <h2 id="resumen-pedido" className="font-display text-xl font-semibold">
            Resumen del pedido
          </h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-muted">Productos</dt>
              <dd className="tabular-nums">{count}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-2 text-base">
              <dt>Subtotal</dt>
              <dd className="font-semibold tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
          </dl>
          <p className="text-xs text-ink-muted">El envío se coordina al confirmar el pedido.</p>
          <Link to="/checkout" className={buttonClasses({ className: 'w-full' })}>
            Finalizar compra
          </Link>
          <Link
            to="/"
            className="block text-center text-sm font-medium text-ink-muted underline-offset-4 hover:text-accent hover:underline"
          >
            Seguir comprando
          </Link>
        </Card>
      </div>
    </div>
  );
}
