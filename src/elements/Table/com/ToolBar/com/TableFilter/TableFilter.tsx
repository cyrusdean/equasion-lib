import React, { useState, useEffect } from 'react'
import Popover from '../../../../../Popover'
import Checkbox from '../../../../../../forms/Checkbox'
import { generateFilterkey } from '../../../../Table.utils'
import { FiFilter } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { TableFilterProps } from './'
import './TableFilter.scss'

const TableFilter = ({
  column,
  tableFilters,
  registerFilter,
  updateFilterState,
}: TableFilterProps) => {
  const { filters } = column

  const [open, setOpen] = useState<boolean>(false)
  const [filterValues, setFilterValues] = useState([])
  const [filterId, setFilterId] = useState<string>()
  const filter = tableFilters.find((f) => f.id === filterId)

  useEffect(() => {
    const { onFilter, filterKey } = column || {}
    const filterId = filterKey || generateFilterkey()

    registerFilter({
      id: filterId,
      active: false,
      onFilter,
      type: 'filter',
      value: filterValues,
    })
    setFilterId(filterId)
  }, [])

  const runSearch = () => {
    setOpen(false)

    if (filterValues.length) {
      updateFilterState(filterId, { active: true, value: filterValues })
    } else {
      resetSearch()
    }
  }

  const resetSearch = () => {
    setFilterValues([])
    updateFilterState(filterId, { active: false, value: [] })
    setOpen(false)
  }

  return (
    <Popover
      isPopoverOpen={open}
      setIsPopoverOpen={setOpen}
      position="bottom"
      align="center"
      content={
        <div
          className={`eq-filter-container ${open ? 'open' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <IoClose
            className="close-filter"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setOpen(false)
            }}
          />
          <div className="filter-options">
            {filters.map(({ label, value }) => (
              <Checkbox
                key={value}
                form={false}
                label={label}
                defaultValue={filterValues.includes(value)}
                onChange={(e) => {
                  const { value: checked } = e || {}
                  if (checked && !filterValues.includes(value)) {
                    setFilterValues((fvs) => [...fvs, value])
                  } else if (!checked && filterValues.includes(value)) {
                    setFilterValues((fvs) => fvs.filter((fv) => fv !== value))
                  }
                }}
              />
            ))}
          </div>

          <div className="search-buttons">
            <button className="clear-search-button" onClick={resetSearch}>
              Reset
            </button>
            <button className="search-button" onClick={runSearch}>
              Ok
            </button>
          </div>
        </div>
      }
    >
      <FiFilter
        className={`filter-icon ${filter && filter.active ? 'filtering' : ''}`}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(!open)
        }}
      />
    </Popover>
  )
}

export default TableFilter
