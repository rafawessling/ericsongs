import { SortOrder } from 'primereact/datatable';
import { PaginatorProps } from 'primereact/paginator';
import { Artist } from '../../types/artist';
import { Song } from '../../types/song';

export interface CustomColumnProps<T> {
    field: string;
    header: string;
    sortable: boolean;
    body?: ((rowData: T) => JSX.Element) | undefined;
    style: React.CSSProperties;
}

export interface CustomTableProps {
    className: string;
    value: object[];
    sortField: string;
    sortOrder: SortOrder;
    emptyMessage: string;
    removableSort: boolean;
    rows: number;
    columns: (CustomColumnProps<Artist> | CustomColumnProps<Song>)[];
    totalRecords: number;
    handlePageChange?: (event: PaginatorProps) => void;
    first?: number;
}
