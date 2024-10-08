import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CustomTable } from '../../components/CustomTable/CustomTable';
import { Header } from '../../components/Header/Header';
import { Loading } from '../../components/Loading/Loading';
import { SideBar } from '../../components/SideBar/SideBar';
import { useSearchResults } from '../../hooks/useSearchResults';
import { signout } from '../../store/auth/authSlice';
import { AppDispatch, RootState } from '../../store/store';
import { artistColumns } from '../../utils/tables/artistTable';
import { songColumns } from '../../utils/tables/songTable';
import background from '../../assets/signUpBackground.svg';

export const Home = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const {
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
    } = useSearchResults();

    const { isLoggedIn } = useSelector((state: RootState) => state.auth);

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
        <main className="flex min-h-dvh w-full bg-primary overflow-x-hidden relative">
            {loading && <Loading />}
            <SideBar handleSignOut={handleSignOut} />
            <section className="flex flex-col gap-6 w-full px-5 pt-3 pb-16 lg:p-8 text-zinc-50 lg:ml-20">
                <Header
                    handleSearch={handleSearch}
                    setTextSearching={setTextSearching}
                    handleSignOut={handleSignOut}
                />
                <h3 className="text-xl lg:text-2xl text-center text-zinc-300">
                    {textSearching && `Results for "${textSearching}"`}
                </h3>
                {error && <p className="text-lg text-center text-red-600">{error}</p>}
                <section className="flex flex-col justify-center lg:flex-row gap-6 lg:gap-8 xl:gap-16 overflow-y-auto">
                    <section className="flex flex-col gap-2 z-20 w-full lg:w-2/5 xl:w-2/6">
                        <h3 className="text-xl lg:text-2xl">Artists</h3>
                        <CustomTable
                            className="flex flex-col gap-3 bg-zinc-800 p-2 lg:px-4 rounded-xl"
                            value={artistsData}
                            sortField="name"
                            sortOrder={1}
                            emptyMessage="No artists found."
                            removableSort
                            rows={7}
                            columns={artistColumns}
                            totalRecords={totalArtists}
                            handlePageChange={handleChangeArtistPage}
                            first={artistFirst}
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
                            rows={8}
                            columns={songColumns}
                            totalRecords={totalSongs}
                            handlePageChange={handleChangeSongPage}
                            first={songFirst}
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
