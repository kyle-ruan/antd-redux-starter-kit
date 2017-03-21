import { combineReducers } from 'redux';
import DataSource from './DataSourceReducer';
import Filters from './FiltersReducer';
import VisibleColumns from './ColumnsVisibilityReducer';
import Grid from './GridReducer';

const rootReducer = combineReducers({
  dataSource: DataSource,
  filters: Filters,
  visibleColumns: VisibleColumns,
  grid: Grid
});

export default rootReducer;
