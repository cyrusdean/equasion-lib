export interface TableFilterType {
  id: string;
  active: boolean;
  onfilter?: Function;
  type: string;
  value: string | any[];
}

export interface ToolBarProps {
  column: any;
  tableFilters: TableFilterType[];
  registerFilter: Function;
  updateFilterState: Function;
}

export { default } from './ToolBar';
