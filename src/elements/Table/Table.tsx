import React, { useState } from 'react'
import Table from 'react-data-table-component'
import type { IDataTableProps } from 'react-data-table-component'
import { TableSearch } from '../'

interface IEqTableProps {
  dataName?: string
}

const get = (t, path) => path.split('.').reduce((r, k) => r?.[k] ?? '', t)

const DefaultTable = ({
  data,
  columns: defaultColumns,
  dataName = 'Records',
  onRowClicked,
  expandableRows,
  ...rest
}: // @ts-ignore
IEqTableProps & IDataTableProps) => {
  const [records, setRecords] = useState(data)

  const columns = defaultColumns.map((column) => {
    const { name, selector, searchKey } = column
    let newColumn = { ...column }

    if (typeof selector === 'string')
      newColumn = { ...newColumn, selector: (record) => get(record, selector) }

    if (searchKey)
      newColumn = {
        ...newColumn,
        name: (
          <TableSearch
            title={name}
            searchKey={searchKey}
            records={records}
            setRecords={setRecords}
          />
        ),
      }

    return newColumn
  })

  return (
    <Table
      data={records}
      columns={columns}
      pointerOnHover={!!onRowClicked || !!expandableRows}
      noDataComponent={`There are no ${dataName}.`}
      dense
      persistTableHead
      onRowClicked={onRowClicked}
      expandableRows={expandableRows}
      {...rest}
    />
  )
}

export default DefaultTable
