import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase';

/**
 * useAdminProducts — CRUD mutations for product management.
 * Each mutation invalidates the 'productos' cache to keep the public store in sync.
 */

/**
 * Creates a product with its categories and images.
 * Performs a transactional-style insert: product → categories → images.
 */
const createProduct = async (productData) => {
  const { categories, images, ...productFields } = productData;

  // 1. Insert the product
  const { data: product, error: productError } = await supabase
    .from('productos')
    .insert({
      nombre: productFields.nombre,
      precio: productFields.precio,
      precio_promocional: productFields.precioPromocional || null,
      descripcion: productFields.descripcion,
      personaje: productFields.personaje || null,
      tipo_lana: productFields.tipoLana || null,
      aguja: productFields.aguja || null,
      dificultad: productFields.dificultad || null,
      tamano: productFields.tamano || null,
      tiempo_estimado: productFields.tiempoEstimado || null,
      detalles: productFields.detalles || null,
    })
    .select()
    .single();

  if (productError) throw new Error(`Error al crear producto: ${productError.message}`);

  const productId = product.id;

  // 2. Insert category associations
  if (categories && categories.length > 0) {
    const categoryRows = categories.map((catId) => ({
      producto_id: productId,
      categoria_id: catId,
    }));

    const { error: catError } = await supabase
      .from('producto_categorias')
      .insert(categoryRows);

    if (catError) {
      // Rollback: delete the created product
      await supabase.from('productos').delete().eq('id', productId);
      throw new Error(`Error al asignar categorías: ${catError.message}`);
    }
  }

  // 3. Insert images
  if (images && images.length > 0) {
    const imageRows = images
      .filter((url) => url.trim() !== '')
      .map((url) => ({
        producto_id: productId,
        url: url.trim(),
      }));

    if (imageRows.length > 0) {
      const { error: imgError } = await supabase
        .from('imagenes')
        .insert(imageRows);

      if (imgError) {
        // Rollback
        await supabase.from('producto_categorias').delete().eq('producto_id', productId);
        await supabase.from('productos').delete().eq('id', productId);
        throw new Error(`Error al guardar imágenes: ${imgError.message}`);
      }
    }
  }

  return product;
};

/**
 * Updates an existing product, replacing its categories and images.
 */
const updateProduct = async ({ id, ...productData }) => {
  const { categories, images, ...productFields } = productData;

  // 1. Update the product record
  const { error: productError } = await supabase
    .from('productos')
    .update({
      nombre: productFields.nombre,
      precio: productFields.precio,
      precio_promocional: productFields.precioPromocional || null,
      descripcion: productFields.descripcion,
      personaje: productFields.personaje || null,
      tipo_lana: productFields.tipoLana || null,
      aguja: productFields.aguja || null,
      dificultad: productFields.dificultad || null,
      tamano: productFields.tamano || null,
      tiempo_estimado: productFields.tiempoEstimado || null,
      detalles: productFields.detalles || null,
    })
    .eq('id', id);

  if (productError) throw new Error(`Error al actualizar producto: ${productError.message}`);

  // 2. Replace categories: delete existing, insert new
  const { error: delCatError } = await supabase
    .from('producto_categorias')
    .delete()
    .eq('producto_id', id);

  if (delCatError) throw new Error(`Error al actualizar categorías: ${delCatError.message}`);

  if (categories && categories.length > 0) {
    const categoryRows = categories.map((catId) => ({
      producto_id: id,
      categoria_id: catId,
    }));

    const { error: catError } = await supabase
      .from('producto_categorias')
      .insert(categoryRows);

    if (catError) throw new Error(`Error al asignar categorías: ${catError.message}`);
  }

  // 3. Replace images: delete existing, insert new
  const { error: delImgError } = await supabase
    .from('imagenes')
    .delete()
    .eq('producto_id', id);

  if (delImgError) throw new Error(`Error al actualizar imágenes: ${delImgError.message}`);

  if (images && images.length > 0) {
    const imageRows = images
      .filter((url) => url.trim() !== '')
      .map((url) => ({
        producto_id: id,
        url: url.trim(),
      }));

    if (imageRows.length > 0) {
      const { error: imgError } = await supabase
        .from('imagenes')
        .insert(imageRows);

      if (imgError) throw new Error(`Error al guardar imágenes: ${imgError.message}`);
    }
  }

  return { id };
};

/**
 * Deletes a product and its related records.
 */
const deleteProduct = async (productId) => {
  // Delete images first
  const { error: imgError } = await supabase
    .from('imagenes')
    .delete()
    .eq('producto_id', productId);

  if (imgError) throw new Error(`Error al eliminar imágenes: ${imgError.message}`);

  // Delete category associations
  const { error: catError } = await supabase
    .from('producto_categorias')
    .delete()
    .eq('producto_id', productId);

  if (catError) throw new Error(`Error al eliminar categorías: ${catError.message}`);

  // Delete the product
  const { error: productError } = await supabase
    .from('productos')
    .delete()
    .eq('id', productId);

  if (productError) throw new Error(`Error al eliminar producto: ${productError.message}`);

  return { id: productId };
};

// --- Exported hooks ---

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] });
    },
  });
};
