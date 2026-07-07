import { faker } from "@faker-js/faker";
import { PRODUCT_STATUS } from "../constants/index.js";

export const generateProductMock = (storeIds, count = 1) => {
  return Array.from({ length: count }, () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 100, max: 10000 })),
    stock: faker.number.int({ min: 0, max: 100 }),
    status: PRODUCT_STATUS.AVAILABLE,
    store: faker.helpers.arrayElement(storeIds),
    category: faker.commerce.department()
  }));
};
