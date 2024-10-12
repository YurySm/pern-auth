'use client';
import { FC, PropsWithChildren, useEffect, useState } from "react";
import {useAuth} from "@/hooks/useAuth";
import {useActions} from "@/store/hooks";
import {usePathname, useRouter} from "next/navigation";
import {getAccessToken} from "@/services/auth/auth.helper";
import Cookies from "js-cookie";

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
    const [domLoaded, setDomLoaded] = useState(false);

    const {user} = useAuth()
    const {checkAuth, logout} = useActions()
    const pathname  = usePathname()
    const router = useRouter()

    useEffect(() => {
        const accessToken = getAccessToken()
        if(accessToken) checkAuth()
    }, [])

    useEffect(() => {
        const refreshToken = Cookies.get('refreshToken')
        if(!refreshToken && user) logout()
    }, [pathname]);

    useEffect(() => {
        !user && ( pathname !== '/auth') && router.replace('/auth')
    }, [user])

    useEffect(() => {
        !user &&( pathname !== '/auth') && router.replace('/auth')
    }, [])

    return (
        <>
            {children}
        </>
    );
};
