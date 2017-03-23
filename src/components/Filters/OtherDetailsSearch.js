import React from 'react';
import { Input } from 'antd';
const InputGroup = Input.Group;
import OtherDetailsButton from '../Buttons/OtherDetailsButton';

const OtherDetailsSearch = ({value, searchFields, onChange}) => {
  return (
    <div>
      <label>Other Details</label>
      <InputGroup compact>
        <Input
          style={{ width: 200 }}
          placeholder="Filter by Other Details"
          value={value}
          onChange={(e) => { onChange('others', e.target.value) }}
        />
        <OtherDetailsButton searchFields={searchFields} />
      </InputGroup>
    </div>
  );
}

export { OtherDetailsSearch };
