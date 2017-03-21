import React from 'react';
import { Button } from 'antd';

const ResetButton = ({ loading, onClick }) => {
  return (
    <Button
      type='default'
      icon="close-circle-o"
      onClick={onClick}
    >
      Reset Filters
    </Button>
  );
}

export { ResetButton };
