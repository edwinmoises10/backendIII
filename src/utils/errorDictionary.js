export const ERROR_DICTIONARY = {
    VALIDATION_ERROR: {
        statusCode: 400,
        message: "Datos invalidos o incompletos"
    },

    USER_NOT_FOUND: {
        statusCode: 404,
        message: "Usuario no encontrado"
    },

    INVALID_USER_ROL: {
        statusCode: 400,
        message: "Rol Invalido"
    },

    USER_ALREADY_EXIST: {
        statusCode: 409,
        message: "Ya existe un usuario registrado con ese E-mail"
    },

    STORE_NOT_FOUND: {
        statusCode: 404,
        message: "Comercio no encontrado"
    },

    STORE_VALIDATION_ERROR: {
        statusCode: 400,
        message: "Datos del comercio invalidos o incompletos"
    },

    ORDER_NOT_FOUND: {
        statusCode: 404,
        message: "Pedido no encontrado"
    },

    ORDER_VALIDATION_ERROR: {
        statusCode: 400,
        message: "Datos del pedido invalidos o incompletos"
    },

    DELIVERY_NOT_FOUND: {
        statusCode: 404,
        message: "Entrega no encontrada"
    },

    DELIVERY_VALIDATION_ERROR: {
        statusCode: 400,
        message: "Datos de entrega invalidos o incompletos"
    },

    DRIVER_NOT_FOUND: {
        statusCode: 404,
        message: "Conductor no encontrado"
    },

    ROUTE_NOT_FOUND: {
        statusCode: 404,
        message: "Ruta no encontrada"
    },

    INTERNAL_SERVER_ERROR: {
        statusCode: 500,
        message: "Error interno en el Servidor"
    }
}