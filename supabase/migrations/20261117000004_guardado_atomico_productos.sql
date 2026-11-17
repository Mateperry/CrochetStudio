-- Guardado atómico de productos desde el panel admin.
-- upsert_product crea o actualiza el producto y reemplaza sus categorías e imágenes en una sola
-- transacción (una función de Postgres es atómica: si algo falla, no queda nada a medias).

create or replace function public.upsert_product(payload jsonb)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id bigint := nullif(payload ->> 'id', '')::bigint;
  v_nombre text := nullif(trim(payload ->> 'nombre'), '');
  v_descripcion text := nullif(trim(payload ->> 'descripcion'), '');
  v_precio numeric := nullif(payload ->> 'precio', '')::numeric;
  v_promo numeric := nullif(payload ->> 'precio_promocional', '')::numeric;
  v_categorias bigint[];
  v_imagenes text[];
begin
  if coalesce(public.get_current_user_role(), '') <> 'admin' then
    raise exception 'Solo un administrador puede guardar productos.' using errcode = '42501';
  end if;

  if v_nombre is null then
    raise exception 'El nombre es obligatorio.' using errcode = '22023';
  end if;
  if v_descripcion is null then
    raise exception 'La descripción es obligatoria.' using errcode = '22023';
  end if;
  if v_precio is null or v_precio <= 0 then
    raise exception 'El precio debe ser mayor a 0.' using errcode = '22023';
  end if;
  if v_promo is not null and (v_promo <= 0 or v_promo >= v_precio) then
    raise exception 'El precio promocional debe ser mayor a 0 y menor al precio.' using errcode = '22023';
  end if;

  select coalesce(array_agg(distinct value::bigint), '{}')
    into v_categorias
    from jsonb_array_elements_text(coalesce(payload -> 'categorias', '[]'::jsonb));

  select coalesce(array_agg(trim(value) order by ordinality), '{}')
    into v_imagenes
    from jsonb_array_elements_text(coalesce(payload -> 'imagenes', '[]'::jsonb)) with ordinality
    where trim(value) <> '';

  if cardinality(v_categorias) = 0 then
    raise exception 'Selecciona al menos una categoría.' using errcode = '22023';
  end if;
  if cardinality(v_imagenes) = 0 then
    raise exception 'Agrega al menos una imagen.' using errcode = '22023';
  end if;
  if exists (select 1 from unnest(v_categorias) c(id) where not exists (select 1 from categorias where categorias.id = c.id)) then
    raise exception 'Alguna de las categorías seleccionadas no existe.' using errcode = '22023';
  end if;

  if v_id is null then
    insert into productos (nombre, precio, precio_promocional, descripcion, personaje, tipo_lana,
                           aguja, dificultad, tamano, tiempo_estimado, detalles)
    values (v_nombre, v_precio, v_promo, v_descripcion,
            nullif(trim(payload ->> 'personaje'), ''), nullif(trim(payload ->> 'tipo_lana'), ''),
            nullif(trim(payload ->> 'aguja'), ''), nullif(trim(payload ->> 'dificultad'), ''),
            nullif(trim(payload ->> 'tamano'), ''), nullif(trim(payload ->> 'tiempo_estimado'), ''),
            nullif(trim(payload ->> 'detalles'), ''))
    returning id into v_id;
  else
    update productos set
      nombre = v_nombre,
      precio = v_precio,
      precio_promocional = v_promo,
      descripcion = v_descripcion,
      personaje = nullif(trim(payload ->> 'personaje'), ''),
      tipo_lana = nullif(trim(payload ->> 'tipo_lana'), ''),
      aguja = nullif(trim(payload ->> 'aguja'), ''),
      dificultad = nullif(trim(payload ->> 'dificultad'), ''),
      tamano = nullif(trim(payload ->> 'tamano'), ''),
      tiempo_estimado = nullif(trim(payload ->> 'tiempo_estimado'), ''),
      detalles = nullif(trim(payload ->> 'detalles'), '')
    where id = v_id;

    if not found then
      raise exception 'El producto % no existe.', v_id using errcode = 'P0002';
    end if;

    delete from producto_categorias where producto_id = v_id;
    delete from imagenes where producto_id = v_id;
  end if;

  insert into producto_categorias (producto_id, categoria_id)
    select v_id, unnest(v_categorias);

  insert into imagenes (producto_id, url)
    select v_id, url from unnest(v_imagenes) with ordinality as t(url, position) order by position;

  return v_id;
end;
$$;

create or replace function public.delete_product(product_id bigint)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(public.get_current_user_role(), '') <> 'admin' then
    raise exception 'Solo un administrador puede eliminar productos.' using errcode = '42501';
  end if;

  -- producto_categorias e imagenes se borran por ON DELETE CASCADE.
  delete from productos where id = product_id;

  if not found then
    raise exception 'El producto % no existe.', product_id using errcode = 'P0002';
  end if;
end;
$$;

revoke all on function public.upsert_product(jsonb) from public, anon;
revoke all on function public.delete_product(bigint) from public, anon;
grant execute on function public.upsert_product(jsonb) to authenticated;
grant execute on function public.delete_product(bigint) to authenticated;
