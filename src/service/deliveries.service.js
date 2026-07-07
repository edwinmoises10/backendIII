import deliveryRepository from "../repository/delivery.repository.js";
import orderRepository from "../repository/order.repository.js";
import userRepository from "../repository/user.repository.js";
import { createError } from "../utils/apiResponse.js";

export const deliveriesService = async () => {
  return await deliveryRepository.allDeliveries();
};

export const deliveryByIdService = async (id) => {
  const delivery = await deliveryRepository.deliveryById(id);
  if (!delivery) throw createError("DELIVERY_NOT_FOUND");
  return delivery;
};

export const createDeliveryService = async (body) => {
  const { order, driver, status, priority } = body;

  if (!order) throw createError("DELIVERY_VALIDATION_ERROR");

  const orderFound = await orderRepository.orderById(order);
  if (!orderFound) throw createError("ORDER_NOT_FOUND");

  if (driver) {
    const driverFound = await userRepository.userById(driver);
    if (!driverFound) throw createError("DRIVER_NOT_FOUND");
  }

  const newDelivery = await deliveryRepository.createDelivery({
    order,
    driver,
    status,
    priority
  });

  return newDelivery;
};

export const updateDeliveryStatusService = async (id, status) => {
  const delivery = await deliveryRepository.deliveryById(id);
  if (!delivery) throw createError("DELIVERY_NOT_FOUND");

  const update = { status };

  if (status === "assigned") {
    update.assignedAt = new Date();
  } else if (status === "delivered") {
    update.deliveredAt = new Date();
  }

  const updatedDelivery = await deliveryRepository.updateDeliveryStatus(id, update);
  return updatedDelivery;
};

export const deleteByIdService = async (id) => {
  const delivery = await deliveryRepository.deliveryById(id);
  if (!delivery) throw createError("DELIVERY_NOT_FOUND");
  const deletedDelivery = await deliveryRepository.deleteById(id);
  return deletedDelivery;
};
