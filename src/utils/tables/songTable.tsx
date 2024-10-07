import { Music } from 'lucide-react';
import { CustomColumnProps, Song } from '../../components/CustomTable/CustomTable';

export const songColumns: CustomColumnProps<Song>[] = [
    {
        field: 'title',
        header: 'Title',
        sortable: true,
        body: rowData => (
            <div className="flex items-center gap-3">
                <div className="flex justify-center items-center w-14 h-14 rounded-xl bg-gray-800">
                    <Music />
                </div>
                <div className="flex flex-col w-3/4">
                    <h4 className="truncate w-full">{rowData.name}</h4>
                    <span className="text-zinc-400 font-light truncate w-full">
                        {rowData.artists.map(artist => artist.name).join(', ')}
                    </span>
                </div>
            </div>
        ),
        style: { maxWidth: '18.75rem', padding: '0.5rem 0' },
    },
    {
        field: 'album',
        header: 'Album',
        sortable: true,
        body: rowData => (
            <div className="truncate w-11/12">
                <span className="font-light w-full">{rowData.album.name}</span>
            </div>
        ),
        style: {
            width: '25%',
            maxWidth: '12rem',
            padding: '0.5rem 1rem 0.5rem 0.5rem',
        },
    },
    {
        field: 'releaseDate',
        header: 'Release Date',
        sortable: true,
        body: rowData => (
            <span className="font-light truncate w-full">{rowData.releaseDate}</span>
        ),
        style: {
            width: '25%',
            padding: '0.5rem 0 0.5rem 0.5rem',
        },
    },
];
