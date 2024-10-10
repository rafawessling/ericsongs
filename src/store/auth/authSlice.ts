import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAccessToken } from './fetchAccessToken';
import { refreshAccessToken } from './tokenRefresh';
import { AuthState } from './authTypes';

const initialState: AuthState = {
    isLoggedIn: !!localStorage.getItem('accessToken'),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    expiresIn: localStorage.getItem('expiresIn')
        ? Number(localStorage.getItem('expiresIn'))
        : null,
    tokenTimestamp: localStorage.getItem('tokenTimestamp')
        ? Number(localStorage.getItem('tokenTimestamp'))
        : null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signout: state => {
            state.isLoggedIn = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.expiresIn = null;
            state.tokenTimestamp = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('expiresIn');
            localStorage.removeItem('tokenTimestamp');
            localStorage.removeItem('codeVerifier');
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAccessToken.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAccessToken.fulfilled,
                (
                    state,
                    action: PayloadAction<{
                        accessToken: string;
                        refreshToken: string;
                        expiresIn: number;
                    }>
                ) => {
                    state.isLoggedIn = true;
                    state.accessToken = action.payload.accessToken;
                    state.refreshToken = action.payload.refreshToken;
                    state.expiresIn = action.payload.expiresIn;
                    state.tokenTimestamp = Date.now();
                    state.loading = false;
                    state.error = null;
                    localStorage.setItem('accessToken', action.payload.accessToken);
                    localStorage.setItem('refreshToken', action.payload.refreshToken);
                    localStorage.setItem(
                        'expiresIn',
                        action.payload.expiresIn.toString()
                    );
                    localStorage.setItem(
                        'tokenTimestamp',
                        state.tokenTimestamp.toString()
                    );
                }
            )
            .addCase(fetchAccessToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isLoggedIn = false;
                state.accessToken = null;
                state.refreshToken = null;
                state.expiresIn = null;
                state.tokenTimestamp = null;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('expiresIn');
                localStorage.removeItem('tokenTimestamp');
                localStorage.removeItem('codeVerifier');
            });
        builder
            .addCase(refreshAccessToken.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                refreshAccessToken.fulfilled,
                (
                    state,
                    action: PayloadAction<{
                        accessToken: string;
                        refreshToken: string;
                        expiresIn: number;
                    }>
                ) => {
                    state.isLoggedIn = true;
                    state.accessToken = action.payload.accessToken;
                    state.refreshToken = action.payload.refreshToken;
                    state.expiresIn = action.payload.expiresIn;
                    state.tokenTimestamp = Date.now();
                    state.loading = false;
                    state.error = null;
                    localStorage.setItem('accessToken', action.payload.accessToken);
                    localStorage.setItem('refreshToken', action.payload.refreshToken);
                    localStorage.setItem(
                        'expiresIn',
                        action.payload.expiresIn.toString()
                    );
                    localStorage.setItem(
                        'tokenTimestamp',
                        state.tokenTimestamp.toString()
                    );
                }
            )
            .addCase(refreshAccessToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { signout } = authSlice.actions;

export default authSlice.reducer;
