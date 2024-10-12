import Cookies from "js-cookie";
import axios from "axios";
import {IAuthResponse, IEmailPassword} from "@/store/user/user.interface";
import * as process from "process";
import {getContentType} from "@/api/api.helper";
import {saveTokenStorage, saveToStorage} from "@/services/auth/auth.helper";
import {axiosClassic, instance} from "@/api/api.intercepter";

export const authService = {

    async main (type: 'login' | 'register', data: IEmailPassword) {
        const response = await axiosClassic<IAuthResponse>({
            url: `/auth/${type}`,
            method: "POST",
            data
        })
        if(response.data.accessToken) saveToStorage(response.data)

        return response.data
    },

    async getNewTokens() {
        const refreshToken = Cookies.get('refreshToken')

        const response = await axiosClassic.post<string, {data: IAuthResponse}>(
           '/auth/login/access-token',
            {refreshToken}
        )
        if(response.data.accessToken) saveTokenStorage(response.data)
        return response
    }
}