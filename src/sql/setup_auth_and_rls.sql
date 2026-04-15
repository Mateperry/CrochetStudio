-- ============================================================
-- CrochetStudio — Setup: user_profiles, trigger y RLS
-- Ejecutar en Supabase SQL Editor
-- ============================================================

-- 1. Tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Habilitar RLS en user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Los usuarios pueden leer su propio perfil
CREATE POLICY "Users can read own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Los admins pueden leer todos los perfiles
CREATE POLICY "Admins can read all profiles"
  ON user_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 3. Trigger para crear perfil al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Eliminar trigger si ya existe para evitar duplicados
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. RLS en productos (lectura pública, escritura solo admin)
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura publica de productos"
  ON productos FOR SELECT
  USING (true);

CREATE POLICY "Admin puede insertar productos"
  ON productos FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin puede actualizar productos"
  ON productos FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin puede eliminar productos"
  ON productos FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 5. RLS en producto_categorias
ALTER TABLE producto_categorias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura publica de producto_categorias"
  ON producto_categorias FOR SELECT
  USING (true);

CREATE POLICY "Admin puede insertar producto_categorias"
  ON producto_categorias FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin puede eliminar producto_categorias"
  ON producto_categorias FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 6. RLS en imagenes
ALTER TABLE imagenes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura publica de imagenes"
  ON imagenes FOR SELECT
  USING (true);

CREATE POLICY "Admin puede insertar imagenes"
  ON imagenes FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin puede eliminar imagenes"
  ON imagenes FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 7. RLS en categorias (lectura pública)
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura publica de categorias"
  ON categorias FOR SELECT
  USING (true);

-- ============================================================
-- DESPUÉS de registrar al dueño, ejecutar:
-- UPDATE user_profiles SET role = 'admin' WHERE email = 'castromateo2004@gmail.com';
-- ============================================================
