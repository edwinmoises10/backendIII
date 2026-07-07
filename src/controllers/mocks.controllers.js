import {
  populateMocksService,
  generateUsersMockService,
  generateDriversMockService
} from "../service/mocks.service.js";
import { successResponse } from "../utils/apiResponse.js";
import { createError } from "../utils/apiResponse.js";

const parseCount = (value, fieldName, max = 500) => {
  const count = parseInt(value);
  if (isNaN(count) || count < 1 || count > max) {
    throw createError("VALIDATION_ERROR", `'${fieldName}' debe ser un entero entre 1 y ${max}`);
  }
  return count;
};

export const populateMocksController = async (req, res, next) => {
  try {
    const body = req.body || {};
    const counts = {};
    const fields = ["users", "drivers", "stores", "products", "orders", "deliveries"];

    for (const field of fields) {
      if (body[field] !== undefined) {
        counts[field] = parseCount(body[field], field);
      }
    }

    const result = await populateMocksService(counts);
    return successResponse(res, {
      statusCode: 201,
      message: "Base de datos poblada con datos de prueba",
      payload: result
    });
  } catch (error) {
    next(error);
  }
};

export const generateUsersMockController = async (req, res, next) => {
  try {
    const count = parseCount(req.query.count ?? 10, "count");
    const users = await generateUsersMockService(count);
    return successResponse(res, {
      statusCode: 201,
      message: `${users.length} usuarios generados y guardados`,
      payload: users
    });
  } catch (error) {
    next(error);
  }
};

export const generateDriversMockController = async (req, res, next) => {
  try {
    const count = parseCount(req.query.count ?? 5, "count");
    const drivers = await generateDriversMockService(count);
    return successResponse(res, {
      statusCode: 201,
      message: `${drivers.length} repartidores generados y guardados`,
      payload: drivers
    });
  } catch (error) {
    next(error);
  }
};
