import React from 'react';
import { Input } from 'antd';
import OtherDetailsButton from '../Buttons/OtherDetailsButton';

const OtherDetailsSearch = ({value, searchFields, onChange}) => {
  return (
    <div>
      <label>Other Details</label>
      <div className="input-button-group input-button-group--right">
        <Input
          style={{ width: '100%' }}
          placeholder="Filter by Other Details"
          value={value}
          onChange={(e) => { onChange('others', e.target.value) }}
        />
        <OtherDetailsButton searchFields={searchFields} />
      </div>
    </div>
  );
}

export { OtherDetailsSearch };
