import UserModel from "../models/user.model";


class Users {

    async allUsers() {
        return await UserModel.find()
    }

    async userById(id) {
        return await UserModel.findById(id)
    }

    async createUser(body) {
        return await UserModel.create(body)
    }

    async duplicateUser(value) {
        return await UserModel.findOne({ email: value })
    }

    async findIDandUpdate(id, body) {
        return await UserModel.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });
    }

    async deleteById(id){
        return await UserModel.findByIdAndDelete(id)
    }
}

export default new Users() 