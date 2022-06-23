import React, { useState, useEffect } from 'react'
import Popover from '../../../../../Popover'
import { generateFilterkey } from '../../../../Table.utils'
import { BsSearch } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { TableSearchProps } from './'
import './TableSearch.scss'

const TableSearch = ({
  tableFilters,
  column,
  registerFilter,
  updateFilterState,
}: TableSearchProps) => {
  const [open, setOpen] = useState<boolean | null>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [filterId, setFilterId] = useState<string>()
  const filter = tableFilters.find((f) => f.id === filterId)

  useEffect(() => {
    const { key, filterKey } = column || {}
    const searchFilterId = filterKey || generateFilterkey()
    registerFilter({
      id: searchFilterId,
      active: false,
      key,
      type: 'search',
      value: searchValue,
    })
    setFilterId(searchFilterId)
  }, [])
  const runSearch = () => {
    setOpen(false)
    updateFilterState(filterId, { active: true, value: searchValue })
  }

  const resetSearch = () => {
    setSearchValue('')
    updateFilterState(filterId, { active: false, value: '' })
    setOpen(false)
  }

  return (
    <Popover
      isPopoverOpen={open}
      setIsPopoverOpen={setOpen}
      position="bottom"
      content={
        <div
          className={`eq-search-box ${open ? 'open' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <IoClose
            className="close-search"
            onClick={() => {
              setOpen(false)
            }}
          />

          <span className="search-input-container">
            <BsSearch className="search-icon" />

            <input
              className="search-input"
              placeholder="Search Filter"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </span>

          <div className="search-buttons">
            <button className="clear-search-button" onClick={resetSearch}>
              Reset
            </button>

            <button className="search-button" onClick={runSearch}>
              Search
            </button>
          </div>
        </div>
      }
    >
      <BsSearch
        className={`search-icon ${filter && filter.active ? 'searching' : ''}`}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(!open)
        }}
      />
    </Popover>
  )
}

export default TableSearch
