import React, { useState, useEffect } from 'react'
import { BsSearch } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import Tooltip from 'rc-tooltip'
import './TableSearch.scss'

interface TableSearchProps {
  title: string
  records: object[]
  setRecords: Function
  searchKey: string
}

const TableSearch = ({
  title,
  records,
  setRecords,
  searchKey = '',
}: TableSearchProps) => {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [filteredRecords, setFilteredRecords] = useState([])
  const [isFiltering, setIsFiltering] = useState(false)
  const runSearch = () => {
    setFilteredRecords(
      records.filter(
        // @ts-ignore
        ({ [searchKey]: value }) =>
          !value.toLowerCase().includes(searchValue.toLowerCase())
      )
    )
    setRecords(
      // @ts-ignore
      records.filter(({ [searchKey]: value }) =>
        value.toLowerCase().includes(searchValue.toLowerCase())
      )
    )
    setOpen(false)
    setIsFiltering(true)
  }
  const resetSearch = () => {
    setRecords((records) => [...records, ...filteredRecords])
    setFilteredRecords([])
    setSearchValue('')
    setIsFiltering(false)
    setOpen(false)
  }

  useEffect(() => {
    if (
      isFiltering &&
      !!searchValue &&
      records.some(
        // @ts-ignore
        ({ [searchKey]: value }) =>
          !value.toLowerCase().includes(searchValue.toLowerCase())
      )
    ) {
      setFilteredRecords([
        ...filteredRecords,
        ...records.filter(
          // @ts-ignore
          ({ [searchKey]: value }) =>
            !value.toLowerCase().includes(searchValue.toLowerCase())
        ),
      ])
      setRecords(
        // @ts-ignore
        records.filter(({ [searchKey]: value }) =>
          value.toLowerCase().includes(searchValue.toLowerCase())
        )
      )
    }
  }, [records])
  return (
    <div className="table-search">
      <span className="column-title">{title}</span>
      {
        // @ts-ignore
        <Tooltip
          visible={open}
          trigger="click"
          animation="zoom"
          onVisibleChange={(visible) => setOpen(visible)}
          overlay={
            <div
              className={`search-box ${open ? 'open' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <IoClose
                className="close-search"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setOpen(false)
                }}
              />
              <span className="search-input-container">
                <BsSearch
                  className="search-icon"
                  onClick={(e) => {
                    e.preventDefault()
                    setOpen(!open)
                  }}
                />

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
          placement="bottom"
        >
          <div>
            <BsSearch
              className="search-icon"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setOpen(!open)
              }}
            />
          </div>
        </Tooltip>
      }
    </div>
  )
}

export default TableSearch
