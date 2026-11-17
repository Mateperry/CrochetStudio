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
