# Crochet Studio — Plan de ejecución para Kiro

> Plan completo para ejecutar con **Kiro** desde cero: preparar el PC, clonar el repo, configurar Kiro y ejecutar las 8 fases (0 a 7), cada una con sus ramas, prompts, verificaciones y forma de integrar.
>
> - Repo: https://github.com/Mateperry/CrochetStudio
> - Estado revisado: `main` en `79f778d` y `dev` en `a5ddc98` (sin cambios al 17 nov 2026).
> - Stack: React 19 · Vite 7 · Tailwind 3 · React Query 5 · Supabase · Vercel.

---

## Índice

1. [Cómo usar este documento](#1-cómo-usar-este-documento)
2. [Preparar el PC](#2-preparar-el-pc)
3. [Clonar el repo y levantarlo](#3-clonar-el-repo-y-levantarlo)
4. [Configurar Kiro](#4-configurar-kiro)
5. [Flujo de ramas, commits y PR](#5-flujo-de-ramas-commits-y-pr)
6. [Ciclo de trabajo por cada rama](#6-ciclo-de-trabajo-por-cada-rama)
7. [Diagnóstico: qué se va a arreglar](#7-diagnóstico-qué-se-va-a-arreglar)
8. [Dirección visual y paleta](#8-dirección-visual-y-paleta)
9. [Fase 0 — Preparación del repo](#fase-0--preparación-del-repo)
10. [Fase 1 — Bugs que ve el cliente](#fase-1--bugs-que-ve-el-cliente)
11. [Fase 2 — Limpieza, base de datos y CI](#fase-2--limpieza-base-de-datos-y-ci)
12. [Fase 3 — Arquitectura y lógica](#fase-3--arquitectura-y-lógica)
13. [Fase 4 — Sistema de diseño (puerta de aprobación)](#fase-4--sistema-de-diseño-puerta-de-aprobación)
14. [Fase 5 — Navegación, inicio y catálogo](#fase-5--navegación-inicio-y-catálogo)
15. [Fase 6 — Carrito, cuenta, contacto y admin](#fase-6--carrito-cuenta-contacto-y-admin)
16. [Fase 7 — Checkout, pedidos y calidad](#fase-7--checkout-pedidos-y-calidad)
17. [Checklist de QA por fase](#17-checklist-de-qa-por-fase)
18. [Puntos donde Kiro debe detenerse y preguntar](#18-puntos-donde-kiro-debe-detenerse-y-preguntar)
19. [Problemas comunes](#19-problemas-comunes)

---

## 1. Cómo usar este documento

- Se ejecuta **en orden**: Fase 0 → 1 → 2 → 3 → 4 → (aprobación) → 5 → 6 → 7.
- Cada fase tiene una o varias **ramas**. Regla: **una rama = un prompt = un PR**.
- Para cada rama sigue el [ciclo de la sección 6](#6-ciclo-de-trabajo-por-cada-rama): crear rama → pegar prompt en Kiro → verificar → commit → PR a `dev`.
- Al cerrar cada fase: PR `dev → test`, QA ([sección 17](#17-checklist-de-qa-por-fase)), luego PR `test → main`.
- Los bloques marcados **"Prompt para Kiro"** se copian completos en el chat de Kiro (modo *Vibe*) o como descripción de un *Spec* (ver sección 4.3).
- Los bloques **"Comandos"** los ejecuta una persona (o Kiro con tu aprobación) en la terminal.

> Nota: en la revisión original no se pudo correr `npm ci`, `lint` ni `build` (sin acceso al registro npm). La Fase 0 los corre y deja la lista real de errores.

---

## 2. Preparar el PC

Instala esto antes de empezar (Windows, macOS o Linux):

| Herramienta | Versión | Para qué | Verificar |
| --- | --- | --- | --- |
| Git | 2.40+ | Clonar y ramas | `git --version` |
| Node.js | 20 LTS o 22 LTS | Correr el proyecto | `node -v` |
| npm | viene con Node | Dependencias | `npm -v` |
| GitHub CLI (opcional) | reciente | Abrir PR desde terminal | `gh --version` |
| Supabase CLI | reciente | Migraciones (Fases 2, 3 y 7) | `supabase --version` |
| Docker Desktop | reciente | Base local de Supabase (Fase 2 en adelante) | `docker --version` |
| Kiro | reciente | El agente | abrir la app |

Instalación rápida:

**Windows (PowerShell como administrador):**

```powershell
winget install --id Git.Git -e
winget install --id OpenJS.NodeJS.LTS -e
winget install --id GitHub.cli -e
winget install --id Docker.DockerDesktop -e
# Supabase CLI (con Scoop):
# irm get.scoop.sh | iex
# scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
# scoop install supabase
```

**macOS:**

```bash
brew install git node@20 gh supabase/tap/supabase
brew install --cask docker
```

Configura Git una sola vez:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@ejemplo.com"
git config --global core.autocrlf input   # en Windows usa: true
gh auth login                              # si usas GitHub CLI
```

---

## 3. Clonar el repo y levantarlo

> El repo pesa más de 660 MB por las imágenes de `src/Image` (se eliminan en la Fase 2). El primer clon puede tardar varios minutos.

**Comandos:**

```bash
# 1. Clonar
git clone https://github.com/Mateperry/CrochetStudio.git
cd CrochetStudio

# 2. Traer todas las ramas
git fetch --all
git branch -a          # debes ver origin/main y origin/dev

# 3. Variables de entorno (pide las claves al líder técnico)
#    macOS/Linux:
cat > .env.local <<'EOF'
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_ANON_KEY
EOF
#    Windows PowerShell:
#    Set-Content .env.local "VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co`nVITE_SUPABASE_ANON_KEY=TU_ANON_KEY"

# 4. Instalar y probar
npm ci
npm run dev            # abre http://localhost:5173
npm run lint
npm run build
```

Los valores están en Supabase → *Project Settings* → *API* (`Project URL` y `anon public`). **Nunca** subas `.env.local` (ya está en `.gitignore`).

Abre la carpeta `CrochetStudio` en Kiro (*File → Open Folder*).

---

## 4. Configurar Kiro

### 4.1 Guardar este plan dentro del repo

Copia este archivo a `docs/PLAN_KIRO.md` en la rama de la Fase 0 para que Kiro y el equipo lo tengan siempre a mano.

### 4.2 Archivo de steering (reglas permanentes)

Kiro lee las reglas del proyecto desde `.kiro/steering/`. Crea **`.kiro/steering/crochet-studio.md`** con este contenido (se hace dentro de la Fase 0):

```markdown
---
inclusion: always
---

# Reglas del proyecto Crochet Studio

## Contexto
- Tienda online de amigurumis. React 19 + Vite 7 + Tailwind 3 + React Query 5 + Supabase. Despliegue en Vercel.
- El plan completo está en docs/PLAN_KIRO.md. Ejecuta SOLO la rama/tarea que se te pida.

## Idioma
- Código, nombres de archivos, componentes, funciones y variables: inglés.
- Textos visibles al usuario: español.
- Ramas, commits y PR: español con prefijo de tipo.

## Git
- Ramas: main (producción), test (QA), dev (integración), feature/*, fix/*, refactor/*, style/*, chore/*, docs/*.
- Toda rama nueva sale de dev. Nunca trabajes ni hagas push sobre main o test.
- Commits: "tipo: Descripción en español". Tipos: feat, fix, refactor, style, docs, chore.
- No borres ramas hasta que el cambio llegue a main.
- No hagas force push ni reescribas historial sin permiso explícito.

## Código
- Componentes pequeños con una sola responsabilidad. Sin duplicar lógica.
- Sin CSS inline (style={{}}) salvo valores calculados imposibles en Tailwind.
- Desde la Fase 4: prohibido usar colores hex sueltos en componentes; solo tokens del tema.
- Manejo de errores en todo acceso a datos: estado de carga, vacío y error con mensaje en español.
- Nunca uses alert(), confirm() ni prompt().
- No agregues dependencias sin justificarlo en el resumen.
- No toques archivos fuera del alcance de la tarea.

## Supabase
- Cambios de base SOLO como migraciones en supabase/migrations.
- Nunca apliques migraciones en producción sin confirmación explícita.
- Nunca pongas claves en el código; usa variables VITE_*.

## Antes de terminar cada tarea
1. Corre npm run lint y npm run build (y npm test cuando exista). Deben pasar.
2. Entrega este resumen:
   - Qué hiciste
   - Archivos impactados
   - Manejo de errores agregado o verificado
   - Cómo probarlo
   - Riesgos o hallazgos
   - ¿Necesitas confirmación? (sí/no)

## Detente y pregunta antes de
- Borrar código o archivos no triviales, mover/renombrar archivos clave.
- Cambiar el esquema o políticas de la base de datos en producción.
- Reescribir historial de Git.
- Cualquier decisión con varios caminos válidos.
```

### 4.3 Vibe o Spec

- **Vibe (chat):** para ramas pequeñas (Fase 0, 1, 2c). Pega el prompt y revisa el diff.
- **Spec:** para ramas grandes (3a, 3b, 4, 5a, 7a). En Kiro crea un *Spec* nuevo, pega el prompt como descripción, revisa los `requirements.md`, `design.md` y `tasks.md` que genera, ajústalos si hace falta y ejecuta las tareas una por una.
- En ambos casos: **revisa cada cambio antes de aceptarlo** y no apruebes comandos que hagan push a `main`/`test` o borren archivos sin que tú lo hayas decidido.

---

## 5. Flujo de ramas, commits y PR

```
feature/* · fix/* · style/* · refactor/* · chore/* · docs/*
        │  PR + 1 revisión
        ▼
       dev   ── integración + preview de Vercel
        │  PR de fase
        ▼
       test  ── QA al cerrar la fase
        │  QA aprobado
        ▼
       main  ── producción en Vercel
```

- **Nombres de rama:** minúsculas, español, guiones. Ej.: `fix/errores-criticos-navegacion-y-filtros`.
- **Commits:** `fix: Corregir filtro de categorías con tilde`.
- **PR (plantilla):**

```markdown
## Qué se hizo
## Por qué
## Cómo probarlo
## Riesgos / supuestos
## Evidencia (capturas antes/después si hay cambio visual)
```

- **Protección en GitHub** (Settings → Branches → Add rule): `main` y `test` con PR obligatorio, 1 aprobación, sin force push; `dev` con PR obligatorio.
- **Vercel:** `main` = producción; `dev` y cada PR generan *preview*.

---

## 6. Ciclo de trabajo por cada rama

Repite esto para **cada** rama del plan:

```bash
# 1. Partir de dev actualizado
git checkout dev
git pull origin dev

# 2. Crear la rama
git checkout -b <nombre-de-la-rama>

# 3. Pegar el prompt de esa rama en Kiro y dejar que trabaje.
#    Revisar y aceptar los cambios.

# 4. Verificar
npm run lint
npm run build
npm run dev        # probar a mano lo que diga el prompt

# 5. Commit y push
git add -A
git status         # revisa que no vayan .env ni archivos ajenos
git commit -m "tipo: Descripción en español"
git push -u origin <nombre-de-la-rama>

# 6. Abrir PR hacia dev
gh pr create --base dev --title "tipo: Descripción" --body-file .github/pull_request_template.md
#    (o desde la web de GitHub)

# 7. Revisar el preview de Vercel, aprobar y hacer merge a dev.
```

Al **cerrar una fase**:

```bash
gh pr create --base test --head dev --title "release: Fase N a QA"
# QA con el checklist de la sección 17, luego:
gh pr create --base main --head test --title "release: Fase N a producción"
```

---

## 7. Diagnóstico: qué se va a arreglar

| Prioridad | Hallazgo | Dónde | Fase |
| --- | --- | --- | --- |
| Alta | Películas y Fantasía nunca aparecen en Inicio: filtran por `"Peliculas"` / `"Fantasia"` sin tilde y la base guarda `Películas` / `Fantasía` | `src/Secction/Inicio.jsx` líneas 10 y 12 | 1 |
| Alta | `base: "./"` en Vite rompe la recarga de `/producto/:id` en Vercel | `vite.config.js` | 1 |
| Alta | `icon.png` está en la raíz, no en `public/`: el favicon no se publica | `index.html`, `icon.png` | 1 |
| Alta | `ProtectedRoute` llama `onRequireAuth()` (un `setState` del padre) durante el render | `src/Components/ProtectedRoute.jsx` | 1 |
| Alta | `useLocation()` se llama después de un `return` temprano | `src/Secction/SeccionProductos.jsx` | 1 |
| Alta | 662 MB en 138 PNG versionados en `src/Image` que ningún archivo importa | `src/Image/` | 2 |
| Media | `Lamp.jsx` importa `framer-motion`, que no está en `package.json` | `src/Secction/Lamp.jsx` | 1 |
| Media | La vista `productos_completos` no está versionada | `src/hooks/useProducts.js` | 2 |
| Media | El carrito muta estado, guarda precios en `localStorage` y hay 6 `alert()` | `App.jsx`, `Carrito.jsx`, `Contact.jsx` | 3 |
| Media | Editar un producto borra y reinserta imágenes/categorías desde el navegador sin transacción | `src/hooks/useAdminProducts.js` | 3 |
| Media | Si Supabase falla, toda la app muestra error (incluido Contacto) | `src/App.jsx` | 3 |
| Media | 8 páginas de categoría casi idénticas | `src/Secction/*.jsx` | 3 |
| Media | Checkout es texto de relleno | `src/Secction/Checkout.jsx` | 7 |
| Media | `AGENTS.md` describe un proyecto Razor/.NET | `AGENTS.md` | 0 |
| Baja | README es la plantilla de Vite con texto UTF-16 al final; falta `.env.example` | `README.md` | 0 |
| Baja | Colores hex sueltos (`#272321` ×54, `#71675d` ×52); Poppins configurada pero no cargada | `src/**`, `tailwind.config.js` | 4 |
| Baja | `src/output.css` (554 líneas) compilado y sin uso | `src/output.css` | 2 |
| Baja | `lang="en"`, sin 404, sin SEO, botón hamburguesa sin `aria-label`, clases rotas | varios | 1, 5, 7 |
| Baja | Carpeta `Secction` mal escrita, nombres en español en el código | `src/Secction/` | 3 |
| Baja | Sin pruebas ni CI | repo | 2, 7 |

Lo que ya está bien: RLS activo con escritura solo admin, `get_current_user_role()` evita recursión, claves fuera del repo, errores de login traducidos.

---

## 8. Dirección visual y paleta

**Decisión:** minimalismo cálido con **vidrio solo en capas flotantes** (navegación, panel de carrito, modales, chips de filtro, barra inferior móvil). Tarjetas, detalle, formularios y admin son **sólidos**. Razón: las fotos de amigurumis son muy coloridas; un fondo claro las destaca y el vidrio en todo competiría con ellas y sería lento en celulares.

**Sí se cambia de color.** La paleta actual no cumple contraste:

| Combinación actual | Contraste | Mínimo |
| --- | --- | --- |
| Texto `#272321` sobre fondo `#837a6d` | 3,68:1 | 4,5:1 |
| Enlace amarillo sobre `#837a6d` | 3,63:1 | 4,5:1 |
| Blanco sobre hero `#837a6d` | 4,23:1 | 4,5:1 |

**Paleta "Algodón y terracota":**

| Token | Claro | Oscuro | Uso | Contraste |
| --- | --- | --- | --- | --- |
| `--color-bg` | `#FAF7F2` | `#171412` | Fondo | — |
| `--color-surface` | `#FFFFFF` | `#211D1A` | Tarjetas, paneles | — |
| `--color-surface-muted` | `#F2EDE6` | `#2A2522` | Zonas secundarias, inputs | — |
| `--color-ink` | `#2A2420` | `#F3EDE6` | Texto principal | 14,3:1 / 15,8:1 |
| `--color-ink-muted` | `#6B625A` | `#B8AEA4` | Texto secundario | 5,6:1 / 8,4:1 |
| `--color-line` | `#E6DFD6` | `#3A332E` | Bordes | — |
| `--color-accent` | `#B04A33` | `#E07A5F` | Botón principal, activo | 5,4:1 (blanco encima) / 6,2:1 |
| `--color-accent-soft` | `#F6E3DC` | `#3B2520` | Badges, hover | — |
| `--color-sage` | `#7C9A85` | `#9DB8A5` | Acento secundario (decorativo) | — |
| `--color-success` | `#2F7D5B` | `#5FB48C` | Descuentos, éxito | 5,0:1 |
| `--glass-bg` | `rgba(255,255,255,0.62)` | `rgba(33,29,26,0.6)` | Vidrio | ≈13,4:1 |
| `--glass-border` | `rgba(255,255,255,0.55)` | `rgba(255,255,255,0.08)` | Borde del vidrio | — |
| `--glass-blur` | `16px` | `16px` | `backdrop-filter` | — |

Tipografía: **Fraunces** (títulos) + **Inter** (texto). Radios 12–16 px, sombras suaves, espaciado en múltiplos de 4, una sola acción en color por pantalla.

---

## Fase 0 — Preparación del repo

**Objetivo:** ramas alineadas, reglas correctas para Kiro, README útil y diagnóstico real de lint/build.

**Lista cuando:** `dev`, `test` y `main` apuntan al mismo commit; `AGENTS.md` ya no menciona Razor/.NET/`wwwroot`; existe `.kiro/steering/crochet-studio.md`; un desarrollador nuevo levanta el proyecto solo con el README.

### 0.1 Sincronizar ramas (lo hace el líder técnico, una vez)

**Comandos:**

```bash
git fetch origin
git checkout dev
git merge --ff-only origin/main     # dev está 2 commits detrás de main
git push origin dev
git checkout -b test
git push -u origin test
```

Luego en GitHub → Settings → Branches: proteger `main`, `test` y `dev` (ver sección 5). En Vercel confirmar que *Production Branch* = `main`.

### 0.2 Rama `docs/actualizar-agents-y-readme`

**Prompt para Kiro:**

```text
Estás en el repo CrochetStudio (React 19 + Vite 7 + Tailwind 3 + React Query 5 + Supabase, desplegado en Vercel). Ya estás en la rama docs/actualizar-agents-y-readme creada desde dev.

Tareas:
1. Crea .kiro/steering/crochet-studio.md con el contenido exacto de la sección 4.2 de docs/PLAN_KIRO.md (si docs/PLAN_KIRO.md no existe todavía, te lo pego aparte; no lo inventes).
2. Reescribe AGENTS.md para ESTE proyecto. Conserva sus reglas de SOLID, manejo de errores, formato de salida, checklist y flujo Git, pero:
   - Contexto técnico: React + Vite + Tailwind + Supabase. Elimina toda mención a Razor, .NET y wwwroot.
   - Estructura objetivo: src/app (providers, rutas), src/pages, src/components/ui, src/components/layout, src/features/<dominio> (catalog, cart, auth, admin), src/lib, src/constants, src/styles, supabase/migrations.
   - Ramas: main (producción), test (QA), dev (integración), feature/*, fix/*, refactor/*, style/*, chore/*, docs/*. Reemplaza master por main.
   - Commits: feat, fix, refactor, style, docs, chore.
   - Estilos: Tailwind con tokens del tema; prohibidos hex sueltos en componentes desde la Fase 4.
   - Código en inglés, UI en español.
3. Reemplaza README.md (hoy es la plantilla de Vite y tiene texto UTF-16 al final; guárdalo en UTF-8) por uno en español: qué es, stack, requisitos (Node 20+), cómo instalar y correr, variables de entorno, scripts, estructura de carpetas, flujo de ramas, cómo desplegar en Vercel.
4. Crea .env.example con VITE_SUPABASE_URL= y VITE_SUPABASE_ANON_KEY= vacías.
5. Crea .github/pull_request_template.md con: Qué se hizo, Por qué, Cómo probarlo, Riesgos / supuestos, Evidencia.
6. Corre npm ci, npm run lint y npm run build. NO arregles nada de src/: lista cada error y warning (archivo, línea, regla) en tu resumen para usarlos en la Fase 1.

No toques nada dentro de src/. Entrega el resumen del formato de salida.
```

Además, copia este plan a `docs/PLAN_KIRO.md` en esta misma rama.

**Commit sugerido:** `docs: Actualizar AGENTS, README y reglas de Kiro`

---

## Fase 1 — Bugs que ve el cliente

**Rama:** `fix/errores-criticos-navegacion-y-filtros`

**Lista cuando:** Inicio muestra las 8 secciones con productos; recargar `/producto/1` en el preview de Vercel funciona; el favicon aparece; sin errores de React en consola al entrar a `/admin` sin sesión; `lint` y `build` pasan.

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Estás en la rama fix/errores-criticos-navegacion-y-filtros (desde dev). Cambios acotados, SIN reorganizar carpetas (eso es la Fase 3).

1. Categorías: src/Secction/Inicio.jsx filtra por "Peliculas" y "Fantasia" sin tilde, pero la base guarda "Películas" y "Fantasía" (ver src/insert_data.sql). Crea src/constants/categories.js con una lista de objetos { slug, dbName, title, path } para: Novedades, Ofertas (dbName "Promocion"; useProducts ya lo traduce a "Ofertas"), Anime, Películas, Series, Fantasía, Animales, Personalizados. Úsalo en Inicio.jsx, en SeccionProductos.jsx (reemplaza rutaPorTitulo) y en las 8 páginas de categoría. Una sola fuente de verdad.
2. vite.config.js: cambia base "./" por "/".
3. Mueve icon.png a public/icon.png y corrige index.html: <link rel="icon" type="image/png" href="/icon.png">. Cambia lang="en" por lang="es".
4. src/Components/ProtectedRoute.jsx llama onRequireAuth() durante el render. Muévelo a un useEffect que dependa de isLoading y user.
5. src/Secction/SeccionProductos.jsx llama useLocation() después de un return temprano. Mueve todos los hooks antes del return.
6. src/Secction/Lamp.jsx importa "framer-motion" (no está en package.json). Usa "motion/react" como en AuthModal.jsx. Quita imports sin uso (useEffect).
7. src/Secction/DetallesDelProducto.jsx: la imagen principal no se actualiza al navegar a otro producto (useState inicial). Resetéala cuando cambie el id.
8. Corrige clases Tailwind inválidas en TarjetasInicio.jsx ("text-grayblock", "text-gray-") y la clase h-90 en DetallesDelProducto.jsx (no existe en Tailwind 3).
9. Agrega aria-label="Abrir menú" / "Cerrar menú" a los botones hamburguesa de src/Components/Header.jsx.
10. Corrige los errores de lint que listaste en la Fase 0 que estén en los archivos tocados.

Verifica con npm run lint y npm run build. En el resumen, explica cómo comprobar cada punto en el preview de Vercel.
```

**Prueba manual:** Inicio muestra Películas y Fantasía; abrir un producto y recargar (F5) en el preview; ver el favicon; entrar a `/admin` sin sesión y revisar la consola.

**Commit:** `fix: Corregir filtros de categorías, rutas y errores de render`

**Cierre de fase:** PR `dev → test`, QA, PR `test → main`.

---

## Fase 2 — Limpieza, base de datos y CI

Tres ramas. Orden: **2c → 2a → 2b** (así el CI ya valida las otras dos).

**Lista cuando:** el repo (sin historial) pesa menos de 20 MB; la base se recrea desde cero con migraciones; cada PR muestra el check de CI en verde.

### 2c — `chore/ci-lint-build`

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Rama chore/ci-lint-build desde dev.

1. Crea .github/workflows/ci.yml que corra en pull_request hacia dev, test y main y en push a dev:
   - runs-on ubuntu-latest, actions/checkout@v4, actions/setup-node@v4 con node-version 20 y cache npm.
   - npm ci, npm run lint, npm run build con env VITE_SUPABASE_URL=https://example.supabase.co y VITE_SUPABASE_ANON_KEY=ci-placeholder.
2. Agrega "engines": { "node": ">=20" } en package.json.
3. Agrega un archivo .nvmrc con 20.
4. Documenta en el README que el check debe estar verde para hacer merge.
```

Después del merge: en GitHub marca el check `ci` como requerido en la protección de `dev`, `test` y `main`.

### 2a — `chore/limpieza-imagenes-y-archivos`

> **Antes de empezar (persona):** entra a Supabase → Storage → bucket `Imagenes` y confirma que las fotos de los productos están ahí. Si falta alguna, súbela antes de borrar nada.

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Rama chore/limpieza-imagenes-y-archivos desde dev.

Contexto: src/Image tiene 138 PNG (~662 MB, hasta 6,8 MB cada uno). La tienda usa URLs de Supabase Storage (bucket "Imagenes", ver src/insert_data.sql); creemos que ningún archivo importa src/Image.

1. Busca en todo el repo referencias a "src/Image", "Image/" y a los nombres de esos archivos. Si alguno se usa, DETENTE y repórtalo.
2. Crea scripts/optimize-images.mjs usando sharp (devDependency): recibe carpeta de entrada y de salida por argumentos; por cada imagen genera <nombre>.webp de máximo 1200 px de ancho y calidad 80, y <nombre>-thumb.webp de 480 px. Se corre a mano en local, no en el build. Agrega el script "images:optimize" en package.json.
3. Muéstrame la lista de archivos a eliminar y ESPERA mi confirmación. Con la confirmación:
   - Elimina src/Image/ completo y src/output.css (CSS compilado viejo que nadie importa; verifica con grep).
   - Elimina src/assets/react.svg y public/vite.svg si no se usan.
   - Agrega src/Image/ a .gitignore.
4. Documenta en el README cómo optimizar y subir imágenes nuevas al bucket (en WebP) y cómo usarlas desde el panel admin.

NO reescribas el historial de Git.
```

> **Opcional (decisión del líder):** limpiar los 662 MB del historial con `git filter-repo --path src/Image --invert-paths`. Exige force push a todas las ramas y que todo el equipo vuelva a clonar. Hazlo solo con el equipo avisado y fuera de horario de trabajo.

### 2b — `chore/migraciones-supabase`

> **Antes de empezar (persona):** en Supabase → SQL Editor ejecuta y guarda el resultado:
>
> ```sql
> select pg_get_viewdef('public.productos_completos', true);
> ```
>
> o, con la CLI: `supabase login`, `supabase link --project-ref TU_REF`, `supabase db dump --schema public -f dump_actual.sql` (no subas el dump al repo). Esto se le pasa a Kiro en el paso 3.

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Rama chore/migraciones-supabase desde dev.

1. Ejecuta supabase init (crea supabase/config.toml). No te conectes a la base de producción.
2. Crea migraciones ordenadas en supabase/migrations/ (formato YYYYMMDDHHMMSS_nombre.sql):
   a. Esquema base: tablas categorias, productos, producto_categorias, imagenes. Deduce columnas y tipos de src/insert_data.sql y src/hooks/useAdminProducts.js. Llaves foráneas con ON DELETE CASCADE desde producto_categorias e imagenes hacia productos.
   b. user_profiles, trigger handle_new_user y función get_current_user_role(), combinando src/sql/setup_auth_and_rls.sql y src/sql/fix_rls_recursion.sql en su ESTADO FINAL (sin políticas recursivas). Agrega SET search_path = public a las funciones SECURITY DEFINER.
   c. Políticas RLS finales de todas las tablas.
   d. Vista productos_completos: te pegaré su definición actual. NO la inventes; si no la tienes, deja la migración pendiente y pregúntame.
3. Mueve src/insert_data.sql a supabase/seed.sql. Reemplaza "https://<tu-proyecto>.supabase.co" por una URL de ejemplo y documenta cómo cambiarla.
4. Cuando todo esté en migraciones, elimina src/sql/ (pide confirmación).
5. README: cómo levantar la base local (supabase start, supabase db reset) y cómo apuntar el .env.local a la base local.
6. Prueba: supabase start y supabase db reset deben correr sin errores, y npm run dev debe mostrar productos contra la base local.

No apliques nada en producción.
```

**Cierre de fase:** PR `dev → test`, QA, PR `test → main`.

---

## Fase 3 — Arquitectura y lógica

Orden obligatorio: **3a sola primero** (mueve archivos; si se hace en paralelo genera conflictos). Después 3b, 3c y 3d pueden ir en paralelo. La Fase 4 puede empezar cuando 3a esté en `dev`.

**Lista cuando:** no existe `src/Secction`; no hay `alert(` en el código; `/categoria/:slug` reemplaza las 8 páginas con redirecciones; editar un producto con datos inválidos no lo deja a medias; Contacto funciona aunque Supabase falle.

### 3a — `refactor/estructura-carpetas` (usar Spec)

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Rama refactor/estructura-carpetas desde dev. SOLO mover y renombrar; cero cambios de comportamiento o estilos.

Primero propón el mapa completo origen → destino y ESPERA mi confirmación. Estructura objetivo:
- src/app/: App.jsx, providers (QueryClient, Auth), routes.jsx
- src/pages/: HomePage, CategoryPage (temporal: deja las 8 páginas actuales renombradas, se unifican en 3c), ProductDetailPage, CartPage, CheckoutPage, ContactPage, admin/AdminDashboardPage
- src/features/catalog/: ProductGrid (antes TarjetasInicio), ProductSection (antes SeccionProductos), Hero (antes Lamp), hooks/useProducts, hooks/useCategories
- src/features/cart/: (vacío por ahora salvo lo que exista)
- src/features/auth/: AuthContext, useAuth, AuthModal, ProtectedRoute
- src/features/admin/: ProductForm, ProductList, hooks/useAdminProducts
- src/components/layout/: Navigation (antes Header/Sidebar), ScrollToTop
- src/components/ui/: (vacío por ahora)
- src/lib/: supabase.js, cn.js (antes src/Secction/Utils.jsx)
- src/constants/: categories.js
Nombres de archivos y componentes en inglés. Textos visibles siguen en español. Corrige el import "../src/Components/ScrollToTop" de App.jsx. Actualiza todos los imports. Usa git mv para conservar historial.
npm run lint y npm run build deben pasar y la app debe verse y comportarse igual.
```

### 3b — `refactor/carrito-con-contexto`

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Rama refactor/carrito-con-contexto desde dev (con 3a ya integrada).

1. Crea src/features/cart/CartContext.jsx con useReducer y acciones add, remove, updateQuantity, clear. Inmutable (hoy el carrito hace copia[index].cantidad = ...). Expón un hook useCart().
2. Persistencia en localStorage con clave "crochet-cart:v1" y SOLO [{ productId, quantity }]. Lectura con try/catch: JSON corrupto o versión distinta → carrito vacío. Migra la clave vieja "carrito" una sola vez si existe.
3. Precios, nombres e imágenes se toman siempre de useProducts. Si un producto del carrito ya no existe, se quita y se avisa.
4. Cantidad entre 1 y 10 validada en el reducer. Agregar un producto que ya está suma cantidad (sin pasar de 10) en lugar de rechazarlo.
5. Crea un sistema de avisos simple en src/components/ui/Toast (ToastProvider + useToast), sin librerías nuevas, accesible (role="status", aria-live="polite"), que se cierra solo a los 4 s.
6. Reemplaza los 6 alert() del proyecto (App.jsx ×2, CartPage ×1, ContactPage ×3) por toasts o mensajes en pantalla.
7. App.jsx deja de manejar el carrito y de pasar agregarAlCarrito/carrito por props. Los componentes usan useCart().
8. Elimina por índice → elimina por productId; keys de listas por id, no por índice.
```

### 3c — `refactor/pagina-categoria-unica`

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Rama refactor/pagina-categoria-unica desde dev (con 3a integrada).

1. Reemplaza las 8 páginas de categoría casi idénticas por una CategoryPage en la ruta /categoria/:slug, usando src/constants/categories.js. Ofertas = productos con precioPromocional o con categoría "Ofertas".
2. Redirige las rutas viejas (/novedades, /ofertas, /animes, /peliculas, /series, /fantasia, /animales, /personalizados) a /categoria/<slug> con <Navigate replace>, para no romper enlaces compartidos.
3. Slug desconocido → NotFoundPage en español. Agrega también la ruta comodín * con la misma página.
4. Quita el estado global de carga y error de App.jsx. Cada página que usa productos muestra su propio skeleton y su error con botón "Reintentar" que llama refetch() de React Query (no window.location.reload). ContactPage y CheckoutPage no dependen de productos y deben funcionar aunque Supabase falle.
5. Configura el QueryClient con retry: 1 y refetchOnWindowFocus: false.
6. Actualiza los enlaces de la navegación a las nuevas rutas.
```

### 3d — `fix/guardado-atomico-productos`

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Rama fix/guardado-atomico-productos desde dev (con las migraciones de la Fase 2 integradas).

Hoy src/features/admin/hooks/useAdminProducts.js crea y edita productos con varias llamadas desde el navegador (producto → borra/inserta categorías → borra/inserta imágenes). Si una falla a mitad, el producto queda incompleto.

1. Crea una migración con:
   - upsert_product(payload jsonb) returns int: inserta o actualiza el producto, reemplaza categorías e imágenes, todo en una transacción. Valida campos obligatorios, precio > 0 y precio_promocional < precio.
   - delete_product(product_id int) returns void.
   Ambas SECURITY DEFINER, SET search_path = public, y lo primero que hacen es verificar get_current_user_role() = 'admin' (si no, RAISE EXCEPTION con mensaje claro).
   - GRANT EXECUTE solo a authenticated.
2. Cambia los hooks para usar supabase.rpc('upsert_product', { payload }) y supabase.rpc('delete_product', { product_id }). Conserva los mensajes de error en español e invalida la query ['productos'].
3. Prueba en local: supabase db reset, crea un usuario, márcalo admin con UPDATE user_profiles SET role='admin', y prueba crear, editar (incluida una URL de imagen vacía) y borrar.
4. Explica en el resumen cómo aplicar la migración en producción, pero NO la apliques: espera confirmación.
```

> **Persona, después del merge a `main`:** aplicar la migración en producción con `supabase db push` (con el proyecto linkeado) o pegándola en el SQL Editor, y probar el panel admin.

**Cierre de fase:** PR `dev → test`, QA, PR `test → main`.

---

## Fase 4 — Sistema de diseño (puerta de aprobación)

**Rama:** `feature/sistema-de-diseno` (usar Spec). No cambia ninguna pantalla existente.

**Lista cuando:** el equipo aprueba `/style-guide` en celular y escritorio con fotos reales; todos los textos cumplen 4,5:1; el vidrio se ve bien y no se usa en tarjetas.

**Puerta de decisión:** si la paleta no convence, se cambian **solo los valores de los tokens** en esta rama. No se pasa a la Fase 5 sin aprobación.

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Rama feature/sistema-de-diseno desde dev. NO modifiques pantallas existentes.

Dirección: minimalismo cálido; vidrio (glassmorphism) SOLO en capas flotantes: navegación, panel de carrito, modales, chips de filtro. Tarjetas y formularios son sólidos.

1. src/styles/tokens.css con variables en :root (claro) y en [data-theme="dark"], más @media (prefers-color-scheme: dark) aplicado a :root:not([data-theme="light"]):
   --color-bg #FAF7F2 / #171412
   --color-surface #FFFFFF / #211D1A
   --color-surface-muted #F2EDE6 / #2A2522
   --color-ink #2A2420 / #F3EDE6
   --color-ink-muted #6B625A / #B8AEA4
   --color-line #E6DFD6 / #3A332E
   --color-accent #B04A33 / #E07A5F
   --color-accent-soft #F6E3DC / #3B2520
   --color-sage #7C9A85 / #9DB8A5
   --color-success #2F7D5B / #5FB48C
   --glass-bg rgba(255,255,255,0.62) / rgba(33,29,26,0.6)
   --glass-border rgba(255,255,255,0.55) / rgba(255,255,255,0.08)
   --glass-blur 16px
   Radios --radius-md 12px y --radius-lg 16px; sombras --shadow-sm y --shadow-md muy suaves.
   Guarda los colores como canales RGB (ej. --color-accent: 176 74 51) para que Tailwind soporte opacidad (bg-accent/20).
2. Importa tokens.css en src/index.css y quita el background-color #837a6d del body (usa bg-bg text-ink).
3. tailwind.config.js: conviértelo a ESM (export default) por consistencia con "type": "module". Mapea en theme.extend.colors: bg, surface, surface-muted, ink, ink-muted, line, accent, accent-soft, sage, success, con el formato rgb(var(--x) / <alpha-value>). borderRadius md/lg y boxShadow sm/md desde los tokens. fontFamily: display ['Fraunces', 'serif'], sans ['Inter', 'system-ui', 'sans-serif']. Activa darkMode: ['selector', '[data-theme="dark"]'].
4. index.html: carga Fraunces (600, 700) e Inter (400, 500, 600) de Google Fonts con display=swap; quita Merriweather.
5. Utilidad .glass en @layer components de src/index.css: background var(--glass-bg), border 1px solid var(--glass-border), backdrop-filter y -webkit-backdrop-filter blur(var(--glass-blur)) saturate(140%). Respaldo sólido con @supports not (backdrop-filter: blur(1px)). Respeta prefers-reduced-transparency (fondo sólido) y prefers-reduced-motion.
6. Componentes en src/components/ui (inglés, accesibles, con foco visible):
   Button (variants primary/secondary/ghost/danger; sizes sm/md; estado loading), Card, Badge (neutral/accent/success), Input, Select, Textarea (con label y mensaje de error), Modal (vidrio, cierre con Escape y clic fuera, foco atrapado), GlassPanel, Skeleton, ThemeToggle (guarda la preferencia en localStorage con try/catch).
7. Página /style-guide (ruta registrada solo si import.meta.env.DEV) que muestre: muestras de color con su contraste, escala tipográfica, todos los componentes en claro y oscuro, y una cuadrícula de 6 productos reales (useProducts) con una barra de navegación de vidrio fija encima para validar el efecto.
8. En el resumen incluye capturas o pasos para revisar /style-guide en 375 px y 1440 px, claro y oscuro.
```

**Validación (equipo):** abrir `/style-guide` en el preview o en local, en celular real y escritorio. Aprobar o pedir ajustes de tokens. Anotar la decisión en el PR.

**Cierre de fase:** PR `dev → test`, QA, PR `test → main` (no cambia nada visible para el cliente).

---

## Fase 5 — Navegación, inicio y catálogo

Ramas: **5a → 5b → 5c** (en ese orden).

**Lista cuando:** cero hex sueltos en estas pantallas; Lighthouse móvil con Accesibilidad ≥ 95 y LCP < 2,5 s en el preview; navegación usable con teclado.

### 5a — `style/navegacion-vidrio` (usar Spec)

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Rama style/navegacion-vidrio desde dev, con el sistema de diseño de la Fase 4 integrado. Usa solo tokens y componentes de src/components/ui.

Reemplaza la barra lateral de src/components/layout/Navigation por:
- Escritorio (≥768 px): barra superior fija con .glass. Izquierda: nombre "Crochet Studio" en fuente display (enlace a /). Centro: Inicio y un menú desplegable "Categorías" (desde src/constants/categories.js). Derecha: carrito con contador (useCart), ThemeToggle y cuenta (botón "Iniciar sesión" o menú con nombre, "Panel admin" si isAdmin y "Cerrar sesión").
- Móvil (<768 px): barra superior delgada de vidrio con nombre y carrito; barra inferior fija de vidrio con Inicio, Categorías (abre una hoja inferior con la lista), Carrito y Cuenta. Respeta env(safe-area-inset-bottom) y deja padding inferior al contenido para que no quede tapado.
- Elimina la manipulación manual de document.body.style y el listener de resize; usa CSS responsivo. Si hace falta bloquear el scroll con la hoja abierta, hazlo en un hook useLockBodyScroll con limpieza correcta.
- Accesibilidad: aria-label en botones de solo ícono, aria-current="page" en el enlace activo, aria-expanded en los menús, cierre con Escape, foco visible.
- El <main> deja de usar md:ml-16 / md:ml-56 y el estado collapsed se elimina de App.
Prueba en 375 px, 768 px y 1440 px.
```

### 5b — `style/inicio-y-catalogo`

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Rama style/inicio-y-catalogo desde dev. Solo tokens y componentes ui.

1. Hero (src/features/catalog/Hero): fondo bg con 2 o 3 manchas difusas decorativas (accent-soft y sage, blur grande, opacidad ~30 %, aria-hidden) para que el vidrio de la navegación se note; título en fuente display; subtítulo "Muñecos tejidos a mano, uno por uno."; botón primario "Ver colección" que hace scroll a la primera sección; altura ~70vh, no pantalla completa. Animación de entrada suave con motion/react que respete prefers-reduced-motion.
2. Secciones de inicio (ProductSection): título en display + enlace discreto "Ver todo →" a /categoria/<slug>. Móvil: carrusel horizontal con scroll-snap y tarjetas al 70 % del ancho. Escritorio: cuadrícula de 4 columnas. Máximo 8 productos por sección.
3. ProductCard (sólida, Card): imagen 4:5 con object-cover, loading="lazy", decoding="async", width y height; nombre (1 línea con truncate); precio en ink; si hay promoción: precio anterior tachado en ink-muted y Badge success "-X%". Botón "Agregar" (Button primary, sm) que usa useCart y muestra toast. Toda la tarjeta enlaza al detalle; el botón no dispara la navegación. Quita la descripción larga de la tarjeta.
4. CategoryPage: título, contador de productos, chips de vidrio fijos bajo la navegación con las subcategorías presentes en esos productos (filtro local), selector de orden (Destacados, Precio menor, Precio mayor), skeletons mientras carga y estado vacío amable con botón a Inicio.
5. Haz que la primera imagen visible use fetchpriority="high" y no lazy (mejora el LCP).
Corre Lighthouse móvil en el preview y reporta los 4 puntajes.
```

### 5c — `style/detalle-de-producto`

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Rama style/detalle-de-producto desde dev. Solo tokens y componentes ui.

Rediseña ProductDetailPage:
- Galería: imagen principal 4:5 + miniaturas (botones accesibles con aria-label "Ver imagen N"); se reinicia al cambiar de producto.
- Columna de información: categorías como Badge enlazados, nombre en display, precio grande (con tachado y -X% si aplica), descripción.
- Selector de cantidad con botones − y + (1 a 10) y botón primario "Agregar al carrito".
- En móvil, barra inferior fija de vidrio con precio y botón "Agregar al carrito" (encima de la barra de navegación inferior, sin taparse).
- Ficha técnica en lista de dos columnas (Personaje, Tipo de lana, Aguja, Dificultad, Tamaño, Tiempo estimado, Detalles) que oculta los campos vacíos.
- "También te puede gustar": 4 productos de la misma categoría, sin repetir el actual.
- Producto inexistente o id no numérico → NotFoundPage.
- Mientras cargan los productos → skeleton de la página.
```

**Cierre de fase:** PR `dev → test`, QA visual completo (sección 17), PR `test → main`. Este es el primer cambio grande visible para el cliente.

---

## Fase 6 — Carrito, cuenta, contacto y admin

Ramas: `style/carrito-y-cuenta`, `style/contacto`, `style/panel-admin` (pueden ir en paralelo).

**Lista cuando:** no quedan colores hex en `src/` (salvo los del logo de Google en AuthModal); modo oscuro revisado en todas las pantallas; QA en `test` aprobado.

### 6a — `style/carrito-y-cuenta`

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Rama style/carrito-y-cuenta desde dev. Solo tokens y componentes ui.

1. CartDrawer: panel lateral derecho con GlassPanel (en móvil, hoja inferior) que se abre al agregar un producto y al tocar el ícono del carrito. Contiene: lista con miniatura, nombre, precio, cantidad −/+, quitar; subtotal; botón primario "Finalizar compra" (a /checkout) y enlace "Ver carrito". Cierre con Escape, clic fuera y botón; foco atrapado.
2. CartPage (/carrito) con los mismos componentes en versión sólida, resumen del pedido a la derecha en escritorio y estado vacío con botón "Explorar la tienda".
3. Formato de precios con Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }) en una utilidad src/lib/formatPrice.js; úsala en todo el proyecto.
4. AuthModal con el componente Modal y los Input del sistema; errores en línea bajo cada campo (aria-describedby); botón de Google con su logo oficial (estos hex son la única excepción permitida); estado de carga en el botón.
```

### 6b — `style/contacto`

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Rama style/contacto desde dev.

Rediseña ContactPage con Input/Textarea/Button del sistema: validación en español antes de enviar, estados enviando / enviado (mensaje de éxito en pantalla y formulario limpio) / error (mensaje en pantalla y conserva lo escrito). Sin alert(). Mueve el endpoint de Formspree a la variable VITE_FORMSPREE_ENDPOINT (agrégala a .env.example y al README) y muestra un error claro si falta. Agrega un enlace opcional a WhatsApp si existe VITE_WHATSAPP_NUMBER.
```

### 6c — `style/panel-admin`

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Rama style/panel-admin desde dev. Solo tokens y componentes ui.

Rediseña AdminDashboardPage, ProductList y ProductForm:
- Tarjetas de estadísticas con Card.
- Lista: tabla en escritorio y tarjetas en móvil; búsqueda; Badge por categoría.
- Confirmación de borrado con Modal (no ventanas propias).
- Mensajes de éxito y error con toasts en lugar de setTimeout y bloques de texto.
- ProductForm con Input/Select/Textarea, errores en línea y vista previa de las imágenes a partir de las URLs.
- Botones con estado loading durante las mutaciones.
```

**Cierre de fase:** PR `dev → test`, QA claro/oscuro en todas las pantallas, PR `test → main`.

---

## Fase 7 — Checkout, pedidos y calidad

Ramas: `feature/pedidos-y-checkout`, `feature/seo-y-accesibilidad`, `chore/pruebas-unitarias`.

**Lista cuando:** un cliente completa un pedido y el admin lo ve; las pruebas corren en CI; Lighthouse móvil ≥ 90 en las 4 categorías.

> **Decisión del negocio antes de 7a:** forma de pago. Opciones: (1) pedido por WhatsApp con el resumen, (2) pasarela (Wompi, Mercado Pago, ePayco), (3) transferencia con confirmación manual. El prompt implementa la opción 1 detrás de una interfaz para poder cambiarla.

### 7a — `feature/pedidos-y-checkout` (usar Spec)

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Rama feature/pedidos-y-checkout desde dev.

1. Migración:
   - orders: id bigint identity, user_id uuid null references auth.users, customer_name, email, phone, city, address, notes, total numeric, status text check in ('pending','confirmed','shipped','cancelled') default 'pending', created_at timestamptz default now().
   - order_items: id, order_id references orders on delete cascade, product_id, product_name, unit_price numeric, quantity int check between 1 and 10.
   - RLS: cada usuario autenticado lee solo sus pedidos; el admin (get_current_user_role()='admin') lee y actualiza todos. Nadie inserta directo: solo vía la función.
   - create_order(payload jsonb) returns bigint, SECURITY DEFINER, search_path public: valida datos del cliente, toma los precios ACTUALES de productos (precio_promocional si existe) ignorando cualquier precio enviado por el navegador, calcula el total y crea pedido e ítems en una transacción. Permite usuario anónimo (user_id null) o autenticado (auth.uid()).
2. CheckoutPage: formulario (nombre, correo, teléfono colombiano de 10 dígitos, ciudad, dirección, notas opcionales) con validación en español, resumen del carrito con formatPrice, botón "Confirmar pedido" con estado loading. Si el carrito está vacío, redirige a /carrito.
3. Al confirmar: llama supabase.rpc('create_order'), vacía el carrito y navega a /pedido/:id/confirmado con el número de pedido y los siguientes pasos.
4. Pago detrás de src/features/checkout/payment/ con una interfaz { id, label, start(order) }. Implementación inicial "whatsapp": abre https://wa.me/<VITE_WHATSAPP_NUMBER>?text=<resumen codificado>. Documenta en el README cómo agregar una pasarela.
5. Panel admin: pestaña "Pedidos" con lista, filtro por estado, detalle y cambio de estado.
6. Prueba todo contra la base local. NO apliques la migración en producción: espera confirmación.
```

### 7b — `feature/seo-y-accesibilidad`

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Rama feature/seo-y-accesibilidad desde dev.

1. Título y descripción por página usando <title> y <meta> dentro de los componentes (React 19 los eleva al <head>). Formato: "<Página> · Crochet Studio".
2. Open Graph y Twitter card: genéricos en index.html; en el detalle de producto con nombre, descripción y primera imagen.
3. public/robots.txt y public/sitemap.xml estático con Inicio, Contacto y las categorías (usa un dominio de ejemplo y documenta dónde cambiarlo).
4. Agrega eslint-plugin-jsx-a11y al lint y corrige lo que reporte.
5. Revisa con axe (extensión del navegador o @axe-core/react en desarrollo) todas las pantallas y corrige: contraste, labels, orden de foco, textos alternativos (alt con el nombre del producto, alt="" en decorativas).
6. Reporta los puntajes de Lighthouse móvil antes y después.
```

### 7c — `chore/pruebas-unitarias`

**Prompt para Kiro:**

```text
Sigue .kiro/steering/crochet-studio.md. Rama chore/pruebas-unitarias desde dev.

1. Instala vitest, @testing-library/react, @testing-library/user-event, @testing-library/jest-dom y jsdom. Configura vitest en vite.config.js (environment jsdom, setupFiles). Scripts "test" y "test:watch".
2. Pruebas:
   - Reducer del carrito: agregar, agregar repetido suma cantidad, límites 1–10, quitar, limpiar, lectura de localStorage corrupto y migración de la clave vieja.
   - Filtros: productos por categoría (con tildes) y regla de Ofertas.
   - formatPrice.
   - Validación de ProductForm y del formulario de checkout.
   - ProtectedRoute: sin sesión, sin rol admin, con admin (mock de useAuth).
3. Agrega npm test al workflow de CI.
```

**Cierre de fase:** PR `dev → test`, QA completo, PR `test → main`. Aplicar migraciones de pedidos en producción (persona) y probar un pedido real.

---

## 17. Checklist de QA por fase

Se corre en el preview de `test` antes de pasar a `main`:

- [ ] CI en verde (lint, build; pruebas desde la Fase 7)
- [ ] Revisado en móvil (375 px) y escritorio (1440 px)
- [ ] Recargar una URL interna (`/producto/1`, `/categoria/anime`) carga bien
- [ ] Inicio muestra todas las secciones con productos
- [ ] Agregar, cambiar cantidad y quitar del carrito; recargar y el carrito sigue
- [ ] Login con correo y con Google; un usuario no admin no entra a `/admin`
- [ ] Admin crea, edita y borra un producto de prueba
- [ ] Contacto envía y muestra confirmación en pantalla
- [ ] Modo claro y oscuro sin textos ilegibles (desde la Fase 4)
- [ ] Consola del navegador sin errores
- [ ] Capturas antes/después en el PR si hubo cambio visual
- [ ] (Fase 7) Pedido de prueba completo y visible en el panel admin

---

## 18. Puntos donde Kiro debe detenerse y preguntar

| Fase | Momento | Quién decide |
| --- | --- | --- |
| 0 | Sincronizar `dev` con `main` y crear `test` | Líder técnico (lo ejecuta a mano) |
| 2a | Antes de borrar `src/Image`, `src/output.css` y SVG sin uso | Líder técnico |
| 2a | Reescribir historial con `git filter-repo` (opcional) | Líder técnico + equipo |
| 2b | Definición de la vista `productos_completos` | Persona (la saca de Supabase) |
| 2b | Borrar `src/sql/` | Líder técnico |
| 3a | Mapa de archivos origen → destino | Líder técnico |
| 3d | Aplicar `upsert_product` / `delete_product` en producción | Líder técnico |
| 4 | Aprobar la paleta y el estilo en `/style-guide` | Equipo / dueño de la marca |
| 7a | Forma de pago | Negocio |
| 7a | Aplicar migraciones de pedidos en producción | Líder técnico |

---

## 19. Problemas comunes

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| Pantalla de error "No pudimos conectar con la base de datos" en local | Falta o está mal `.env.local` | Revisa `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`; reinicia `npm run dev` |
| `npm ci` falla por versión | Node viejo | Usa Node 20+ (`node -v`) |
| Página en blanco al recargar `/producto/5` en Vercel | `base: "./"` en Vite | Se corrige en la Fase 1 |
| El clon tarda mucho | 662 MB de imágenes | Normal hasta la Fase 2; también sirve `git clone --depth 1` para solo revisar |
| `supabase start` falla | Docker apagado | Abre Docker Desktop y reintenta |
| El panel admin no aparece tras iniciar sesión | El usuario no tiene rol admin | En Supabase: `UPDATE user_profiles SET role = 'admin' WHERE email = '<correo>';` y volver a iniciar sesión |
| Conflictos al hacer merge en la Fase 3 | Ramas creadas antes de integrar 3a | Rebasa sobre `dev`: `git fetch && git rebase origin/dev` |
| Kiro quiere hacer push a `main` | No leyó el steering | Rechaza el comando y recuérdale `.kiro/steering/crochet-studio.md` |
