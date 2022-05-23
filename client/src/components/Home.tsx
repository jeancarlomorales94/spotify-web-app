import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { loggedOut } from "../features/auth/authSlice";

const Home = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    return (
        <>
            <div>Home</div>
            <button onClick={() => {
                dispatch(loggedOut());
            }}>Log Out</button>
        </>
    )
}

export default Home