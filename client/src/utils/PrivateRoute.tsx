import { useEffect } from "react";
import { Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { hasTokenExpired, selectAuthCredentials, tokenRefreshed } from "../features/auth/authSlice"

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const dispatch = useAppDispatch();
    const { accessToken, refreshToken } = useAppSelector(selectAuthCredentials);
    const tokenExpired = useAppSelector(hasTokenExpired);

    useEffect(() => {
        if (tokenExpired && refreshToken) {
            dispatch(tokenRefreshed(refreshToken));
            console.log('tokenExpired', tokenExpired, refreshToken);
        }
    }, [dispatch])

    return accessToken ? children : <Navigate to="/login" />;
}

export default PrivateRoute