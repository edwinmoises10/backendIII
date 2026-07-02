import storeRepository from "../repository/store.repository.js";

export const storesService = async () => {
  const stores = await storeRepository.allStores();
  return stores;
};

export const storeByIdService = async (id) => {
  const store = await storeRepository.storeById(id);
  if (!store) {
    const error = new Error("Comercio no encontrado");
    error.statusCode = 404;
    throw error;
  }
  return store;
};

export const createStoreService = async (body) => {
  const newStore = await storeRepository.createStore(body);
  return newStore;
};

export const findIdAndUpdateService = async (id, body) => {
  const store = await storeRepository.storeById(id);
  if (!store) {
    const error = new Error("Comercio no encontrado");
    error.statusCode = 404;
    throw error;
  }
  const updatedStore = await storeRepository.findIdAndUpdate(id, body);
  return updatedStore;
};

export const deleteByIdService = async (id) => {
  const store = await storeRepository.storeById(id);
  if (!store) {
    const error = new Error("Comercio no encontrado");
    error.statusCode = 404;
    throw error;
  }
  const deletedStore = await storeRepository.deleteById(id);
  return deletedStore;
};
