import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.error(
    'Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. Copia .env.example a .env.local y completa los valores.',
  );
}

// Without credentials createClient would throw at import time and take down the whole app
// (including pages that do not use data, like Contact). A placeholder client lets each
// query fail on its own and show its error state instead.
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://supabase-no-configurado.invalid',
  isSupabaseConfigured ? supabaseAnonKey : 'clave-no-configurada',
);
