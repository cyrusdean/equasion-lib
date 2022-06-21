import React, { useState, useEffect } from 'react';
import { ToolBarProps } from '.';
import { TableSearch, TableFilter } from './com';
import './ToolBar.scss';

const Toolbar = ({
  column,
  tableFilters,
  registerFilter,
  updateFilterState
}: ToolBarProps) => {
  const { name, key, searchable, filters, onFilter, filterKey } = column || {};
  const [tools, setTools] = useState([]);

  // Sets up the tool bars filters depending on the column props
  useEffect(() => {
    const requestedTools = [];
    if (searchable && key) requestedTools.push('search');
    if (filters && Array.isArray(filters) && typeof onFilter === 'function')
      requestedTools.push('filter');
    setTools(requestedTools);
  }, [column]);

  const searchFilterId = `${filterKey}-search`;
  const filterFilterId = `${filterKey}-filter`;
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
  );
};

export default Toolbar;
