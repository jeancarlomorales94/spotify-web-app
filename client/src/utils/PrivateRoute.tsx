import { Navigate } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { selectAreCredentialsValid } from "../features/auth/authSlice"

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useAppSelector(selectAreCredentialsValid);
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute