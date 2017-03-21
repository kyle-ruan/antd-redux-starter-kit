const INITIAL_STATE = {
  columns: {
    name: { width: 200 },
    address: { width: 200 }
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
