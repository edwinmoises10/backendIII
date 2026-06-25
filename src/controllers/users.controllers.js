import { createUserService, deleteByIdService, findIdandUpdateService, userByIdService, userService } from "../service/users.service";

export const usersControllers = async (req, res) => {
    try {
        const data = await userService()
        res.json({ status: "success", payload: users });
    } catch (error) {
        res.status(error.statusCode).json({ status: "error", message: error.message })
    }
}
export const userbyIdControllers = async (req, res) => {

    try {
        const userId = await userByIdService(req.params.uid)
        res.json({ status: "success", payload: userId });

    } catch (err) {
        res.status(err.statusCode).json({ status: "error", message: err.message })
    }
}

export const createUserControllers = async (req, res) => {

    try {
        const newUser = await createUserService(req.body)
        res.json({ status: "success", payload: newUser });

    } catch (e) {
        res.status(e.statusCode || 500).json({ status: "error", message: e.message })
    }
}

export const userIdandUpdateControllers = async (req, res) => {

    try {

        const idandUpdate = await findIdandUpdateService(req.params.uid, req.body)
        res.json({ status: "success", payload: idandUpdate });

    } catch (error) {
        res.status(error.statusCode || 500).json({ status: "error", message: error.message })
    }

}

export const deleteByIdControllers = async (req, res) => {
    try {
        const deleteById = await deleteByIdService(req.params.uid)
        res.json({ status: "success", payload: deleteById });
    } catch (error) {
        res.status(error.statusCode || 500).json({ status: "error", message: error.message })
    }
}