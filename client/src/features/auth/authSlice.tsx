import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

interface AuthState {
    token: string | null
}

const initialState: AuthState = {
    token: localStorage.getItem('spotify-web-player.spotify_access_token') || null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        tokenReceived: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('spotify-web-player.spotify_access_token', state.token)
        },
        loggedOut: (state) => {
            state.token = null;
            localStorage.removeItem('spotify-web-player.spotify_access_token');
        }

    }
})

export default authSlice.reducer

export const { tokenReceived, loggedOut } = authSlice.actions

export const selectCurrentAuthToken = (state: RootState) => state.auth.token
