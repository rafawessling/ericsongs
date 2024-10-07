import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAccessToken = createAsyncThunk(
    'auth/fetchAccessToken',
    async (_, { rejectWithValue }) => {
        const client_id: string = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const client_secret: string = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

        if (!client_id || !client_secret) {
            throw new Error('Client ID or Client Secret is missing!');
        }

        const data = new URLSearchParams();
        data.append('grant_type', 'client_credentials');

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
            return response.data.access_token;
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
