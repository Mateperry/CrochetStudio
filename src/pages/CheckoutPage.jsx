import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import { useCart } from '../features/cart/useCart';
import { useAuth } from '../features/auth/useAuth';
import { useCreateOrder } from '../features/checkout/hooks/useCreateOrder';
import { MAX_NOTES_LENGTH, toOrderPayload, validateCheckoutForm } from '../features/checkout/validateCheckoutForm';
import { CatalogLoading } from '../features/catalog/CatalogStatus';
import { formatPrice } from '../lib/formatPrice';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const { items, lines, subtotal, isCatalogReady, clear } = useCart();
  const createOrder = useCreateOrder();
  const [values, setValues] = useState(() => ({
    customerName: userProfile?.display_name ?? '',
    email: user?.email ?? '',
    phone: '',
    city: '',
    address: '',
    notes: '',
  }));
  const [errors, setErrors] = useState({});

  if (items.length === 0 && !createOrder.isSuccess) return <Navigate to="/carrito" replace />;
  if (!isCatalogReady && lines.length === 0) return <CatalogLoading label="Cargando tu pedido..." />;

  const bind = (field) => ({
    value: values[field],
    error: errors[field],
    onChange: (event) => {
      const { value } = event.target;
      setValues((current) => ({ ...current, [field]: value }));
      if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateCheckoutForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      const orderId = await createOrder.mutateAsync(toOrderPayload(values, items));
      const order = {
        id: orderId,
        customerName: values.customerName.trim(),
        phone: values.phone.trim(),
        city: values.city.trim(),
        address: values.address.trim(),
        notes: values.notes.trim(),
        total: subtotal,
        lines: lines.map((line) => ({ name: line.product.nombre, quantity: line.quantity, unitPrice: line.unitPrice })),
      };
      clear();
      navigate(`/pedido/${orderId}/confirmado`, { replace: true, state: { order } });
    } catch {
      // The error message is shown from createOrder.error below.
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold md:text-4xl">Finalizar compra</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
        <Card className="p-5 md:p-6">
          <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-describedby="checkout-ayuda">
            <p id="checkout-ayuda" className="text-sm text-ink-muted">
              Usaremos estos datos para coordinar el pago y el envío.
            </p>
            {createOrder.isError && (
              <p role="alert" className="rounded-md bg-danger/10 px-4 py-3 text-sm text-danger">
                {createOrder.error.message}
              </p>
            )}
            <Input label="Nombre completo" autoComplete="name" required {...bind('customerName')} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Correo electrónico" type="email" inputMode="email" autoComplete="email" required {...bind('email')} />
              <Input
                label="Teléfono"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="3001234567"
                hint="10 dígitos, sin indicativo."
                required
                {...bind('phone')}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Ciudad" autoComplete="address-level2" required {...bind('city')} />
              <Input label="Dirección" autoComplete="street-address" placeholder="Calle 10 # 20-30, apto 401" required {...bind('address')} />
            </div>
            <Textarea
              label="Notas"
              rows={3}
              maxLength={MAX_NOTES_LENGTH}
              hint="Opcional: colores, personalización o indicaciones de entrega."
              {...bind('notes')}
            />
            <Button type="submit" className="w-full" loading={createOrder.isPending} loadingText="Confirmando pedido...">
              Confirmar pedido
            </Button>
          </form>
        </Card>

        <Card as="aside" aria-labelledby="checkout-resumen" className="space-y-4 p-5 lg:sticky lg:top-28">
          <h2 id="checkout-resumen" className="font-display text-xl font-semibold">
            Tu pedido
          </h2>
          <ul className="divide-y divide-line text-sm">
            {lines.map((line) => (
              <li key={line.productId} className="flex justify-between gap-3 py-2">
                <span className="min-w-0">
                  <span className="tabular-nums">{line.quantity} ×</span> {line.product.nombre}
                </span>
                <span className="shrink-0 tabular-nums">{formatPrice(line.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-line pt-3 text-base">
            <span>Total</span>
            <span className="font-semibold tabular-nums">{formatPrice(subtotal)}</span>
          </div>
          <p className="text-xs text-ink-muted">
            El precio final lo confirma la tienda con los valores vigentes. El envío se coordina después del pedido.
          </p>
        </Card>
      </div>
    </div>
  );
}
