import React, { Component } from 'react';
import { connect } from 'react-redux';
import CoreButton from '../Common/CoreButton';
import FaIcon from '../Common/FaIcon';
import { toggleFilters } from '../../actions';
import { deviceConfig } from '../../configs';

class AdvancedButton extends Component {
  render() {
    const { showFilters, toggleFilters } = this.props;
    const isMobile = window.innerWidth <= deviceConfig.mobileWidth;

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
