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

    ROUTE_NOT_FOUND: {
        statusCode: 404,
        message: "Ruta no encontrada"
    },

    INTERNAL_SERVER_ERROR: {
        statusCode: 500,
        message: "Error interno en el Servidor"
    }


}