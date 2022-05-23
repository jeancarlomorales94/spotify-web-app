import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loggedOut, tokenRefreshed, selectRefreshToken } from "../features/auth/authSlice";

const Home = () => {
    const dispatch = useAppDispatch();
    const refreshToken = useAppSelector(selectRefreshToken);
    return (
        <>
            <div>Home</div>
            <button onClick={() => {
                dispatch(loggedOut());
            }}>Log Out</button>
            <button onClick={() => {
                dispatch(tokenRefreshed(refreshToken))
            }}>Refresh Token</button>
        </>
    )
}

export default Home