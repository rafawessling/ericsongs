import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchSearchResults } from './fetchSearchResults';
import { SpotifyArtist } from '../../types/artist';
import { SpotifySong } from '../../types/song';

interface SearchState {
    query: string;
    artistsData: SpotifyArtist[];
    songsData: SpotifySong[];
    loading: boolean;
    error: string | null;
}

const initialState: SearchState = {
    query: '',
    artistsData: [],
    songsData: [],
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
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchSearchResults.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.loading = false;
                state.artistsData = action.payload.artists;
                state.songsData = action.payload.songs;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearchQuery, clearSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
