const INITIAL_STATE = {
  crn: false,
  externalId: false,
  name: true,
  streetAddress: true,
  homePhone: true,
  mobile: true,
  email: true,
  medicareCardNumber: true,
  siteId: true,
  groupId: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CUSTOM_FIELDS_FINISH_LOADING':
      const { customFields } = action.payload;
      let newState_1 = { ...state };
      customFields.forEach(cf => {
        newState_1 = { ...newState_1, [cf.fieldName]: false };
      });
      return newState_1;
    case 'TOGGLE_COLUMN_VISIBILITY':
      const { columns } = action.payload;
      let newState_2 = { ...state };
      Object.keys(state).forEach(column => {
          newState_2 = { ...newState_2, [column]: columns.includes(column) }
      });

      return newState_2;

    default:
      return state;
  }
};
