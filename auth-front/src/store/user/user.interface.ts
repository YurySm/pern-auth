import {IUser} from "@/interfaces/user.interface";

export interface IUserState {
    email: string
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface IInitialState {
    user: IUserState | null
    isLoading: boolean
    isError: boolean | string
}

export interface IEmailPassword {
    email: string
    password: string
}

export interface IAuthResponse extends ITokens {
    user: IUser
}

export interface IAxiosErrorResponse {
    message: string;
    error: string;
    statusCode: number;
}