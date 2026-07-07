import {
  populateMocksService,
  generateUsersMockService,
  generateDriversMockService
} from "../service/mocks.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import { ERROR_DICTIONARY } from "../utils/errorDictionary.js";

const handleError = (res, error) => {
  const definition = ERROR_DICTIONARY[error.code] || ERROR_DICTIONARY.INTERNAL_SERVER_ERROR;
  return errorResponse(res, {
    statusCode: definition.statusCode,
    error: error.code || "INTERNAL_SERVER_ERROR",
    message: error.message
  });
};

export const populateMocksController = async (req, res) => {
  try {
    const counts = req.body;
    const result = await populateMocksService(counts);
    return successResponse(res, {
      statusCode: 201,
      message: "Base de datos poblada con datos de prueba",
      payload: result
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const generateUsersMockController = async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 10;
    const users = await generateUsersMockService(count);
    return successResponse(res, {
      statusCode: 201,
      message: `${users.length} usuarios generados y guardados`,
      payload: users
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const generateDriversMockController = async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 5;
    const drivers = await generateDriversMockService(count);
    return successResponse(res, {
      statusCode: 201,
      message: `${drivers.length} repartidores generados y guardados`,
      payload: drivers
    });
  } catch (error) {
    return handleError(res, error);
  }
};
