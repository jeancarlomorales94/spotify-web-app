import { useAppDispatch } from "../app/hooks";
import { loggedOut } from "../features/auth/authSlice";
import { useGetProfileQuery } from "../features/profile/profileSlice";

const Home = () => {
    const { data } = useGetProfileQuery();
    const dispatch = useAppDispatch();
    const onLogout = () => {
        dispatch(loggedOut());
        window.location.href = '/';
    }
    return (
        <>
            <div>Home</div>
            {data && <pre>{JSON.stringify(data.display_name, null, 2)}</pre>}
            <button onClick={onLogout}>Log out</button>
        </>

    )
}

export default Home