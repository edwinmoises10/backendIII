import { faker } from "@faker-js/faker";
import { ORDER_STATUS, PRIORITY } from "../constants/index.js";

export const generateDeliveryMock = (orderIds, driverIds, count = 1) => {
  return Array.from({ length: count }, () => ({
    order: faker.helpers.arrayElement(orderIds),
    driver: driverIds.length > 0 ? faker.helpers.arrayElement(driverIds) : undefined,
    status: ORDER_STATUS.CREATED,
    priority: faker.helpers.arrayElement(Object.values(PRIORITY))
  }));
};
