import User from "./user.model.js"

export class UserServices {

    async createUser(data) {
        return await User.create(data)
    }

    async findOneById(id) {
        return await User.findOne({
            where: {
                id,
                status: true
            }
        })
    }

    async findAllUser() {
        return await User.findAll({
            where: {
                status: true
            }
        })
    }

    async updateUser(user, data) {
        return await user.update(data)
    }

    async deleteUser(user) {
        return await user.update({
            status: false
        })
    }

    async findUserByEmail(email) {
        return await User.findOne({
            where: {
                email,
                status: true
            }
        })
    }

}