import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { FC } from 'react';
import { CustomTableProps } from './CustomTableTypes';

export const CustomTable: FC<CustomTableProps> = ({
    className,
    value,
    sortField,
    sortOrder,
    emptyMessage,
    removableSort,
    rows,
    columns,
    totalRecords,
    handlePageChange,
    first,
}) => {
    return (
        <>
            <DataTable
                className={className}
                value={value}
                sortField={sortField}
                sortOrder={sortOrder}
                emptyMessage={emptyMessage}
                removableSort={removableSort}
                rows={rows}
                totalRecords={totalRecords}
                onPage={handlePageChange}
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
            {totalRecords > 0 && (
                <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={totalRecords}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
};
