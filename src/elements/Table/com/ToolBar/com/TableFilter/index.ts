import { TableFilterType } from '../.'

type Column = {
  key: string
  onFilter: Function
  filters: any[]
  filterKey?: string
}

export interface TableFilterProps {
  filterId: string
  tableFilters: TableFilterType
  column: Column
  registerFilter: Function
  updateFilterState: Function
}

export { default } from './TableFilter'
