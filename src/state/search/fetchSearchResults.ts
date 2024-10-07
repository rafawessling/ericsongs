import { createAsyncThunk } from '@reduxjs/toolkit';
import { SpotifyArtist } from '../../types/artist';
import { SpotifySong } from '../../types/song';
import axios from 'axios';
import tempArtistImage from '../../assets/tempArtistImage.svg';

export const fetchSearchResults = createAsyncThunk(
    'search/fetchSearchResults',
    async (
        { query, accessToken }: { query: string; accessToken: string },
        { rejectWithValue }
    ) => {
        if (!accessToken) {
            return rejectWithValue('No access token found');
        }

        try {
            const artistsResponse = await axios.get(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                    query
                )}&type=artist&limit=30`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const songsResponse = await axios.get(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                    query
                )}&type=track&limit=30`,
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

            return { artists, songs };
        } catch (error) {
            let errorMessage = 'Failed to fetch search results';

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
