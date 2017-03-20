import { combineReducers } from 'redux';
import DataSource from './DataSourceReducer';
import Filters from './FiltersReducer';
import VisibleColumns from './ColumnsVisibilityReducer';

const rootReducer = combineReducers({
  dataSource: DataSource,
  filters: Filters,
  visibleColumns: VisibleColumns
});

export default rootReducer;
