import { PaginatorProps } from 'primereact/paginator';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtists, fetchSongs } from '../store/search/fetchSearchResults';
import { AppDispatch, RootState } from '../store/store';

export const useSearchResults = () => {
    const [artistFirst, setArtistFirst] = useState(0);
    const [songFirst, setSongFirst] = useState(0);
    const [textSearching, setTextSearching] = useState('');

    const dispatch: AppDispatch = useDispatch();

    const { accessToken } = useSelector((state: RootState) => state.auth);
    const { query, artistsData, songsData, totalArtists, totalSongs, loading, error } =
        useSelector((state: RootState) => state.search);

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && query.trim()) {
            if (accessToken) {
                setArtistFirst(0);
                setSongFirst(0);

                dispatch(fetchArtists({ query }));
                dispatch(fetchSongs({ query }));
                setTextSearching(query);
            } else {
                console.error('No access token available.');
            }
        }
    };

    const handleChangeArtistPage = (event: PaginatorProps) => {
        const offset = event.first || 0;
        setArtistFirst(offset);
        dispatch(fetchArtists({ query, offset }));
    };

    const handleChangeSongPage = (event: PaginatorProps) => {
        const offset = event.first || 0;
        setSongFirst(offset || 0);
        dispatch(fetchSongs({ query, offset }));
    };

    return {
        artistFirst,
        songFirst,
        textSearching,
        loading,
        error,
        artistsData,
        songsData,
        totalArtists,
        totalSongs,
        handleSearch,
        setTextSearching,
        handleChangeArtistPage,
        handleChangeSongPage,
    };
};
