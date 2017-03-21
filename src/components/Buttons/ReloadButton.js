import React from 'react';
import { Tooltip } from 'antd';
import CoreButton from '../CoreButton';

const ReloadButton = ({ loading, onClick }) => {
  return (
    <Tooltip placement="topLeft" title="You can also hit Enter to reload">
      <CoreButton
        type='primary'
        icon="check"
        loading={loading}
        onClick={onClick}
      >
        Update
      </CoreButton>
    </Tooltip>
  );
}

export { ReloadButton };
