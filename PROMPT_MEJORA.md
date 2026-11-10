# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

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

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `api/src/application/services/product.service.ts` — `ProductRepository.findBySku`: Se invoca `findBySku` sobre `ProductRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/application/services/product.service.ts` — `ProductRepository.findAll`: Se invoca `findAll` sobre `ProductRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2

### Brecha de conocimiento
Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML) (corrida e2e 20261109193147506), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

### Reto
- Tema: operaciones CRUD en bases de datos
- Seniority: trainee-l2
- Tipo: practical
- Título: Implementación de operaciones CRUD en bases de datos SQL y NoSQL
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del entorno y creación de la base de datos — objetivo: Configurar el entorno de desarrollo y crear la estructura de la base de datos para ambos tipos de bases de datos. — entregable (NO resolver): Entorno de desarrollo configurado y estructura de base de datos creada.
- Fase 2: Implementación de operaciones CRUD en base de datos SQL — objetivo: Implementar las operaciones CRUD en una base de datos SQL. — entregable (NO resolver): Operaciones CRUD implementadas en la base de datos SQL.
- Fase 3: Implementación de operaciones CRUD en base de datos NoSQL — objetivo: Implementar las operaciones CRUD en una base de datos NoSQL. — entregable (NO resolver): Operaciones CRUD implementadas en la base de datos NoSQL.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "inventory-management-api",
  "version": "1.0.0",
  "description": "API para gestión de inventarios con operaciones CRUD en bases de datos SQL y NoSQL",
  "main": "dist/src/main.js",
  "scripts": {
    "build": "tsc",
    "format": "prettier --write \"src/**/*.ts\"",
    "start": "ts-node src/main.ts",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/src/main.js",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "^3.470.0",
    "@aws-sdk/lib-dynamodb": "^3.470.0",
    "@nestjs/common": "^11.0.0",
    "@nestjs/config": "^3.1.1",
    "@nestjs/core": "^11.0.0",
    "@nestjs/mongoose": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^7.1.1",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "mongoose": "^8.0.3",
    "pg": "^8.11.3",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/testing": "^11.0.0",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.11",
    "@types/node": "^20.10.4",
    "@types/supertest": "^2.0.16",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.0.1",
    "jest": "^29.7.0",
    "prettier": "^3.1.1",
    "ts-jest": "^29.1.1",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.7.0"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}


// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": ".",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist", "test", "**/*.spec.ts"]
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración global de pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Inventory Management API')
    .setDescription('API para gestión de inventarios con operaciones CRUD')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configuración del puerto
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
  process.exit(1);
});

// === ARCHIVO: api/src/domain/entities/product.entity.ts ===
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, IsPositive } from 'class-validator';

/**
 * Entidad de dominio que representa un producto en el inventario.
 * Contiene los atributos básicos de un producto y se utiliza tanto en SQL como en NoSQL.
 */
export class ProductEntity {
  @ApiProperty({
    description: 'Identificador único del producto',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Gamer'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Laptop con tarjeta gráfica dedicada'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 1299.99
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Cantidad en stock del producto',
    example: 50
  })
  @IsNumber()
  @IsPositive()
  stock: number;

  @ApiProperty({
    description: 'SKU del producto',
    example: 'LAP-GAM-001'
  })
  @IsString()
  sku: string;

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    sku: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.sku = sku;
  }
}

// === ARCHIVO: api/src/domain/repositories/product.repository.ts ===
import { ProductEntity } from '../entities/product.entity';

/**
 * Interfaz del repositorio de productos.
 * Define los contratos que las implementaciones (SQL, NoSQL) deben cumplir.
 */
export interface ProductRepository {
  /**
   * Crea un nuevo producto en la base de datos.
   * @param product Producto a crear.
   * @returns Producto creado con su ID generado.
   */
  create(product: ProductEntity): Promise<ProductEntity>;

  /**
   * Obtiene un producto por su ID.
   * @param id Identificador del producto.
   * @returns Producto encontrado o null si no existe.
   */
  findById(id: string): Promise<ProductEntity | null>;

  /**
   * Actualiza un producto existente.
   * @param id Identificador del producto.
   * @param product Datos actualizados del producto.
   * @returns Producto actualizado.
   */
  update(id: string, product: ProductEntity): Promise<ProductEntity>;

  /**
   * Elimina un producto por su ID.
   * @param id Identificador del producto.
   */
  delete(id: string): Promise<void>;
}

// === ARCHIVO: api/src/application/dtos/create-product.dto.ts ===
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive } from 'class-validator';

/**
 * DTO para la creación de productos.
 * Valida los datos de entrada al crear un producto.
 */
export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Gamer'
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Laptop con tarjeta gráfica dedicada'
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 1299.99
  })
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @ApiProperty({
    description: 'Cantidad en stock del producto',
    example: 50
  })
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @ApiProperty({
    description: 'SKU del producto',
    example: 'LAP-GAM-001'
  })
  @IsString()
  readonly sku: string;
}

// === ARCHIVO: api/src/application/dtos/update-product.dto.ts ===
import { IsString, IsOptional, IsNumber, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Pro 15',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  readonly name?: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Laptop de alta gama con procesador M3',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  readonly description?: string;

  @ApiProperty({
    description: 'Precio del producto en la moneda base',
    example: 1299.99,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  readonly price?: number;

  @ApiProperty({
    description: 'Cantidad disponible en inventario',
    example: 50,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  readonly stock?: number;

  @ApiProperty({
    description: 'Código SKU único del producto',
    example: 'LAP-PRO-15-M3',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El SKU debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El SKU no puede estar vacío' })
  readonly sku?: string;
}

// === ARCHIVO: api/src/infrastructure/repositories/sql/product-sql.repository.ts ===
import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { ConfigService } from '@nestjs/config';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';

@Injectable()
export class ProductSqlRepository implements ProductRepository {
  private readonly logger = new Logger(ProductSqlRepository.name);
  private readonly pool: Pool;

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>('DATABASE_HOST', 'localhost');
    const port = this.configService.get<number>('DATABASE_PORT', 5432);
    const database = this.configService.get<string>('DATABASE_NAME', 'inventory');
    const user = this.configService.get<string>('DATABASE_USER', 'postgres');
    const password = this.configService.get<string>('DATABASE_PASSWORD', 'postgres');

    this.pool = new Pool({
      host,
      port,
      database,
      user,
      password,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    this.pool.on('error', (err) => {
      this.logger.error('Unexpected error on idle client', err);
    });
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    const client = await this.pool.connect();
    try {
      const query = `
        INSERT INTO products (id, name, description, price, stock, sku, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, name, description, price, stock, sku, created_at, updated_at
      `;
      const values = [
        product.id,
        product.name,
        product.description,
        product.price,
        product.stock,
        product.sku,
        product.createdAt,
        product.updatedAt,
      ];

      const result = await client.query(query, values);
      const row = result.rows[0];

      this.logger.log(`Product created with id: ${row.id}`);
      return this.mapRowToEntity(row);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`Product with SKU ${product.sku} already exists`);
      }
      this.logger.error(`Failed to create product: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const client = await this.pool.connect();
    try {
      const query = `
        SELECT id, name, description, price, stock, sku, created_at, updated_at
        FROM products
        WHERE id = $1
      `;
      const result = await client.query(query, [id]);

      if (result.rows.length === 0) {
        this.logger.warn(`Product not found with id: ${id}`);
        return null;
      }

      return this.mapRowToEntity(result.rows[0]);
    } catch (error) {
      this.logger.error(`Failed to find product: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }

  async update(id: string, product: ProductEntity): Promise<ProductEntity> {
    const client = await this.pool.connect();
    try {
      const query = `
        UPDATE products
        SET name = $1, description = $2, price = $3, stock = $4, sku = $5, updated_at = $6
        WHERE id = $7
        RETURNING id, name, description, price, stock, sku, created_at, updated_at
      `;
      const values = [
        product.name,
        product.description,
        product.price,
        product.stock,
        product.sku,
        product.updatedAt,
        id,
      ];

      const result = await client.query(query, values);

      if (result.rows.length === 0) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      this.logger.log(`Product updated with id: ${id}`);
      return this.mapRowToEntity(result.rows[0]);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error.code === '23505') {
        throw new ConflictException(`Product with SKU ${product.sku} already exists`);
      }
      this.logger.error(`Failed to update product: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }

  async delete(id: string): Promise<void> {
    const client = await this.pool.connect();
    try {
      const query = 'DELETE FROM products WHERE id = $1 RETURNING id';
      const result = await client.query(query, [id]);

      if (result.rows.length === 0) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      this.logger.log(`Product deleted with id: ${id}`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to delete product: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }

  private mapRowToEntity(row: any): ProductEntity {
    return new ProductEntity({
      id: row.id,
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      stock: parseInt(row.stock, 10),
      sku: row.sku,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
    this.logger.log('Database pool closed');
  }
}

// === ARCHIVO: api/src/infrastructure/repositories/nosql/product-nosql.repository.ts ===
import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';

interface ProductDocument extends Document {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProductNosqlRepository implements ProductRepository {
  private readonly logger = new Logger(ProductNosqlRepository.name);

  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(product: ProductEntity): Promise<ProductEntity> {
    try {
      const existingProduct = await this.productModel.findOne({ sku: product.sku }).exec();
      if (existingProduct) {
        throw new ConflictException(`Product with SKU ${product.sku} already exists`);
      }

      const createdProduct = new this.productModel({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        sku: product.sku,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      });

      const savedProduct = await createdProduct.save();
      this.logger.log(`Product created with id: ${savedProduct.id}`);
      return this.mapDocumentToEntity(savedProduct);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      this.logger.error(`Failed to create product: ${error.message}`);
      throw error;
    }
  }

  async findById(id: string): Promise<ProductEntity | null> {
    try {
      const product = await this.productModel.findOne({ id }).exec();

      if (!product) {
        this.logger.warn(`Product not found with id: ${id}`);
        return null;
      }

      return this.mapDocumentToEntity(product);
    } catch (error) {
      this.logger.error(`Failed to find product: ${error.message}`);
      throw error;
    }
  }

  async update(id: string, product: ProductEntity): Promise<ProductEntity> {
    try {
      const existingSku = await this.productModel.findOne({ sku: product.sku, id: { $ne: id } }).exec();
      if (existingSku) {
        throw new ConflictException(`Product with SKU ${product.sku} already exists`);
      }

      const updatedProduct = await this.productModel
        .findOneAndUpdate(
          { id },
          {
            $set: {
              name: product.name,
              description: product.description,
              price: product.price,
              stock: product.stock,
              sku: product.sku,
              updatedAt: product.updatedAt,
            },
          },
          { new: true },
        )
        .exec();

      if (!updatedProduct) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      this.logger.log(`Product updated with id: ${id}`);
      return this.mapDocumentToEntity(updatedProduct);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      this.logger.error(`Failed to update product: ${error.message}`);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.productModel.deleteOne({ id }).exec();

      if (result.deletedCount === 0) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      this.logger.log(`Product deleted with id: ${id}`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to delete product: ${error.message}`);
      throw error;
    }
  }

  private mapDocumentToEntity(document: ProductDocument): ProductEntity {
    return new ProductEntity({
      id: document.id,
      name: document.name,
      description: document.description,
      price: document.price,
      stock: document.stock,
      sku: document.sku,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}

// === ARCHIVO: api/src/infrastructure/controllers/product.controller.ts ===
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductService } from '../../application/services/product.service';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { UpdateProductDto } from '../../application/dtos/update-product.dto';
import { ProductEntity } from '../../domain/entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product', description: 'Creates a new product in the inventory' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Product successfully created',
    type: ProductEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'Product with SKU already exists' })
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    this.logger.log(`Creating product with SKU: ${createProductDto.sku}`);
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID', description: 'Retrieves a product by its unique identifier' })
  @ApiParam({
    name: 'id',
    description: 'Product UUID',
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Product found',
    type: ProductEntity,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async getProduct(@Param('id', ParseUUIDPipe) id: string): Promise<ProductEntity | null> {
    this.logger.log(`Fetching product with id: ${id}`);
    return this.productService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product', description: 'Updates an existing product by its ID' })
  @ApiParam({
    name: 'id',
    description: 'Product UUID',
    type: String,
    format: 'uuid',
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Product successfully updated',
    type: ProductEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 409, description: 'Product with SKU already exists' })
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    this.logger.log(`Updating product with id: ${id}`);
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product', description: 'Deletes a product by its ID' })
  @ApiParam({
    name: 'id',
    description: 'Product UUID',
    type: String,
    format: 'uuid',
  })
  @ApiResponse({ status: 204, description: 'Product successfully deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    this.logger.log(`Deleting product with id: ${id}`);
    return this.productService.delete(id);
  }
}

// === ARCHIVO: api/src/infrastructure/repositories/sql/schema.sql ===
-- ============================================================
-- Schema DDL para el sistema de gestión de inventarios
-- Motor: PostgreSQL
-- ============================================================

-- Tabla principal de productos
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    sku VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas por SKU (búsqueda exacta)
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);

-- Índice para búsquedas por nombre (búsqueda parcial)
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);

-- Índice para ordenamiento por fecha de creación
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- Función para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar timestamp en cada modificación
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Comentario para documentación
COMMENT ON TABLE products IS 'Tabla principal para gestión de productos del inventario';
COMMENT ON COLUMN products.id IS 'Identificador único UUID del producto';
COMMENT ON COLUMN products.name IS 'Nombre del producto';
COMMENT ON COLUMN products.description IS 'Descripción detallada del producto';
COMMENT ON COLUMN products.price IS 'Precio del producto en formato decimal';
COMMENT ON COLUMN products.stock IS 'Cantidad disponible en inventario';
COMMENT ON COLUMN products.sku IS 'Código SKU único para identificación del producto';
COMMENT ON COLUMN products.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN products.updated_at IS 'Fecha y hora de última modificación';

-- ============================================================
-- Datos de prueba iniciales (opcional)
-- ============================================================
-- INSERT INTO products (name, description, price, stock, sku)
-- VALUES 
--     ('Producto de Ejemplo', 'Descripción del producto de ejemplo', 99.99, 100, 'SKU-001');

// === ARCHIVO: api/src/infrastructure/repositories/nosql/schema.js ===
/**
 * Schema y configuración de índices para MongoDB
 * Este script debe ejecutarse al iniciar la aplicación o manualmente
 */

const mongoose = require('mongoose');

/**
 * Esquema de Producto para MongoDB
 * Define la estructura de documentos en la colección products
 */
const productSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    name: {
      type: String,
      required: [true, 'El nombre del producto es requerido'],
      trim: true,
      maxlength: [255, 'El nombre no puede exceder 255 caracteres'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'El precio del producto es requerido'],
      min: [0, 'El precio no puede ser negativo'],
    },
    stock: {
      type: Number,
      required: [true, 'El stock del producto es requerido'],
      min: [0, 'El stock no puede ser negativo'],
      default: 0,
    },
    sku: {
      type: String,
      required: [true, 'El SKU del producto es requerido'],
      unique: true,
      trim: true,
      maxlength: [100, 'El SKU no puede exceder 100 caracteres'],
      uppercase: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'products',
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  }
);

/**
 * Middleware pre-save para actualizar timestamps
 */
productSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

/**
 * Middleware pre-update para actualizar timestamp en actualizaciones
 */
productSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

/**
 * Método de instancia para verificar disponibilidad
 */
productSchema.methods.isAvailable = function (quantity) {
  return this.stock >= quantity;
};

/**
 * Método de instancia para reducir stock
 */
productSchema.methods.reduceStock = async function (quantity) {
  if (this.stock < quantity) {
    throw new Error('Stock insuficiente');
  }
  this.stock -= quantity;
  return this.save();
};

/**
 * Función para crear índices en la colección
 * Debe llamarse durante la inicialización de la aplicación
 * @param {mongoose.Connection} connection - Conexión a MongoDB
 */
async function createIndexes(connection) {
  const collection = connection.collection('products');

  try {
    // Índice único para SKU
    await collection.createIndex(
      { sku: 1 },
      { unique: true, name: 'sku_unique_idx' }
    );

    // Índice para búsquedas por nombre
    await collection.createIndex(
      { name: 'text', description: 'text' },
      { name: 'name_description_text_idx' }
    );

    // Índice para ordenamiento por fecha
    await collection.createIndex(
      { createdAt: -1 },
      { name: 'created_at_idx' }
    );

    // Índice para búsquedas por stock
    await collection.createIndex(
      { stock: 1 },
      { name: 'stock_idx' }
    );

    console.log('Índices de MongoDB creados correctamente');
  } catch (error) {
    console.error('Error al crear índices de MongoDB:', error.message);
    throw error;
  }
}

/**
 * Función para verificar y crear la colección si no existe
 * @param {mongoose.Connection} connection - Conexión a MongoDB
 */
async function ensureCollection(connection) {
  const collections = await connection.db.listCollections().toArray();
  const collectionNames = collections.map((c) => c.name);

  if (!collectionNames.includes('products')) {
    await connection.db.createCollection('products');
    console.log('Colección products creada en MongoDB');
  }
}

module.exports = {
  productSchema,
  createIndexes,
  ensureCollection,
};

// === ARCHIVO: api/src/app.module.ts ===
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  Logger,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './infrastructure/controllers/product.controller';
import { ProductSqlRepository } from './infrastructure/repositories/sql/product-sql.repository';
import { ProductNosqlRepository } from './infrastructure/repositories/nosql/product-nosql.repository';
import { ProductRepository } from './domain/repositories/product.repository';
import { DatabaseConfigService } from './config/database.config';
import { HttpExceptionFilter } from './infrastructure/filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const databaseConfig = new DatabaseConfigService(configService);
        const nosqlConfig = databaseConfig.getNosqlConfig();
        return {
          uri: nosqlConfig.uri || 'mongodb://localhost:27017/inventory',
          dbName: nosqlConfig.database || 'inventory',
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [ProductController],
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductSqlRepository,
    },
    {
      provide: 'DATABASE_CONFIG',
      useClass: DatabaseConfigService,
    },
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
    Logger,
  ],
  exports: [ProductRepository, DatabaseConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes('*');
  }
}

// === ARCHIVO: api/src/config/database.config.ts ===
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolConfig } from 'pg';
import mongoose, { ConnectOptions } from 'mongoose';
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

export interface DatabaseConfig {
  sql: PoolConfig;
  nosql: ConnectOptions;
  dynamodb: DynamoDBClientConfig;
}

export interface SqlConnectionOptions {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  max?: number;
  idleTimeoutMillis?: number;
  connectionTimeoutMillis?: number;
}

export interface NosqlConnectionOptions {
  uri: string;
  dbName?: string;
}

export interface DynamodbConnectionOptions {
  region: string;
  endpoint?: string;
  credentials?: {
    accessKeyId: string;
    secretAccessKey: string;
  };
}

@Injectable()
export class DatabaseConfigService {
  private sqlPool: Pool | null = null;
  private nosqlConnection: typeof mongoose | null = null;

  constructor(private readonly configService: ConfigService) {}

  getSqlConfig(): PoolConfig {
    return {
      host: this.configService.get<string>('DATABASE_SQL_HOST', 'localhost'),
      port: this.configService.get<number>('DATABASE_SQL_PORT', 5432),
      database: this.configService.get<string>('DATABASE_SQL_NAME', 'inventory_db'),
      user: this.configService.get<string>('DATABASE_SQL_USER', 'postgres'),
      password: this.configService.get<string>('DATABASE_SQL_PASSWORD', 'postgres'),
      max: this.configService.get<number>('DATABASE_SQL_POOL_MAX', 20),
      idleTimeoutMillis: this.configService.get<number>('DATABASE_SQL_IDLE_TIMEOUT', 30000),
      connectionTimeoutMillis: this.configService.get<number>('DATABASE_SQL_CONNECTION_TIMEOUT', 2000),
    };
  }

  getNosqlConfig(): ConnectOptions {
    const uri = this.configService.get<string>('DATABASE_NOSQL_URI', 'mongodb://localhost:27017');
    const dbName = this.configService.get<string>('DATABASE_NOSQL_NAME', 'inventory_nosql');
    
    return {
      uri,
      dbName,
    } as ConnectOptions;
  }

  getDynamodbConfig(): DynamoDBClientConfig {
    const region = this.configService.get<string>('AWS_REGION', 'us-east-1');
    const endpoint = this.configService.get<string>('AWS_ENDPOINT');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');

    const config: DynamoDBClientConfig = {
      region,
    };

    if (endpoint) {
      config.endpoint = endpoint;
    }

    if (accessKeyId && secretAccessKey) {
      config.credentials = {
        accessKeyId,
        secretAccessKey,
      };
    }

    return config;
  }

  async createSqlPool(): Promise<Pool> {
    if (!this.sqlPool) {
      const poolConfig = this.getSqlConfig();
      this.sqlPool = new Pool(poolConfig);
      
      this.sqlPool.on('error', (err) => {
        console.error('SQL Pool unexpected error:', err.message);
      });

      this.sqlPool.on('connect', () => {
        console.log('New SQL client connected to database');
      });
    }
    return this.sqlPool;
  }

  async createNosqlConnection(): Promise<typeof mongoose> {
    if (!this.nosqlConnection) {
      const options = this.getNosqlConfig();
      this.nosqlConnection = await mongoose.connect(options.uri as string, {
        dbName: options.dbName,
      });
      
      mongoose.connection.on('connected', () => {
        console.log('MongoDB connected successfully');
      });

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err.message);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
      });
    }
    return this.nosqlConnection;
  }

  async closeSqlPool(): Promise<void> {
    if (this.sqlPool) {
      await this.sqlPool.end();
      this.sqlPool = null;
      console.log('SQL Pool closed');
    }
  }

  async closeNosqlConnection(): Promise<void> {
    if (this.nosqlConnection) {
      await this.nosqlConnection.disconnect();
      this.nosqlConnection = null;
      console.log('MongoDB connection closed');
    }
  }

  getSqlPool(): Pool | null {
    return this.sqlPool;
  }

  getNosqlConnection(): typeof mongoose | null {
    return this.nosqlConnection;
  }

  validateSqlConfig(): boolean {
    const config = this.getSqlConfig();
    return !!(config.host && config.port && config.database && config.user);
  }

  validateNosqlConfig(): boolean {
    const config = this.getNosqlConfig();
    return !!(config.uri);
  }

  validateDynamodbConfig(): boolean {
    const config = this.getDynamodbConfig();
    return !!config.region;
  }
}

export const databaseConfigProvider = {
  provide: DatabaseConfigService,
  useFactory: (configService: ConfigService) => {
    return new DatabaseConfigService(configService);
  },
  inject: [ConfigService],
};

// === ARCHIVO: api/test/jest-e2e.json ===
{
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}


// === ARCHIVO: api/src/application/services/product.service.ts ===
import { Injectable, Logger, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    this.logger.log(`Creating product with SKU: ${createProductDto.sku}`);

    const existingProduct = await this.productRepository.findBySku(createProductDto.sku);
    if (existingProduct) {
      throw new ConflictException(`Product with SKU ${createProductDto.sku} already exists`);
    }

    const product = new ProductEntity(
      createProductDto.name,
      createProductDto.description,
      createProductDto.price,
      createProductDto.stock,
      createProductDto.sku,
    );

    const created = await this.productRepository.create(product);
    this.logger.log(`Product created with ID: ${created.id}`);
    return created;
  }

  async findById(id: string): Promise<ProductEntity> {
    this.logger.log(`Finding product by ID: ${id}`);
    const product = await this.productRepository.findById(id);
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return product;
  }

  async findBySku(sku: string): Promise<ProductEntity | null> {
    this.logger.log(`Finding product by SKU: ${sku}`);
    return this.productRepository.findBySku(sku);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    this.logger.log(`Updating product with ID: ${id}`);

    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (updateProductDto.sku && updateProductDto.sku !== existingProduct.sku) {
      const productWithSku = await this.productRepository.findBySku(updateProductDto.sku);
      if (productWithSku && productWithSku.id !== id) {
        throw new ConflictException(`Product with SKU ${updateProductDto.sku} already exists`);
      }
    }

    const updatedProduct = new ProductEntity(
      updateProductDto.name ?? existingProduct.name,
      updateProductDto.description ?? existingProduct.description,
      updateProductDto.price ?? existingProduct.price,
      updateProductDto.stock ?? existingProduct.stock,
      updateProductDto.sku ?? existingProduct.sku,
      id,
    );

    const result = await this.productRepository.update(id, updatedProduct);
    this.logger.log(`Product updated: ${id}`);
    return result;
  }

  async delete(id: string): Promise<void> {
    this.logger.log(`Deleting product with ID: ${id}`);
    
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    await this.productRepository.delete(id);
    this.logger.log(`Product deleted: ${id}`);
  }

  async findAll(): Promise<ProductEntity[]> {
    this.logger.log('Finding all products');
    return this.productRepository.findAll();
  }
}

// === ARCHIVO: api/src/infrastructure/filters/http-exception.filter.ts ===
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as Record<string, unknown>;
        message = (responseObj.message as string) || exception.message;
        error = (responseObj.error as string) || 'Error';
      } else {
        message = exception.message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(
        `Unhandled exception: ${exception.message}`,
        exception.stack,
      );
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error,
      message: Array.isArray(message) ? message : [message],
    };

    this.logger.warn(
      `${request.method} ${request.url} - ${status} - ${JSON.stringify(message)}`,
    );

    response.status(status).json(errorResponse);
  }
}

// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './app/App';
import './index.css';

// Crear cliente de React Query para manejar el estado de las solicitudes HTTP
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No se encontró el elemento root en el DOM');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

// Manejo global de errores no capturados
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason);
});

window.addEventListener('error', (event) => {
  console.error('Unhandled error:', event.error);
});

// === ARCHIVO: client/src/app/App.tsx ===
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductList } from '../features/products/ProductList';
import { ProductForm } from '../features/products/ProductForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Componente raíz de la aplicación con rutas definidas
const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Gestión de Inventario</h1>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/edit/:id" element={<ProductForm />} />
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
      </div>
    </Router>
  );
};

// Wrapper para proveer el cliente de React Query
const AppWithQueryClient: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

export default AppWithQueryClient;


// === ARCHIVO: client/package.json ===
{
  "name": "inventory-client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.22.0",
    "@tanstack/react-query": "^5.17.0",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.7.0",
    "vite": "^5.0.10",
    "eslint": "^8.56.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "@testing-library/react": "^14.1.2",
    "vitest": "^1.1.0"
  }
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite para la aplicación React con TypeScript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment'
  }
});

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },
  "include": [
    "src"
  ]
}


// === ARCHIVO: client/index.html ===
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Sistema de gestión de inventarios para tienda en línea" />
    <meta name="keywords" content="inventario, productos, gestión, CRUD" />
    <meta name="author" content="Inventory Team" />
    <meta name="robots" content="index, follow" />
    <title>Gestión de Inventario</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f5f5f5;
        color: #333;
        line-height: 1.6;
      }
      #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      @media (prefers-color-scheme: dark) {
        body {
          background-color: #1a1a1a;
          color: #e0e0e0;
        }
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/features/products/ProductList.tsx ===
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface ProductEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = 'http://localhost:3000';

async function fetchProducts(): Promise<ProductEntity[]> {
  const response = await axios.get<ProductEntity[]>(`${API_BASE_URL}/products`);
  return response.data;
}

async function deleteProduct(id: string): Promise<void> {
  await axios.delete(`${API_BASE_URL}/products/${id}`);
}

export function ProductList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5000,
    retry: 2,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setErrorMessage(null);
    },
    onError: (err: Error) => {
      setErrorMessage(err.message || 'Error al eliminar el producto');
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/products/${id}/edit`);
  };

  const handleCreate = () => {
    navigate('/products/new');
  };

  if (isLoading) {
    return (
      <div className="product-list-loading" role="status" aria-label="Cargando productos">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="product-list-error" role="alert">
        <h2>Error al cargar productos</h2>
        <p>{error instanceof Error ? error.message : 'Error desconocido'}</p>
        <button onClick={() => queryClient.invalidateQueries({ queryKey: ['products'] })}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <header className="product-list-header">
        <h1>Gestión de Inventario</h1>
        <button 
          onClick={handleCreate} 
          className="btn-primary"
          aria-label="Crear nuevo producto"
        >
          Nuevo Producto
        </button>
      </header>

      {errorMessage && (
        <div className="error-banner" role="alert">
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage(null)} aria-label="Cerrar mensaje de error">
            ×
          </button>
        </div>
      )}

      {products && products.length === 0 ? (
        <div className="empty-state">
          <p>No hay productos en el inventario.</p>
          <button onClick={handleCreate} className="btn-secondary">
            Agregar primer producto
          </button>
        </div>
      ) : (
        <table className="product-table" aria-label="Lista de productos">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id} data-product-id={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td className={product.stock === 0 ? 'stock-out' : product.stock < 10 ? 'stock-low' : ''}>
                  {product.stock}
                </td>
                <td className="actions">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="btn-edit"
                    aria-label={`Editar ${product.name}`}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn-delete"
                    disabled={deleteMutation.isPending}
                    aria-label={`Eliminar ${product.name}`}
                  >
                    {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// === ARCHIVO: client/src/features/products/ProductForm.tsx ===
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export interface UpdateProductDto extends CreateProductDto {}

export interface ProductEntity extends CreateProductDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = 'http://localhost:3000';

interface ProductFormProps {
  isEdit?: boolean;
}

async function fetchProduct(id: string): Promise<ProductEntity> {
  const response = await axios.get<ProductEntity>(`${API_BASE_URL}/products/${id}`);
  return response.data;
}

async function createProduct(data: CreateProductDto): Promise<ProductEntity> {
  const response = await axios.post<ProductEntity>(`${API_BASE_URL}/products`, data);
  return response.data;
}

async function updateProduct(id: string, data: UpdateProductDto): Promise<ProductEntity> {
  const response = await axios.put<ProductEntity>(`${API_BASE_URL}/products/${id}`, data);
  return response.data;
}

export function ProductForm({ isEdit = false }: ProductFormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [formData, setFormData] = useState<CreateProductDto>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof CreateProductDto, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: product, isLoading: isFetching } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id!),
    enabled: isEdit && !!id,
    staleTime: 0,
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      navigate('/products');
    },
    onError: (err: Error) => {
      setSubmitError(err.message || 'Error al crear el producto');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateProductDto) => updateProduct(id!, data),
    onSuccess: () => {
      navigate('/products');
    },
    onError: (err: Error) => {
      setSubmitError(err.message || 'Error al actualizar el producto');
    },
  });

  useEffect(() => {
    if (product && isEdit) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
      });
    }
  }, [product, isEdit]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateProductDto, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor que 0';
    }
    
    if (formData.stock < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'La categoría es obligatoria';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!validateForm()) {
      return;
    }
    
    if (isEdit) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleChange = (field: keyof CreateProductDto, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  if (isFetching) {
    return (
      <div className="product-form-loading" role="status">
        <p>Cargando producto...</p>
      </div>
    );
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="product-form-container">
      <header className="product-form-header">
        <h1>{isEdit ? 'Editar Producto' : 'Nuevo Producto'}</h1>
      </header>

      {submitError && (
        <div className="error-banner" role="alert">
          <p>{submitError}</p>
          <button onClick={() => setSubmitError(null)} aria-label="Cerrar">×</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="product-form" aria-label="Formulario de producto">
        <div className="form-group">
          <label htmlFor="name">Nombre del producto *</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            disabled={isPending}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span id="name-error" className="error-message" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción *</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            disabled={isPending}
            rows={4}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'description-error' : undefined}
          />
          {errors.description && (
            <span id="description-error" className="error-message" role="alert">
              {errors.description}
            </span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Precio *</label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
              disabled={isPending}
              aria-invalid={!!errors.price}
              aria-describedby={errors.price ? 'price-error' : undefined}
            />
            {errors.price && (
              <span id="price-error" className="error-message" role="alert">
                {errors.price}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock *</label>
            <input
              id="stock"
              type="number"
              min="0"
              step="1"
              value={formData.stock}
              onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
              disabled={isPending}
              aria-invalid={!!errors.stock}
              aria-describedby={errors.stock ? 'stock-error' : undefined}
            />
            {errors.stock && (
              <span id="stock-error" className="error-message" role="alert">
                {errors.stock}
              </span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría *</label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            disabled={isPending}
            aria-invalid={!!errors.category}
            aria-describedby={errors.category ? 'category-error' : undefined}
          >
            <option value="">Seleccionar categoría</option>
            <option value="electronics">Electrónica</option>
            <option value="clothing">Ropa</option>
            <option value="food">Alimentos</option>
            <option value="books">Libros</option>
            <option value="other">Otros</option>
          </select>
          {errors.category && (
            <span id="category-error" className="error-message" role="alert">
              {errors.category}
            </span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={isPending}
          >
            {isPending ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCancel}
            disabled={isPending}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

// === ARCHIVO: client/src/index.css ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: .run/api.run.xml ===
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="api" type="js.build_tools.npm" nameIsGenerated="false">
    <package-json value="$PROJECT_DIR$/api/package.json" />
    <command value="run" />
    <scripts>
      <script value="start" />
    </scripts>
    <node-interpreter value="project" />
    <envs>
      <env name="DYNAMODB_ENDPOINT" value="http://localhost:8000" />
      <env name="AWS_REGION" value="us-east-1" />
      <env name="AWS_ACCESS_KEY_ID" value="local" />
      <env name="AWS_SECRET_ACCESS_KEY" value="local" />
      <env name="MONGODB_URI" value="mongodb://localhost:27017/app" />
    </envs>
    <method v="2" />
  </configuration>
</component>


// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s
  mongo:
    image: "mongo:7.0.14"
    ports:
      - "127.0.0.1:27017:27017"
    environment:
      MONGO_INITDB_DATABASE: "app"
    volumes:
      - "./infra-local/mongo/init.js:/docker-entrypoint-initdb.d/init.js:ro"
    healthcheck:
      test: ["CMD","mongosh","--quiet","--eval","db.adminCommand('ping').ok"]
      interval: 10s
      timeout: 10s
      retries: 10
      start_period: 20s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |
| MongoDB | `mongo:7.0.14` | 27017 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"


// === ARCHIVO: infra-local/mongo/init.js ===
// Se ejecuta una sola vez al crear el volumen de MongoDB (docker-entrypoint-initdb.d).
db = db.getSiblingDB('app');
db.createCollection('items');
db.items.createIndex({ name: 1 });

```
