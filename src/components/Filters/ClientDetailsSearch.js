import React from 'react';
import { Input } from 'antd';
import ClientDetailsButton from '../Buttons/ClientDetailsButton';

const ClientDetailsSearch = ({value, searchFields, onChange}) => {
  return (
    <div>
      <label>Client Details: </label>

      <div className="input-button-group input-button-group--right">
        <Input
          style={{ width: '100%' }}
          placeholder="Filter by Client Details"
          value={value}
          onChange={(e) => { onChange('details', e.target.value) }}
        />
        <ClientDetailsButton searchFields={searchFields}/>
      </div>
    </div>
  );
}

export { ClientDetailsSearch };
