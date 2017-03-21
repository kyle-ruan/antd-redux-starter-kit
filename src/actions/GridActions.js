export const resizeColumn = (column, movement) => {
  return {
    type: 'RESIZE_COLUMN',
    payload: { column, movement }
  };
}
