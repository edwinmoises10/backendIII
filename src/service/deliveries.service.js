import deliveryRepository from "../repository/delivery.repository.js";
import orderRepository from "../repository/order.repository.js";
import userRepository from "../repository/user.repository.js";

export const deliveriesService = async () => {
  return await deliveryRepository.allDeliveries();
};

export const deliveryByIdService = async (id) => {
  const delivery = await deliveryRepository.deliveryById(id);
  if (!delivery) {
    const error = new Error("Entrega no encontrada");
    error.statusCode = 404;
    throw error;
  }
  return delivery;
};

export const createDeliveryService = async (body) => {
  const { order, driver, status, priority } = body;

  if (!order) {
    const error = new Error("Faltan datos obligatorios");
    error.statusCode = 400;
    throw error;
  }

  const orderFound = await orderRepository.orderById(order);
  if (!orderFound) {
    const error = new Error("Pedido no encontrado");
    error.statusCode = 404;
    throw error;
  }

  if (driver) {
    const driverFound = await userRepository.userById(driver);
    if (!driverFound) {
      const error = new Error("Conductor no encontrado");
      error.statusCode = 404;
      throw error;
    }
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
  if (!delivery) {
    const error = new Error("Entrega no encontrada");
    error.statusCode = 404;
    throw error;
  }

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
  if (!delivery) {
    const error = new Error("Entrega no encontrada");
    error.statusCode = 404;
    throw error;
  }

  const deletedDelivery = await deliveryRepository.deleteById(id);
  return deletedDelivery;
};
