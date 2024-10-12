import Cookies from "js-cookie";
import {IAuthResponse, ITokens} from "@/store/user/user.interface";

export const getAccessToken = () => {
    return Cookies.get('accessToken') || null
}

export const getUserFromStore = () => {
    return JSON.parse(localStorage.getItem('user') || '{}')
}

export const saveTokenStorage = (data: ITokens) => {
    Cookies.set('accessToken', data.accessToken)
    Cookies.set('refreshToken', data.accessToken)
}

export const removeFromStorage = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse) => {
    saveTokenStorage(data)
    localStorage.setItem('user', JSON.stringify(data.user))
}
