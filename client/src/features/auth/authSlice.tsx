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
        setCredentials: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('spotify-web-player.spotify_access_token', state.token)
        }
    }
})

export default authSlice.reducer

export const { setCredentials } = authSlice.actions

export const selectCurrentAuthToken = (state: RootState) => state.auth.token
