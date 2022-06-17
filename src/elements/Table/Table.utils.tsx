import { useState, useEffect } from 'react'

interface TableFilter {
  id: string
  active: boolean
}

/* Functions used for filter FILTER */
const filterFunctionMatches = (record, filterFunc, filterValues) => {
  // At least one of the filtered values applies to this record is the result
  const result = filterValues.some((value) => filterFunc(value, record))
  return result
}
/* end of filter FILTER functions */

/* Functions used for SEARCH FILTER */
export const getValueFromPath = (record, path) => {
  return path.split('.').reduce((r, k) => r?.[k] ?? '', record)
}

const runSearchFilter = (record, key, searchValue) => {
  const value =
    key instanceof Function ? key(record) : getValueFromPath(record, key) || ''

  return String(value).toLowerCase().includes(searchValue.toLowerCase())
}
/* end of SEARCH FILTER functions */

const applyFilters = (records, filters) => {
  let filteredRecords = [...records]

  filters.forEach((filter) => {
    const { active, type, key, value, onFilter } = filter || {}
    if (active) {
      if (type === 'search') {
        filteredRecords = filteredRecords.filter((record) =>
          runSearchFilter(record, key, value)
        )
      } else if (type === 'filter') {
        filteredRecords = filteredRecords.filter((record) =>
          filterFunctionMatches(record, onFilter, value)
        )
      }
    }
  })

  return filteredRecords
}

const useRecordManager = (initialRecords) => {
  const [records, setRecords] = useState(initialRecords)
  const [tableFilters, setTableFilters] = useState([])

  const [filteredRecords, setFilteredRecords] = useState(
    applyFilters(records, tableFilters)
  )

  // Used for tool bar to register its filters
  const registerFilter = (filter: TableFilter) => {
    setTableFilters((existingFilters) => [
      ...existingFilters.filter((f) => f.id !== filter.id),
      filter,
    ])
  }

  // Used for an individual filter to update its state
  const updateFilterState = (filterId, updatedState = {}) => {
    setTableFilters((fs) =>
      fs.map((filter) =>
        filter.id === filterId ? { ...filter, ...updatedState } : filter
      )
    )
  }

  // If the initial data ever changes update records to new dataset
  useEffect(() => {
    setRecords(initialRecords)
  }, [initialRecords])

  // When the records or filters change then update the filtered records
  useEffect(() => {
    setFilteredRecords(applyFilters(records, tableFilters))
  }, [tableFilters, records])

  return {
    records,
    setRecords,
    tableFilters,
    setTableFilters,
    filteredRecords,
    setFilteredRecords,
    updateFilterState,
    registerFilter,
  }
}

export const defaultSort = (a, b) => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

export default useRecordManager
