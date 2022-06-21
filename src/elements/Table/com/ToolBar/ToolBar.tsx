import React, { useState, useEffect } from 'react'
import { ToolBarProps } from '.'
import { TableSearch, TableFilter } from './com'
import { generateFilterkey } from '../../Table.utils'
import './ToolBar.scss'

const getToolId = (type) => `${generateFilterkey()}-${type}`

const Toolbar = ({
  column,
  tableFilters,
  registerFilter,
  updateFilterState,
}: ToolBarProps) => {
  const { name, searchable, filters, onFilter, filterKey } = column || {}
  const [tools, setTools] = useState([])

  // Sets up the tool bars filters depending on the column props
  useEffect(() => {
    const requestedTools = []
    if (searchable) requestedTools.push('search')
    if (filters && Array.isArray(filters) && typeof onFilter === 'function')
      requestedTools.push('filter')
    setTools(requestedTools)
  }, [column])

  const searchFilterId = filterKey || getToolId('search')
  const filterFilterId = filterKey || getToolId('filter')
  return (
    <div className="eq-column-tool-bar">
      <span className="column-title">{name}</span>

      {tools.includes('search') && (
        <TableSearch
          filterId={searchFilterId}
          filter={tableFilters.find((f) => f.id === searchFilterId)}
          column={column}
          registerFilter={registerFilter}
          updateFilterState={updateFilterState}
        />
      )}
      {tools.includes('filter') && (
        <TableFilter
          filterId={filterFilterId}
          filter={tableFilters.find((f) => f.id === filterFilterId)}
          column={column}
          registerFilter={registerFilter}
          updateFilterState={updateFilterState}
        />
      )}
    </div>
  )
}

export default Toolbar
