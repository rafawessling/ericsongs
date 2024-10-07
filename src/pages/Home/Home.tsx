import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    CustomTable,
    SpotifyArtist,
    SpotifySong,
} from '../../components/CustomTable/CustomTable';
import { Header } from '../../components/Header/Header';
import { SideBar } from '../../components/SideBar/SideBar';
import { clearAccessToken, setAccessToken } from '../../state/auth/authSlice';
import { artistColumns } from '../../utils/tables/artistTable';
import { songColumns } from '../../utils/tables/songTable';
import axios from 'axios';
import tempImage from '../../assets/tempArtistImage.svg';

export const Home = () => {
    const [search, setSearch] = useState('');
    const [songsRows, setSongsRows] = useState(5);
    const [artistRows, setArtistRows] = useState(5);
    const [artistsData, setArtistsData] = useState([]);
    const [songsData, setSongsData] = useState([]);
    const [textSearching, setTextSearching] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const client_id: string = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const client_secret: string = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    useEffect(() => {
        if (!client_id || !client_secret) {
            console.error('Client ID or Client Secret is missing!');
            return;
        }

        const data = new URLSearchParams();
        data.append('grant_type', 'client_credentials');

        const encodedCredentials = btoa(`${client_id}:${client_secret}`);

        const fetchData = async () => {
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
                dispatch(setAccessToken(response.data.access_token));
                localStorage.setItem('access_token', response.data.access_token);
                window.history.replaceState({}, document.title, window.location.pathname);
            } catch (error: unknown) {
                console.error(
                    'Error getting access token:',
                    (error as Error).message || error
                );
                navigate('/');
            }
        };

        fetchData();
    }, [client_id, client_secret, dispatch]);

    const handleSearch = async () => {
        const accessToken = localStorage.getItem('access_token');

        try {
            const artistsResponse = await axios.get(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                    search
                )}&type=artist&limit=30`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const artists = artistsResponse.data.artists.items.map(
                (artist: SpotifyArtist) => ({
                    image: artist.images[0]?.url || tempImage,
                    name: artist.name,
                    occupation: 'Artist',
                    popularity: artist.popularity,
                })
            );
            setArtistsData(artists);

            const songsResponse = await axios.get(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                    search
                )}&type=track&limit=30`,
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
            setSongsData(songs);
            setTextSearching(search);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        function updateRows() {
            const isLargeScreen = window.innerWidth > 1024;
            const isTallScreen = window.innerHeight >= 900;
            const isTallerScreen = window.innerHeight >= 1050;

            if (isLargeScreen && isTallerScreen) {
                setSongsRows(10);
                setArtistRows(8);
            } else if (isLargeScreen && isTallScreen) {
                setSongsRows(8);
                setArtistRows(7);
            } else if (isLargeScreen) {
                setSongsRows(6);
                setArtistRows(5);
            } else {
                setSongsRows(5);
                setArtistRows(5);
            }
        }

        window.addEventListener('resize', updateRows);
        updateRows();

        return () => window.removeEventListener('resize', updateRows);
    }, []);

    const handleSignOut = () => {
        dispatch(clearAccessToken());
        localStorage.removeItem('access_token');
        window.location.href = '/';
    };

    return (
        <main className="flex min-h-dvh w-screen bg-primary">
            <SideBar handleSignOut={handleSignOut} />
            <section className="flex flex-col gap-6 w-full px-5 pt-3 pb-16 lg:p-8 text-zinc-50">
                <Header
                    search={search}
                    setSearch={setSearch}
                    setArtistsData={setArtistsData}
                    setSongsData={setSongsData}
                    handleSearch={handleSearch}
                    setTextSearching={setTextSearching}
                    handleSignOut={handleSignOut}
                />
                <h3 className="text-xl lg:text-2xl text-center text-zinc-300">
                    Results for "{textSearching}"
                </h3>
                <section className="flex flex-col justify-center lg:flex-row gap-6 lg:gap-8 xl:gap-16">
                    <section className="flex flex-col gap-2 z-20 w-full lg:w-2/5 xl:w-2/6">
                        <h3 className="text-xl lg:text-2xl">
                            Artists - {artistsData.length} found
                        </h3>
                        <CustomTable
                            className="flex flex-col gap-3 bg-zinc-800 p-2 lg:px-4 rounded-xl"
                            value={artistsData}
                            sortField="name"
                            sortOrder={1}
                            emptyMessage="No artists found."
                            removableSort
                            paginator={artistsData.length > artistRows}
                            rows={artistRows}
                            columns={artistColumns}
                        />
                    </section>
                    <section className="flex flex-col gap-2 z-20 lg:w-3/5">
                        <h3 className="text-xl lg:text-2xl">
                            Songs - {songsData.length} found
                        </h3>
                        <CustomTable
                            className="flex flex-col gap-2 lg:py-2"
                            value={songsData}
                            sortField="title"
                            sortOrder={1}
                            emptyMessage="No songs found."
                            removableSort
                            paginator={songsData.length > songsRows}
                            rows={songsRows}
                            columns={songColumns}
                        />
                    </section>
                </section>
                <div className="fixed bottom-0 left-0 z-10 w-full h-44 bg-gradient-home"></div>
            </section>
        </main>
    );
};
