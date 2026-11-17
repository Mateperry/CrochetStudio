import { Link, useLocation, useParams } from 'react-router-dom';
import { CheckCircle2Icon, MessageCircleIcon } from 'lucide-react';
import Card from '../components/ui/Card';
import { buttonClasses } from '../components/ui/classes';
import { getDefaultPaymentMethod } from '../features/checkout/payment';
import { formatPrice } from '../lib/formatPrice';
import NotFoundPage from './NotFoundPage';

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const order = state?.order && String(state.order.id) === id ? state.order : null;
  const payment = getDefaultPaymentMethod();
  const paymentUrl = order && payment ? payment.getUrl(order) : null;

  if (!/^\d+$/.test(id ?? '')) return <NotFoundPage />;

  return (
    <section className="mx-auto max-w-xl space-y-6 py-6 text-center">
      <CheckCircle2Icon size={56} className="mx-auto text-success" aria-hidden="true" />
      <div>
        <h1 className="font-display text-3xl font-semibold">¡Pedido recibido!</h1>
        <p className="mt-2 text-ink-muted">
          Tu número de pedido es <strong className="text-ink">#{id}</strong>. Guárdalo para cualquier consulta.
        </p>
      </div>

      <Card className="space-y-3 p-5 text-left">
        <h2 className="font-display text-lg font-semibold">Siguientes pasos</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-ink-muted">
          {paymentUrl ? (
            <li>Escríbenos por WhatsApp con el botón de abajo: el mensaje ya lleva el resumen de tu pedido.</li>
          ) : (
            <li>Te contactaremos al teléfono o correo que dejaste para acordar el pago.</li>
          )}
          <li>Acordamos el pago y el envío.</li>
          <li>Tejemos o alistamos tu pedido y te avisamos cuando salga.</li>
        </ol>
        {order && (
          <p className="border-t border-line pt-3 text-sm">
            Total estimado: <strong className="tabular-nums">{formatPrice(order.total)}</strong>
          </p>
        )}
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        {paymentUrl && (
          <a href={paymentUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses()}>
            <MessageCircleIcon size={18} aria-hidden="true" />
            {payment.label}
          </a>
        )}
        <Link to="/" className={buttonClasses({ variant: 'secondary' })}>
          Seguir comprando
        </Link>
      </div>
    </section>
  );
}
