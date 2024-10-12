"use client";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import {AppStore, makeStore} from "@/store/store";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";

interface Props {
    readonly children: ReactNode;
}

export const ReduxProvider = ({ children }: Props) => {
    const storeRef = useRef<AppStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    const persistor = persistStore(storeRef.current)

    useEffect(() => {
        if (storeRef.current != null) {
            const unsubscribe = setupListeners(storeRef.current.dispatch);
            return unsubscribe;
        }
    }, []);

    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
};
