import productRepository from "../repository/product.repository.js";
import storeRepository from "../repository/store.repository.js";
import { createError } from "../utils/apiResponse.js";

export const productsService = async () => {
  return await productRepository.allProducts();
};

export const productByIdService = async (id) => {
  const product = await productRepository.productById(id);
  if (!product) throw createError("PRODUCT_NOT_FOUND");
  return product;
};

export const createProductService = async (body) => {
  const { name, price, store } = body;
  if (!name || price === undefined || !store) throw createError("PRODUCT_VALIDATION_ERROR");

  const storeFound = await storeRepository.storeById(store);
  if (!storeFound) throw createError("STORE_NOT_FOUND");

  return await productRepository.createProduct(body);
};

export const findIdAndUpdateService = async (id, body) => {
  const product = await productRepository.productById(id);
  if (!product) throw createError("PRODUCT_NOT_FOUND");
  return await productRepository.findIdAndUpdate(id, body);
};

export const deleteByIdService = async (id) => {
  const product = await productRepository.productById(id);
  if (!product) throw createError("PRODUCT_NOT_FOUND");
  return await productRepository.deleteById(id);
};
