import { faker } from "@faker-js/faker";
import { ORDER_STATUS, PRIORITY } from "../constants/index.js";

export const generateOrderMock = (customerIds, storeIds, count = 1) => {
  return Array.from({ length: count }, () => {
    const items = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      name: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 10 }),
      price: parseFloat(faker.commerce.price({ min: 100, max: 5000 }))
    }));

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return {
      customer: faker.helpers.arrayElement(customerIds),
      store: faker.helpers.arrayElement(storeIds),
      items,
      deliveryAddress: faker.location.streetAddress(),
      total,
      status: ORDER_STATUS.CREATED,
      priority: faker.helpers.arrayElement(Object.values(PRIORITY))
    };
  });
};
