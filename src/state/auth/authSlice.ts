import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAccessToken } from './fetchAccessToken';

interface AuthState {
    accessToken: string | null;
    error: string | null;
}

const initialState: AuthState = {
    accessToken: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAccessToken: state => {
            state.accessToken = null;
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(
                fetchAccessToken.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.accessToken = action.payload;
                    state.error = null;
                }
            )
            .addCase(fetchAccessToken.rejected, state => {
                state.accessToken = null;
                if (state.error) {
                    state.error = 'Error fetching access token';
                }
            });
    },
});

export const { clearAccessToken } = authSlice.actions;

export default authSlice.reducer;
