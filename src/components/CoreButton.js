import React from 'react';
import { Button } from 'antd';
import FaIcon from "./FaIcon.js";

const CoreButton = (props) => {
  return (
    <Button
      type={props.type}
      size={props.size}
      className={props.className}
      onClick={props.onClick}
    >
      {props.icon !== undefined ? <FaIcon type={props.icon} /> : null }
      <span style={ props.children === null ? {display: 'none'} : {} }>
        {props.children}
      </span>
    </Button>
  );
};

export default CoreButton;
