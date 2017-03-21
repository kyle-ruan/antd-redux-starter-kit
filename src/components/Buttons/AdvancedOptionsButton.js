import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleFilters } from '../../actions';
import CoreButton from '../CoreButton';

class AdvancedButton extends Component {
  render() {
    const { toggleFilters } = this.props;
    return (
      <CoreButton
        size="small"
        type='default'
        icon="filter"
        onClick={() => {
          window.scrollTo(0, 0);
          toggleFilters();        
        }}
      >
        Filters
      </CoreButton>
    );
  }
}

const mapStateToProps = ({ filters: { showFilters }}) => {
  return { showFilters };
};

const AdvancedOptionsButton = connect(mapStateToProps, { toggleFilters })(AdvancedButton);
export { AdvancedOptionsButton };
