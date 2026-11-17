-- Políticas RLS finales: lectura pública del catálogo, escritura solo admin.
-- Todas usan get_current_user_role() para no consultar user_profiles dentro de su propia política.

alter table public.user_profiles enable row level security;
alter table public.categorias enable row level security;
alter table public.productos enable row level security;
alter table public.producto_categorias enable row level security;
alter table public.imagenes enable row level security;

-- user_profiles
drop policy if exists "Users can read own profile" on public.user_profiles;
create policy "Users can read own profile"
  on public.user_profiles for select
  using (auth.uid() = id);

drop policy if exists "Admins can read all profiles" on public.user_profiles;
create policy "Admins can read all profiles"
  on public.user_profiles for select
  using (public.get_current_user_role() = 'admin');

-- categorias
drop policy if exists "Lectura publica de categorias" on public.categorias;
create policy "Lectura publica de categorias"
  on public.categorias for select
  using (true);

-- productos
drop policy if exists "Lectura publica de productos" on public.productos;
create policy "Lectura publica de productos"
  on public.productos for select
  using (true);

drop policy if exists "Admin puede insertar productos" on public.productos;
create policy "Admin puede insertar productos"
  on public.productos for insert
  with check (public.get_current_user_role() = 'admin');

drop policy if exists "Admin puede actualizar productos" on public.productos;
create policy "Admin puede actualizar productos"
  on public.productos for update
  using (public.get_current_user_role() = 'admin');

drop policy if exists "Admin puede eliminar productos" on public.productos;
create policy "Admin puede eliminar productos"
  on public.productos for delete
  using (public.get_current_user_role() = 'admin');

-- producto_categorias
drop policy if exists "Lectura publica de producto_categorias" on public.producto_categorias;
create policy "Lectura publica de producto_categorias"
  on public.producto_categorias for select
  using (true);

drop policy if exists "Admin puede insertar producto_categorias" on public.producto_categorias;
create policy "Admin puede insertar producto_categorias"
  on public.producto_categorias for insert
  with check (public.get_current_user_role() = 'admin');

drop policy if exists "Admin puede eliminar producto_categorias" on public.producto_categorias;
create policy "Admin puede eliminar producto_categorias"
  on public.producto_categorias for delete
  using (public.get_current_user_role() = 'admin');

-- imagenes
drop policy if exists "Lectura publica de imagenes" on public.imagenes;
create policy "Lectura publica de imagenes"
  on public.imagenes for select
  using (true);

drop policy if exists "Admin puede insertar imagenes" on public.imagenes;
create policy "Admin puede insertar imagenes"
  on public.imagenes for insert
  with check (public.get_current_user_role() = 'admin');

drop policy if exists "Admin puede eliminar imagenes" on public.imagenes;
create policy "Admin puede eliminar imagenes"
  on public.imagenes for delete
  using (public.get_current_user_role() = 'admin');
