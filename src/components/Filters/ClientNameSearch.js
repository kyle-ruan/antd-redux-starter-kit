import React from 'react';
import { Input } from 'antd';

const ClientNameSearch = ({value, onChange}) => {
  return (
    <div>
      <label>Client Name: </label>
      <Input
        style={{ width: '100%' }}
        placeholder="Filter by Client Name"
        value={value}
        onChange={(e) => { onChange('name', e.target.value) }}
      />
    </div>
  );
}

export { ClientNameSearch };
