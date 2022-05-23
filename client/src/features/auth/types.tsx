interface AuthState {
    accessToken: string | null,
    refreshToken: string | null,
    expiresIn: number,
    timestamp: number
}
interface RefreshTokenResponse {
    access_token: string,
    expires_in: number,
    timestamp: number
}

export type { AuthState, RefreshTokenResponse }