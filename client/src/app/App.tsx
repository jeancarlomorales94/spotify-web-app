import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Layout from '../components/Layout';
import Login from '../features/auth/Login';
import PrivateRoute from '../utils/PrivateRoute';
import Callback from '../features/auth/Callback';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/callback" element={<Callback />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Layout />
                        </PrivateRoute>
                    }
                >
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
