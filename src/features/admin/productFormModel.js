export const DIFFICULTY_OPTIONS = ['Muy fácil', 'Fácil', 'Media', 'Alta', 'Muy alta'];

export const EMPTY_PRODUCT_FORM = {
  nombre: '',
  descripcion: '',
  precio: '',
  precioPromocional: '',
  personaje: '',
  tipoLana: '',
  aguja: '',
  dificultad: '',
  tamano: '',
  tiempoEstimado: '',
  detalles: '',
  categories: [],
  images: [''],
};

/** Builds form values from a catalog product (as returned by useProducts). */
export function productToFormValues(product, categoryIds = []) {
  if (!product) return EMPTY_PRODUCT_FORM;
  const details = product.descripcionDetallada ?? {};
  return {
    nombre: product.nombre ?? '',
    descripcion: product.descripcion ?? '',
    precio: product.precio?.toString() ?? '',
    precioPromocional: product.precioPromocional?.toString() ?? '',
    personaje: details.personaje ?? '',
    tipoLana: details.tipoLana ?? '',
    aguja: details.aguja ?? '',
    dificultad: details.dificultad ?? '',
    tamano: details.tamaño ?? '',
    tiempoEstimado: details.tiempoEstimado ?? '',
    detalles: details.detalles ?? '',
    categories: categoryIds,
    images: product.imagenes?.length ? [...product.imagenes] : [''],
  };
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Validates the product form. Returns a map of field -> message (empty when valid).
 * The database function upsert_product validates the same rules again.
 */
export function validateProductForm(values) {
  const errors = {};
  if (!values.nombre.trim()) errors.nombre = 'El nombre es obligatorio.';
  if (!values.descripcion.trim()) errors.descripcion = 'La descripción es obligatoria.';

  const price = Number(values.precio);
  if (values.precio === '' || !Number.isFinite(price) || price <= 0) {
    errors.precio = 'El precio debe ser un número mayor a 0.';
  }

  if (values.precioPromocional !== '') {
    const promo = Number(values.precioPromocional);
    if (!Number.isFinite(promo) || promo <= 0) errors.precioPromocional = 'El precio promocional debe ser mayor a 0.';
    else if (!errors.precio && promo >= price) {
      errors.precioPromocional = 'El precio promocional debe ser menor al precio original.';
    }
  }

  if (values.categories.length === 0) errors.categories = 'Selecciona al menos una categoría.';

  const images = values.images.map((url) => url.trim()).filter(Boolean);
  if (images.length === 0) errors.images = 'Agrega al menos una imagen (URL).';
  else if (images.some((url) => !isHttpUrl(url))) errors.images = 'Alguna URL de imagen no es válida.';

  return errors;
}

/** Converts valid form values to the data the save mutation expects. */
export function formValuesToProductData(values, id) {
  const text = (value) => value.trim() || null;
  return {
    ...(id ? { id } : {}),
    nombre: values.nombre.trim(),
    descripcion: values.descripcion.trim(),
    precio: Number(values.precio),
    precioPromocional: values.precioPromocional === '' ? null : Number(values.precioPromocional),
    personaje: text(values.personaje),
    tipoLana: text(values.tipoLana),
    aguja: text(values.aguja),
    dificultad: values.dificultad || null,
    tamano: text(values.tamano),
    tiempoEstimado: text(values.tiempoEstimado),
    detalles: text(values.detalles),
    categories: values.categories,
    images: values.images.map((url) => url.trim()).filter(Boolean),
  };
}
