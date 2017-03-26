import React from 'react';
import CoreButton from '../Common/CoreButton';

const NewClientButton = () => {
  return (
    <CoreButton
      type='primary'
      icon="plus"
      size="small"
      onClick={() => { window.parent.selectClient('0') }}
    >
      New Client
    </CoreButton>
  );
}

export { NewClientButton };
