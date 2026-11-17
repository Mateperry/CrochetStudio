import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase';

const ORDERS_QUERY_KEY = ['admin', 'orders'];
const ORDERS_LIMIT = 200;

function mapOrder(row) {
  return {
    id: row.id,
    customerName: row.customer_name,
    email: row.email,
    phone: row.phone,
    city: row.city,
    address: row.address,
    notes: row.notes,
    total: Number(row.total),
    status: row.status,
    createdAt: row.created_at,
    items: (row.order_items ?? []).map((item) => ({
      id: item.id,
      productId: item.product_id,
      name: item.product_name,
      unitPrice: Number(item.unit_price),
      quantity: item.quantity,
    })),
  };
}

/**
 * Orders for the admin panel (RLS lets only admins read every order).
 */
export function useAdminOrders() {
  return useQuery({
    queryKey: ORDERS_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false })
        .limit(ORDERS_LIMIT);
      if (error) {
        if (error.code === '42P01' || error.code === 'PGRST205') {
          throw new Error('Falta aplicar la migración de pedidos en la base de datos.');
        }
        throw new Error(`No se pudieron cargar los pedidos: ${error.message}`);
      }
      return data.map(mapOrder);
    },
    staleTime: 30 * 1000,
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select('id, status');
      if (error) throw new Error(`No se pudo cambiar el estado: ${error.message}`);
      if (!data?.length) throw new Error('No tienes permisos para cambiar este pedido.');
      return data[0];
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY }),
  });
}
