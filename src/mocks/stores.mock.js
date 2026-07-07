import { faker } from "@faker-js/faker";

export const generateStoreMock = (ownerIds, count = 1) => {
  return Array.from({ length: count }, () => ({
    name: faker.company.name(),
    address: faker.location.streetAddress(),
    owner: faker.helpers.arrayElement(ownerIds),
    isActive: true
  }));
};
