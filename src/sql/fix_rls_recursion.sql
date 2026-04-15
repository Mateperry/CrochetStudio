-- ============================================================
-- FIX: Corregir recursión infinita en políticas RLS de user_profiles
-- Ejecutar en Supabase SQL Editor
-- ============================================================

-- 1. Eliminar las políticas problemáticas
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON user_profiles;

-- 2. Crear una función SECURITY DEFINER que consulte el rol
-- sin pasar por RLS (rompe el ciclo de recursión)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.user_profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 3. Política: cada usuario puede leer su propio perfil
CREATE POLICY "Users can read own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

-- 4. Política: admins pueden leer todos los perfiles
-- Usa la función SECURITY DEFINER para evitar recursión
CREATE POLICY "Admins can read all profiles"
  ON user_profiles FOR SELECT
  USING (public.get_current_user_role() = 'admin');

-- 5. También corregir las políticas de productos, categorías e imágenes
-- que tienen el mismo problema potencial de recursión

-- Productos
DROP POLICY IF EXISTS "Admin puede insertar productos" ON productos;
DROP POLICY IF EXISTS "Admin puede actualizar productos" ON productos;
DROP POLICY IF EXISTS "Admin puede eliminar productos" ON productos;

CREATE POLICY "Admin puede insertar productos"
  ON productos FOR INSERT
  WITH CHECK (public.get_current_user_role() = 'admin');

CREATE POLICY "Admin puede actualizar productos"
  ON productos FOR UPDATE
  USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admin puede eliminar productos"
  ON productos FOR DELETE
  USING (public.get_current_user_role() = 'admin');

-- Producto Categorías
DROP POLICY IF EXISTS "Admin puede insertar producto_categorias" ON producto_categorias;
DROP POLICY IF EXISTS "Admin puede eliminar producto_categorias" ON producto_categorias;

CREATE POLICY "Admin puede insertar producto_categorias"
  ON producto_categorias FOR INSERT
  WITH CHECK (public.get_current_user_role() = 'admin');

CREATE POLICY "Admin puede eliminar producto_categorias"
  ON producto_categorias FOR DELETE
  USING (public.get_current_user_role() = 'admin');

-- Imágenes
DROP POLICY IF EXISTS "Admin puede insertar imagenes" ON imagenes;
DROP POLICY IF EXISTS "Admin puede eliminar imagenes" ON imagenes;

CREATE POLICY "Admin puede insertar imagenes"
  ON imagenes FOR INSERT
  WITH CHECK (public.get_current_user_role() = 'admin');

CREATE POLICY "Admin puede eliminar imagenes"
  ON imagenes FOR DELETE
  USING (public.get_current_user_role() = 'admin');

-- ============================================================
-- Listo! Ahora cierra sesión y vuelve a iniciar sesión en la app.
-- ============================================================
