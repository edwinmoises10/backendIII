import {
  productsService,
  productByIdService,
  createProductService,
  findIdAndUpdateService,
  deleteByIdService
} from "../service/products.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import { ERROR_DICTIONARY } from "../utils/errorDictionary.js";

const handleError = (res, error) => {
  const definition = ERROR_DICTIONARY[error.code] || ERROR_DICTIONARY.INTERNAL_SERVER_ERROR;
  return errorResponse(res, {
    statusCode: definition.statusCode,
    error: error.code || "INTERNAL_SERVER_ERROR",
    message: error.message
  });
};

export const productsControllers = async (req, res) => {
  try {
    const products = await productsService();
    return successResponse(res, { message: "Lista de Productos", payload: products });
  } catch (error) {
    return handleError(res, error);
  }
};

export const productByIdControllers = async (req, res) => {
  try {
    const product = await productByIdService(req.params.pid);
    return successResponse(res, { message: "Producto obtenido por ID", payload: product });
  } catch (error) {
    return handleError(res, error);
  }
};

export const createProductControllers = async (req, res) => {
  try {
    const newProduct = await createProductService(req.body);
    return successResponse(res, { statusCode: 201, message: "Producto creado correctamente", payload: newProduct });
  } catch (error) {
    return handleError(res, error);
  }
};

export const productIdAndUpdateControllers = async (req, res) => {
  try {
    const updatedProduct = await findIdAndUpdateService(req.params.pid, req.body);
    return successResponse(res, { message: "Producto modificado por ID", payload: updatedProduct });
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteByIdControllers = async (req, res) => {
  try {
    const deletedProduct = await deleteByIdService(req.params.pid);
    return successResponse(res, { message: "Producto eliminado", payload: deletedProduct });
  } catch (error) {
    return handleError(res, error);
  }
};
