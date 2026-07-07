import {
  ordersService,
  orderByIdService,
  createOrderService,
  updateOrderStatusService,
  deleteByIdService
} from "../service/orders.service.js";
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

export const ordersControllers = async (req, res) => {
  try {
    const orders = await ordersService();
    return successResponse(res, { message: "Lista de Pedidos", payload: orders });
  } catch (error) {
    return handleError(res, error);
  }
};

export const orderByIdControllers = async (req, res) => {
  try {
    const order = await orderByIdService(req.params.oid);
    return successResponse(res, { message: "Pedido obtenido por ID", payload: order });
  } catch (error) {
    return handleError(res, error);
  }
};

export const createOrderControllers = async (req, res) => {
  try {
    const newOrder = await createOrderService(req.body);
    return successResponse(res, { statusCode: 201, message: "Pedido creado correctamente", payload: newOrder });
  } catch (error) {
    return handleError(res, error);
  }
};

export const orderStatusUpdateControllers = async (req, res) => {
  try {
    const updatedOrder = await updateOrderStatusService(req.params.oid, req.body.status);
    return successResponse(res, { message: "Estado del pedido actualizado", payload: updatedOrder });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteByIdControllers = async (req, res) => {
  try {
    const deletedOrder = await deleteByIdService(req.params.oid);
    return successResponse(res, { message: "Pedido eliminado", payload: deletedOrder });
  } catch (error) {
    return handleError(res, error);
  }
};
