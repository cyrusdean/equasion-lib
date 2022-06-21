import React from 'react'
import Table from 'react-data-table-component'
import type { IDataTableProps } from 'react-data-table-component'
import ToolBar from './com/ToolBar'
import useRecordManager, { defaultSort, getValueFromPath } from './Table.utils'

interface IEqTableProps {
  dataName?: string
}

const DefaultTable = ({
  data,
  columns: defaultColumns,
  dataName = 'Records',
  onRowClicked,
  expandableRows,
  ...rest
}: // @ts-ignore
IEqTableProps & IDataTableProps) => {
  const { filteredRecords, tableFilters, updateFilterState, registerFilter } =
    useRecordManager(data)

  const columns = defaultColumns.map((column) => {
    const { selector, sortable, key, sortFunction } = column

    let newColumn = { ...column }

    // The table columns don't accept strings
    if (typeof selector === 'string') {
      newColumn = {
        ...newColumn,
        selector: (record) => {
          return getValueFromPath(record, selector)
        },
      }
    }
    // Only sortable would result in the default sort function
    // by including the sort key the row will be reduced to a value
    if (sortable && key) {
      // If a sort function has NOT been passed in
      if (!(sortFunction instanceof Function)) {
        // Reduce the row to the value that represents it and default sort
        newColumn = {
          ...newColumn,
          sortFunction:
            key instanceof Function
              ? (rowA, rowB) => defaultSort(key(rowA), key(rowB))
              : (rowA, rowB) => {
                  return defaultSort(
                    getValueFromPath(rowA, key),
                    getValueFromPath(rowB, key)
                  )
                },
        }
      }
    }

    // Have the toolBar decide what is rendered
    newColumn = {
      ...newColumn,
      name: (
        <ToolBar
          column={column}
          updateFilterState={updateFilterState}
          registerFilter={registerFilter}
          tableFilters={tableFilters}
        />
      ),
    }

    return newColumn
  })

  return (
    <Table
      data={filteredRecords}
      columns={columns}
      pointerOnHover={!!onRowClicked || !!expandableRows}
      noDataComponent={`There are no ${dataName}.`}
      dense
      persistTableHead
      onRowClicked={onRowClicked}
      expandableRows={expandableRows}
      pagination
      {...rest}
    />
  )
}

export default DefaultTable
