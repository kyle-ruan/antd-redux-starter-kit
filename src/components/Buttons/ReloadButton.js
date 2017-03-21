import React from 'react';
import { Button, Tooltip } from 'antd';

const ReloadButton = ({ loading, onClick }) => {
  return (
    <Tooltip placement="topLeft" title="You can also hit Enter to reload 🙂">
      <Button
        type='primary'
        icon="sync"
        loading={loading}
        onClick={onClick}
      >
        Reload
      </Button>
    </Tooltip>
  );
}

export { ReloadButton };
