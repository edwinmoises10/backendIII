import orderRepository from "../repository/order.repository.js";
import userRepository from "../repository/user.repository.js";
import storeRepository from "../repository/store.repository.js";

export const ordersService = async () => {
  return await orderRepository.allOrders();
};

export const orderByIdService = async (id) => {
  const order = await orderRepository.orderById(id);
  if (!order) {
    const error = new Error("Pedido no encontrado");
    error.statusCode = 404;
    throw error;
  }
  return order;
};

export const createOrderService = async (body) => {
  const { customer, store, items, deliveryAddress, priority } = body;

  if (!customer || !store || !items || !deliveryAddress) {
    const error = new Error("Faltan datos obligatorios");
    error.statusCode = 400;
    throw error;
  }

  if (!Array.isArray(items) || items.length === 0) {
    const error = new Error("El pedido debe tener al menos un producto");
    error.statusCode = 400;
    throw error;
  }

  const customerFound = await userRepository.userById(customer);
  if (!customerFound) {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    throw error;
  }

  const storeFound = await storeRepository.storeById(store);
  if (!storeFound) {
    const error = new Error("Comercio no encontrado");
    error.statusCode = 404;
    throw error;
  }

  const total = items.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );

  const newOrder = await orderRepository.createOrder({
    customer,
    store,
    items,
    deliveryAddress,
    priority,
    total
  });

  return newOrder;
};

export const updateOrderStatusService = async (id, status) => {
  const order = await orderRepository.orderById(id);
  if (!order) {
    const error = new Error("Pedido no encontrado");
    error.statusCode = 404;
    throw error;
  }

  const updatedOrder = await orderRepository.updateOrderStatus(id, status);
  return updatedOrder;
};

export const deleteByIdService = async (id) => {
  const order = await orderRepository.orderById(id);
  if (!order) {
    const error = new Error("Pedido no encontrado");
    error.statusCode = 404;
    throw error;
  }

  const deletedOrder = await orderRepository.deleteById(id);
  return deletedOrder;
};
