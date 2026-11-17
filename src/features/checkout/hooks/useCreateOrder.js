import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase';

function toCheckoutError(error) {
  if (error?.code === 'PGRST202') {
    return new Error('Los pedidos todavía no están habilitados. Escríbenos por Contacto para completar tu compra.');
  }
  // Messages raised by create_order are already in Spanish (e.g. "El teléfono debe tener 10 dígitos.").
  if (error?.code === '22023' || error?.code === 'P0002') return new Error(error.message);
  return new Error('No pudimos registrar tu pedido. Revisa tu conexión e inténtalo de nuevo.');
}

/**
 * Creates an order through the create_order database function. Returns the order id.
 */
export function useCreateOrder() {
  return useMutation({
    mutationFn: async (payload) => {
      const { data, error } = await supabase.rpc('create_order', { payload });
      if (error) throw toCheckoutError(error);
      return data;
    },
  });
}
