import userRepository from "../repository/user.repository.js";
import { createError } from "../utils/apiResponse.js";

export const userService = async () => {
  return await userRepository.allUsers();
};

export const userByIdService = async (id) => {
  const user = await userRepository.userById(id);
  if (!user) throw createError("USER_NOT_FOUND");
  return user;
};

export const createUserService = async (body) => {
  const duplicate = await userRepository.duplicateUser(body.email);
  if (duplicate) throw createError("USER_ALREADY_EXIST");
  return await userRepository.createUser(body);
};

export const findIdandUpdateService = async (id, body) => {
  const user = await userRepository.userById(id);
  if (!user) throw createError("USER_NOT_FOUND");
  return await userRepository.findIDandUpdate(id, body);
};

export const deleteByIdService = async (id) => {
  const user = await userRepository.userById(id);
  if (!user) throw createError("USER_NOT_FOUND");
  return await userRepository.deleteById(id);
};
