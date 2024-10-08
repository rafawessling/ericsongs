import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAccessToken = createAsyncThunk(
    'auth/fetchAccessToken',
    async ({ code }: { code: string }, { rejectWithValue }) => {
        const client_id: string = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const client_secret: string = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
        const redirect_uri: string = import.meta.env.VITE_REDIRECT_URI;

        if (!client_id) throw new Error('client_id is missing!');
        if (!client_secret) throw new Error('client_secret is missing!');

        const data = new URLSearchParams();
        data.append('code', code);
        data.append('redirect_uri', redirect_uri);
        data.append('grant_type', 'authorization_code');

        const encodedCredentials = btoa(`${client_id}:${client_secret}`);

        try {
            const response = await axios.post(
                'https://accounts.spotify.com/api/token',
                data,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: 'Basic ' + encodedCredentials,
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
