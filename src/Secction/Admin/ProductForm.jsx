import { useState, useEffect } from 'react';
import { XIcon, PlusIcon, TrashIcon, ImageIcon } from 'lucide-react';
import { useCategories } from '../../hooks/useCategories';

/**
 * ProductForm — Create/Edit product form.
 * Responsibilities:
 *   - Dual mode: create (empty fields) / edit (prefilled fields).
 *   - Validates required fields before submission.
 *   - Dynamic image URL list (add/remove).
 *   - Multi-select categories.
 */

const DIFFICULTY_OPTIONS = ['Muy fácil', 'Fácil', 'Media', 'Alta', 'Muy alta'];

const INITIAL_FORM_STATE = {
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

export default function ProductForm({ product, onSubmit, onCancel, isSubmitting }) {
  const { data: allCategories = [], isLoading: categoriesLoading } = useCategories();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(product);

  // Populate form when editing an existing product
  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || '',
        descripcion: product.descripcion || '',
        precio: product.precio?.toString() || '',
        precioPromocional: product.precioPromocional?.toString() || '',
        personaje: product.descripcionDetallada?.personaje || '',
        tipoLana: product.descripcionDetallada?.tipoLana || '',
        aguja: product.descripcionDetallada?.aguja || '',
        dificultad: product.descripcionDetallada?.dificultad || '',
        tamano: product.descripcionDetallada?.tamaño || '',
        tiempoEstimado: product.descripcionDetallada?.tiempoEstimado || '',
        detalles: product.descripcionDetallada?.detalles || '',
        categories: product.categoryIds || [],
        images: product.imagenes?.length > 0 ? [...product.imagenes] : [''],
      });
    } else {
      setFormData(INITIAL_FORM_STATE);
    }
  }, [product]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear individual field error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleCategoryToggle = (categoryId) => {
    setFormData((prev) => {
      const current = prev.categories;
      const updated = current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId];
      return { ...prev, categories: updated };
    });

    if (errors.categories) {
      setErrors((prev) => ({ ...prev, categories: null }));
    }
  };

  // --- Image URL management ---
  const handleImageChange = (index, value) => {
    const updated = [...formData.images];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImageField = (index) => {
    if (formData.images.length <= 1) return;
    const updated = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  // --- Validation ---
  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es obligatoria.';

    const precio = parseFloat(formData.precio);
    if (!formData.precio || isNaN(precio) || precio <= 0) {
      newErrors.precio = 'El precio debe ser un número mayor a 0.';
    }

    if (formData.precioPromocional) {
      const promo = parseFloat(formData.precioPromocional);
      if (isNaN(promo) || promo <= 0) {
        newErrors.precioPromocional = 'El precio promocional debe ser mayor a 0.';
      } else if (promo >= precio) {
        newErrors.precioPromocional = 'El precio promocional debe ser menor al precio original.';
      }
    }

    if (formData.categories.length === 0) {
      newErrors.categories = 'Debes seleccionar al menos una categoría.';
    }

    const validImages = formData.images.filter((url) => url.trim() !== '');
    if (validImages.length === 0) {
      newErrors.images = 'Debes agregar al menos una imagen (URL).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitData = {
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim(),
      precio: parseFloat(formData.precio),
      precioPromocional: formData.precioPromocional
        ? parseFloat(formData.precioPromocional)
        : null,
      personaje: formData.personaje.trim() || null,
      tipoLana: formData.tipoLana.trim() || null,
      aguja: formData.aguja.trim() || null,
      dificultad: formData.dificultad || null,
      tamano: formData.tamano.trim() || null,
      tiempoEstimado: formData.tiempoEstimado.trim() || null,
      detalles: formData.detalles.trim() || null,
      categories: formData.categories,
      images: formData.images.filter((url) => url.trim() !== ''),
    };

    if (isEditMode) {
      submitData.id = product.id;
    }

    onSubmit(submitData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#272321]">
          {isEditMode ? 'Editar producto' : 'Nuevo producto'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cancelar"
        >
          <XIcon size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* --- Basic Info --- */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-[#71675d] border-b border-gray-200 pb-2 w-full">
            Información básica
          </legend>

          <div>
            <label htmlFor="product-name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              id="product-name"
              type="text"
              value={formData.nombre}
              onChange={(e) => handleChange('nombre', e.target.value)}
              className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none transition-colors ${
                errors.nombre ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#71675d]'
              }`}
              placeholder="Ej: Pikachu Amigurumi"
            />
            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
          </div>

          <div>
            <label htmlFor="product-description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              id="product-description"
              value={formData.descripcion}
              onChange={(e) => handleChange('descripcion', e.target.value)}
              rows={3}
              className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none transition-colors resize-none ${
                errors.descripcion ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#71675d]'
              }`}
              placeholder="Descripción breve del producto"
            />
            {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="product-price" className="block text-sm font-medium text-gray-700 mb-1">
                Precio (COP) *
              </label>
              <input
                id="product-price"
                type="number"
                value={formData.precio}
                onChange={(e) => handleChange('precio', e.target.value)}
                className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.precio ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#71675d]'
                }`}
                placeholder="42000"
                min="0"
              />
              {errors.precio && <p className="text-red-500 text-xs mt-1">{errors.precio}</p>}
            </div>

            <div>
              <label htmlFor="product-promo-price" className="block text-sm font-medium text-gray-700 mb-1">
                Precio promocional (opcional)
              </label>
              <input
                id="product-promo-price"
                type="number"
                value={formData.precioPromocional}
                onChange={(e) => handleChange('precioPromocional', e.target.value)}
                className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.precioPromocional ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#71675d]'
                }`}
                placeholder="39000"
                min="0"
              />
              {errors.precioPromocional && <p className="text-red-500 text-xs mt-1">{errors.precioPromocional}</p>}
            </div>
          </div>
        </fieldset>

        {/* --- Technical Details --- */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-[#71675d] border-b border-gray-200 pb-2 w-full">
            Detalles técnicos
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="product-character" className="block text-sm font-medium text-gray-700 mb-1">Personaje</label>
              <input
                id="product-character"
                type="text"
                value={formData.personaje}
                onChange={(e) => handleChange('personaje', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#71675d] focus:outline-none transition-colors"
                placeholder="Ej: Pikachu (Pokémon)"
              />
            </div>

            <div>
              <label htmlFor="product-yarn" className="block text-sm font-medium text-gray-700 mb-1">Tipo de lana</label>
              <input
                id="product-yarn"
                type="text"
                value={formData.tipoLana}
                onChange={(e) => handleChange('tipoLana', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#71675d] focus:outline-none transition-colors"
                placeholder="Ej: Algodón mercerizado"
              />
            </div>

            <div>
              <label htmlFor="product-needle" className="block text-sm font-medium text-gray-700 mb-1">Aguja</label>
              <input
                id="product-needle"
                type="text"
                value={formData.aguja}
                onChange={(e) => handleChange('aguja', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#71675d] focus:outline-none transition-colors"
                placeholder="Ej: 2.0 mm"
              />
            </div>

            <div>
              <label htmlFor="product-difficulty" className="block text-sm font-medium text-gray-700 mb-1">Dificultad</label>
              <select
                id="product-difficulty"
                value={formData.dificultad}
                onChange={(e) => handleChange('dificultad', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#71675d] focus:outline-none transition-colors"
              >
                <option value="">Seleccionar...</option>
                {DIFFICULTY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="product-size" className="block text-sm font-medium text-gray-700 mb-1">Tamaño</label>
              <input
                id="product-size"
                type="text"
                value={formData.tamano}
                onChange={(e) => handleChange('tamano', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#71675d] focus:outline-none transition-colors"
                placeholder="Ej: 20 cm"
              />
            </div>

            <div>
              <label htmlFor="product-time" className="block text-sm font-medium text-gray-700 mb-1">Tiempo estimado</label>
              <input
                id="product-time"
                type="text"
                value={formData.tiempoEstimado}
                onChange={(e) => handleChange('tiempoEstimado', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#71675d] focus:outline-none transition-colors"
                placeholder="Ej: 6 horas"
              />
            </div>
          </div>

          <div>
            <label htmlFor="product-details" className="block text-sm font-medium text-gray-700 mb-1">Detalles adicionales</label>
            <textarea
              id="product-details"
              value={formData.detalles}
              onChange={(e) => handleChange('detalles', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#71675d] focus:outline-none transition-colors resize-none"
              placeholder="Detalles extra sobre el producto..."
            />
          </div>
        </fieldset>

        {/* --- Categories --- */}
        <fieldset className="space-y-3">
          <legend className="text-lg font-semibold text-[#71675d] border-b border-gray-200 pb-2 w-full">
            Categorías *
          </legend>

          {categoriesLoading ? (
            <p className="text-sm text-gray-400 animate-pulse">Cargando categorías...</p>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border-2 border-gray-200 rounded-xl">
              {allCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryToggle(cat.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    formData.categories.includes(cat.id)
                      ? 'bg-[#71675d] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.nombre}
                </button>
              ))}
            </div>
          )}

          {errors.categories && <p className="text-red-500 text-xs">{errors.categories}</p>}
        </fieldset>

        {/* --- Images --- */}
        <fieldset className="space-y-3">
          <legend className="text-lg font-semibold text-[#71675d] border-b border-gray-200 pb-2 w-full">
            Imágenes (URLs) *
          </legend>

          {formData.images.map((url, index) => (
            <div key={index} className="flex items-center gap-2">
              <ImageIcon size={18} className="text-gray-400 flex-shrink-0" />
              <input
                type="url"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#71675d] focus:outline-none transition-colors"
                placeholder="https://..."
              />
              {formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                  aria-label="Eliminar imagen"
                >
                  <TrashIcon size={18} />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addImageField}
            className="flex items-center gap-2 text-sm text-[#71675d] hover:text-[#5a5148] font-medium transition-colors"
          >
            <PlusIcon size={16} />
            Agregar otra imagen
          </button>

          {errors.images && <p className="text-red-500 text-xs">{errors.images}</p>}
        </fieldset>

        {/* --- Actions --- */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#71675d] hover:bg-[#5a5148] text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? 'Guardando...'
              : isEditMode
                ? 'Guardar cambios'
                : 'Crear producto'}
          </button>
        </div>
      </form>
    </div>
  );
}
