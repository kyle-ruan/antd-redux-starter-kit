const INITIAL_STATE = {
  columns: {
    crn: { width: 100 },
    externalId: { width: 120 },
    name: { width: 200 },
    address: { width: 250 },
    homePhone: { width: 150 },
    mobile: { width: 150 },
    email: { width: 180 },
    medicareCardNumber: { width: 200 },
    siteId: { width: 180 },
    groupId: { width: 180 }
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CUSTOM_FIELDS_FINISH_LOADING':
      const customFields = action.payload.customFields;
      const customFieldsColumns = customFields.map(cf => {
        return cf.fieldName;
      });
      const newState = { ...state };
      let currentColumns = newState.columns;
      customFieldsColumns.forEach(column => {
        currentColumns = { ...currentColumns, [column]: { width: 120 } };
      });
      return { ...state, columns: currentColumns };

    case 'RESIZE_COLUMN':
      const { column, movement } = action.payload;
      const currentWidth = state.columns[column].width;
      const resizedColumn = {
        ...state.columns[column],
        width: currentWidth + movement
      };

      return {
        ...state,
        columns: { ...state.columns, [column]: resizedColumn }
      };

    default:
      return state;
  }
};
