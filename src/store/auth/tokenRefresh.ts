import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const isTokenExpired = (): boolean => {
    const expiresIn = Number(localStorage.getItem('expiresIn'));
    const tokenTimestamp = Number(localStorage.getItem('tokenTimestamp'));

    if (!expiresIn || !tokenTimestamp) return true;

    const currentTime = Date.now();
    const expirationTime = tokenTimestamp + expiresIn * 1000;

    return currentTime > expirationTime;
};

export const refreshAccessToken = createAsyncThunk(
    'auth/refreshAccessToken',
    async (_, { rejectWithValue }) => {
        const client_id: string = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const client_secret: string = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

        if (!client_id) throw new Error('client_id is missing!');
        if (!client_secret) throw new Error('client_secret is missing!');

        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error('refresh_token is missing!');

        const data = new URLSearchParams();
        data.append('grant_type', 'refresh_token');
        data.append('refresh_token', refreshToken);
        data.append('client_id', client_id);

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
                refresh_token: newRefreshToken,
                expires_in: expiresIn,
            } = response.data;

            return {
                accessToken,
                refreshToken: newRefreshToken || refreshToken,
                expiresIn: Number(expiresIn),
            };
        } catch (error) {
            let errorMessage = 'Error refreshing access token';

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
