import { TableFilterType } from '../.'

type Column = {
  key: string
  filterKey?: string
}

export interface TableSearchProps {
  filterId: string
  tableFilters: TableFilterType[]
  column: Column
  registerFilter: Function
  updateFilterState: Function
}
export { default } from './TableSearch'
