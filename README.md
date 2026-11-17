# Crochet Studio

Tienda online de amigurumis (muñecos tejidos a mano). Muestra el catálogo por categorías, permite armar un carrito y tiene un panel de administración para gestionar productos.

## Stack

- [React 19](https://react.dev/) + [Vite 7](https://vite.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [React Query 5](https://tanstack.com/query/latest) para datos remotos
- [Supabase](https://supabase.com/) (Postgres con RLS, Auth y Storage)
- [Vercel](https://vercel.com/) para el despliegue

## Requisitos

- Node.js 20 o superior (`node -v`)
- npm (viene con Node)
- Git
- Para trabajar con la base local (desde la Fase 2): [Supabase CLI](https://supabase.com/docs/guides/cli) y Docker Desktop

## Instalación y uso local

```bash
git clone https://github.com/Mateperry/CrochetStudio.git
cd CrochetStudio
npm ci
```

Crea el archivo `.env.local` a partir de `.env.example` y completa las variables (ver abajo). Luego:

```bash
npm run dev
```

La app queda en http://localhost:5173.

## Variables de entorno

| Variable | Descripción | Dónde se obtiene |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | URL del proyecto de Supabase | Supabase → Project Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Clave pública (anon) | Supabase → Project Settings → API → anon public |
| `VITE_FORMSPREE_ENDPOINT` | URL del formulario de Contacto (`https://formspree.io/f/<id>`). Sin ella, Contacto muestra un error y el correo de contacto | Formspree → tu formulario → Integration |
| `VITE_WHATSAPP_NUMBER` | Opcional. Número en formato internacional sin `+` ni espacios (ej. `573001234567`). Activa el botón de WhatsApp en Contacto y el pedido por WhatsApp en el checkout | — |

- Copia `.env.example` a `.env.local` y pon los valores ahí.
- **Nunca** subas `.env.local` al repositorio (ya está en `.gitignore`).
- En Vercel, las mismas variables se configuran en Project → Settings → Environment Variables.

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Compila la app para producción en `dist/` |
| `npm run preview` | Sirve localmente la compilación de `dist/` |
| `npm run lint` | Revisa el código con ESLint |

## Base de datos (Supabase)

Todo el esquema vive en `supabase/migrations/` y los datos de ejemplo en `supabase/seed.sql`. Nunca se cambia la base a mano: cada cambio es una migración nueva.

### Base local

Requiere [Supabase CLI](https://supabase.com/docs/guides/cli) y Docker Desktop abierto.

```bash
supabase start      # levanta Postgres, Auth y Storage en Docker
supabase db reset   # recrea la base: aplica migraciones y carga seed.sql
```

`supabase start` imprime la `API URL` (normalmente `http://127.0.0.1:54321`) y la `anon key`. Ponlas en `.env.local`:

```bash
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=<anon key que imprimió supabase start>
```

Para tener un administrador local: regístrate en la app, abre Supabase Studio (`http://127.0.0.1:54323`) → SQL Editor y ejecuta:

```sql
update user_profiles set role = 'admin' where email = '<tu-correo>';
```

Cierra sesión y vuelve a entrar.

### Vista `productos_completos` (pendiente)

La tienda lee los productos de la vista `productos_completos`, que existe en producción pero todavía **no** está versionada. Hasta agregar su migración, la base local no muestra productos. Para obtener la definición: Supabase → SQL Editor → `select pg_get_viewdef('public.productos_completos', true);`.

### Producción

Las migraciones se aplican en producción solo con confirmación del líder técnico: `supabase link --project-ref <ref>` y `supabase db push`, o pegando la migración en el SQL Editor.

Las tres primeras migraciones (`..._esquema_base`, `..._perfiles_y_roles`, `..._politicas_rls`) describen lo que producción **ya tiene**; están escritas con `if not exists` / `drop policy if exists` para que aplicarlas no borre datos. Si usas `supabase db push` sobre la base existente, márcalas primero como aplicadas con `supabase migration repair --status applied <version>` para que solo se ejecuten las nuevas.

Al aplicar `..._guardado_atomico_productos.sql` el panel admin empieza a guardar con `upsert_product` / `delete_product`. **Despliega el frontend y la migración juntos**: el panel nuevo sin la migración muestra "Falta aplicar la migración de guardado de productos".

## Pedidos y pagos

- El checkout (`/checkout`) crea el pedido con la función `create_order` de la base (migración `..._pedidos.sql`). La base toma los precios vigentes de `productos`; el navegador solo manda ids y cantidades.
- Tras confirmar, `/pedido/:id/confirmado` muestra el número de pedido y los siguientes pasos.
- El admin ve y cambia el estado de los pedidos en `/admin` → pestaña **Pedidos**.

### Métodos de pago

Viven en `src/features/checkout/payment/`. Cada método es un objeto `{ id, label, description, isAvailable(), getUrl(order), start(order) }` registrado en `payment/index.js`.

- **WhatsApp** (actual): con `VITE_WHATSAPP_NUMBER` configurado, la confirmación muestra un botón que abre WhatsApp con el resumen del pedido.
- **Agregar una pasarela** (Wompi, Mercado Pago, ePayco): crea `payment/<pasarela>Payment.js` con la misma forma. `getUrl(order)` debe devolver la URL de pago que genere la pasarela (normalmente desde una Edge Function de Supabase que firme la transacción con la llave privada; **nunca** pongas llaves privadas en variables `VITE_*`). Agrégalo al arreglo `PAYMENT_METHODS`.

## SEO y accesibilidad

- Cada página fija su título (`<Página> · Crochet Studio`) y descripción con `src/components/layout/PageMeta.jsx`; el detalle de producto agrega Open Graph con el nombre, la descripción y la primera imagen.
- `index.html` trae etiquetas genéricas de Open Graph/Twitter para los buscadores y redes que no ejecutan JavaScript.
- `public/robots.txt` y `public/sitemap.xml` usan el dominio de ejemplo `https://crochetstudio.example.com`. **Cámbialo por el dominio real** en ambos archivos antes de publicar.
- `npm run lint` incluye `eslint-plugin-jsx-a11y`. Para revisar contraste, etiquetas y foco en el navegador usa la extensión [axe DevTools](https://www.deque.com/axe/devtools/) en cada pantalla.

## Imágenes de productos

Las fotos **no** se guardan en el repositorio. Viven en Supabase Storage (bucket `Imagenes`) y la tienda las carga por URL.

Para agregar fotos nuevas:

1. Pon los originales en una carpeta local (por ejemplo `src/Image/`, que está en `.gitignore`).
2. Optimízalas a WebP:

   ```bash
   npm run images:optimize -- src/Image salida-webp
   ```

   Por cada foto se generan `<nombre>.webp` (máx. 1200 px de ancho) y `<nombre>-thumb.webp` (480 px), con calidad 80.
3. En Supabase → Storage → bucket `Imagenes`, sube los `.webp`.
4. Copia la URL pública de cada archivo (botón *Get URL*).
5. En la tienda, entra a `/admin`, crea o edita el producto y pega las URLs en la sección *Imágenes*.

## Estructura de carpetas

Estructura actual:

```bash
public/            # Archivos estáticos servidos tal cual
src/
 ├── Components/   # Header, AuthModal, ProtectedRoute, ScrollToTop
 ├── Secction/     # Páginas y secciones (Inicio, categorías, detalle, carrito, admin)
 ├── context/      # AuthContext
 ├── hooks/        # useProducts, useCategories, useAuth, useAdminProducts
 ├── lib/          # Cliente de Supabase
 ├── sql/          # Scripts SQL de autenticación y RLS
 ├── App.jsx
 └── main.jsx
```

Estructura objetivo (se adopta en la Fase 3 del plan):

```bash
src/
 ├── app/                 # App, providers y rutas
 ├── pages/               # Una página por ruta
 ├── components/ui/       # Componentes base del sistema de diseño
 ├── components/layout/   # Navegación y layout
 ├── features/<dominio>/  # catalog, cart, auth, admin, checkout
 ├── lib/                 # Utilidades y clientes
 ├── constants/           # Constantes compartidas
 └── styles/              # Tokens y estilos globales
supabase/
 ├── migrations/          # Cambios de esquema
 └── seed.sql
```

## Flujo de ramas

```text
feature/* · fix/* · refactor/* · style/* · chore/* · docs/*
        │  PR + 1 revisión
        ▼
       dev   ── integración + preview de Vercel
        │  PR de fase
        ▼
       test  ── QA
        │  QA aprobado
        ▼
       main  ── producción en Vercel
```

- Toda rama nueva sale de `dev` actualizado. Nombres en minúsculas, en español y con guiones (ej. `fix/errores-criticos-navegacion-y-filtros`).
- Commits: `tipo: Descripción en español`. Tipos: `feat`, `fix`, `refactor`, `style`, `docs`, `chore`.
- Los PR usan la plantilla `.github/pull_request_template.md`.
- Nunca se hace push directo a `main` ni a `test`.

### Integración continua

Cada PR hacia `dev`, `test` o `main` (y cada push a `dev`) corre el workflow `.github/workflows/ci.yml`: `npm ci`, `npm run lint` y `npm run build` con Node 20. **El check `ci` debe estar en verde para hacer merge.** Después del primer merge, márcalo como requerido en GitHub → Settings → Branches para `dev`, `test` y `main`.

El plan de trabajo completo está en [`docs/PLAN_KIRO.md`](docs/PLAN_KIRO.md) y las reglas para agentes en [`AGENTS.md`](AGENTS.md).

## Despliegue en Vercel

- `main` se publica como producción.
- `dev` y cada PR generan un *preview* automático.
- `Vercel.json` redirige todas las rutas a `index.html` para que funcione el enrutado del lado del cliente.
- Para un proyecto nuevo en Vercel: importa el repositorio, elige el preset **Vite**, comando de build `npm run build`, carpeta de salida `dist`, y agrega las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
