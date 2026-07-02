import {
  deliveriesService,
  deliveryByIdService,
  createDeliveryService,
  updateDeliveryStatusService,
  deleteByIdService
} from "../service/deliveries.service.js";

export const deliveriesControllers = async (req, res) => {
  try {
    const deliveries = await deliveriesService();
    res.json({ status: "success", payload: deliveries });
  } catch (error) {
    res.status(error.statusCode || 500).json({ status: "error", message: error.message });
  }
};

export const deliveryByIdControllers = async (req, res) => {
  try {
    const delivery = await deliveryByIdService(req.params.did);
    res.json({ status: "success", payload: delivery });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: "error", message: error.message });
  }
};

export const createDeliveryControllers = async (req, res) => {
  try {
    const newDelivery = await createDeliveryService(req.body);
    res.status(201).json({ status: "success", payload: newDelivery });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: "error", message: error.message });
  }
};

export const deliveryStatusUpdateControllers = async (req, res) => {
  try {
    const updatedDelivery = await updateDeliveryStatusService(req.params.did, req.body.status);
    res.json({ status: "success", payload: updatedDelivery });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: "error", message: error.message });
  }
};

export const deleteByIdControllers = async (req, res) => {
  try {
    const deletedDelivery = await deleteByIdService(req.params.did);
    res.json({ status: "success", payload: deletedDelivery });
  } catch (error) {
    res.status(error.statusCode || 400).json({ status: "error", message: error.message });
  }
};
