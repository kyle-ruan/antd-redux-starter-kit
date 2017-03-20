import { cache } from '../utils';

const INITIAL_STATE = {
  keyword: '',
  sites: [],
  clientGroups: [],
  status: 0,
  customFieldFilters: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ON_FILTER_LOAD':
      return cache.get('filters_client_list') || INITIAL_STATE;

    case 'ON_FILTER_CHANGE':
      const newState_1 = { ...state, [action.payload.name]: action.payload.value };
      cache.set('filters_client_list', newState_1);
      return newState_1;

    case 'ON_CUSTOM_FIELD_FILTER_CHANGE':
      let isExist = false;
      const { id, value } = action.payload;
      const newCustomFields = state.customFieldFilters.map((customField) => {
        if (customField.id === id) {
          isExist = true;
          return { ...customField, value };
        } else {
          return customField;
        }
      });

      const itemToAdd = isExist ? [] : [{id, value}];
      const newState_2 = { ...state, customFieldFilters: newCustomFields.concat(itemToAdd)};
      cache.set('filters_client_list', newState_2);
      return newState_2;

    case 'RESET_FILTERS':
      return INITIAL_STATE;
      
    default:
      return state;
  }
}
