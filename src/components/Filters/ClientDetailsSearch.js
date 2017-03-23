import React from 'react';
import { Input } from 'antd';
const InputGroup = Input.Group;
import ClientDetailsButton from '../Buttons/ClientDetailsButton';

const ClientDetailsSearch = ({value, searchFields, onChange}) => {
  return (
    <div>
      <label>Client Details</label>
      <InputGroup compact>
        <Input
          style={{ width: 200 }}
          placeholder="Filter by Client Details"
          value={value}
          onChange={(e) => { onChange('details', e.target.value) }}
        />
        <ClientDetailsButton searchFields={searchFields}/>
      </InputGroup>
    </div>
  );
}

export { ClientDetailsSearch };
