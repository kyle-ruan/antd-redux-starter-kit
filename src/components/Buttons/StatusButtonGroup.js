import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio } from 'antd';
import { changeFilter } from '../../actions';

const { Group, Button } = Radio;

class ButtonGroup extends Component {
  render() {
    const { status, changeFilter } = this.props;
    return (
      <Group
        value={status.toString()}
        onChange={(e) => changeFilter('status', e.target.value)}
      >
        <Button value="0">Current</Button>
        <Button value="2">Closed</Button>
        <Button value="3">Deceased</Button>
        <Button value="1">Deleted</Button>
      </Group>
    );
  }
}

const mapStateToProps = ({ filters: { status }}) => {
  return { status };
};

const StatusButtonGroup = connect(mapStateToProps, { changeFilter })(ButtonGroup);
export { StatusButtonGroup };
