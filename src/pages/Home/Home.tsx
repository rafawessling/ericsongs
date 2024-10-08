import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTable } from '../../components/CustomTable/CustomTable';
import { Header } from '../../components/Header/Header';
import { Loading } from '../../components/Loading/Loading';
import { SideBar } from '../../components/SideBar/SideBar';
import { signout } from '../../store/auth/authSlice';
import { fetchSearchResults } from '../../store/search/fetchSearchResults';
import { AppDispatch, RootState } from '../../store/store';
import { artistColumns } from '../../utils/tables/artistTable';
import { songColumns } from '../../utils/tables/songTable';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/signUpBackground.svg';

export const Home = () => {
    const [songsRows, setSongsRows] = useState(5);
    const [artistRows, setArtistRows] = useState(5);
    const [textSearching, setTextSearching] = useState('');
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const { accessToken, isLoggedIn } = useSelector((state: RootState) => state.auth);
    const { query, artistsData, songsData, loading, error } = useSelector(
        (state: RootState) => state.search
    );

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && query.trim()) {
            if (accessToken) {
                dispatch(fetchSearchResults({ query }));
                setTextSearching(query);
            } else {
                console.error('No access token available.');
            }
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

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const handleSignOut = () => {
        dispatch(signout());
        navigate('/');
    };

    return (
        <main className="flex min-h-dvh w-screen bg-primary">
            {loading && <Loading />}
            <SideBar handleSignOut={handleSignOut} />
            <section className="flex flex-col gap-6 w-full px-5 pt-3 pb-16 lg:p-8 text-zinc-50">
                <Header
                    handleSearch={handleSearch}
                    setTextSearching={setTextSearching}
                    handleSignOut={handleSignOut}
                />
                <h3 className="text-xl lg:text-2xl text-center text-zinc-300">
                    {textSearching && `Results for "${textSearching}"`}
                </h3>
                {error && <p className="text-lg text-center text-red-600">{error}</p>}
                <section className="flex flex-col justify-center lg:flex-row gap-6 lg:gap-8 xl:gap-16">
                    <section className="flex flex-col gap-2 z-20 w-full lg:w-2/5 xl:w-2/6">
                        <h3 className="text-xl lg:text-2xl">Artists</h3>
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
                        <h3 className="text-xl lg:text-2xl">Songs</h3>
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
            </section>
            <div className="flex justify-center items-start z-10 fixed bottom-24 w-full h-24 md:h-44 lg:h-60 lg:bottom-32 bg-gradient-signup"></div>
            <img
                className="z-0 fixed bottom-0 w-full min-h-36 max-h-56 object-cover md:max-h-64 lg:max-h-72 opacity-30"
                src={background}
                alt="Background"
            />
        </main>
    );
};
