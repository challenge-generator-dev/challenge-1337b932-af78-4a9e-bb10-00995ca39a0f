# Implementación de operaciones CRUD en bases de datos SQL y NoSQL

Debes construir operaciones básicas de CRUD (crear, obtener, actualizar y eliminar) en bases de datos SQL y NoSQL utilizando DDL y DML. El dominio elegido es un sistema de gestión de inventarios para una tienda en línea. Los actores involucrados son el Administrador del Inventario, el Sistema de Ventas y el Almacén. El Administrador del Inventario necesita crear y actualizar productos, mientras que el Sistema de Ventas requiere obtener y eliminar productos. El Almacén necesita actualizar el stock de los productos. Las operaciones deben ser idempotentes y manejar errores de manera adecuada.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | operaciones CRUD en bases de datos |
| **Nivel** | trainee-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración del entorno y creación de la base de datos

**Objetivo:** Configurar el entorno de desarrollo y crear la estructura de la base de datos para ambos tipos de bases de datos.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configura el entorno de desarrollo para trabajar con bases de datos SQL y NoSQL.
- Crea la estructura de la base de datos para ambos tipos, definiendo las tablas/colecciones y sus relaciones.

**Entregable:** Entorno de desarrollo configurado y estructura de base de datos creada.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza IntelliJ IDEA Debugger para depurar y verificar la configuración del entorno.
- Recuerda que las bases de datos SQL y NoSQL tienen diferentes enfoques para la definición de datos.

</details>

### Fase 2: Implementación de operaciones CRUD en base de datos SQL

**Objetivo:** Implementar las operaciones CRUD en una base de datos SQL.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa las operaciones de crear, obtener, actualizar y eliminar en la base de datos SQL.
- Asegúrate de que las operaciones sean idempotentes y manejen errores de manera adecuada.

**Entregable:** Operaciones CRUD implementadas en la base de datos SQL.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza IntelliJ IDEA Debugger para depurar y verificar las operaciones CRUD.
- Recuerda que las operaciones deben ser idempotentes y manejar errores de manera adecuada.

</details>

### Fase 3: Implementación de operaciones CRUD en base de datos NoSQL

**Objetivo:** Implementar las operaciones CRUD en una base de datos NoSQL.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa las operaciones de crear, obtener, actualizar y eliminar en la base de datos NoSQL.
- Asegúrate de que las operaciones sean idempotentes y manejen errores de manera adecuada.

**Entregable:** Operaciones CRUD implementadas en la base de datos NoSQL.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza IntelliJ IDEA Debugger para depurar y verificar las operaciones CRUD.
- Recuerda que las operaciones deben ser idempotentes y manejar errores de manera adecuada.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y por qué son importantes en el manejo de bases de datos?
- **paraQueSirve**: ¿Para qué sirven las operaciones CRUD en el contexto de un sistema de gestión de inventarios?
- **comoSeUsa**: ¿Cómo se implementan las operaciones CRUD en bases de datos SQL y NoSQL?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD y cómo se pueden evitar?

## Criterios de Evaluacion

- Configuración correcta del entorno de desarrollo para bases de datos SQL y NoSQL.
- Creación de la estructura de la base de datos para ambos tipos de bases de datos.
- Implementación de operaciones CRUD idempotentes en base de datos SQL.
- Implementación de operaciones CRUD idempotentes en base de datos NoSQL.
- Manejo adecuado de errores en las operaciones CRUD.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB, MongoDB |
| `client` | `client/` | chapter, support | client | React | - |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB, MongoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`
- `client` expone http:
  - `POST /products`
  - `GET /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`

## Herramientas

- **IntelliJ IDEA Debugger**: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
