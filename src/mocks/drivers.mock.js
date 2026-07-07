import { faker } from "@faker-js/faker";
import { USER_ROLES } from "../constants/index.js";

export const generateDriverMock = (count = 1) => {
  return Array.from({ length: count }, () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
    role: USER_ROLES.DRIVER,
    documents: []
  }));
};
