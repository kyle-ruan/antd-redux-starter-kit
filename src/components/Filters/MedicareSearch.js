import React from 'react';
import { Input } from 'antd';

const MedicareSearch = ({value, onChange}) => {
  return (
    <div>
      <label>Medicare Demographics: </label>
      <Input
        style={{ width: '100%' }}
        placeholder="Filter by Medicare Demographic"
        value={value}
        onChange={(e) => { onChange('medicare', e.target.value) }}
      />
    </div>
  );
}

export { MedicareSearch };
