import {
  ordersService,
  orderByIdService,
  createOrderService,
  updateOrderStatusService,
  deleteByIdService
} from "../service/orders.service.js";

export const ordersControllers = async (req, res) => {
  try {
    const orders = await ordersService();
    res.json({ status: "success", payload: orders });
  } catch (error) {
    res.status(error.statusCode || 500).json({ status: "error", message: error.message });
  }
};

export const orderByIdControllers = async (req, res) => {
  try {
    const order = await orderByIdService(req.params.oid);
    res.json({ status: "success", payload: order });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: "error", message: error.message });
  }
};

export const createOrderControllers = async (req, res) => {
  try {
    const newOrder = await createOrderService(req.body);
    res.status(201).json({ status: "success", payload: newOrder });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: "error", message: error.message });
  }
};

export const orderStatusUpdateControllers = async (req, res) => {
  try {
    const updatedOrder = await updateOrderStatusService(req.params.oid, req.body.status);
    res.json({ status: "success", payload: updatedOrder });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: "error", message: error.message });
  }
};

export const deleteByIdControllers = async (req, res) => {
  try {
    const deletedOrder = await deleteByIdService(req.params.oid);
    res.json({ status: "success", payload: deletedOrder });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: "error", message: error.message });
  }
};
