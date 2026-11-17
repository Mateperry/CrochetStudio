import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase';

/**
 * useAdminProducts — product mutations for the admin panel.
 * Each save runs in a single Postgres transaction through the upsert_product / delete_product
 * functions, so a failure never leaves a product half updated.
 */

const PRODUCTS_QUERY_KEY = ['productos'];

/**
 * Maps the form data (camelCase) to the payload expected by upsert_product.
 */
export function toProductPayload({ id, categories = [], images = [], ...fields }) {
  return {
    ...(id ? { id } : {}),
    nombre: fields.nombre,
    descripcion: fields.descripcion,
    precio: fields.precio,
    precio_promocional: fields.precioPromocional ?? null,
    personaje: fields.personaje ?? null,
    tipo_lana: fields.tipoLana ?? null,
    aguja: fields.aguja ?? null,
    dificultad: fields.dificultad ?? null,
    tamano: fields.tamano ?? null,
    tiempo_estimado: fields.tiempoEstimado ?? null,
    detalles: fields.detalles ?? null,
    categorias: categories,
    imagenes: images.map((url) => url.trim()).filter(Boolean),
  };
}

/**
 * Turns a Postgres/PostgREST error into a message for the admin.
 * Our functions raise messages already written in Spanish.
 */
function toAdminError(error, fallback) {
  if (error?.code === '42501') return new Error('No tienes permisos de administrador para esta acción.');
  if (error?.code === 'PGRST202') {
    return new Error('Falta aplicar la migración de guardado de productos en la base de datos.');
  }
  return new Error(error?.message ? `${fallback}: ${error.message}` : fallback);
}

const saveProduct = async (productData) => {
  const { data, error } = await supabase.rpc('upsert_product', { payload: toProductPayload(productData) });
  if (error) throw toAdminError(error, 'No se pudo guardar el producto');
  return { id: data };
};

const deleteProduct = async (productId) => {
  const { error } = await supabase.rpc('delete_product', { product_id: productId });
  if (error) throw toAdminError(error, 'No se pudo eliminar el producto');
  return { id: productId };
};

function useProductMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY }),
  });
}

export const useCreateProduct = () => useProductMutation(saveProduct);
export const useUpdateProduct = () => useProductMutation(saveProduct);
export const useDeleteProduct = () => useProductMutation(deleteProduct);
