interface AuthState {
    accessToken: string | null,
    refreshToken: string | null,
    expiresIn: number,
    timestamp: number
}

export type { AuthState }