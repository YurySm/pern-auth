import {IUser} from "@/interfaces/user.interface";
import {instance} from "@/api/api.intercepter";

type TypeData = {
    email: string
    password?: string
    name?: string
    avatarPath?: string
    phone?: string
}

const USERS = 'user'
export const userService = {

    async getProfile () {
        return instance<IUser>({
            url: `${USERS}/profile`,
            method: "GET",
        })
    },

    async updateProfile (data: TypeData) {
        return instance<IUser>({
            url: `${USERS}/profile`,
            method: "PUT",
            data
        })
    },
}