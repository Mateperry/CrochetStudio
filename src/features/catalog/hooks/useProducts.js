import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase';

const fetchProducts = async () => {
  // Ahora usamos la vista 'productos_completos' como solicitaste
  const { data, error } = await supabase
    .from('productos_completos')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;

  // Log para depuración (puedes verlo en la consola del navegador)

  // Transformamos los datos para que coincidan EXACTAMENTE con lo que espera la App
  return data.map((prod) => ({
    id: prod.id,
    nombre: prod.nombre,
    precio: prod.precio,
    precioPromocional: prod.precio_promocional,
    descripcion: prod.descripcion,

    // MAPEÓ ROBUSTO DE IMÁGENES:
    // Maneja si la vista devuelve ['url1', 'url2'] o [{url: 'url1'}, {url: 'url2'}]
    imagenes: Array.isArray(prod.imagenes)
      ? prod.imagenes.map(img => typeof img === 'string' ? img : (img?.url || ''))
      : [],

    // MAPEÓ ROBUSTO DE CATEGORÍAS:
    // Maneja si la vista devuelve ['cat1', 'cat2'] o [{nombre: 'cat1'}, {nombre: 'cat2'}]
    categorias: Array.isArray(prod.categorias)
      ? prod.categorias.map(cat => {
          const name = typeof cat === 'string' ? cat : (cat?.nombre || '');
          return name === "Promocion" ? "Ofertas" : name;
        })
      : [],

    // Reconstruimos el objeto para mantener compatibilidad con los componentes de UI
    descripcionDetallada: {
      personaje: prod.personaje,
      tipoLana: prod.tipo_lana,
      aguja: prod.aguja,
      dificultad: prod.dificultad,
      tamaño: prod.tamano,
      tiempoEstimado: prod.tiempo_estimado,
      detalles: prod.detalles,
    },
  }));
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['productos'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 10, // Cache por 10 minutos
  });
};
