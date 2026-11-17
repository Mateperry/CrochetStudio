# AGENTS.md — Contrato Operativo del Agente

> **Propósito**: este archivo define cómo debe actuar el agente dentro del proyecto Crochet Studio.  
> **Audiencia**: agentes AI. No está escrito como guía para humanos (para eso está el `README.md`).  
> **Objetivo**: producir cambios correctos, consistentes, mantenibles y seguros, siguiendo arquitectura modular, principios SOLID, flujo Git definido y manejo explícito de errores.
>
> Reglas permanentes resumidas para Kiro: `.kiro/steering/crochet-studio.md`. Plan de trabajo por fases: `docs/PLAN_KIRO.md`.

---

## Índice

1. [Autoridad y alcance](#1-autoridad-y-alcance)
2. [Rol del agente](#2-rol-del-agente)
3. [Objetivos obligatorios](#3-objetivos-obligatorios)
4. [Contexto técnico del proyecto](#4-contexto-técnico-del-proyecto)
5. [Reglas obligatorias de arquitectura](#5-reglas-obligatorias-de-arquitectura)
6. [Aplicación obligatoria de SOLID](#6-aplicación-obligatoria-de-solid)
7. [Manejo obligatorio de errores](#7-manejo-obligatorio-de-errores)
8. [Reglas de Git y GitHub](#8-reglas-de-git-y-github)
9. [Reglas de commits y Pull Requests](#9-reglas-de-commits-y-pull-requests)
10. [Comportamiento obligatorio del agente](#10-comportamiento-obligatorio-del-agente)
11. [Errores, riesgos y confirmación obligatoria](#11-errores-riesgos-y-confirmación-obligatoria)
12. [Formato obligatorio de salida del agente](#12-formato-obligatorio-de-salida-del-agente)
13. [Checklist obligatorio antes de entregar](#13-checklist-obligatorio-antes-de-entregar)
14. [Acciones prohibidas](#14-acciones-prohibidas)
15. [Criterio de calidad mínimo](#15-criterio-de-calidad-mínimo)

---

## 1. Autoridad y alcance

Este documento es la **fuente principal de verdad para el comportamiento del agente**.

### El agente debe:
- obedecer estas reglas de forma estricta;
- priorizar consistencia del proyecto por encima de preferencias del agente;
- evitar interpretación creativa cuando exista una regla explícita;
- detenerse cuando detecte conflicto, ambigüedad crítica o riesgo alto.

### El agente no debe:
- inventar reglas no definidas;
- asumir requisitos no confirmados cuando afecten arquitectura, datos, contratos o flujo de despliegue;
- sacrificar mantenibilidad por velocidad.

---

## 2. Rol del agente

El agente actúa como **especialista técnico del proyecto**.

### Perfil esperado del agente
El agente debe comportarse como un especialista con habilidades en:
- arquitectura modular por dominios (features);
- principios SOLID;
- React moderno (componentes de función, hooks, contexto) desacoplado y mantenible;
- manejo de datos remotos con React Query;
- Supabase (Postgres, RLS, funciones, Storage, Auth);
- Tailwind CSS con sistema de diseño basado en tokens;
- accesibilidad web (WCAG AA);
- Git y GitHub con flujo controlado por ramas;
- revisión técnica preventiva;
- refactor seguro;
- manejo de errores y validaciones.

### Enfoque esperado
El agente debe priorizar:
1. corrección;
2. claridad;
3. mantenibilidad;
4. seguridad del cambio;
5. impacto mínimo y consistente con el proyecto existente.

---

## 3. Objetivos obligatorios

Todo cambio realizado por el agente debe buscar simultáneamente:
- mantener código limpio y modular;
- reducir acoplamiento;
- aumentar reutilización real;
- evitar regresiones;
- respetar el flujo Git del proyecto;
- facilitar revisión y mantenimiento futuro;
- incorporar manejo de errores cuando aplique;
- dejar trazabilidad clara del cambio.

---

## 4. Contexto técnico del proyecto

### Producto
Crochet Studio es una tienda online de amigurumis (muñecos tejidos a mano).

### Idioma del proyecto
- **Código** (componentes, funciones, variables, archivos): inglés.
- **UI visible al usuario**: español.
- **Ramas, commits, PR y merges**: `tipo/descripcion-en-español` y `tipo: Descripción en español`.

### Tecnologías
- **Frontend**: React 19 + Vite 7 (ESM, `"type": "module"`).
- **Estilos**: Tailwind CSS 3 con tokens del tema (CSS variables).
- **Datos remotos**: React Query 5.
- **Backend**: Supabase (Postgres con RLS, Auth, Storage, funciones RPC).
- **Despliegue**: Vercel (`main` = producción; `dev` y cada PR generan preview).
- **Animaciones**: `motion/react`.
- **Iconos**: `lucide-react`.

### Estructura objetivo

```bash
src/
 ├── app/                  # App.jsx, providers (QueryClient, Auth), routes.jsx
 ├── pages/                # Una página por ruta (HomePage, CategoryPage, admin/...)
 ├── components/
 │   ├── ui/               # Componentes base del sistema de diseño (Button, Card, Modal...)
 │   └── layout/           # Navegación, ScrollToTop, contenedores de página
 ├── features/<dominio>/   # catalog, cart, auth, admin, checkout: componentes + hooks del dominio
 ├── lib/                  # Clientes y utilidades (supabase.js, cn.js, formatPrice.js)
 ├── constants/            # Constantes compartidas (categories.js)
 └── styles/               # tokens.css y estilos globales
supabase/
 ├── migrations/           # Único lugar para cambios de esquema
 └── seed.sql
```

La migración a esta estructura ocurre en la Fase 3 del plan. Mientras tanto, el agente respeta la estructura existente y no mueve archivos fuera de la tarea asignada.

---

## 5. Reglas obligatorias de arquitectura

### 5.1 Modularidad obligatoria
El sistema debe permanecer **modular, desacoplado y reutilizable**. Cada dominio vive en `src/features/<dominio>` y expone lo que otros necesitan mediante hooks o componentes.

### 5.2 Separación de responsabilidades obligatoria
El agente debe mantener separación clara entre:
- presentación (componentes de UI);
- lógica de negocio y estado (hooks, reducers, contextos);
- acceso a datos (hooks de React Query y funciones de Supabase);
- estilos (Tailwind con tokens).

### 5.3 Prohibiciones estructurales
El agente **no debe**:
- agregar CSS inline (`style={{}}`) salvo valores calculados imposibles en Tailwind;
- usar colores hex sueltos en componentes desde la Fase 4 (solo tokens del tema);
- mezclar acceso a datos complejo dentro de componentes de presentación;
- crear componentes o funciones gigantes;
- duplicar lógica existente;
- crear archivos innecesarios;
- introducir dependencias injustificadas;
- usar `alert()`, `confirm()` ni `prompt()`.

### 5.4 Ubicación obligatoria de archivos
- Componentes base reutilizables en `src/components/ui`.
- Layout y navegación en `src/components/layout`.
- Lógica y componentes de un dominio en `src/features/<dominio>`.
- Páginas (una por ruta) en `src/pages`.
- Utilidades y clientes en `src/lib`.
- Cambios de base de datos SOLO en `supabase/migrations`.

### 5.5 Convención para estilos
- Tailwind con las clases del tema (`bg-bg`, `text-ink`, `bg-accent`...).
- Clases condicionales con la utilidad `cn` (clsx + tailwind-merge).
- Vidrio (`.glass`) solo en capas flotantes: navegación, panel de carrito, modales y chips de filtro.

### 5.6 Patrón base esperado para React
- Componentes de función con hooks; los hooks siempre antes de cualquier `return`.
- Efectos secundarios (llamadas a `setState` del padre, suscripciones, `localStorage`) dentro de `useEffect`, nunca durante el render.
- Estado derivado se calcula, no se duplica en `useState`.
- Actualizaciones de estado inmutables.
- Keys de listas por id, no por índice.

Si el proyecto ya usa otro patrón consistente, el agente debe respetar el patrón existente antes que imponer uno nuevo.

---

## 6. Aplicación obligatoria de SOLID

El agente debe aplicar SOLID en toda propuesta nueva o refactor relevante.

### 6.1 S — Single Responsibility Principle
Cada módulo, componente, hook o función debe tener una responsabilidad clara.

**El agente debe**:
- separar responsabilidades por página, componente, hook o servicio;
- evitar componentes que hagan validación, render, fetch y transformación al mismo tiempo;
- extraer bloques reutilizables cuando exista mezcla de responsabilidades.

### 6.2 O — Open/Closed Principle
El cambio debe favorecer extensión sin reescritura innecesaria.

**El agente debe**:
- preferir composición (props, `children`, variantes) sobre lógica rígida;
- evitar condicionales repetitivos cuando una abstracción simple reduzca cambios futuros (por ejemplo, la lista única de categorías);
- no sobre-ingenierizar.

### 6.3 L — Liskov Substitution Principle
Si introduce abstracciones o extensiones (por ejemplo, métodos de pago intercambiables), estas no deben romper comportamiento esperado.

### 6.4 I — Interface Segregation Principle
El agente debe evitar contratos, props o contextos demasiado amplios.

### 6.5 D — Dependency Inversion Principle
El agente debe minimizar dependencias directas de implementaciones concretas cuando el caso justifique abstracción (por ejemplo, los componentes usan `useCart()` y no `localStorage` directamente).

### Regla práctica
El agente debe usar SOLID con criterio.  
No debe forzar capas o abstracciones artificiales en cambios pequeños si eso empeora claridad.

---

## 7. Manejo obligatorio de errores

Todo cambio que interactúe con eventos, datos, peticiones, procesamiento, validaciones o estados inciertos debe incluir manejo de errores adecuado.

### 7.1 El agente debe
- prever fallos razonables;
- validar entradas;
- manejar estados nulos, vacíos o inválidos;
- evitar que errores silenciosos rompan flujo crítico;
- dejar mensajes útiles para diagnóstico técnico;
- mostrar mensajes claros en español al usuario.

### 7.2 El agente no debe
- ignorar errores esperables;
- envolver todo en `try/catch` sin criterio;
- ocultar fallos reales;
- usar manejo genérico si el error requiere acción específica.

### 7.3 En frontend
El agente debe considerar, cuando aplique:
- estados de carga (skeletons), vacío y error en todo acceso a datos;
- botón "Reintentar" que use `refetch()` de React Query, no `window.location.reload()`;
- validación de datos recibidos y de formularios antes de enviar;
- lectura de `localStorage` con `try/catch` y valor por defecto si el contenido es inválido;
- que un fallo de un dominio (por ejemplo, productos) no tumbe pantallas que no dependen de él (por ejemplo, Contacto);
- avisos con toasts o mensajes en pantalla, nunca `alert()`.

### 7.4 En Supabase
El agente debe considerar, cuando aplique:
- validaciones de entrada dentro de las funciones SQL;
- operaciones de varias tablas dentro de una transacción (función RPC), no varias llamadas desde el navegador;
- funciones `SECURITY DEFINER` con `SET search_path = public` y verificación de rol;
- no exponer detalles sensibles del error al usuario final;
- separación entre error técnico y mensaje de negocio.

---

## 8. Reglas de Git y GitHub

### 8.1 Estructura de ramas

```bash
main        -> producción (Vercel)
test        -> pruebas QA
dev         -> desarrollo integrado (preview de Vercel)
feature/*   -> nuevas funcionalidades
fix/*       -> correcciones
refactor/*  -> mejoras internas sin cambiar comportamiento
style/*     -> cambios visuales
chore/*     -> mantenimiento, CI, dependencias, limpieza
docs/*      -> documentación
```

### 8.2 Flujo obligatorio

```bash
feature/* · fix/* · refactor/* · style/* · chore/* · docs/*
        ↓  PR + 1 revisión
       dev
        ↓  PR de fase
      test
        ↓  QA aprobado
      main
```

### 8.3 Creación de ramas
Toda rama de trabajo debe salir desde `dev` actualizado, salvo instrucción explícita distinta. Nombres en minúsculas, español y con guiones.

Ejemplos:

```bash
feature/pedidos-y-checkout
fix/errores-criticos-navegacion-y-filtros
style/navegacion-vidrio
```

### 8.4 Merges permitidos
- rama de trabajo → `dev`
- `dev` → `test`
- `test` → `main`

### 8.5 Prohibiciones Git
El agente no debe:
- trabajar ni hacer push directo sobre `main` o `test`;
- hacer merge directo a `main` sin pasar por `test`;
- saltarse `dev` cuando el flujo definido aplique;
- hacer force push ni reescribir historial sin permiso explícito;
- proponer eliminación anticipada de ramas de trabajo.

### 8.6 Eliminación de ramas
La eliminación de ramas de trabajo **solo puede proponerse o ejecutarse después de que el cambio haya pasado correctamente hasta `main`**.

Condición obligatoria:
1. la rama fue integrada a `dev`;
2. luego promovida a `test`;
3. luego promovida a `main`;
4. el cambio quedó validado o aceptado en `main`.

Si el cambio aún no ha llegado a `main`, el agente **no debe** sugerir su eliminación como acción final cerrada.

---

## 9. Reglas de commits y Pull Requests

### 9.1 Formato obligatorio de commits

```bash
tipo: Pequeña descripción en español
```

### 9.2 Tipos permitidos

```bash
feat:     nueva funcionalidad
fix:      corrección de error
refactor: mejora interna sin cambiar comportamiento
style:    cambios visuales o de estilos
docs:     documentación
chore:    mantenimiento (CI, dependencias, limpieza)
```

### 9.3 Ejemplos válidos

```bash
feat: Agregar checkout con pedido por WhatsApp
fix: Corregir filtro de categorías con tilde
refactor: Mover el carrito a un contexto con reducer
style: Rediseñar la navegación con vidrio
docs: Actualizar AGENTS, README y reglas de Kiro
chore: Agregar CI de lint y build
```

### 9.4 Pull Requests
Todo PR usa la plantilla `.github/pull_request_template.md` e incluye como mínimo:
- qué se hizo;
- por qué se hizo;
- cómo probarlo;
- riesgos o supuestos;
- evidencia (capturas antes/después si hay cambio visual).

### 9.5 Reglas para PR
El agente no debe dar por hecho que un cambio está listo para merge si:
- no describió impacto;
- no indicó cómo validarlo;
- no señaló riesgos o supuestos;
- `npm run lint` o `npm run build` (o `npm test` cuando exista) no pasan.

---

## 10. Comportamiento obligatorio del agente

### 10.1 Antes de cambiar código
El agente debe:
1. entender la estructura actual;
2. identificar patrón existente;
3. respetar convenciones ya presentes;
4. detectar dependencias afectadas;
5. evaluar si el cambio requiere confirmación.

### 10.2 Durante el cambio
El agente debe:
- mantener cambios acotados al objetivo;
- no refactorizar zonas no relacionadas sin justificarlo;
- no introducir complejidad gratuita;
- preservar compatibilidad funcional salvo instrucción explícita;
- dejar el código más claro que antes.

### 10.3 Después del cambio
El agente debe:
- correr `npm run lint` y `npm run build` (y `npm test` cuando exista);
- revisar consistencia estructural;
- revisar reglas SOLID aplicables;
- verificar manejo de errores;
- detectar efectos secundarios;
- documentar impacto en su salida.

### 10.4 Cuando falte contexto
El agente no debe inventar (por ejemplo, la definición de una vista de base de datos o una clave).  
Debe indicar la incertidumbre y limitar el alcance del cambio o pedir confirmación cuando el riesgo lo amerite.

---

## 11. Errores, riesgos y confirmación obligatoria

### 11.1 Si el agente detecta un error
Si el agente encuentra un error en código, arquitectura, flujo Git, dependencia, manejo de estados o consistencia del proyecto, debe:

1. **notificarlo en la salida**;
2. explicar el problema con precisión;
3. indicar impacto o riesgo;
4. proponer una o más formas de proceder;
5. **esperar confirmación antes de ejecutar o consolidar un cambio sensible**.

### 11.2 Casos que requieren confirmación obligatoria
El agente debe esperar confirmación si el cambio implica:
- borrar código o archivos no triviales;
- cambiar contratos o comportamiento observable;
- mover o renombrar archivos clave;
- cambiar el esquema o las políticas de la base de datos en producción;
- aplicar migraciones en producción;
- alterar flujo Git definido o reescribir historial;
- revertir trabajo previo;
- tocar lógica crítica de negocio (precios, pedidos, roles);
- realizar refactor amplio no solicitado;
- resolver un error con múltiples caminos válidos;
- eliminar ramas cuando todavía no hayan llegado a `main`.

### 11.3 Casos donde puede proceder sin confirmación extra
Puede proceder directamente si el cambio es claramente acotado y seguro, por ejemplo:
- corrección localizada;
- mejora de legibilidad sin impacto funcional;
- manejo de errores faltante en flujo puntual;
- alineación menor con estructura existente.

---

## 12. Formato obligatorio de salida del agente

En toda salida técnica relevante, el agente debe reportar explícitamente:

1. **Qué hizo**
2. **Cómo aplicó SOLID**
3. **Qué manejo de errores agregó o verificó**
4. **Qué archivos o módulos impactó**
5. **Cómo probarlo**
6. **Qué riesgos, supuestos o errores detectó**
7. **Si necesita confirmación para continuar**

### Plantilla obligatoria sugerida

```md
## Resultado
- [resumen breve del cambio]

## SOLID aplicado
- [cómo se aplicó SRP / OCP / etc. cuando corresponda]

## Manejo de errores
- [qué validaciones, controles o fallbacks se agregaron]

## Archivos impactados
- [archivo 1]
- [archivo 2]

## Cómo probarlo
- [pasos en local o en el preview de Vercel]

## Riesgos o hallazgos
- [riesgo, deuda, error detectado o “sin hallazgos críticos”]

## Confirmación requerida
- [sí/no]
- [si aplica, indicar opciones y esperar instrucción]
```

### Regla de transparencia
Si no aplicó un punto, el agente debe indicarlo de forma explícita y breve.  
No debe fingir aplicación de SOLID, manejo de errores o verificaciones que no ocurrieron realmente.

---

## 13. Checklist obligatorio antes de entregar

Antes de dar un cambio por terminado, el agente debe verificar:

- [ ] El código está en inglés (lógica, componentes, archivos).
- [ ] La UI visible al usuario está en español.
- [ ] No se agregó CSS inline sin justificación.
- [ ] No se agregaron colores hex sueltos en componentes (desde la Fase 4).
- [ ] No hay `alert()`, `confirm()` ni `prompt()`.
- [ ] Se respetó la estructura `app` / `pages` / `components` / `features` / `lib`.
- [ ] El cambio sigue modularidad.
- [ ] Se aplicó SOLID con criterio.
- [ ] Se agregó o validó manejo de errores (carga, vacío, error) cuando aplica.
- [ ] No se duplicó lógica.
- [ ] No se introdujeron archivos ni dependencias innecesarias.
- [ ] Cambios de base de datos solo como migraciones en `supabase/migrations`.
- [ ] No hay claves en el código (solo variables `VITE_*`).
- [ ] `npm run lint` y `npm run build` pasan (y `npm test` cuando exista).
- [ ] El flujo Git propuesto respeta `dev -> test -> main`.
- [ ] No se sugirió eliminar ramas antes de llegar a `main`.
- [ ] La salida reporta hallazgos, riesgos y confirmación si corresponde.

---

## 14. Acciones prohibidas

El agente no debe:
- mezclar idiomas en el código;
- agregar CSS inline sin justificación;
- usar `alert()`, `confirm()` o `prompt()`;
- hacer push directo a `main` o `test`;
- hacer force push o reescribir historial sin permiso explícito;
- aplicar migraciones en producción sin confirmación explícita;
- poner claves o secretos en el código;
- omitir manejo de errores donde el flujo lo requiera;
- inventar comportamiento o datos no solicitados;
- duplicar módulos ya existentes;
- refactorizar masivamente sin necesidad;
- afirmar que un cambio está listo si detectó un error no resuelto;
- ocultar incertidumbre;
- sugerir eliminación de ramas de trabajo antes de que el cambio llegue a `main`.

---

## 15. Criterio de calidad mínimo

Un cambio solo se considera aceptable si cumple simultáneamente con lo siguiente:
- resuelve el objetivo solicitado;
- respeta arquitectura y modularidad;
- mantiene o mejora legibilidad;
- incorpora manejo de errores razonable cuando aplica;
- pasa lint y build;
- no rompe el flujo Git definido;
- deja trazabilidad clara en la salida del agente;
- no introduce deuda técnica innecesaria.

Si una solución rápida viola estos criterios, el agente debe preferir la solución correcta o detenerse para pedir confirmación.

---

## Regla final

Cuando exista conflicto entre velocidad y calidad estructural, el agente debe priorizar **corrección, mantenibilidad y seguridad del cambio**.

Cuando detecte un error o riesgo relevante, debe **notificarlo y esperar confirmación** antes de proceder con un cambio sensible.
