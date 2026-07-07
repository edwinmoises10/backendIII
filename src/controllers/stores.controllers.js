import {
  storesService,
  storeByIdService,
  createStoreService,
  findIdAndUpdateService,
  deleteByIdService
} from "../service/stores.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const storesControllers = async (req, res, next) => {
  try {
    const stores = await storesService();
    return successResponse(res, { message: "Lista de Comercios", payload: stores });
  } catch (error) {
    next(error);
  }
};

export const storeByIdControllers = async (req, res, next) => {
  try {
    const store = await storeByIdService(req.params.sid);
    return successResponse(res, { message: "Comercio obtenido por ID", payload: store });
  } catch (error) {
    next(error);
  }
};

export const createStoreControllers = async (req, res, next) => {
  try {
    const newStore = await createStoreService(req.body);
    return successResponse(res, { statusCode: 201, message: "Comercio creado correctamente", payload: newStore });
  } catch (error) {
    next(error);
  }
};

export const storeIdAndUpdateControllers = async (req, res, next) => {
  try {
    const updated = await findIdAndUpdateService(req.params.sid, req.body);
    return successResponse(res, { message: "Comercio modificado por ID", payload: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteByIdControllers = async (req, res, next) => {
  try {
    const deleted = await deleteByIdService(req.params.sid);
    return successResponse(res, { message: "Comercio eliminado", payload: deleted });
  } catch (error) {
    next(error);
  }
};
