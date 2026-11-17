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
