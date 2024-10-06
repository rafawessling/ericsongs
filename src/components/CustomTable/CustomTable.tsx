import { Column } from 'primereact/column';
import { DataTable, SortOrder } from 'primereact/datatable';
import { FC } from 'react';

export interface Song {
    title: string;
    artist: string;
    album: string;
    releaseDate: string;
}

export interface Artist {
    image: string;
    name: string;
    occupation: string;
    popularity: number;
}

export interface CustomColumnProps<T> {
    field: string;
    header: string;
    sortable: boolean;
    body?: ((rowData: T) => JSX.Element) | undefined;
    style: React.CSSProperties;
}

interface CustomTableProps {
    className: string;
    value: object[];
    sortField: string;
    sortOrder: SortOrder;
    emptyMessage: string;
    removableSort: boolean;
    paginator: boolean;
    rows: number;
    columns: (CustomColumnProps<Artist> | CustomColumnProps<Song>)[];
}

export const CustomTable: FC<CustomTableProps> = ({
    className,
    value,
    sortField,
    sortOrder,
    emptyMessage,
    removableSort,
    paginator,
    rows,
    columns,
}) => {
    return (
        <DataTable
            className={className}
            value={value}
            sortField={sortField}
            sortOrder={sortOrder}
            emptyMessage={emptyMessage}
            removableSort={removableSort}
            paginator={paginator}
            rows={rows}
        >
            {columns.map((column, index) => (
                <Column
                    key={index}
                    field={column.field}
                    header={column.header}
                    sortable={column.sortable}
                    body={column.body}
                    style={column.style}
                />
            ))}
        </DataTable>
    );
};
