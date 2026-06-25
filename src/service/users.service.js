
import userRepository from "../repository/user.repository";


export const userService = async () => {
    const users = await userRepository.allUsers()

    if (!user) {
        const errorGeneric = new Error("User not found..")
        errorGeneric.statusCode = 404
        throw errorGeneric
    }

    return users
}

export const userByIdService = async (id) => {
    const userById = await userRepository.userById(id)

    if (!userById) {
        const error = new Error("User ID not found")
        error.statusCode = 404
        throw error
    }
    return userById
}

export const createUserService = async (body) => {

    const duplicateUser = await userRepository.duplicateUser(body.email)

    if (duplicateUser) {
        const error = new Error("User exist in DB")
        error.statusCode = 404
        throw error
    }
    const newUser = await userRepository.createUser(body)

    return newUser
}

export const findIdandUpdateService = async (id, body) => {
    const userId = await userRepository.userById(id)
    if (!userId) {
        console.log('[DEBUG] User not exists in DB ');
        const error = new Error("User not exist in DB")
        error.statusCode = 404
        throw error
    }

    const userIdandUpdate = await userRepository.findIDandUpdate(id, body)

    return userIdandUpdate
}

export const deleteByIdService = async(id) => {
    const existId = await userRepository.userById(id)
    if (!existId) {
        const error = new Error("User not found in DB")
        error.statusCode = 404
        throw error
    }
    const deleteById= await userRepository.deleteById(id)

    return deleteById
}