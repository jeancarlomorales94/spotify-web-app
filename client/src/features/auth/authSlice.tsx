import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "../../app/store"
import { AuthState, RefreshTokenResponse } from "./types"

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
            localStorage.removeItem('spotify-web-player.spotify_timestamp');
            return { accessToken: null, refreshToken: null, expiresIn: 0, timestamp: 0 };
        }
    },
    extraReducers: builder => {
        builder.addCase(tokenRefreshed.fulfilled, (state, action: PayloadAction<RefreshTokenResponse>) => {
            const { access_token, expires_in, timestamp } = action.payload;
            state.accessToken = access_token;
            state.expiresIn = expires_in;
            state.timestamp = timestamp;
            localStorage.setItem('spotify-web-player.spotify_access_token', access_token);
            localStorage.setItem('spotify-web-player.spotify_expires_in', String(expires_in));
            localStorage.setItem('spotify-web-player.spotify_timestamp', String(timestamp));
        })
    }
});

export const tokenRefreshed = createAsyncThunk('auth/tokenRefreshed', async (refresh_token: string | null) => {
    const response = await fetch('http://localhost:8888/refresh_token?refresh_token=' + refresh_token);
    const data = await response.json();
    const refreshTokenResponse: RefreshTokenResponse = {
        access_token: data.access_token,
        expires_in: data.expires_in,
        timestamp: Date.now()
    }
    return refreshTokenResponse;
})

export default authSlice.reducer

export const { loggedIn, loggedOut } = authSlice.actions

export const hasTokenExpired = (state: RootState) => {
    const millisecondsElapsed = Date.now() - state.auth.timestamp;
    return (millisecondsElapsed / 1000) > state.auth.expiresIn;
}
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectAuthCredentials = (state: RootState) => state.auth;