import {
  storesService,
  storeByIdService,
  createStoreService,
  findIdAndUpdateService,
  deleteByIdService
} from "../service/stores.service.js";
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

export const storesControllers = async (req, res) => {
  try {
    const stores = await storesService();
    return successResponse(res, { message: "Lista de Comercios", payload: stores });
  } catch (error) {
    return handleError(res, error);
  }
};

export const storeByIdControllers = async (req, res) => {
  try {
    const store = await storeByIdService(req.params.sid);
    return successResponse(res, { message: "Comercio obtenido por ID", payload: store });
  } catch (error) {
    return handleError(res, error);
  }
};

export const createStoreControllers = async (req, res) => {
  try {
    const newStore = await createStoreService(req.body);
    return successResponse(res, { statusCode: 201, message: "Comercio creado correctamente", payload: newStore });
  } catch (error) {
    return handleError(res, error);
  }
};

export const storeIdAndUpdateControllers = async (req, res) => {
  try {
    const updatedStore = await findIdAndUpdateService(req.params.sid, req.body);
    return successResponse(res, { message: "Comercio modificado por ID", payload: updatedStore });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteByIdControllers = async (req, res) => {
  try {
    const deletedStore = await deleteByIdService(req.params.sid);
    return successResponse(res, { message: "Comercio eliminado", payload: deletedStore });
  } catch (error) {
    return handleError(res, error);
  }
};
