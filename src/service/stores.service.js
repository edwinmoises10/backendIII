import storeRepository from "../repository/store.repository.js";
import { createError } from "../utils/apiResponse.js";

export const storesService = async () => {
  const stores = await storeRepository.allStores();
  return stores;
};

export const storeByIdService = async (id) => {
  const store = await storeRepository.storeById(id);
  if (!store) throw createError("STORE_NOT_FOUND");
  return store;
};

export const createStoreService = async (body) => {
  const { name, address, owner } = body;
  if (!name || !address || !owner) throw createError("STORE_VALIDATION_ERROR");
  const newStore = await storeRepository.createStore(body);
  return newStore;
};

export const findIdAndUpdateService = async (id, body) => {
  const store = await storeRepository.storeById(id);
  if (!store) throw createError("STORE_NOT_FOUND");
  const updatedStore = await storeRepository.findIdAndUpdate(id, body);
  return updatedStore;
};

export const deleteByIdService = async (id) => {
  const store = await storeRepository.storeById(id);
  if (!store) throw createError("STORE_NOT_FOUND");
  const deletedStore = await storeRepository.deleteById(id);
  return deletedStore;
};
