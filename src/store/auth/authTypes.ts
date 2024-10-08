export interface AuthState {
    isLoggedIn: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number | null;
    tokenTimestamp: number | null;
    loading: boolean;
    error: string | null;
}
