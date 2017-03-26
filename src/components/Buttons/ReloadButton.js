import React from 'react';
import { Tooltip } from 'antd';
import CoreButton from '../Common/CoreButton';

const ReloadButton = ({ loading, onClick }) => {
  return (
    <Tooltip placement="top" title="You can also hit Enter to reload">
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
