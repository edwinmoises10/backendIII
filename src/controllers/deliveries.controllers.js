import {
  deliveriesService,
  deliveryByIdService,
  createDeliveryService,
  updateDeliveryStatusService,
  deleteByIdService
} from "../service/deliveries.service.js";
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

export const deliveriesControllers = async (req, res) => {
  try {
    const deliveries = await deliveriesService();
    return successResponse(res, { message: "Lista de Entregas", payload: deliveries });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deliveryByIdControllers = async (req, res) => {
  try {
    const delivery = await deliveryByIdService(req.params.did);
    return successResponse(res, { message: "Entrega obtenida por ID", payload: delivery });
  } catch (error) {
    return handleError(res, error);
  }
};

export const createDeliveryControllers = async (req, res) => {
  try {
    const newDelivery = await createDeliveryService(req.body);
    return successResponse(res, { statusCode: 201, message: "Entrega creada correctamente", payload: newDelivery });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deliveryStatusUpdateControllers = async (req, res) => {
  try {
    const updatedDelivery = await updateDeliveryStatusService(req.params.did, req.body.status);
    return successResponse(res, { message: "Estado de entrega actualizado", payload: updatedDelivery });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteByIdControllers = async (req, res) => {
  try {
    const deletedDelivery = await deleteByIdService(req.params.did);
    return successResponse(res, { message: "Entrega eliminada", payload: deletedDelivery });
  } catch (error) {
    return handleError(res, error);
  }
};
