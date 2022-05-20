import { useAppDispatch } from "../app/hooks";
import { loggedOut } from "../features/auth/authSlice";

const Home = () => {
    const dispatch = useAppDispatch();
    const onLogout = () => {
        dispatch(loggedOut());
        window.location.href = '/';
    }
    return (
        <>
            <div>Home</div>
            <button onClick={onLogout}>Log out</button>
        </>

    )
}

export default Home