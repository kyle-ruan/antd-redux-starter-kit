import React from 'react';
import { Input } from 'antd';
import ClientDetailsButton from '../Buttons/ClientDetailsButton';

const ClientDetailsSearch = ({value, searchFields, onChange}) => {
  return (
    <div>
      <label>Client Details: </label>
      <Input
        style={{ width: 200 }}
        placeholder="Filter by Client Details"
        value={value}
        onChange={(e) => { onChange('details', e.target.value) }}
      />
    <ClientDetailsButton searchFields={searchFields}/>
    </div>
  );
}

export { ClientDetailsSearch };
