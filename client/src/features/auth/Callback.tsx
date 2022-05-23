import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { loggedIn } from './authSlice';
import { AuthState } from './types';

const Callback = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const accessToken = urlParams.get('access_token');
        const refreshToken = urlParams.get('refresh_token');
        const expiresIn = urlParams.get('expires_in');

        if (accessToken && refreshToken && expiresIn) {
            const authState: AuthState = {
                accessToken,
                refreshToken,
                expiresIn: Number(expiresIn),
                timestamp: Date.now(),
            };
            dispatch(loggedIn(authState));
            navigate('/');
        }
    }, [dispatch, navigate]);

    return <div>Callback</div>;
};

export default Callback;
