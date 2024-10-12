import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAuthResponse, IAxiosErrorResponse, IEmailPassword} from "@/store/user/user.interface";
import {authService} from "@/services/auth/auth.service";
import {removeFromStorage} from "@/services/auth/auth.helper";
import {errorCatch} from "@/api/api.helper";
import {AxiosError} from "axios";


export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
    'auth/register',
    async (data, thunkAPI) => {
        try {
            const response = await authService.main('register', data)
            return response
        } catch (error) {
            const axiosError = error as AxiosError<IAxiosErrorResponse>;
            console.log(axiosError.response?.data)
            return thunkAPI.rejectWithValue(axiosError.response?.data)
        }
    }
)

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const response = await authService.main('login', data)
            return response
        } catch (error) {
            const axiosError = error as AxiosError<IAxiosErrorResponse>;
            console.log(axiosError.response?.data)
            return thunkAPI.rejectWithValue(axiosError.response?.data)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        removeFromStorage()
        return
    }
)

export const checkAuth = createAsyncThunk<IAuthResponse>(
    'auth/check-auth',
    async (_, thunkAPI) => {
        try {
            const response = await authService.getNewTokens()
            return response.data
        } catch (error) {
            if(errorCatch(error) === 'jwt expired') {
                thunkAPI.dispatch(logout())
            }
            return thunkAPI.rejectWithValue(error)
        }
    }
)

