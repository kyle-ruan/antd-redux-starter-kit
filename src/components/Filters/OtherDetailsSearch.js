import React from 'react';
import { Input } from 'antd';
import OtherDetailsButton from '../Buttons/OtherDetailsButton';

const OtherDetailsSearch = ({value, searchFields, onChange}) => {
  return (
    <div>
      <label>Other Details: </label>
      <Input
        style={{ width: 200 }}
        placeholder="Filter by Other Details"
        value={value}
        onChange={(e) => { onChange('others', e.target.value) }}
      />
    <OtherDetailsButton searchFields={searchFields} />
    </div>
  );
}

export { OtherDetailsSearch };
