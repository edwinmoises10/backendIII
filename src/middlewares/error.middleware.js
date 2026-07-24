import { CustomError } from "../utils/CustomError.js";
import logger from "../config/logger.js";

export const errorMiddleware = (err, req, res, next) => {
  const context = `${req.method} ${req.originalUrl}`;

  if (err instanceof CustomError) {
    // Errores de negocio (4xx): son esperados, se registran como advertencia.
    // Errores 5xx encapsulados en CustomError se registran como error real.
    if (err.statusCode >= 500) {
      logger.error(`[${context}] ${err.code}: ${err.message}`);
    } else {
      logger.warning(`[${context}] ${err.code}: ${err.message}`);
    }

    return res.status(err.statusCode).json({
      status: "error",
      error: err.code,
      message: err.message
    });
  }

  // Mongoose: ID con formato inválido
  if (err.name === "CastError" && err.kind === "ObjectId") {
    logger.warning(`[${context}] VALIDATION_ERROR: ID con formato inválido`);
    return res.status(400).json({
      status: "error",
      error: "VALIDATION_ERROR",
      message: "ID con formato inválido"
    });
  }

  // Mongoose: fallo de validación de esquema
  if (err.name === "ValidationError") {
    logger.warning(`[${context}] VALIDATION_ERROR: ${err.message}`);
    return res.status(400).json({
      status: "error",
      error: "VALIDATION_ERROR",
      message: err.message
    });
  }

  logger.error(`[${context}] Error inesperado del servidor: ${err.message}`, { stack: err.stack });
  return res.status(500).json({
    status: "error",
    error: "INTERNAL_SERVER_ERROR",
    message: "Error interno en el Servidor"
  });
};
