import {
  ordersService,
  orderByIdService,
  createOrderService,
  updateOrderStatusService,
  deleteByIdService
} from "../service/orders.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const ordersControllers = async (req, res, next) => {
  try {
    const orders = await ordersService();
    return successResponse(res, { message: "Lista de Pedidos", payload: orders });
  } catch (error) {
    next(error);
  }
};

export const orderByIdControllers = async (req, res, next) => {
  try {
    const order = await orderByIdService(req.params.oid);
    return successResponse(res, { message: "Pedido obtenido por ID", payload: order });
  } catch (error) {
    next(error);
  }
};

export const createOrderControllers = async (req, res, next) => {
  try {
    const newOrder = await createOrderService(req.body);
    return successResponse(res, { statusCode: 201, message: "Pedido creado correctamente", payload: newOrder });
  } catch (error) {
    next(error);
  }
};

export const orderStatusUpdateControllers = async (req, res, next) => {
  try {
    const updated = await updateOrderStatusService(req.params.oid, req.body.status);
    return successResponse(res, { message: "Estado del pedido actualizado", payload: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteByIdControllers = async (req, res, next) => {
  try {
    const deleted = await deleteByIdService(req.params.oid);
    return successResponse(res, { message: "Pedido eliminado", payload: deleted });
  } catch (error) {
    next(error);
  }
};
