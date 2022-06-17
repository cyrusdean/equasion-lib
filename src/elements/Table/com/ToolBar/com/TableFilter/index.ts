import { TableFilterType } from '../.';

type Column = {
  key: string;
  onFilter: Function;
  filters: any[];
};

export interface TableFilterProps {
  filterId: string;
  filter: TableFilterType;
  column: Column;
  registerFilter: Function;
  updateFilterState: Function;
}

export { default } from './TableFilter';
