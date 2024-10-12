'use client'
import {PropsWithChildren} from "react";
import {ReduxProvider} from "@/providers/ReduxProvider/ReduxProvider";
import {AuthProvider} from "@/providers/AuthProvider/AuthProvider";

export default function Providers({ children }: PropsWithChildren<unknown>) {
    return (
        <ReduxProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ReduxProvider>
    );
}


