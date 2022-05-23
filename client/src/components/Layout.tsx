import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <h1>Spotify Web Player</h1>
            <Outlet />
        </>
    );
};

export default Layout;
