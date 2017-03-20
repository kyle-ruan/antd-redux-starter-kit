export const loadFilters = () => {
  return { type: 'ON_FILTER_LOAD' };
};

export const changeFilter = (name, value) => {
  return {
    type: 'ON_FILTER_CHANGE',
    payload: { name, value }
  };
};

export const changeCustomFieldFilter = (id, value) => {
  return {
    type: 'ON_CUSTOM_FIELD_FILTER_CHANGE',
    payload: { id, value }
  };
};

export const resetFilters = () => {
  return { type: 'RESET_FILTERS' };
};
