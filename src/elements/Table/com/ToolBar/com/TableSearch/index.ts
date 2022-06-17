import { TableFilterType } from '../.';

type Column = {
  key: string;
};

export interface TableSearchProps {
  filterId: string;
  filter: TableFilterType;
  column: Column;
  registerFilter: Function;
  updateFilterState: Function;
}
export { default } from './TableSearch';
