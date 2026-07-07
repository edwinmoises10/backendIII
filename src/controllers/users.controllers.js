import {
  createUserService,
  deleteByIdService,
  findIdandUpdateService,
  userByIdService,
  userService
} from "../service/users.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const usersControllers = async (req, res, next) => {
  try {
    const data = await userService();
    return successResponse(res, { message: "Lista de Usuarios", payload: data });
  } catch (error) {
    next(error);
  }
};

export const userbyIdControllers = async (req, res, next) => {
  try {
    const user = await userByIdService(req.params.uid);
    return successResponse(res, { message: "Usuario obtenido por ID", payload: user });
  } catch (error) {
    next(error);
  }
};

export const createUserControllers = async (req, res, next) => {
  try {
    const newUser = await createUserService(req.body);
    return successResponse(res, { statusCode: 201, message: "Usuario creado correctamente", payload: newUser });
  } catch (error) {
    next(error);
  }
};

export const userIdandUpdateControllers = async (req, res, next) => {
  try {
    const updated = await findIdandUpdateService(req.params.uid, req.body);
    return successResponse(res, { message: "Usuario modificado por ID", payload: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteByIdControllers = async (req, res, next) => {
  try {
    const deleted = await deleteByIdService(req.params.uid);
    return successResponse(res, { message: "Usuario eliminado", payload: deleted });
  } catch (error) {
    next(error);
  }
};
