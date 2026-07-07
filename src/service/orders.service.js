import orderRepository from "../repository/order.repository.js";
import userRepository from "../repository/user.repository.js";
import storeRepository from "../repository/store.repository.js";
import { createError } from "../utils/apiResponse.js";

export const ordersService = async () => {
  return await orderRepository.allOrders();
};

export const orderByIdService = async (id) => {
  const order = await orderRepository.orderById(id);
  if (!order) throw createError("ORDER_NOT_FOUND");
  return order;
};

export const createOrderService = async (body) => {
  const { customer, store, items, deliveryAddress } = body;

  if (!customer || !store || !items || !deliveryAddress) {
    throw createError("ORDER_VALIDATION_ERROR");
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw createError("ORDER_VALIDATION_ERROR", "El pedido debe tener al menos un producto");
  }

  const customerFound = await userRepository.userById(customer);
  if (!customerFound) throw createError("USER_NOT_FOUND");

  const storeFound = await storeRepository.storeById(store);
  if (!storeFound) throw createError("STORE_NOT_FOUND");

  const total = items.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );

  const newOrder = await orderRepository.createOrder({
    customer,
    store,
    items,
    deliveryAddress,
    priority: body.priority,
    total
  });

  return newOrder;
};

export const updateOrderStatusService = async (id, status) => {
  const order = await orderRepository.orderById(id);
  if (!order) throw createError("ORDER_NOT_FOUND");
  const updatedOrder = await orderRepository.updateOrderStatus(id, status);
  return updatedOrder;
};

export const deleteByIdService = async (id) => {
  const order = await orderRepository.orderById(id);
  if (!order) throw createError("ORDER_NOT_FOUND");
  const deletedOrder = await orderRepository.deleteById(id);
  return deletedOrder;
};
