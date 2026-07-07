import {
  deliveriesService,
  deliveryByIdService,
  createDeliveryService,
  updateDeliveryStatusService,
  deleteByIdService
} from "../service/deliveries.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const deliveriesControllers = async (req, res, next) => {
  try {
    const deliveries = await deliveriesService();
    return successResponse(res, { message: "Lista de Entregas", payload: deliveries });
  } catch (error) {
    next(error);
  }
};

export const deliveryByIdControllers = async (req, res, next) => {
  try {
    const delivery = await deliveryByIdService(req.params.did);
    return successResponse(res, { message: "Entrega obtenida por ID", payload: delivery });
  } catch (error) {
    next(error);
  }
};

export const createDeliveryControllers = async (req, res, next) => {
  try {
    const newDelivery = await createDeliveryService(req.body);
    return successResponse(res, { statusCode: 201, message: "Entrega creada correctamente", payload: newDelivery });
  } catch (error) {
    next(error);
  }
};

export const deliveryStatusUpdateControllers = async (req, res, next) => {
  try {
    const updated = await updateDeliveryStatusService(req.params.did, req.body.status);
    return successResponse(res, { message: "Estado de entrega actualizado", payload: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteByIdControllers = async (req, res, next) => {
  try {
    const deleted = await deleteByIdService(req.params.did);
    return successResponse(res, { message: "Entrega eliminada", payload: deleted });
  } catch (error) {
    next(error);
  }
};
