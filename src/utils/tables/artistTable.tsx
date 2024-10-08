import { CustomColumnProps } from '../../components/CustomTable/CustomTable';
import { Artist } from '../../types/artist';

export const artistColumns: CustomColumnProps<Artist>[] = [
    {
        field: 'name',
        header: 'Name',
        sortable: true,
        body: rowData => (
            <div className="flex items-center gap-3 2xl:py-1">
                <img
                    className="h-14 w-14  object-cover rounded-full lg:h-16 lg:w-16"
                    src={rowData.image}
                    alt={rowData.name}
                />
                <div className="flex flex-col w-3/4">
                    <h4 className="truncate w-full">{rowData.name}</h4>
                    <span className="text-zinc-400 font-light truncate w-full">
                        {rowData.occupation}
                    </span>
                </div>
            </div>
        ),
        style: { width: '75%', padding: '0.5rem 0' },
    },
    {
        field: 'popularity',
        header: 'Popularity',
        sortable: true,
        body: rowData => <span>{rowData.popularity}</span>,
        style: {
            width: '25%',
            padding: '0.5rem 0 0.5rem 0.2rem',
            textAlign: 'center',
        },
    },
];
