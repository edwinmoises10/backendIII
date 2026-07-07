import { ERROR_DICTIONARY } from "./errorDictionary.js";
import { CustomError } from "./CustomError.js";

export function successResponse(res, { statusCode = 200, message, payload }) {
  return res.status(statusCode).json({
    status: "success",
    message,
    payload
  });
}

export function errorResponse(res, { statusCode, error, message }) {
  return res.status(statusCode).json({
    status: "error",
    error,
    message
  });
}

export function createError(code, customMessage = null) {
  const errorDefinition = ERROR_DICTIONARY[code] || ERROR_DICTIONARY.INTERNAL_SERVER_ERROR;
  const resolvedCode = ERROR_DICTIONARY[code] ? code : "INTERNAL_SERVER_ERROR";
  return new CustomError(resolvedCode, customMessage || errorDefinition.message, errorDefinition.statusCode);
}
