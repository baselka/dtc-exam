/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useEffect, useRef } from 'react'
import { useTable, useSortBy, usePagination, useRowSelect } from 'react-table'
import Spinner from '../spinner'
import { PageWithText, Page } from '../pagination'

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <input
                type="checkbox"
                ref={resolvedRef}
                {...rest}
                className="form-checkbox h-4 w-4"
            />
        )
    }
)

const Datatable = ({
    columns,
    data,
    changePage,
    changeIndex,
    loading,
    limit,
    offset,
    pageCount: controlledPageCount,
    headerBorder
}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
        state: { pageIndex, pageSize, selectedRowIds }
    } = useTable(
        {

            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 0 },
            manualPagination: true,
            pageCount: controlledPageCount
        },
        useSortBy,
        usePagination,
        useRowSelect
        /* hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </>
                    )
                },
                ...columns
            ])
        } */
    )
    const canNext = () => {
        if (offset + 1 === pageCount) {
            return false
        } else {
            return true
        }
    }
    // Render the UI for your table
    return (
        <>
            {loading
                ? <div className="flex justify-center">
                    <Spinner width={'24'} height={'24'} topBorderColor={'orange'}/>
                </div>
                : <table {...getTableProps() } className="table striped hovered transform scale-5 md:scale-90 lg:scale-95 xl:scale-100">
                    <thead className={headerBorder}>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} className={` whitespace-nowrap border-b border-gray-50 ${headerBorder}`}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className={` whitespace-nowrap border-b border-gray-50 ${headerBorder} `}>
                                        <div className="flex flex-row items-center justify-start">
                                            <span>{column.render('Header')}</span>
                                            {/* Add a sort direction indicator */}
                                            <span className="ltr:ml-auto rtl:mr-auto">
                                                {column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <icon className="icon-arrow-down text-xxs" />
                                                    ) : (
                                                        <icon className="icon-arrow-up text-xxs" />
                                                    )
                                                ) : (
                                                    ''
                                                )}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            }
            <div className="flex flex-row items-center justify-between my-4">
                <div className="flex flex-wrap items-center justify-start children-x-2 pagination">
                    {offset !== 0 && (
                        <PageWithText
                            onClick={() => changeIndex('first')}
                            color="text-default">
              First
                        </PageWithText>
                    )}
                    {offset >= 1 && (
                        <PageWithText
                            onClick={() => changeIndex('previous')}
                            color="text-default">
              Previous
                        </PageWithText>
                    )}
                    { canNext() ? (
                        <PageWithText
                            onClick={() => changeIndex('next')} disabled={!canNextPage}
                            color="text-default">
              Next
                        </PageWithText>
                    ) : ''}
                    {offset !== pageCount - 1 && (
                        <PageWithText
                            onClick={() => changeIndex('last')} disabled={!canNextPage}
                            color="text-default">
              Last
                        </PageWithText>
                    )}
                </div>

                <span>
          Page{' '}
                    <b>
                        {offset + 1} of {pageOptions.length}
                    </b>{' '}
                </span>

                <select
                    className="form-select text-sm"
                    value={limit}
                    onChange={e => {
                        changePage(e.target.value)
                    }}>
                    {[5, 10, 25, 50, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
              Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default Datatable
