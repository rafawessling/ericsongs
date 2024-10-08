import { createAsyncThunk } from '@reduxjs/toolkit';
import { SpotifyArtist } from '../../types/artist';
import { SpotifySong } from '../../types/song';
import { isTokenExpired, refreshAccessToken } from '../auth/tokenRefresh';
import { RootState } from '../store';
import { FetchProps } from './searchTypes';
import axios from 'axios';
import tempArtistImage from '../../assets/tempArtistImage.svg';

export const fetchArtists = createAsyncThunk(
    'search/fetchArtists',
    async (
        { query, offset = 0, limit = 7 }: FetchProps,
        { dispatch, getState, rejectWithValue }
    ) => {
        const state = getState() as RootState;
        let accessToken = state.auth.accessToken;

        if (isTokenExpired()) {
            try {
                const refreshResult = await dispatch(refreshAccessToken()).unwrap();
                accessToken = refreshResult.accessToken;
            } catch (error) {
                return rejectWithValue(`Failed to refresh token, error: ${error}`);
            }
        }
        if (!accessToken) {
            return rejectWithValue('No access token available');
        }

        try {
            const artistsResponse = await axios.get(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                    query
                )}&type=artist&limit=${limit}&offset=${offset}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const artists = artistsResponse.data.artists.items.map(
                (artist: SpotifyArtist) => ({
                    image: artist.images[0]?.url || tempArtistImage,
                    name: artist.name,
                    occupation: 'Artist',
                    popularity: artist.popularity,
                })
            );

            return {
                artists,
                totalArtists: artistsResponse.data.artists.total,
            };
        } catch (error) {
            let errorMessage = 'Error fetching artists';

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

export const fetchSongs = createAsyncThunk(
    'search/fetchSongs',
    async (
        { query, offset = 0, limit = 8 }: FetchProps,
        { dispatch, getState, rejectWithValue }
    ) => {
        const state = getState() as RootState;
        let accessToken = state.auth.accessToken;

        if (isTokenExpired()) {
            try {
                const refreshResult = await dispatch(refreshAccessToken()).unwrap();
                accessToken = refreshResult.accessToken;
            } catch (error) {
                return rejectWithValue(`Failed to refresh token, error: ${error}`);
            }
        }
        if (!accessToken) {
            return rejectWithValue('No access token available');
        }

        try {
            const songsResponse = await axios.get(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                    query
                )}&type=track&limit=${limit}&offset=${offset}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const songs = songsResponse.data.tracks.items.map((song: SpotifySong) => {
                const releaseDate = new Date(song.album.release_date);
                const formattedDate = releaseDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });

                return {
                    name: song.name,
                    artists: song.artists.map((artist: SpotifyArtist) => ({
                        images: artist.images,
                        name: artist.name,
                        popularity: artist.popularity,
                    })),
                    album: {
                        name: song.album.name,
                        release_date: song.album.release_date,
                        images: song.album.images,
                    },
                    releaseDate: formattedDate,
                };
            });

            return {
                songs,
                totalSongs: songsResponse.data.tracks.total,
            };
        } catch (error) {
            let errorMessage = 'Error fetching songs';

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
