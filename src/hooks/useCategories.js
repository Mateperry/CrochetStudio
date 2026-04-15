import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

/**
 * Fetches all categories from the categorias table.
 */
const fetchCategories = async () => {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .order('nombre', { ascending: true });

  if (error) throw error;
  return data;
};

/**
 * useCategories — Hook to get all available categories.
 * Used in ProductForm for category assignment.
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categorias'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes (categories rarely change)
  });
};
