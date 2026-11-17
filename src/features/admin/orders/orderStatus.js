export const ORDER_STATUSES = [
  { value: 'pending', label: 'Pendiente', badge: 'accent' },
  { value: 'confirmed', label: 'Confirmado', badge: 'neutral' },
  { value: 'shipped', label: 'Enviado', badge: 'success' },
  { value: 'cancelled', label: 'Cancelado', badge: 'neutral' },
];

export function getOrderStatus(value) {
  return ORDER_STATUSES.find((status) => status.value === value) ?? { value, label: value, badge: 'neutral' };
}
