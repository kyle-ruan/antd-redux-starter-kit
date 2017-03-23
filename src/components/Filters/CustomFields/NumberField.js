import React from 'react';
import { InputNumber } from 'antd';

const NumberField = ({ id, label, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <InputNumber
        style={{ width: 200 }}
        onChange={(value) => {onChange(id, value)}}
        value={convertInt(value)}
        onKeyUp={(e) => {
          if(e.keyCode === 8)
            onChange(id, e.target.value);
        }}
      />
    </div>
  );
};

function convertInt(val) {
  if(isNaN(val)) return '';

  return val || '';
}

export default NumberField;
