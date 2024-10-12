import {IInitialState} from "@/store/user/user.interface";
import {createSlice} from "@reduxjs/toolkit";
import {checkAuth, login, logout, register} from "@/store/user/user.actions";
import {getStorageLocal} from "@/utils/localStorage";

const initialState: IInitialState = {
    user: getStorageLocal('user'),
    isLoading: false,
    isError: false
}

interface ErrorPayload {
    message: string;
    error: string;
    statusCode: number;
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError: (state) => {
            state.isError = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(register.pending, state => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(register.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.isError = false
                state.user = payload.user
            })
            .addCase(register.rejected, (state,  {payload}) => {
                const error = payload as ErrorPayload;
                state.isLoading = false
                state.user = null
                state.isError = error.message
            })
            .addCase(login.pending, state => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(login.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.isError = false
                state.user = payload.user
            })
            .addCase(login.rejected, (state, {payload}) => {
                const error = payload as ErrorPayload;
                state.isLoading = false
                state.user = null
                state.isError = error.message
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null
            })
            .addCase(checkAuth.fulfilled, (state, {payload}) => {
                state.user = payload.user
            })
    }
})

// export const { clearError } = userSlice.actions;