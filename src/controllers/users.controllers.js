import { createUserService, deleteByIdService, findIdandUpdateService, userByIdService, userService } from "../service/users.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const usersControllers = async (req, res) => {
    try {
        const data = await userService()

        return successResponse(res, {
            message: "Lista de Usuarios",
            payload: data
        })

        // res.json({ status: "success", payload: users });
    } catch (error) {
        res.status(error.statusCode).json({ status: "error", message: error.message })
    }
}
export const userbyIdControllers = async (req, res) => {

    try {
        const userId = await userByIdService(req.params.uid)
        return successResponse(res, {
            message: "Obtener Usuarios por ID",
            payload: userId
        })
        // res.json({ status: "success", payload: userId });

    } catch (err) {
        res.status(err.statusCode).json({ status: "error", message: err.message })
    }
}

export const createUserControllers = async (req, res) => {

    try {
        const newUser = await createUserService(req.body)
        return successResponse(res, {
            statusCode: 201,
            message: "Usuario creado correctamente",
            payload: newUser
        })
        // res.json({ status: "success", payload: newUser });

    } catch (e) {
        res.status(e.statusCode || 500).json({ status: "error", message: e.message })
    }
}

export const userIdandUpdateControllers = async (req, res) => {

    try {

        const idandUpdate = await findIdandUpdateService(req.params.uid, req.body)
        return successResponse(res, {
            message: "Usuario modificado por ID",
            payload: idandUpdate
        })
        // res.json({ status: "success", payload: idandUpdate });

    } catch (error) {
        res.status(error.statusCode || 500).json({ status: "error", message: error.message })
    }

}

export const deleteByIdControllers = async (req, res) => {
    try {
        const deleteById = await deleteByIdService(req.params.uid)
          return successResponse(res, {
            message: "Usuarios Eliminado",
            payload: deleteById
        })
        // res.json({ status: "success", payload: deleteById });
    } catch (error) {
        res.status(error.statusCode || 500).json({ status: "error", message: error.message })
    }
}