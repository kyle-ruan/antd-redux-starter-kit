import { getClientDataSource } from './DataSourceActions';

export const loadFilters = () => {
  return { type: 'ON_FILTER_LOAD' };
};

export const toggleFilters = () => {
  return { type: 'TOGGLE_FILTERS' };
};

export const changeFilter = (name, value) => {
  return (dispatch) => {
    dispatch({
      type: 'ON_FILTER_CHANGE',
      payload: { name, value }
    });

    if (name === 'status') {
      dispatch(getClientDataSource(1));
    }
  };
};

export const changeCustomFieldFilter = (id, value) => {
  return {
    type: 'ON_CUSTOM_FIELD_FILTER_CHANGE',
    payload: { id, value }
  };
};

export const resetFilters = () => {
  return (dispatch) => {
    dispatch({ type: 'RESET_FILTERS' });
    dispatch(getClientDataSource(1));
  };
};
