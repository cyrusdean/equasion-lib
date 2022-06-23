import React, { useState, useEffect } from 'react'
import { ToolBarProps } from '.'
import { TableSearch, TableFilter } from './com'
import './ToolBar.scss'

const Toolbar = ({
  column,
  tableFilters,
  registerFilter,
  updateFilterState,
}: ToolBarProps) => {
  const { name, searchable, filters, onFilter } = column || {}
  const [tools, setTools] = useState<string[]>([])

  // Sets up the tool bars filters depending on the column props
  useEffect(() => {
    const requestedTools = []
    if (searchable) requestedTools.push('search')
    if (filters && Array.isArray(filters) && typeof onFilter === 'function')
      requestedTools.push('filter')
    setTools(requestedTools)
  }, [column])

  return (
    <div className="eq-column-tool-bar">
      <span className="column-title">{name}</span>

      {tools.includes('search') && (
        <TableSearch
          tableFilters={tableFilters}
          column={column}
          registerFilter={registerFilter}
          updateFilterState={updateFilterState}
        />
      )}
      {tools.includes('filter') && (
        <TableFilter
          tableFilters={tableFilters}
          column={column}
          registerFilter={registerFilter}
          updateFilterState={updateFilterState}
        />
      )}
    </div>
  )
}

export default Toolbar
