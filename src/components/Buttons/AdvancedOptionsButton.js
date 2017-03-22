import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleFilters } from '../../actions';
import CoreButton from '../CoreButton';
import FaIcon from '../FaIcon';

class AdvancedButton extends Component {
  render() {
    const { showFilters, toggleFilters } = this.props;
    const isMobile = window.innerWidth <= 736;

    return (
      <CoreButton
        size="small"
        type='default'
        icon="filter"
        style={ isMobile ? { width: '100%'} : null }
        className={ '' + (showFilters ? 'toggle-filter-button--opened' : '')}
        onClick={() => {
          window.scrollTo(0, 0);
          toggleFilters();
        }}
      >
        Filters <span className="toggle-filter-button__arrow"><FaIcon type="angle-down" /></span>
      </CoreButton>
    );
  }
}

const mapStateToProps = ({ filters: { showFilters }}) => {
  return { showFilters };
};

const AdvancedOptionsButton = connect(mapStateToProps, { toggleFilters })(AdvancedButton);
export { AdvancedOptionsButton };
