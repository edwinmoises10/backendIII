# ShipNow API

API REST para la gestión de una plataforma de logística y envíos. Construida con Node.js, Express y MongoDB siguiendo una arquitectura profesional por capas.

---

## Configuración y ejecución local

### Requisitos previos

- Node.js 18+
- MongoDB (local o Atlas)

### Pasos

```bash
# 1. Instalar dependencias
npm install

# Ejecutar tests (no requiere base de datos)
npm test

# 2. Crear el archivo de variables de entorno
cp .env.example .env

# 3. Editar .env con tus valores reales
#    MONGODB_URI=mongodb://localhost:27017/shipnow

# 4. Ejecutar en modo desarrollo
npm run dev

# 5. Ejecutar en producción
npm start
```

### Variables de entorno requeridas

| Variable       | Descripción                        | Ejemplo                                   |
|----------------|------------------------------------|-------------------------------------------|
| `PORT`         | Puerto del servidor (opcional)     | `8080`                                    |
| `MONGODB_URI`  | URI de conexión a MongoDB          | `mongodb://localhost:27017/shipnow`       |
| `NODE_ENV`     | Entorno de ejecución (opcional)    | `development`                             |

> Si `MONGODB_URI` no está definida, la app lanza un error descriptivo y no arranca.

---

## Endpoints disponibles

| Método | Ruta                        | Descripción                       |
|--------|-----------------------------|-----------------------------------|
| GET    | `/api/users`                | Listar usuarios                   |
| GET    | `/api/users/:uid`           | Obtener usuario por ID            |
| POST   | `/api/users`                | Crear usuario                     |
| PUT    | `/api/users/:uid`           | Actualizar usuario                |
| DELETE | `/api/users/:uid`           | Eliminar usuario                  |
| GET    | `/api/stores`               | Listar comercios                  |
| GET    | `/api/stores/:sid`          | Obtener comercio por ID           |
| POST   | `/api/stores`               | Crear comercio                    |
| PUT    | `/api/stores/:sid`          | Actualizar comercio               |
| DELETE | `/api/stores/:sid`          | Eliminar comercio                 |
| GET    | `/api/products`             | Listar productos disponibles      |
| GET    | `/api/products/:pid`        | Obtener producto por ID           |
| POST   | `/api/products`             | Crear producto                    |
| PUT    | `/api/products/:pid`        | Actualizar producto               |
| DELETE | `/api/products/:pid`        | Eliminar producto                 |
| GET    | `/api/orders`               | Listar pedidos                    |
| GET    | `/api/orders/:oid`          | Obtener pedido por ID             |
| POST   | `/api/orders`               | Crear pedido                      |
| PUT    | `/api/orders/:oid/status`   | Actualizar estado del pedido      |
| DELETE | `/api/orders/:oid`          | Eliminar pedido                   |
| GET    | `/api/deliveries`           | Listar entregas                   |
| GET    | `/api/deliveries/:did`      | Obtener entrega por ID            |
| POST   | `/api/deliveries`           | Crear entrega                     |
| PUT    | `/api/deliveries/:did/status` | Actualizar estado de entrega    |
| DELETE | `/api/deliveries/:did`      | Eliminar entrega                  |

### Endpoints de mocking (seed de datos)

| Método | Ruta                       | Body (JSON, opcional)                                 | Descripción                              |
|--------|----------------------------|-------------------------------------------------------|------------------------------------------|
| POST   | `/api/mocks/populate`      | `{ "users": 10, "drivers": 5, "stores": 3, "products": 15, "orders": 10, "deliveries": 10 }` | Pobla toda la base de datos en orden    |
| POST   | `/api/mocks/users`         | `?count=10`                                           | Genera y guarda N usuarios              |
| POST   | `/api/mocks/drivers`       | `?count=5`                                            | Genera y guarda N repartidores          |

> **Nota:** `POST /api/mocks/populate` inserta las entidades en el orden correcto: primero usuarios y repartidores, luego comercios (que necesitan un owner), luego productos y pedidos, y finalmente entregas (que referencian pedidos). Todos los datos se persisten en MongoDB.

---

## Arquitectura por capas

```
src/
├── config/
│   ├── env.config.js       # Validación y exportación de variables de entorno
│   └── db.js               # Conexión a MongoDB
├── constants/
│   └── index.js            # Objetos congelados con valores del dominio
├── models/                 # Esquemas Mongoose (solo estructura de datos)
├── repository/             # Acceso a la base de datos (única capa que conoce Mongoose)
├── service/                # Lógica de negocio
├── controllers/            # Manejo de req/res HTTP
├── routes/                 # Definición de rutas (solo conectan path con controller)
├── middlewares/
│   └── error.middleware.js # Middleware global de errores de Express
├── mocks/                  # Generadores de datos falsos con faker
├── utils/
│   ├── CustomError.js      # Clase de error tipado
│   ├── apiResponse.js      # Helpers de respuesta y createError()
│   └── errorDictionary.js  # Diccionario centralizado de errores
└── tests/
    ├── health.test.js
    ├── mocks.validation.test.js
    └── error.middleware.test.js
```

### Flujo de dependencias

```
Router → Controller → Service → Repository → Model
                ↓ (en caso de error)
            next(error)
                ↓
        errorMiddleware (app.js)
```

Ningún controlador contiene lógica de manejo de errores — todos delegan a `next(error)`.

---

## Decisiones técnicas: Service vs Repository

**Repository** encapsula todo acceso a MongoDB. No contiene lógica de negocio; aplica filtros por defecto (ej: `allProducts()` filtra solo los productos con `status: AVAILABLE`) y proyecciones. Si el ORM cambia mañana, solo se modifica esta capa.

**Service** contiene las reglas del negocio: validaciones cruzadas entre entidades (ej: verificar que el `customer` y el `store` existen antes de crear un pedido), cálculo de totales, y decisiones de dominio (ej: registrar `assignedAt` cuando una entrega pasa a estado `ASSIGNED`). El Service nunca importa Mongoose directamente.

Esta separación permite testear la lógica de negocio de forma aislada (mockeando el Repository) y garantiza que los cambios en la base de datos no afecten las reglas del dominio.

---

## Gestión de errores

El sistema usa una clase `CustomError` que encapsula `code`, `statusCode` y `message`. El flujo es:

1. El **Service** lanza `createError("CODIGO")` — devuelve una instancia de `CustomError` con los datos del diccionario.
2. El **Controller** solo llama `next(error)` — no tiene lógica de manejo de errores propia.
3. El **middleware global** (`errorMiddleware`) captura el error, identifica su tipo y responde con el formato estándar. También maneja errores de Mongoose (CastError, ValidationError) de forma centralizada.

```json
{
  "status": "error",
  "error": "PRODUCT_NOT_FOUND",
  "message": "Producto no encontrado"
}
```

## Tests

Los tests no requieren conexión a MongoDB (validan la capa de routing y middleware):

```bash
npm test
```

| Archivo | Qué prueba |
|---------|------------|
| `health.test.js` | Endpoints `/` y `/health` responden 200; rutas inexistentes devuelven 404 |
| `mocks.validation.test.js` | `POST /api/mocks/users?count=0` y valores inválidos devuelven 400 con `VALIDATION_ERROR` |
| `error.middleware.test.js` | Todas las respuestas de error incluyen `status`, `error` y `message` |
