import { CustomError } from "../utils/CustomError.js";

export const errorMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: "error",
      error: err.code,
      message: err.message
    });
  }

  // Mongoose: ID con formato inválido
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({
      status: "error",
      error: "VALIDATION_ERROR",
      message: "ID con formato inválido"
    });
  }

  // Mongoose: fallo de validación de esquema
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      error: "VALIDATION_ERROR",
      message: err.message
    });
  }

  console.error("[Error no manejado]", err);
  return res.status(500).json({
    status: "error",
    error: "INTERNAL_SERVER_ERROR",
    message: "Error interno en el Servidor"
  });
};
