import { deviceConfig } from '../configs';

const isMobile = window.innerWidth <= deviceConfig.mobileWidth;
const widthAvg = isMobile ? window.innerWidth / 2 : window.innerWidth / 8;

const INITIAL_STATE = {
  columns: {
    crn: { width: widthAvg },
    externalId: { width: widthAvg },
    name: { width: widthAvg },
    address: { width: widthAvg },
    homePhone: { width: widthAvg },
    mobile: { width: widthAvg },
    email: { width: widthAvg },
    medicareCardNumber: { width: widthAvg },
    siteId: { width: widthAvg },
    groupId: { width: widthAvg }
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
