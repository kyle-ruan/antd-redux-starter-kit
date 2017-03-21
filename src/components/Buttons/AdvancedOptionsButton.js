import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import { toggleFilters } from '../../actions';

class AdvancedButton extends Component {
  render() {
    const { showFilters, toggleFilters } = this.props;
    return (
      <Button
        size="small"
        type='default'
        onClick={toggleFilters.bind(this)}
      >
        <Icon type={ !showFilters ? "up" : "down" } /> Advanced Options
      </Button>
    );
  }
}

const mapStateToProps = ({ filters: { showFilters }}) => {
  return { showFilters };
};

const AdvancedOptionsButton = connect(mapStateToProps, { toggleFilters })(AdvancedButton);
export { AdvancedOptionsButton };
