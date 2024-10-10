import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAccessToken = createAsyncThunk(
    'auth/fetchAccessToken',
    async (
        { code, codeVerifier }: { code: string; codeVerifier: string },
        { rejectWithValue }
    ) => {
        const client_id: string = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const redirect_uri: string = import.meta.env.VITE_REDIRECT_URI;

        if (!client_id) throw new Error('client_id is missing!');

        const data = new URLSearchParams();
        data.append('client_id', client_id);
        data.append('grant_type', 'authorization_code');
        data.append('code', code);
        data.append('redirect_uri', redirect_uri);
        data.append('code_verifier', codeVerifier);

        try {
            const response = await axios.post(
                'https://accounts.spotify.com/api/token',
                data,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            const {
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_in: expiresIn,
            } = response.data;

            return { accessToken, refreshToken, expiresIn };
        } catch (error) {
            let errorMessage = 'Error fetching access token';

            if (axios.isAxiosError(error)) {
                errorMessage =
                    error.response?.data?.error?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            return rejectWithValue(errorMessage);
        }
    }
);
