import { useEffect, useState } from 'react';
import { CustomTable } from '../../components/CustomTable/CustomTable';
import { Header } from '../../components/Header/Header';
import { SideBar } from '../../components/SideBar/SideBar';
import { artistColumns } from '../../utils/tables/artistTable';
import { songColumns } from '../../utils/tables/songTable';
import tempImage from '../../assets/tempArtistImage.svg';

export const Home = () => {
    const [search, setSearch] = useState('');
    const [songsRows, setSongsRows] = useState(5);
    const [artistRows, setArtistRows] = useState(5);

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

    const artistsData = [
        {
            image: tempImage,
            name: 'Coldplay 1 testing long text',
            occupation: 'Artist',
            popularity: 95,
        },
    ];

    const songsData = [
        {
            title: 'A Sky Full of Stars',
            artist: 'Coldplay',
            album: 'Ghost Stories',
            releaseDate: 'April 03, 2024',
        },
    ];

    return (
        <main className="flex min-h-dvh w-screen bg-primary">
            <SideBar />
            <section className="flex flex-col gap-6 w-full px-5 pt-3 pb-16 lg:p-8 text-zinc-50">
                <Header search={search} setSearch={setSearch} />
                <h3 className="text-xl lg:text-2xl text-center text-zinc-300">
                    Results for "{search}"
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
