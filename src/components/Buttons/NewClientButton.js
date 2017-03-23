import React from 'react';
import CoreButton from '../CoreButton';

const NewClientButton = ({ loading, onClick }) => {
  return (
    <CoreButton
      type='primary'
      icon="plus"
      loading={loading}
      onClick={onClick}
    >
      New Client
    </CoreButton>
  );
}

export { NewClientButton };
