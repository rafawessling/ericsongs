import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchArtists, fetchSongs } from './fetchSearchResults';
import { SearchState } from './searchTypes';

const initialState: SearchState = {
    query: '',
    artistsData: [],
    songsData: [],
    totalArtists: 0,
    totalSongs: 0,
    loading: false,
    error: null,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        clearSearchQuery: state => {
            state.query = '';
            state.artistsData = [];
            state.songsData = [];
            state.totalArtists = 0;
            state.totalSongs = 0;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchArtists.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArtists.fulfilled, (state, action) => {
                state.loading = false;
                state.artistsData = action.payload.artists;
                state.totalArtists =
                    action.payload.totalArtists < 1000
                        ? action.payload?.totalArtists
                        : 990;
            })
            .addCase(fetchArtists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        builder
            .addCase(fetchSongs.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSongs.fulfilled, (state, action) => {
                state.loading = false;
                state.songsData = action.payload.songs;
                state.totalSongs =
                    action.payload.totalSongs < 1000 ? action.payload.totalSongs : 990;
            })
            .addCase(fetchSongs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearchQuery, clearSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
