import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { AuthState } from "./types"

const initialState: AuthState = {
    accessToken: localStorage.getItem('spotify-web-player.spotify_access_token'),
    refreshToken: localStorage.getItem('spotify-web-player.spotify_refresh_token'),
    expiresIn: Number(localStorage.getItem('spotify-web-player.spotify_expires_in')),
    timestamp: Number(localStorage.getItem('spotify-web-player.spotify_timestamp'))
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loggedIn: (_, action: PayloadAction<AuthState>) => {
            localStorage.setItem('spotify-web-player.spotify_access_token', action.payload.accessToken!)
            localStorage.setItem('spotify-web-player.spotify_refresh_token', action.payload.refreshToken!)
            localStorage.setItem('spotify-web-player.spotify_expires_in', String(action.payload.expiresIn!))
            localStorage.setItem('spotify-web-player.spotify_timestamp', String(action.payload.timestamp!))
            return action.payload;
        },
        loggedOut: () => {
            localStorage.removeItem('spotify-web-player.spotify_access_token');
            localStorage.removeItem('spotify-web-player.spotify_refresh_token');
            localStorage.removeItem('spotify-web-player.spotify_expires_in');
            return { ...initialState };
        }
    }
})

export default authSlice.reducer

export const { loggedIn, loggedOut } = authSlice.actions

export const selectAreCredentialsValid = (state: RootState) => {
    const millisecondsElapsed = Date.now() - state.auth.timestamp;
    return state.auth.accessToken && (millisecondsElapsed / 1000) <= state.auth.expiresIn;
}
