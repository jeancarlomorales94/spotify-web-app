import { useEffect } from "react";
import './App.css';
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Home from './components/Home';
import { selectCurrentAuthToken, tokenReceived } from './features/auth/authSlice';
import Login from './features/auth/Login';

function App() {
  const token = useAppSelector(selectCurrentAuthToken)
  const dispatch = useAppDispatch()

  const getAccessTokenFromUrl = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get('access_token');
    return accessToken
  }

  useEffect(() => {
    if (token) return;
    const accessToken = getAccessTokenFromUrl()
    if (accessToken) {
      dispatch(tokenReceived(accessToken))
      window.location.href = '/';
    }
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        {token ? <Home /> : <Login />}
      </header >
    </div >
  );
}

export default App;
