# AGENTS.md — Contrato Operativo del Agente

> **Propósito**: este archivo define cómo debe actuar el agente dentro del proyecto.  
> **Audiencia**: agentes AI. No está escrito como guía para humanos.  
> **Objetivo**: producir cambios correctos, consistentes, mantenibles y seguros, siguiendo arquitectura modular, principios SOLID, flujo Git definido y manejo explícito de errores.

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
- arquitectura modular;
- principios SOLID;
- JavaScript desacoplado y mantenible;
- Razor / .NET con separación clara de responsabilidades;
- CSS estructurado por páginas y componentes;
- Git y GitHub con flujo controlado por ramas;
- revisión técnica preventiva;
- refactor seguro;
- manejo de errores y validaciones;
- buenas prácticas de mantenibilidad, escalabilidad y legibilidad.

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

### Idioma del proyecto
- **Código**: inglés.
- **UI visible al usuario**: español.
- **Nombres técnicos de  archivos y funciones**: inglés.
- **Nombres técnicos de  Ramas, commit, PRS y merges**: [type]/español.

### Tecnologías y estructura base conocidas
- Frontend con Razor / HTML + JavaScript + CSS.
- Backend sobre .NET / Razor.
- Estructura modular en `wwwroot/js` y `wwwroot/css`.

### Estructura esperada

```bash
wwwroot/
 ├── js/
 │   ├── pages/
 │   └── components/
 ├── css/
 │   ├── pages/
 │   └── components/
```

El agente debe respetar esta organización salvo instrucción explícita en sentido contrario.

---

## 5. Reglas obligatorias de arquitectura

### 5.1 Modularidad obligatoria
El sistema debe permanecer **modular, desacoplado y reutilizable**.

### 5.2 Separación de responsabilidades obligatoria
El agente debe mantener separación clara entre:
- estructura y renderizado;
- lógica de negocio;
- eventos y comportamiento de interfaz;
- estilos.

### 5.3 Prohibiciones estructurales
El agente **no debe**:
- agregar JavaScript inline en Razor o HTML;
- agregar CSS inline;
- mezclar lógica compleja en vistas;
- crear funciones gigantes;
- duplicar lógica existente;
- crear archivos innecesarios;
- introducir dependencias injustificadas.

### 5.4 Ubicación obligatoria de archivos
- JS en `wwwroot/js`
- CSS en `wwwroot/css`
- Razor para estructura y composición
- lógica pesada fuera de la vista

### 5.5 Convención recomendada para CSS
Usar estructura consistente. BEM es preferido cuando aplique.

Ejemplo:

```css
.card {}
.card__title {}
.card--active {}
```

### 5.6 Patrón base esperado para JavaScript
Toda nueva lógica JS debe ser encapsulada, inicializable y sin contaminar el scope global.

Patrón base recomendado:

```javascript
(function (window) {
  "use strict";

  const Page = {
    init: function () {
      this.bindEvents();
    },

    bindEvents: function () {
      console.log("Eventos cargados");
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    Page.init();
  });

})(window);
```

Si el proyecto ya usa otro patrón consistente, el agente debe respetar el patrón existente antes que imponer uno nuevo.

---

## 6. Aplicación obligatoria de SOLID

El agente debe aplicar SOLID en toda propuesta nueva o refactor relevante.

### 6.1 S — Single Responsibility Principle
Cada módulo, archivo, clase o función debe tener una responsabilidad clara.

**El agente debe**:
- separar responsabilidades por página, componente o servicio;
- evitar funciones que hagan validación, render, fetch y transformación al mismo tiempo;
- extraer bloques reutilizables cuando exista mezcla de responsabilidades.

### 6.2 O — Open/Closed Principle
El cambio debe favorecer extensión sin reescritura innecesaria.

**El agente debe**:
- preferir composición sobre lógica rígida;
- evitar condicionales repetitivos cuando una abstracción simple reduzca cambios futuros;
- no sobre-ingenierizar.

### 6.3 L — Liskov Substitution Principle
Si introduce abstracciones o extensiones, estas no deben romper comportamiento esperado.

### 6.4 I — Interface Segregation Principle
El agente debe evitar contratos o módulos demasiado amplios.

### 6.5 D — Dependency Inversion Principle
El agente debe minimizar dependencias directas de implementaciones concretas cuando el caso justifique abstracción.

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
- mostrar mensajes claros al usuario si el contexto es de UI.

### 7.2 El agente no debe
- ignorar errores esperables;
- envolver todo en `try/catch` sin criterio;
- ocultar fallos reales;
- usar manejo genérico si el error requiere acción específica.

### 7.3 En frontend
El agente debe considerar, cuando aplique:
- validación previa de elementos del DOM;
- validación de datos recibidos;
- manejo de respuestas fallidas;
- estados de carga;
- estados vacíos;
- fallback razonable;
- mensajes de error claros al usuario.

### 7.4 En backend
El agente debe considerar, cuando aplique:
- validaciones de entrada;
- respuestas controladas;
- no exponer detalles sensibles del error al usuario final;
- separación entre error técnico y mensaje de negocio.

---

## 8. Reglas de Git y GitHub

### 8.1 Estructura de ramas

```bash
master  -> producción
test    -> pruebas QA
dev     -> desarrollo integrado
feature/* -> nuevas funcionalidades
fix/*     -> correcciones
```

### 8.2 Flujo obligatorio

```bash
feature/* o fix/*
        ↓
       dev
        ↓
      test
        ↓
     master
```

### 8.3 Creación de ramas
Las ramas `feature/*` y `fix/*` deben salir desde `dev`, salvo instrucción explícita distinta.

Ejemplos:

```bash
feature/nombre-tarea-click-up
fix/correcion-de-error-en-modulo-x
```

### 8.4 Merges permitidos
- `feature/*` o `fix/*` → `dev`
- `dev` → `test`
- `test` → `master`

### 8.5 Prohibiciones Git
El agente no debe:
- hacer push directo a `master`;
- hacer merge directo a `master` sin pasar por `test`;
- saltarse `dev` cuando el flujo definido aplique;
- proponer eliminación anticipada de ramas de trabajo.

### 8.6 Eliminación de ramas
La eliminación de ramas `feature/*` y `fix/*` **solo puede proponerse o ejecutarse después de que el cambio haya pasado correctamente hasta `master`**.

Condición obligatoria:
1. la rama fue integrada a `dev`;
2. luego promovida a `test`;
3. luego promovida a `master`;
4. el cambio quedó validado o aceptado en `master`.

Solo después de eso:

```bash
feature/* -> eliminar
fix/*     -> eliminar
```

Si el cambio aún no ha llegado a `master`, el agente **no debe** sugerir su eliminación como acción final cerrada.

---

## 9. Reglas de commits y Pull Requests

### 9.1 Formato obligatorio de commits

```bash
type: Pequeña descripción en español
```

### 9.2 Tipos permitidos

```bash
feat: nueva funcionalidad
fix: corrección de error
refactor: mejora interna sin cambiar comportamiento
style: cambios visuales o CSS
docs: documentación
```

### 9.3 Ejemplos válidos

```bash
feat: Agregar tipo de activo
fix: Manejo de errores en el login
refactor: Separación de responsabilidades en el módulo de activos
style: Mejoras visuales en la lista de activos
docs: Actualización de reglas de operación del agente
```

### 9.4 Pull Requests
Todo PR debe incluir como mínimo:
- qué se hizo;
- por qué se hizo;
- cómo probarlo;
- riesgos conocidos;
- evidencia, si aplica.

### 9.5 Reglas para PR
El agente no debe dar por hecho que un cambio está listo para merge si:
- no describió impacto;
- no indicó cómo validarlo;
- no señaló riesgos o supuestos.

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
- revisar consistencia estructural;
- revisar reglas SOLID aplicables;
- verificar manejo de errores;
- detectar efectos secundarios;
- documentar impacto en su salida.

### 10.4 Cuando falte contexto
El agente no debe inventar.  
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
- borrar código existente no trivial;
- cambiar contratos o comportamiento observable;
- mover o renombrar archivos clave;
- alterar flujo Git definido;
- revertir trabajo previo;
- tocar lógica crítica de negocio;
- realizar refactor amplio no solicitado;
- resolver un error con múltiples caminos válidos;
- eliminar ramas cuando todavía no hayan llegado a `master`.

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
5. **Qué riesgos, supuestos o errores detectó**  
6. **Si necesita confirmación para continuar**

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

## Riesgos o hallazgos
- [riesgo, deuda, error detectado o “sin hallazgos críticos”]

## Confirmación requerida
- [sí/no]
- [si aplica, indicar opciones y esperar instrucción]
```

### Regla de transparencia
Si no aplicó un punto, el agente debe indicarlo de forma explícita y breve.  
No debe fingir aplicación de SOLID o manejo de errores cuando no ocurrió realmente.

---

## 13. Checklist obligatorio antes de entregar

Antes de dar un cambio por terminado, el agente debe verificar:

- [ ] El código está en inglés si es lógica o nombres técnicos.
- [ ] La UI visible al usuario está en español.
- [ ] No se agregó JS inline.
- [ ] No se agregó CSS inline.
- [ ] Se respetó estructura `pages` / `components` cuando aplica.
- [ ] El cambio sigue modularidad.
- [ ] Se aplicó SOLID con criterio.
- [ ] Se agregó o validó manejo de errores cuando aplica.
- [ ] No se duplicó lógica.
- [ ] No se introdujeron archivos innecesarios.
- [ ] El flujo Git propuesto respeta `dev -> test -> master`.
- [ ] No se sugirió eliminar ramas antes de llegar a `master`.
- [ ] La salida reporta hallazgos, riesgos y confirmación si corresponde.

---

## 14. Acciones prohibidas

El agente no debe:
- mezclar idiomas en el código;
- agregar JS inline;
- agregar CSS inline;
- hacer push directo a `master`;
- omitir manejo de errores donde el flujo lo requiera;
- inventar comportamiento no solicitado;
- duplicar módulos ya existentes;
- refactorizar masivamente sin necesidad;
- afirmar que un cambio está listo si detectó un error no resuelto;
- ocultar incertidumbre;
- sugerir eliminación de ramas de trabajo antes de que el cambio llegue a `master`.

---

## 15. Criterio de calidad mínimo

Un cambio solo se considera aceptable si cumple simultáneamente con lo siguiente:
- resuelve el objetivo solicitado;
- respeta arquitectura y modularidad;
- mantiene o mejora legibilidad;
- incorpora manejo de errores razonable cuando aplica;
- no rompe el flujo Git definido;
- deja trazabilidad clara en la salida del agente;
- no introduce deuda técnica innecesaria.

Si una solución rápida viola estos criterios, el agente debe preferir la solución correcta o detenerse para pedir confirmación.

---

## Regla final

Cuando exista conflicto entre velocidad y calidad estructural, el agente debe priorizar **corrección, mantenibilidad y seguridad del cambio**.

Cuando detecte un error o riesgo relevante, debe **notificarlo y esperar confirmación** antes de proceder con un cambio sensible.
