import mockRepository from "../repository/mock.repository.js";
import { generateUserMock } from "../mocks/users.mock.js";
import { generateDriverMock } from "../mocks/drivers.mock.js";
import { generateStoreMock } from "../mocks/stores.mock.js";
import { generateProductMock } from "../mocks/products.mock.js";
import { generateOrderMock } from "../mocks/orders.mock.js";
import { generateDeliveryMock } from "../mocks/deliveries.mock.js";
import logger from "../config/logger.js";

export const populateMocksService = async ({
  users = 10,
  drivers = 5,
  stores = 3,
  products = 15,
  orders = 10,
  deliveries = 10
} = {}) => {
  const insertedUsers = await mockRepository.insertManyUsers(generateUserMock(users));
  const insertedDrivers = await mockRepository.insertManyUsers(generateDriverMock(drivers));

  const userIds = insertedUsers.map((u) => u._id);
  const driverIds = insertedDrivers.map((d) => d._id);

  const insertedStores = await mockRepository.insertManyStores(
    generateStoreMock(userIds, stores)
  );
  const storeIds = insertedStores.map((s) => s._id);

  const insertedProducts = await mockRepository.insertManyProducts(
    generateProductMock(storeIds, products)
  );

  const insertedOrders = await mockRepository.insertManyOrders(
    generateOrderMock(userIds, storeIds, orders)
  );
  const orderIds = insertedOrders.map((o) => o._id);

  const insertedDeliveries = await mockRepository.insertManyDeliveries(
    generateDeliveryMock(orderIds, driverIds, deliveries)
  );

  const summary = {
    users: insertedUsers.length,
    drivers: insertedDrivers.length,
    stores: insertedStores.length,
    products: insertedProducts.length,
    orders: insertedOrders.length,
    deliveries: insertedDeliveries.length
  };

  logger.info(`Datos mock generados: ${JSON.stringify(summary)}`);

  return summary;
};

export const generateUsersMockService = async (count) => {
  const inserted = await mockRepository.insertManyUsers(generateUserMock(count));
  logger.info(`Datos mock generados: ${inserted.length} usuarios`);
  return inserted;
};

export const generateDriversMockService = async (count) => {
  const inserted = await mockRepository.insertManyUsers(generateDriverMock(count));
  logger.info(`Datos mock generados: ${inserted.length} repartidores`);
  return inserted;
};
