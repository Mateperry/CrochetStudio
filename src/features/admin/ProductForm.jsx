import { useState } from 'react';
import { ImageOffIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import Skeleton from '../../components/ui/Skeleton';
import { useCategories } from '../catalog/hooks/useCategories';
import {
  DIFFICULTY_OPTIONS,
  formValuesToProductData,
  productToFormValues,
  validateProductForm,
} from './productFormModel';
import { cn } from '../../lib/cn';

function ImagePreview({ url }) {
  const [failedUrl, setFailedUrl] = useState(null);
  const trimmed = url.trim();
  const failed = failedUrl === trimmed;

  return (
    <div className="flex h-16 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-surface-muted text-ink-muted">
      {trimmed && !failed ? (
        <img src={trimmed} alt="" className="h-full w-full object-cover" onError={() => setFailedUrl(trimmed)} />
      ) : (
        <ImageOffIcon size={18} aria-hidden="true" />
      )}
    </div>
  );
}

/**
 * ProductForm — create / edit form. Validates before submitting and shows errors under each field.
 * `product` (optional) pre-fills the form; `categoryIds` are its category ids.
 */
export default function ProductForm({ product, categoryIds, onSubmit, onCancel, isSubmitting }) {
  const { data: categories = [], isPending: categoriesLoading, isError: categoriesError, refetch } = useCategories();
  const [values, setValues] = useState(() => productToFormValues(product, categoryIds));
  const [errors, setErrors] = useState({});
  const isEdit = Boolean(product);

  const setField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };
  const bind = (field) => ({ value: values[field], onChange: (event) => setField(field, event.target.value), error: errors[field] });

  const toggleCategory = (id) =>
    setField(
      'categories',
      values.categories.includes(id) ? values.categories.filter((item) => item !== id) : [...values.categories, id],
    );

  const setImage = (index, url) => setField('images', values.images.map((item, i) => (i === index ? url : item)));
  const addImage = () => setField('images', [...values.images, '']);
  const removeImage = (index) => setField('images', values.images.filter((_, i) => i !== index));

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateProductForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSubmit(formValuesToProductData(values, product?.id));
  };

  return (
    <Card className="p-5 md:p-6">
      <h2 className="font-display text-2xl font-semibold">{isEdit ? 'Editar producto' : 'Nuevo producto'}</h2>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-8">
        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Información básica</legend>
          <Input label="Nombre" placeholder="Ej: Pikachu Amigurumi" required {...bind('nombre')} />
          <Textarea label="Descripción" rows={3} placeholder="Descripción breve del producto" required {...bind('descripcion')} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Precio (COP)" type="number" inputMode="numeric" min="0" placeholder="42000" required {...bind('precio')} />
            <Input
              label="Precio promocional"
              type="number"
              inputMode="numeric"
              min="0"
              placeholder="39000"
              hint="Opcional. Debe ser menor al precio."
              {...bind('precioPromocional')}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Ficha técnica</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Personaje" placeholder="Ej: Pikachu (Pokémon)" {...bind('personaje')} />
            <Input label="Tipo de lana" placeholder="Ej: Algodón mercerizado" {...bind('tipoLana')} />
            <Input label="Aguja" placeholder="Ej: 2.0 mm" {...bind('aguja')} />
            <Select label="Dificultad" {...bind('dificultad')}>
              <option value="">Sin especificar</option>
              {DIFFICULTY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <Input label="Tamaño" placeholder="Ej: 20 cm" {...bind('tamano')} />
            <Input label="Tiempo estimado" placeholder="Ej: 6 horas" {...bind('tiempoEstimado')} />
          </div>
          <Textarea label="Detalles adicionales" rows={2} {...bind('detalles')} />
        </fieldset>

        <fieldset className="space-y-3" aria-describedby={errors.categories ? 'categorias-error' : undefined}>
          <legend className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Categorías <span className="text-accent" aria-hidden="true">*</span>
          </legend>
          {categoriesLoading && <Skeleton className="h-20 w-full" />}
          {categoriesError && (
            <p className="text-sm text-danger">
              No se pudieron cargar las categorías.{' '}
              <button type="button" onClick={() => refetch()} className="font-semibold underline">
                Reintentar
              </button>
            </p>
          )}
          <div className="flex max-h-48 flex-wrap gap-2 overflow-y-auto">
            {categories.map((category) => {
              const selected = values.categories.includes(category.id);
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  aria-pressed={selected}
                  className={cn(
                    'rounded-full border px-3 py-1 text-sm transition-colors',
                    selected ? 'border-accent bg-accent text-on-accent' : 'border-line bg-surface-muted text-ink hover:border-accent',
                  )}
                >
                  {category.nombre}
                </button>
              );
            })}
          </div>
          {errors.categories && (
            <p id="categorias-error" className="text-xs font-medium text-danger">
              {errors.categories}
            </p>
          )}
        </fieldset>

        <fieldset className="space-y-3" aria-describedby={errors.images ? 'imagenes-error' : undefined}>
          <legend className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Imágenes (URLs) <span className="text-accent" aria-hidden="true">*</span>
          </legend>
          <p className="text-xs text-ink-muted">La primera imagen es la principal. Usa URLs públicas del bucket Imagenes.</p>
          {values.images.map((url, index) => (
            <div key={index} className="flex items-end gap-3">
              <ImagePreview url={url} />
              <Input
                label={`Imagen ${index + 1}`}
                type="url"
                inputMode="url"
                placeholder="https://..."
                value={url}
                onChange={(event) => setImage(index, event.target.value)}
                fieldClassName="flex-1"
              />
              {values.images.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => removeImage(index)} aria-label={`Quitar imagen ${index + 1}`}>
                  <Trash2Icon size={18} aria-hidden="true" />
                </Button>
              )}
            </div>
          ))}
          <Button variant="ghost" size="sm" onClick={addImage}>
            <PlusIcon size={16} aria-hidden="true" />
            Agregar otra imagen
          </Button>
          {errors.images && (
            <p id="imagenes-error" className="text-xs font-medium text-danger">
              {errors.images}
            </p>
          )}
        </fieldset>

        <div className="flex flex-col-reverse gap-3 border-t border-line pt-5 sm:flex-row sm:justify-end">
          <Button variant="ghost" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" loading={isSubmitting} loadingText="Guardando...">
            {isEdit ? 'Guardar cambios' : 'Crear producto'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
