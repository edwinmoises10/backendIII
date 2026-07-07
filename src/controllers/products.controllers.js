import {
  productsService,
  productByIdService,
  createProductService,
  findIdAndUpdateService,
  deleteByIdService
} from "../service/products.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const productsControllers = async (req, res, next) => {
  try {
    const products = await productsService();
    return successResponse(res, { message: "Lista de Productos", payload: products });
  } catch (error) {
    next(error);
  }
};

export const productByIdControllers = async (req, res, next) => {
  try {
    const product = await productByIdService(req.params.pid);
    return successResponse(res, { message: "Producto obtenido por ID", payload: product });
  } catch (error) {
    next(error);
  }
};

export const createProductControllers = async (req, res, next) => {
  try {
    const newProduct = await createProductService(req.body);
    return successResponse(res, { statusCode: 201, message: "Producto creado correctamente", payload: newProduct });
  } catch (error) {
    next(error);
  }
};

export const productIdAndUpdateControllers = async (req, res, next) => {
  try {
    const updated = await findIdAndUpdateService(req.params.pid, req.body);
    return successResponse(res, { message: "Producto modificado por ID", payload: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteByIdControllers = async (req, res, next) => {
  try {
    const deleted = await deleteByIdService(req.params.pid);
    return successResponse(res, { message: "Producto eliminado", payload: deleted });
  } catch (error) {
    next(error);
  }
};
