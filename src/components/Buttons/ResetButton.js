import React from 'react';
import CoreButton from '../CoreButton';

const ResetButton = ({ loading, onClick }) => {
  return (
    <CoreButton
      type='default'
      icon="times"
      onClick={onClick}
    >
      Clear Filters
    </CoreButton>
  );
}

export { ResetButton };
