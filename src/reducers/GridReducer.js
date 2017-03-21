const INITIAL_STATE = {
  columns: {
    crn: { width: 100 },
    externalId: { width: 120 },
    name: { width: 200 },
    address: { width: 200 },
    homePhone: { width: 120 },
    mobile: { width: 120 },
    email: { width: 150 },
    medicareCardNumber: { width: 175 },
    siteId: { width: 150 },
    groupId: { width: 150 }
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
