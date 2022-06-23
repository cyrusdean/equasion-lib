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
    const { selector, sortable, sortFunction, key: originalKey } = column

    let newColumn = { ...column }

    // The table columns don't accept strings
    if (typeof selector === 'string') {
      newColumn = {
        ...newColumn,
        selector: (record) => {
          return getValueFromPath(record, selector)
        },
        // Whenever the selector is a string and not a default key - the key defaults to the selector
        ...(!originalKey && { key: selector }),
      }
    }
    // Grab key from column (will be defaulted to selector if selector is a string)
    const { key } = newColumn
    // If the sortable flag has been passed in
    if (sortable) {
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
          column={newColumn}
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
