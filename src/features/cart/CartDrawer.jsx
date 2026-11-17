import { Link } from 'react-router-dom';
import { ShoppingBagIcon } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { buttonClasses } from '../../components/ui/classes';
import CartLineItem from './CartLineItem';
import { useCart } from './useCart';
import { formatPrice } from '../../lib/formatPrice';
import { useMediaQuery } from '../../lib/useMediaQuery';

/**
 * Glass cart panel: side drawer on desktop, bottom sheet on mobile.
 * Opens when a product is added and from the cart icon.
 */
export default function CartDrawer() {
  const { lines, count, subtotal, isDrawerOpen, closeDrawer } = useCart();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <Modal
      isOpen={isDrawerOpen}
      onClose={closeDrawer}
      title="Tu carrito"
      description={count > 0 ? `${count} ${count === 1 ? 'producto' : 'productos'}` : undefined}
      placement={isDesktop ? 'right' : 'bottom'}
      footer={
        lines.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-base">
              <span>Subtotal</span>
              <span className="font-semibold tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-ink-muted">El envío se coordina al confirmar el pedido.</p>
            <Link to="/checkout" onClick={closeDrawer} className={buttonClasses({ className: 'w-full' })}>
              Finalizar compra
            </Link>
            <Link
              to="/carrito"
              onClick={closeDrawer}
              className="block text-center text-sm font-medium text-ink-muted underline-offset-4 hover:text-accent hover:underline"
            >
              Ver carrito
            </Link>
          </div>
        ) : null
      }
    >
      {lines.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-center">
          <ShoppingBagIcon size={40} className="text-ink-muted" aria-hidden="true" />
          <p className="mt-4 font-medium">Tu carrito está vacío</p>
          <Link to="/" onClick={closeDrawer} className={buttonClasses({ variant: 'secondary', className: 'mt-6' })}>
            Explorar la tienda
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-line">
          {lines.map((line) => (
            <CartLineItem key={line.productId} line={line} compact onNavigate={closeDrawer} />
          ))}
        </ul>
      )}
    </Modal>
  );
}
