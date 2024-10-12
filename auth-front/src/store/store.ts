import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore, persistReducer
} from 'redux-persist'
import {Action, combineReducers, ThunkAction} from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import {userSlice} from "@/store/user/user.slice";

const rootReducer = combineSlices(
  userSlice,
);

let mainReducer = rootReducer

const isClient = typeof window !== 'undefined'

if (isClient) {
  const {persistReducer} = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;

  const persistConfig = {
    key: 'auth-front',
    storage,
    blacklist: ['user']
  }

  mainReducer = persistReducer(persistConfig, rootReducer)
}

export const makeStore = () => {
  return configureStore({
    reducer: mainReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
      }).concat();
    },
  });
};

export type RootState = ReturnType<typeof mainReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
