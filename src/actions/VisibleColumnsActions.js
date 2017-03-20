export const toggleColumns = (columns) => {
  return {
    type: 'TOGGLE_COLUMN_VISIBILITY',
    payload: { columns }
  };
};
